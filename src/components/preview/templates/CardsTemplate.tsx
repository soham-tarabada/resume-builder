import React, { ReactNode } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { contactEntries, dateRange, initials, joinNonEmpty, toBullets } from '../../../utils/format';

const Card: React.FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-5">
    <h2 className="mb-4 flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.22em] text-slate-400">
      <span className="h-2 w-2 rounded-full bg-accent-500" />
      {title}
    </h2>
    {children}
  </section>
);

/** Soft dashboard look: every section lives in its own rounded card. */
const CardsTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  const contacts = contactEntries(personalInfo);
  const monogram = initials(personalInfo.firstName, personalInfo.lastName);

  return (
    <div className="bg-slate-100 p-6 text-[12.5px] leading-relaxed text-slate-600">
      <header className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 pl-8">
        <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-accent-400 to-accent-700" />
        <div className="flex items-center gap-5">
          {monogram && (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent-600 text-xl font-bold text-white">
              {monogram}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="text-[30px] font-extrabold leading-tight tracking-tight text-slate-900">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.title && <p className="text-[14px] font-semibold text-accent-600">{personalInfo.title}</p>}
          </div>
        </div>
        {contacts.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {contacts.map(contact => (
              <span key={contact.key} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                {contact.value}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="mt-4 grid grid-cols-[1fr_230px] gap-4">
        <div className="space-y-4">
          {personalInfo.summary && (
            <Card title="About">
              <p className="text-[13px]">{personalInfo.summary}</p>
            </Card>
          )}

          {experience.length > 0 && (
            <Card title="Experience">
              <div className="divide-y divide-slate-100">
                {experience.map(exp => (
                  <article key={exp.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[14px] font-bold text-slate-900">{exp.position}</h3>
                        <p className="text-[12px] font-medium text-slate-500">{joinNonEmpty([exp.company, exp.location], ' · ')}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-accent-50 px-2.5 py-0.5 text-[10.5px] font-semibold text-accent-700">
                        {dateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                      </span>
                    </div>
                    <ul className="mt-2 list-disc space-y-0.5 pl-4 marker:text-accent-400">
                      {toBullets(exp.description).map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </Card>
          )}

          {projects.length > 0 && (
            <Card title="Projects">
              <div className="grid grid-cols-2 gap-3">
                {projects.map(project => (
                  <article key={project.id} className="rounded-xl bg-slate-50 p-3.5">
                    <h3 className="text-[13px] font-bold text-slate-900">{project.title}</h3>
                    <p className="mt-0.5 text-[11.5px]">{project.description}</p>
                    {project.technologies && (
                      <p className="mt-1.5 text-[10.5px] font-semibold text-accent-600">{project.technologies}</p>
                    )}
                  </article>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          {skills.length > 0 && (
            <Card title="Skills">
              <div className="flex flex-wrap gap-1.5">
                {skills.map(skill => (
                  <span
                    key={skill.id}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold ${
                      skill.level >= 4 ? 'bg-accent-600 text-white' : 'bg-accent-50 text-accent-700'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {education.length > 0 && (
            <Card title="Education">
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="text-[12.5px] font-bold leading-snug text-slate-900">{edu.degree}</h3>
                    {edu.fieldOfStudy && <p className="text-[11.5px]">{edu.fieldOfStudy}</p>}
                    <p className="text-[11.5px] font-medium text-slate-500">{edu.institution}</p>
                    <p className="text-[10.5px] font-semibold text-accent-600">{dateRange(edu.startDate, edu.endDate)}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardsTemplate;
