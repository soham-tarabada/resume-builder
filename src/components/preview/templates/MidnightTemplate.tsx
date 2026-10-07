import React, { ReactNode } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { contactEntries, dateRange, initials, joinNonEmpty, toBullets } from '../../../utils/format';

const SideTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.3em] text-accent-300">{children}</h2>
);

const MainTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.2em] text-slate-900">
    {children}
    <span className="mt-2 block h-1 w-10 rounded-full bg-accent-500" />
  </h2>
);

const MidnightTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  const contacts = contactEntries(personalInfo);
  const monogram = initials(personalInfo.firstName, personalInfo.lastName);

  return (
    <div className="flex bg-white text-[12.5px] leading-relaxed text-slate-600">
      <aside className="w-[264px] shrink-0 space-y-8 bg-slate-900 px-8 py-10 text-slate-300">
        <div>
          {monogram && (
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-300 to-accent-600 text-xl font-black text-slate-950">
              {monogram}
            </div>
          )}
          <h1 className="text-[28px] font-extrabold leading-[1.1] text-white">
            {personalInfo.firstName}
            <br />
            {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <p className="mt-2 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-accent-300">{personalInfo.title}</p>
          )}
        </div>

        {contacts.length > 0 && (
          <section>
            <SideTitle>Contact</SideTitle>
            <div className="space-y-2.5">
              {contacts.map(contact => (
                <div key={contact.key}>
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-slate-500">{contact.label}</div>
                  <div className="break-all text-[11.5px] text-slate-200">{contact.value}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <SideTitle>Skills</SideTitle>
            <div className="space-y-2.5">
              {skills.map(skill => (
                <div key={skill.id}>
                  <div className="text-[11.5px] font-medium text-slate-100">{skill.name}</div>
                  <div className="mt-1 flex gap-1">
                    {[1, 2, 3, 4, 5].map(step => (
                      <span key={step} className={`h-1.5 flex-1 rounded-full ${step <= skill.level ? 'bg-accent-400' : 'bg-slate-700'}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <SideTitle>Education</SideTitle>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="text-[12px] font-semibold leading-snug text-white">{edu.degree}</div>
                  {edu.fieldOfStudy && <div className="text-[11px] text-slate-400">{edu.fieldOfStudy}</div>}
                  <div className="text-[11px] text-slate-300">{edu.institution}</div>
                  <div className="text-[10.5px] text-accent-300">{dateRange(edu.startDate, edu.endDate)}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      <main className="flex-1 space-y-8 px-10 py-10">
        {personalInfo.summary && (
          <section>
            <MainTitle>Profile</MainTitle>
            <p className="text-[13px]">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <MainTitle>Experience</MainTitle>
            <div className="space-y-6">
              {experience.map(exp => (
                <article key={exp.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[14.5px] font-bold text-slate-900">{exp.position}</h3>
                      <p className="text-[12.5px] font-semibold text-accent-600">{joinNonEmpty([exp.company, exp.location], ' · ')}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10.5px] font-semibold text-slate-600">
                      {dateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                    </span>
                  </div>
                  <ul className="mt-2 list-disc space-y-0.5 pl-4 marker:text-accent-500">
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
            <MainTitle>Projects</MainTitle>
            <div className="grid grid-cols-2 gap-4">
              {projects.map(project => (
                <article key={project.id} className="rounded-xl border border-slate-200 p-4">
                  <h3 className="text-[13px] font-bold text-slate-900">{project.title}</h3>
                  <p className="mt-1 text-[12px]">{project.description}</p>
                  {project.technologies && (
                    <p className="mt-2 text-[10.5px] font-semibold uppercase tracking-wide text-accent-600">{project.technologies}</p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default MidnightTemplate;
