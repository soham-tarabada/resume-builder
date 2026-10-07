import React, { ReactNode } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { contactEntries, dateRange, joinNonEmpty, toBullets } from '../../../utils/format';

const SectionTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="mb-3 text-[11.5px] font-extrabold uppercase tracking-[0.22em] text-accent-700">{children}</h2>
);

/** Two-tone layout: a bold left-ruled name, main column, and a tinted right rail. */
const SplitTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  const contacts = contactEntries(personalInfo);

  return (
    <div className="flex flex-col bg-white text-[12.5px] leading-relaxed text-slate-600">
      <header className="px-11 pb-7 pt-11">
        <div className="border-l-[6px] border-accent-500 pl-5">
          <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-tight text-slate-900">
            {personalInfo.firstName} <span className="text-accent-600">{personalInfo.lastName}</span>
          </h1>
          {personalInfo.title && (
            <p className="mt-2 text-[12.5px] font-semibold uppercase tracking-[0.22em] text-slate-500">{personalInfo.title}</p>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        <main className="flex-1 space-y-7 pb-10 pl-11 pr-8">
          {personalInfo.summary && (
            <section>
              <SectionTitle>Profile</SectionTitle>
              <p className="text-[13px]">{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-5">
                {experience.map(exp => (
                  <article key={exp.id}>
                    <h3 className="text-[14.5px] font-bold text-slate-900">{exp.position}</h3>
                    <div className="flex items-baseline justify-between gap-3 text-[12px]">
                      <span className="font-semibold text-accent-600">{joinNonEmpty([exp.company, exp.location], ' · ')}</span>
                      <span className="shrink-0 font-medium text-slate-400">
                        {dateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                      </span>
                    </div>
                    <ul className="mt-1.5 list-disc space-y-0.5 pl-4 marker:text-accent-400">
                      {toBullets(exp.description).map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <SectionTitle>Projects</SectionTitle>
              <div className="space-y-3">
                {projects.map(project => (
                  <article key={project.id}>
                    <h3 className="text-[13.5px] font-bold text-slate-900">{project.title}</h3>
                    <p>{project.description}</p>
                    {project.technologies && <p className="text-[11px] font-semibold text-slate-400">{project.technologies}</p>}
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className="w-[240px] shrink-0 space-y-7 border-l border-accent-100 bg-accent-50 px-7 py-8">
          {contacts.length > 0 && (
            <section>
              <SectionTitle>Contact</SectionTitle>
              <div className="space-y-2">
                {contacts.map(contact => (
                  <div key={contact.key}>
                    <div className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-accent-600">{contact.label}</div>
                    <div className="break-all text-[11.5px] text-slate-700">{contact.value}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <SectionTitle>Skills</SectionTitle>
              <div className="space-y-2.5">
                {skills.map(skill => (
                  <div key={skill.id}>
                    <div className="text-[11.5px] font-semibold text-slate-700">{skill.name}</div>
                    <div className="mt-1 h-1 rounded-full bg-accent-200">
                      <div className="h-full rounded-full bg-accent-600" style={{ width: `${(skill.level / 5) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <SectionTitle>Education</SectionTitle>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="text-[12px] font-bold leading-snug text-slate-900">{edu.degree}</h3>
                    {edu.fieldOfStudy && <p className="text-[11px]">{edu.fieldOfStudy}</p>}
                    <p className="text-[11px] text-slate-500">{edu.institution}</p>
                    <p className="text-[10.5px] font-semibold text-accent-600">{dateRange(edu.startDate, edu.endDate)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
};

export default SplitTemplate;
