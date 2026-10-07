import React, { ReactNode } from 'react';
import { useAccentHex } from '../../../context/AccentContext';
import { useResume } from '../../../context/ResumeContext';
import { contactEntries, dateRange, joinNonEmpty, toBullets } from '../../../utils/format';

const SectionTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="mb-3 text-[12px] font-black uppercase tracking-[0.22em] text-slate-900">
    <span className="mr-2 inline-block h-2.5 w-2.5 rounded-sm bg-accent-500" />
    {children}
  </h2>
);

const toMonthIndex = (value: string): number | null => {
  const match = /^(\d{4})-(\d{1,2})/.exec(value ?? '');
  return match ? Number(match[1]) * 12 + Number(match[2]) - 1 : null;
};

const SkillRing: React.FC<{ name: string; level: number }> = ({ name, level }) => {
  const hex = useAccentHex();
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const fraction = Math.min(Math.max(level, 0), 5) / 5;
  return (
    <div className="flex flex-col items-center text-center">
      <svg width="52" height="52" viewBox="0 0 58 58" aria-hidden="true">
        <circle cx="29" cy="29" r={radius} fill="none" stroke={hex('100')} strokeWidth="6" />
        <circle
          cx="29"
          cy="29"
          r={radius}
          fill="none"
          stroke={hex('600')}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${circumference * fraction} ${circumference}`}
          transform="rotate(-90 29 29)"
        />
        <text x="29" y="33" textAnchor="middle" fontSize="12" fontWeight="800" fill={hex('800')} fontFamily="Inter, sans-serif">
          {Math.round(fraction * 100)}
        </text>
      </svg>
      <span className="mt-1 text-[11px] font-semibold leading-tight text-slate-700">{name}</span>
    </div>
  );
};

const BAR_SHADES = ['bg-accent-700', 'bg-accent-500', 'bg-accent-400', 'bg-accent-600', 'bg-accent-300'];

/** Data-forward layout: headline stats, a career Gantt chart and skill rings. */
const InfographicTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  const contacts = contactEntries(personalInfo);

  const now = new Date();
  const nowIndex = now.getFullYear() * 12 + now.getMonth();
  const spans = experience
    .map(exp => {
      const start = toMonthIndex(exp.startDate);
      const end = exp.isCurrentPosition || !exp.endDate ? nowIndex : toMonthIndex(exp.endDate);
      return start === null || end === null ? null : { id: exp.id, label: exp.company || exp.position, start, end: Math.max(start + 1, end) };
    })
    .filter((span): span is NonNullable<typeof span> => span !== null);

  const firstMonth = spans.length ? Math.min(...spans.map(span => span.start)) : 0;
  const lastMonth = spans.length ? Math.max(...spans.map(span => span.end)) : 0;
  const totalMonths = Math.max(1, lastMonth - firstMonth);
  const firstYear = Math.floor(firstMonth / 12);
  const lastYear = Math.ceil(lastMonth / 12);
  const yearStep = Math.max(1, Math.ceil((lastYear - firstYear) / 6));
  const axisYears: number[] = [];
  for (let year = firstYear; year <= lastYear; year += yearStep) axisYears.push(year);

  const careerYears = spans.length ? Math.floor((lastMonth - firstMonth) / 12) : 0;

  const stats = [
    { label: 'Years experience', value: careerYears > 0 ? `${careerYears}+` : '' },
    { label: experience.length === 1 ? 'Role' : 'Roles', value: experience.length ? String(experience.length) : '' },
    { label: projects.length === 1 ? 'Project' : 'Projects', value: projects.length ? String(projects.length) : '' },
    { label: 'Core skills', value: skills.length ? String(skills.length) : '' },
  ].filter(stat => stat.value);

  return (
    <div className="bg-white px-11 py-9 text-[12.5px] leading-relaxed text-slate-600">
      <header className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[34px] font-black leading-none tracking-tight text-slate-900">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <p className="mt-3 inline-block rounded-md bg-accent-600 px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-[0.15em] text-white">
              {personalInfo.title}
            </p>
          )}
        </div>
        <div className="shrink-0 text-right text-[11px] leading-[1.75] text-slate-500">
          {contacts.map(contact => (
            <div key={contact.key}>{contact.value}</div>
          ))}
        </div>
      </header>

      {stats.length > 0 && (
        <div className="mt-5 grid gap-3" style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
          {stats.map(stat => (
            <div key={stat.label} className="rounded-xl border border-accent-100 bg-accent-50 px-4 py-2.5">
              <div className="text-[28px] font-black leading-none text-accent-700">{stat.value}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {personalInfo.summary && <p className="mt-5 text-[13px]">{personalInfo.summary}</p>}

      {spans.length > 0 && (
        <section className="mt-5">
          <SectionTitle>Career at a glance</SectionTitle>
          <div className="space-y-1.5">
            {spans.map((span, i) => (
              <div key={span.id} className="grid grid-cols-[130px_1fr] items-center gap-3">
                <span className="truncate text-right text-[11px] font-semibold text-slate-700">{span.label}</span>
                <div className="relative h-4 rounded bg-slate-100">
                  <div
                    className={`absolute inset-y-0 rounded ${BAR_SHADES[i % BAR_SHADES.length]}`}
                    style={{
                      left: `${((span.start - firstMonth) / totalMonths) * 100}%`,
                      width: `${((span.end - span.start) / totalMonths) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="grid grid-cols-[130px_1fr] gap-3">
              <span />
              <div className="relative h-4 text-[10px] font-semibold text-slate-400">
                {axisYears.map(year => (
                  <span
                    key={year}
                    className="absolute -translate-x-1/2"
                    style={{ left: `${Math.min(100, Math.max(0, ((year * 12 - firstMonth) / totalMonths) * 100))}%` }}
                  >
                    {year}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mt-5">
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-3">
            {experience.map(exp => (
              <article key={exp.id} className="border-l-[3px] border-accent-200 pl-4">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[14px] font-bold text-slate-900">
                    {exp.position}
                    {exp.company && <span className="font-semibold text-accent-600"> @ {exp.company}</span>}
                  </h3>
                  <span className="shrink-0 text-[11px] font-semibold text-slate-400">
                    {dateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                  </span>
                </div>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 marker:text-accent-400">
                  {toBullets(exp.description).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-5">
          <SectionTitle>Skill proficiency</SectionTitle>
          <div className="grid grid-cols-8 gap-x-1 gap-y-3">
            {skills.map(skill => (
              <SkillRing key={skill.id} name={skill.name} level={skill.level} />
            ))}
          </div>
        </section>
      )}

      {(education.length > 0 || projects.length > 0) && (
        <div className="mt-5 grid grid-cols-2 gap-8">
          {education.length > 0 && (
            <section>
              <SectionTitle>Education</SectionTitle>
              {education.map(edu => (
                <div key={edu.id} className="mb-3">
                  <h3 className="font-bold text-slate-900">{joinNonEmpty([edu.degree, edu.fieldOfStudy], ', ')}</h3>
                  <p>{edu.institution}</p>
                  <p className="text-[11px] font-semibold text-accent-600">{dateRange(edu.startDate, edu.endDate)}</p>
                </div>
              ))}
            </section>
          )}
          {projects.length > 0 && (
            <section>
              <SectionTitle>Projects</SectionTitle>
              {projects.map(project => (
                <div key={project.id} className="mb-3">
                  <h3 className="font-bold text-slate-900">{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default InfographicTemplate;
