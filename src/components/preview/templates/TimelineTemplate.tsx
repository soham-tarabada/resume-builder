import React, { ReactNode } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { contactEntries, formatMonthYear, joinNonEmpty, toBullets } from '../../../utils/format';

const SectionTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-slate-400">{children}</h2>
);

interface TimelineEntry {
  id: string;
  start: string;
  end: string;
  title: string;
  subtitle: string;
  body: string[];
}

/** Dates in a left rail, a vertical line, and a ring marker per entry. */
const Timeline: React.FC<{ entries: TimelineEntry[] }> = ({ entries }) => (
  <div className="relative">
    <div className="absolute bottom-2 left-[118px] top-2 w-px bg-accent-200" />
    {entries.map(entry => (
      <div key={entry.id} className="relative grid grid-cols-[104px_1fr] gap-x-7 pb-6 last:pb-0">
        <div className="pt-0.5 text-right text-[11.5px] font-semibold leading-5">
          <div className="text-accent-700">{entry.start}</div>
          {entry.end && <div className="text-slate-400">{entry.end}</div>}
        </div>
        <div className="relative">
          <span className="absolute -left-[20px] top-[5px] h-3 w-3 rounded-full border-[3px] border-accent-600 bg-white" />
          <h3 className="text-[15px] font-bold leading-snug text-slate-900">{entry.title}</h3>
          {entry.subtitle && <p className="text-[12.5px] font-semibold text-slate-500">{entry.subtitle}</p>}
          {entry.body.length > 0 && (
            <ul className="mt-1.5 list-disc space-y-0.5 pl-4 marker:text-accent-400">
              {entry.body.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    ))}
  </div>
);

const TimelineTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  const contacts = contactEntries(personalInfo);

  const workEntries: TimelineEntry[] = experience.map(exp => ({
    id: exp.id,
    start: formatMonthYear(exp.startDate),
    end: exp.isCurrentPosition ? 'Present' : formatMonthYear(exp.endDate),
    title: exp.position,
    subtitle: joinNonEmpty([exp.company, exp.location], ' · '),
    body: toBullets(exp.description),
  }));

  const educationEntries: TimelineEntry[] = education.map(edu => ({
    id: edu.id,
    start: formatMonthYear(edu.startDate),
    end: formatMonthYear(edu.endDate),
    title: joinNonEmpty([edu.degree, edu.fieldOfStudy], ' · '),
    subtitle: edu.institution,
    body: toBullets(edu.description),
  }));

  return (
    <div className="bg-white px-12 py-10 text-[13px] leading-relaxed text-slate-600">
      <header className="flex items-end justify-between gap-8 border-b-2 border-slate-900 pb-6">
        <div>
          <h1 className="text-[40px] font-black leading-none tracking-tight text-slate-900">
            {personalInfo.firstName} <span className="text-accent-600">{personalInfo.lastName}</span>
          </h1>
          {personalInfo.title && <p className="mt-2 text-[17px] font-medium text-slate-500">{personalInfo.title}</p>}
        </div>
        {contacts.length > 0 && (
          <div className="shrink-0 text-right text-[11.5px] leading-[1.7] text-slate-500">
            {contacts.map(contact => (
              <div key={contact.key}>{contact.value}</div>
            ))}
          </div>
        )}
      </header>

      {personalInfo.summary && <p className="mt-6 text-[13.5px]">{personalInfo.summary}</p>}

      {workEntries.length > 0 && (
        <section className="mt-7">
          <SectionTitle>Experience</SectionTitle>
          <Timeline entries={workEntries} />
        </section>
      )}

      {educationEntries.length > 0 && (
        <section className="mt-7">
          <SectionTitle>Education</SectionTitle>
          <Timeline entries={educationEntries} />
        </section>
      )}

      {(projects.length > 0 || skills.length > 0) && (
        <div className="mt-7 grid grid-cols-2 gap-10 border-t border-slate-200 pt-7">
          {projects.length > 0 && (
            <section>
              <SectionTitle>Projects</SectionTitle>
              <div className="space-y-3">
                {projects.map(project => (
                  <div key={project.id}>
                    <h3 className="text-[13.5px] font-bold text-slate-900">{project.title}</h3>
                    <p className="text-[12.5px]">{project.description}</p>
                    {project.technologies && (
                      <p className="mt-0.5 text-[11px] font-semibold text-accent-600">{project.technologies}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          {skills.length > 0 && (
            <section>
              <SectionTitle>Skills</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span
                    key={skill.id}
                    className="rounded-full border border-accent-100 bg-accent-50 px-3 py-1 text-[11.5px] font-semibold text-accent-700"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default TimelineTemplate;
