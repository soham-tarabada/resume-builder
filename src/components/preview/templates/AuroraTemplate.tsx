import React, { ReactNode } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { contactEntries, dateRange, joinNonEmpty, toBullets } from '../../../utils/format';

const SectionTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent-700">
    <span className="h-[3px] w-7 rounded-full bg-gradient-to-r from-accent-600 to-accent-300" />
    {children}
  </h2>
);

const AuroraTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  const contacts = contactEntries(personalInfo);

  return (
    <div className="bg-white text-[13px] leading-relaxed text-slate-600">
      <header className="relative overflow-hidden bg-gradient-to-br from-accent-800 via-accent-600 to-accent-400 px-12 pb-8 pt-10 text-white">
        <svg className="absolute -right-20 -top-28" width="380" height="380" viewBox="0 0 380 380" aria-hidden="true">
          <circle cx="190" cy="190" r="190" fill="#ffffff" fillOpacity="0.07" />
          <circle cx="230" cy="150" r="115" fill="#ffffff" fillOpacity="0.08" />
        </svg>
        <svg className="absolute -bottom-24 left-[38%]" width="200" height="200" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="100" fill="#ffffff" fillOpacity="0.06" />
        </svg>
        <div className="relative">
          <h1 className="text-[40px] font-extrabold leading-none tracking-tight">
            {personalInfo.firstName} <span className="font-light">{personalInfo.lastName}</span>
          </h1>
          {personalInfo.title && (
            <p className="mt-3 text-[14px] font-semibold uppercase tracking-[0.28em] text-white/80">{personalInfo.title}</p>
          )}
          {contacts.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {contacts.map(contact => (
                <span key={contact.key} className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11.5px] font-medium">
                  {contact.value}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-[1fr_220px] gap-10 px-12 py-8">
        <main className="space-y-7">
          {personalInfo.summary && (
            <section>
              <SectionTitle>Profile</SectionTitle>
              <p className="text-[13px] text-slate-600">{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-5">
                {experience.map(exp => (
                  <article key={exp.id}>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-[15px] font-bold text-slate-900">{exp.position}</h3>
                      <span className="shrink-0 text-[11.5px] font-semibold text-accent-600">
                        {dateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                      </span>
                    </div>
                    <p className="text-[12.5px] font-medium text-slate-500">{joinNonEmpty([exp.company, exp.location], ' · ')}</p>
                    <ul className="mt-1.5 space-y-0.5">
                      {toBullets(exp.description).map((line, i) => (
                        <li key={i} className="relative pl-4">
                          <span className="absolute left-0 top-[0.62em] h-1.5 w-1.5 rounded-full bg-accent-500" />
                          {line}
                        </li>
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
              <div className="space-y-4">
                {projects.map(project => (
                  <article key={project.id}>
                    <h3 className="text-[14px] font-bold text-slate-900">{project.title}</h3>
                    <p>{project.description}</p>
                    {project.technologies && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {project.technologies.split(',').map(tech => tech.trim()).filter(Boolean).map(tech => (
                          <span key={tech} className="rounded-md bg-accent-50 px-2 py-0.5 text-[10.5px] font-semibold text-accent-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className="space-y-7">
          {skills.length > 0 && (
            <section>
              <SectionTitle>Skills</SectionTitle>
              <div className="space-y-3">
                {skills.map(skill => (
                  <div key={skill.id}>
                    <div className="text-[12px] font-semibold text-slate-700">{skill.name}</div>
                    <div className="mt-1 h-1.5 rounded-full bg-accent-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-600 to-accent-400"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <SectionTitle>Education</SectionTitle>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="text-[13px] font-bold leading-snug text-slate-900">{edu.degree}</h3>
                    {edu.fieldOfStudy && <p className="text-[12px] text-slate-500">{edu.fieldOfStudy}</p>}
                    <p className="text-[12px] font-medium text-slate-600">{edu.institution}</p>
                    <p className="text-[11px] font-semibold text-accent-600">{dateRange(edu.startDate, edu.endDate)}</p>
                    {edu.description && <p className="mt-1 text-[11.5px] text-slate-500">{edu.description}</p>}
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

export default AuroraTemplate;
