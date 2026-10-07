import React, { ReactNode } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { contactEntries, dateRange, initials, joinNonEmpty, toBullets } from '../../../utils/format';

const SectionTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="mb-4 flex items-center gap-3 font-sans text-[10.5px] font-semibold uppercase tracking-[0.35em] text-accent-700">
    {children}
    <span className="h-px flex-1 bg-accent-200" />
  </h2>
);

/** Luxury serif layout with a double-ring monogram crest and diamond ornament. */
const MonogramTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  const contacts = contactEntries(personalInfo);
  const monogram = initials(personalInfo.firstName, personalInfo.lastName);

  return (
    <div className="bg-[#fffdf8] px-14 py-10 font-serif text-[13px] leading-relaxed text-stone-700">
      <header className="text-center">
        {monogram && (
          <div className="mx-auto mb-5 flex h-[84px] w-[84px] items-center justify-center rounded-full border-2 border-accent-600 p-[5px]">
            <div className="flex h-full w-full items-center justify-center rounded-full border border-accent-300 text-[26px] tracking-[0.12em] text-accent-700">
              {monogram}
            </div>
          </div>
        )}
        <h1 className="text-[34px] uppercase leading-tight tracking-[0.28em] text-stone-900">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && <p className="mt-2 text-[16px] italic text-accent-700">{personalInfo.title}</p>}
        <div className="my-4 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-20 bg-accent-300" />
          <span className="h-2 w-2 rotate-45 bg-accent-500" />
          <span className="h-px w-20 bg-accent-300" />
        </div>
        {contacts.length > 0 && (
          <p className="font-sans text-[10.5px] uppercase leading-6 tracking-[0.18em] text-stone-500">
            {contacts.map(contact => contact.value).join('   ·   ')}
          </p>
        )}
      </header>

      <div className="mt-8 grid grid-cols-[190px_1fr] gap-10">
        <aside className="space-y-8 border-r border-stone-200 pr-8">
          {skills.length > 0 && (
            <section>
              <SectionTitle>Expertise</SectionTitle>
              <ul className="space-y-1.5">
                {skills.map(skill => (
                  <li key={skill.id} className="flex items-center gap-2">
                    <span className="h-1 w-1 rotate-45 bg-accent-500" />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <SectionTitle>Education</SectionTitle>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-semibold leading-snug text-stone-900">{edu.degree}</h3>
                    {edu.fieldOfStudy && <p className="text-[12px] italic">{edu.fieldOfStudy}</p>}
                    <p className="text-[12px]">{edu.institution}</p>
                    <p className="font-sans text-[10.5px] uppercase tracking-wider text-accent-600">{dateRange(edu.startDate, edu.endDate)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        <main className="space-y-7">
          {personalInfo.summary && (
            <section>
              <SectionTitle>Profile</SectionTitle>
              <p className="text-[14px] italic leading-relaxed text-stone-600">{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-6">
                {experience.map(exp => (
                  <article key={exp.id}>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-[16px] font-semibold text-stone-900">{exp.position}</h3>
                      <span className="shrink-0 font-sans text-[10.5px] uppercase tracking-wider text-accent-600">
                        {dateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                      </span>
                    </div>
                    <p className="italic text-stone-500">{joinNonEmpty([exp.company, exp.location], ', ')}</p>
                    <ul className="mt-2 space-y-1">
                      {toBullets(exp.description).map((line, i) => (
                        <li key={i} className="grid grid-cols-[16px_1fr]">
                          <span className="text-accent-500">◦</span>
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
              <SectionTitle>Selected Work</SectionTitle>
              <div className="space-y-4">
                {projects.map(project => (
                  <article key={project.id}>
                    <h3 className="font-semibold text-stone-900">
                      {project.title}
                      {project.technologies && (
                        <span className="font-sans text-[10.5px] font-normal uppercase tracking-wider text-stone-400"> — {project.technologies}</span>
                      )}
                    </h3>
                    <p>{project.description}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MonogramTemplate;
