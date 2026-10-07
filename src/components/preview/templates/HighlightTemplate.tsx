import React, { ReactNode } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { contactEntries, dateRange, joinNonEmpty, toBullets } from '../../../utils/format';

/** A highlighter stroke behind text (a plain gradient, so it survives PDF export). */
const Marker: React.FC<{ children: ReactNode }> = ({ children }) => (
  <span
    className="-mx-1 px-1"
    style={{ backgroundImage: 'linear-gradient(transparent 55%, rgb(var(--accent-200)) 55%, rgb(var(--accent-200)) 92%, transparent 92%)' }}
  >
    {children}
  </span>
);

const SectionTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="mb-3 text-[18px] font-extrabold tracking-tight text-slate-900">
    <Marker>{children}</Marker>
  </h2>
);

/** Playful but professional: marker-highlighted headings and confident type. */
const HighlightTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  const contacts = contactEntries(personalInfo);

  return (
    <div className="bg-white px-12 py-10 text-[13px] leading-relaxed text-slate-600">
      <header>
        <h1 className="text-[46px] font-black leading-tight tracking-tight text-slate-900">
          <Marker>
            {personalInfo.firstName} {personalInfo.lastName}
          </Marker>
        </h1>
        {personalInfo.title && <p className="mt-2 text-[18px] font-semibold text-slate-700">{personalInfo.title}</p>}
        {contacts.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-slate-500">
            {contacts.map(contact => (
              <span key={contact.key} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-sm bg-accent-500" />
                {contact.value}
              </span>
            ))}
          </div>
        )}
      </header>

      {personalInfo.summary && (
        <p className="mt-6 border-l-4 border-accent-300 pl-4 text-[14px] italic text-slate-600">{personalInfo.summary}</p>
      )}

      {experience.length > 0 && (
        <section className="mt-7">
          <SectionTitle>Where I’ve made an impact</SectionTitle>
          <div className="space-y-5">
            {experience.map(exp => (
              <article key={exp.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[15px] font-bold text-slate-900">
                    {exp.position}
                    {exp.company && <span className="font-medium text-slate-500"> at {exp.company}</span>}
                  </h3>
                  <span className="shrink-0 text-[11.5px] font-bold text-accent-700">
                    {dateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                  </span>
                </div>
                {exp.location && <p className="text-[11.5px] text-slate-400">{exp.location}</p>}
                <ul className="mt-1.5 space-y-1">
                  {toBullets(exp.description).map((line, i) => (
                    <li key={i} className="grid grid-cols-[18px_1fr]">
                      <span className="font-bold text-accent-500">→</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-7">
          <SectionTitle>What I bring</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span
                key={skill.id}
                className={`rounded-md border-2 border-slate-900 px-2.5 py-0.5 text-[11.5px] font-bold text-slate-900 ${
                  skill.level >= 4 ? 'bg-accent-200' : 'bg-white'
                }`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {(projects.length > 0 || education.length > 0) && (
        <div className="mt-7 grid grid-cols-2 gap-10">
          {projects.length > 0 && (
            <section>
              <SectionTitle>Things I’ve built</SectionTitle>
              <div className="space-y-3">
                {projects.map(project => (
                  <div key={project.id}>
                    <h3 className="font-bold text-slate-900">{project.title}</h3>
                    <p className="text-[12.5px]">{project.description}</p>
                    {project.technologies && <p className="text-[11px] font-semibold text-accent-700">{project.technologies}</p>}
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
                    <h3 className="font-bold text-slate-900">{joinNonEmpty([edu.degree, edu.fieldOfStudy], ', ')}</h3>
                    <p className="text-[12.5px]">{edu.institution}</p>
                    <p className="text-[11px] font-semibold text-accent-700">{dateRange(edu.startDate, edu.endDate)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default HighlightTemplate;
