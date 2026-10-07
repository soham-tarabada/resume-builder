import React, { ReactNode } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { dateRange, joinNonEmpty, locationOf, prettyUrl, toBullets } from '../../../utils/format';

const Section: React.FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
  <section className="mt-4">
    <h2 className="mb-1.5 border-b border-slate-300 pb-0.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-accent-700">
      {title}
    </h2>
    {children}
  </section>
);

/** Dense, single-column, ATS-first layout that fits a long career on one page. */
const CompactTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  const links = [personalInfo.linkedin, personalInfo.github, personalInfo.website].filter(Boolean).map(prettyUrl);

  return (
    <div className="bg-white px-11 py-9 text-[12px] leading-[1.45] text-slate-800">
      <header className="flex items-end justify-between gap-6 border-b-2 border-accent-600 pb-3">
        <div>
          <h1 className="text-[26px] font-bold leading-tight text-slate-950">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && <p className="text-[13px] font-semibold text-accent-700">{personalInfo.title}</p>}
        </div>
        <div className="shrink-0 text-right text-[11px] leading-[1.6] text-slate-600">
          <div>{joinNonEmpty([personalInfo.email, personalInfo.phone], '  |  ')}</div>
          {locationOf(personalInfo) && <div>{locationOf(personalInfo)}</div>}
          {links.length > 0 && <div>{links.join('  |  ')}</div>}
        </div>
      </header>

      {personalInfo.summary && (
        <Section title="Summary">
          <p>{personalInfo.summary}</p>
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <p>{skills.map(skill => skill.name).join(' · ')}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          <div className="space-y-2.5">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <span>
                    <span className="font-bold text-slate-950">{exp.position}</span>
                    {exp.company && <span>, {exp.company}</span>}
                    {exp.location && <span className="text-slate-500"> — {exp.location}</span>}
                  </span>
                  <span className="shrink-0 tabular-nums text-slate-600">
                    {dateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
                  </span>
                </div>
                <ul className="ml-4 list-disc">
                  {toBullets(exp.description).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          <div className="space-y-1.5">
            {projects.map(project => (
              <div key={project.id}>
                <span className="font-bold text-slate-950">{project.title}</span>
                {project.technologies && <span className="text-slate-500"> ({project.technologies})</span>}
                {project.description && <span>: {project.description}</span>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          <div className="space-y-1.5">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <span>
                    <span className="font-bold text-slate-950">{joinNonEmpty([edu.degree, edu.fieldOfStudy], ', ')}</span>
                    {edu.institution && <span>, {edu.institution}</span>}
                  </span>
                  <span className="shrink-0 tabular-nums text-slate-600">{dateRange(edu.startDate, edu.endDate)}</span>
                </div>
                {edu.description && <p className="text-slate-600">{edu.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};

export default CompactTemplate;
