import React, { ReactNode } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { dateRange, joinNonEmpty, locationOf, prettyUrl, toBullets } from '../../../utils/format';

const Section: React.FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
  <section className="mt-5">
    <h2 className="border-b border-accent-900 pb-0.5 text-[13px] font-bold uppercase tracking-[0.12em] text-accent-900">{title}</h2>
    <div className="mt-2 space-y-3">{children}</div>
  </section>
);

const Entry: React.FC<{
  heading: string;
  headingRight?: string;
  subheading?: string;
  subheadingRight?: string;
  bullets?: string[];
}> = ({ heading, headingRight, subheading, subheadingRight, bullets = [] }) => (
  <div>
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-bold">{heading}</span>
      {headingRight && <span className="shrink-0">{headingRight}</span>}
    </div>
    {(subheading || subheadingRight) && (
      <div className="flex items-baseline justify-between gap-4">
        <span className="italic">{subheading}</span>
        {subheadingRight && <span className="shrink-0 italic">{subheadingRight}</span>}
      </div>
    )}
    {bullets.length > 0 && (
      <ul className="ml-5 mt-0.5 list-disc">
        {bullets.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    )}
  </div>
);

/** The classic university career-office format: serif, education first, ATS-safe. */
const IvyTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  const links = [personalInfo.linkedin, personalInfo.github, personalInfo.website].filter(Boolean).map(prettyUrl);

  return (
    <div className="bg-white px-14 py-12 font-serif text-[13px] leading-snug text-black">
      <header className="text-center">
        <h1 className="text-[26px] font-bold tracking-wide text-accent-900">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && <p className="text-[13px] italic">{personalInfo.title}</p>}
        <p className="mt-1 text-[12.5px]">{joinNonEmpty([locationOf(personalInfo), personalInfo.phone, personalInfo.email], ' • ')}</p>
        {links.length > 0 && <p className="text-[12.5px]">{links.join(' • ')}</p>}
      </header>

      {personalInfo.summary && (
        <Section title="Summary">
          <p>{personalInfo.summary}</p>
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map(edu => (
            <Entry
              key={edu.id}
              heading={edu.institution}
              subheading={joinNonEmpty([edu.degree, edu.fieldOfStudy], ', ')}
              subheadingRight={dateRange(edu.startDate, edu.endDate, false, 'long')}
              bullets={toBullets(edu.description)}
            />
          ))}
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map(exp => (
            <Entry
              key={exp.id}
              heading={exp.company}
              headingRight={exp.location}
              subheading={exp.position}
              subheadingRight={dateRange(exp.startDate, exp.endDate, exp.isCurrentPosition, 'long')}
              bullets={toBullets(exp.description)}
            />
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Leadership & Projects">
          {projects.map(project => (
            <Entry
              key={project.id}
              heading={project.title}
              subheading={project.technologies}
              bullets={toBullets(project.description)}
            />
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <p>
            <span className="font-bold">Technical & Professional: </span>
            {skills.map(skill => skill.name).join(', ')}
          </p>
        </Section>
      )}
    </div>
  );
};

export default IvyTemplate;
