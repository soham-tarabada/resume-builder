import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const ManagerTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 h-full text-neutral-800 font-sans text-[13px] leading-tight flex flex-col">
      <header className="mb-4 text-center border-b-[3px] border-neutral-800 pb-4">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-neutral-900 mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <h2 className="text-base font-semibold text-neutral-600 uppercase tracking-widest mb-3">{personalInfo.title}</h2>
        )}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-neutral-600 font-medium">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {(personalInfo.city || personalInfo.state) && (
            <span>| {[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</span>
          )}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
        </div>
      </header>

      <div className="flex-grow flex flex-col gap-4">
        {personalInfo.summary && (
          <section>
            <h3 className="font-bold text-sm uppercase text-neutral-900 border-b border-neutral-300 mb-2">Profile</h3>
            <p className="text-justify">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h3 className="font-bold text-sm uppercase text-neutral-900 border-b border-neutral-300 mb-2">Experience Overview</h3>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-end mb-1">
                    <h4 className="font-bold text-neutral-900 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                      {exp.position} — <span className="font-semibold text-neutral-700">{exp.company}</span>
                    </h4>
                    <span className="font-semibold text-neutral-500 whitespace-nowrap ml-2">
                      {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <ul className="list-disc list-outside ml-4 mt-1 text-justify">
                    {exp.description.split('\n').filter(line => line.trim()).slice(0, 4).map((line, i) => (
                      <li key={i}>{line.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6 mt-auto">
          {education.length > 0 && (
            <section>
              <h3 className="font-bold text-sm uppercase text-neutral-900 border-b border-neutral-300 mb-2">Education</h3>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-neutral-800">{edu.degree}</div>
                    <div className="text-neutral-600">{edu.institution}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h3 className="font-bold text-sm uppercase text-neutral-900 border-b border-neutral-300 mb-2">Core Competencies</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1 font-medium text-neutral-700">
                {skills.map((skill) => (
                  <span key={skill.id}>✓ {skill.name}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerTemplate;
