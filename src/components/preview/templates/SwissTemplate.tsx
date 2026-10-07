import React, { ReactNode } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { contactEntries, dateRange, joinNonEmpty, toBullets } from '../../../utils/format';

interface SwissSection {
  key: string;
  label: string;
  content: ReactNode;
}

/** International Typographic Style: strict 12-column grid, numbered sections, heavy rules. */
const SwissTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  const contacts = contactEntries(personalInfo);

  const sections: SwissSection[] = [];

  if (personalInfo.summary) {
    sections.push({
      key: 'profile',
      label: 'Profile',
      content: <p className="text-[14px] leading-relaxed text-neutral-800">{personalInfo.summary}</p>,
    });
  }

  if (experience.length > 0) {
    sections.push({
      key: 'experience',
      label: 'Experience',
      content: (
        <div className="space-y-4">
          {experience.map(exp => (
            <article key={exp.id}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[14.5px] font-bold text-neutral-950">{exp.position}</h3>
                <span className="shrink-0 text-[11.5px] font-medium tabular-nums text-neutral-500">
                  {dateRange(exp.startDate, exp.endDate, exp.isCurrentPosition, 'numeric')}
                </span>
              </div>
              <p className="text-[12.5px] font-medium text-accent-600">{joinNonEmpty([exp.company, exp.location], ', ')}</p>
              <ul className="mt-1">
                {toBullets(exp.description).map((line, i) => (
                  <li key={i} className="grid grid-cols-[14px_1fr]">
                    <span className="text-neutral-400">–</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      ),
    });
  }

  if (projects.length > 0) {
    sections.push({
      key: 'projects',
      label: 'Projects',
      content: (
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {projects.map(project => (
            <article key={project.id}>
              <h3 className="text-[13.5px] font-bold text-neutral-950">{project.title}</h3>
              <p>{project.description}</p>
              {project.technologies && <p className="mt-0.5 text-[11px] text-neutral-500">{project.technologies}</p>}
            </article>
          ))}
        </div>
      ),
    });
  }

  if (education.length > 0) {
    sections.push({
      key: 'education',
      label: 'Education',
      content: (
        <div className="space-y-3">
          {education.map(edu => (
            <article key={edu.id} className="flex items-baseline justify-between gap-4">
              <div>
                <h3 className="text-[13.5px] font-bold text-neutral-950">{joinNonEmpty([edu.degree, edu.fieldOfStudy], ', ')}</h3>
                <p>{edu.institution}</p>
                {edu.description && <p className="text-[11.5px] text-neutral-500">{edu.description}</p>}
              </div>
              <span className="shrink-0 text-[11.5px] font-medium tabular-nums text-neutral-500">
                {dateRange(edu.startDate, edu.endDate, false, 'numeric')}
              </span>
            </article>
          ))}
        </div>
      ),
    });
  }

  if (skills.length > 0) {
    sections.push({
      key: 'skills',
      label: 'Skills',
      content: (
        <div className="grid grid-cols-3 gap-x-6 gap-y-1.5">
          {skills.map(skill => (
            <div key={skill.id} className="flex items-center justify-between gap-2 border-b border-neutral-200 pb-1">
              <span className="font-medium text-neutral-900">{skill.name}</span>
              <span className="text-[10.5px] font-bold tabular-nums text-accent-600">{skill.level}/5</span>
            </div>
          ))}
        </div>
      ),
    });
  }

  return (
    <div className="bg-white px-14 py-10 text-[12.5px] leading-relaxed text-neutral-700">
      <header className="grid grid-cols-12 gap-x-6 pb-7">
        <div className="col-span-12 mb-6 h-3 w-16 bg-accent-600" />
        <h1 className="col-span-8 text-[52px] font-black leading-[0.92] tracking-[-0.04em] text-neutral-950">
          {personalInfo.firstName}
          <br />
          {personalInfo.lastName}
        </h1>
        <div className="col-span-4 self-end text-[11.5px] leading-[1.7] text-neutral-600">
          {contacts.map(contact => (
            <div key={contact.key} className="break-all">{contact.value}</div>
          ))}
        </div>
        {personalInfo.title && (
          <p className="col-span-12 mt-4 text-[20px] font-medium tracking-tight text-accent-600">{personalInfo.title}</p>
        )}
      </header>

      {sections.map((section, index) => (
        <section key={section.key} className="grid grid-cols-12 gap-x-6 border-t-2 border-neutral-950 py-4">
          <div className="col-span-3">
            <span className="block text-[11px] font-bold tabular-nums text-accent-600">{String(index + 1).padStart(2, '0')}</span>
            <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950">{section.label}</h2>
          </div>
          <div className="col-span-9">{section.content}</div>
        </section>
      ))}
    </div>
  );
};

export default SwissTemplate;
