import React, { ReactNode } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { dateRange, joinNonEmpty, locationOf, prettyUrl, toBullets } from '../../../utils/format';

const SectionTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="mb-3 border-b border-stone-900 pb-1 font-sans text-[10.5px] font-black uppercase tracking-[0.3em] text-stone-900">
    {children}
  </h2>
);

/** Newspaper masthead, drop-cap lede and a ruled two-column spread. */
const EditorialTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  const summary = personalInfo.summary.trim();
  const links = [personalInfo.linkedin, personalInfo.github, personalInfo.website].filter(Boolean).map(prettyUrl);

  return (
    <div className="bg-[#fbfaf6] px-12 py-10 font-serif text-[13px] leading-relaxed text-stone-800">
      <header>
        <div className="h-[3px] bg-stone-900" />
        <div className="mt-[3px] h-px bg-stone-900" />
        <div className="flex items-center justify-between py-1.5 font-sans text-[9.5px] font-semibold uppercase tracking-[0.25em] text-stone-500">
          <span>{locationOf(personalInfo)}</span>
          <span>Curriculum Vitae</span>
          <span>{personalInfo.phone}</span>
        </div>
        <div className="h-px bg-stone-900" />
        <h1 className="py-4 text-center text-[58px] font-bold leading-none tracking-tight text-stone-950">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="h-px bg-stone-900" />
        <div className="mt-[3px] h-[3px] bg-stone-900" />
        {personalInfo.title && (
          <p className="mt-3 text-center font-sans text-[11.5px] font-bold uppercase tracking-[0.35em] text-accent-700">
            {personalInfo.title}
          </p>
        )}
      </header>

      <div className="mt-7 grid grid-cols-[1fr_1px_210px] gap-7">
        <main className="space-y-6">
          {summary && (
            <p className="text-[14px] leading-relaxed">
              <span className="float-left mr-2 mt-1 text-[54px] font-bold leading-[0.8] text-accent-700">{summary.charAt(0)}</span>
              {summary.slice(1)}
            </p>
          )}

          {experience.length > 0 && (
            <section className="clear-both">
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-5">
                {experience.map(exp => (
                  <article key={exp.id}>
                    <h3 className="text-[18px] font-bold leading-snug text-stone-950">{exp.position}</h3>
                    <p className="font-sans text-[10.5px] font-semibold uppercase tracking-wider text-accent-700">
                      {joinNonEmpty([exp.company, exp.location, dateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)], '  ·  ')}
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {toBullets(exp.description).map((line, i) => (
                        <li key={i} className="grid grid-cols-[18px_1fr]">
                          <span className="text-stone-400">—</span>
                          <span>{line}</span>
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
              <SectionTitle>Featured Projects</SectionTitle>
              <div className="grid grid-cols-2 gap-5">
                {projects.map(project => (
                  <article key={project.id}>
                    <h3 className="text-[15px] font-bold italic text-stone-950">{project.title}</h3>
                    <p className="text-[12.5px]">{project.description}</p>
                    {project.technologies && (
                      <p className="mt-1 font-sans text-[10px] uppercase tracking-wider text-stone-500">{project.technologies}</p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>

        <div className="bg-stone-300" />

        <aside className="space-y-6">
          {(personalInfo.email || links.length > 0) && (
            <section>
              <SectionTitle>Correspondence</SectionTitle>
              <div className="space-y-1 break-all font-sans text-[11px] text-stone-600">
                {personalInfo.email && <div>{personalInfo.email}</div>}
                {links.map(link => (
                  <div key={link}>{link}</div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <SectionTitle>Expertise</SectionTitle>
              <ul className="space-y-1">
                {skills.map(skill => (
                  <li key={skill.id} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-accent-600" />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <SectionTitle>Education</SectionTitle>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-bold leading-snug text-stone-950">{edu.degree}</h3>
                    {edu.fieldOfStudy && <p className="text-[12px] italic">{edu.fieldOfStudy}</p>}
                    <p className="text-[12px]">{edu.institution}</p>
                    <p className="font-sans text-[10px] uppercase tracking-wider text-stone-500">{dateRange(edu.startDate, edu.endDate)}</p>
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

export default EditorialTemplate;
