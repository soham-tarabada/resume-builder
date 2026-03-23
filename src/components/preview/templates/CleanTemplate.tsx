import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const CleanTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-10 h-full text-zinc-800 font-sans tracking-wide">
      <header className="mb-10 pb-6 border-b border-zinc-200">
        <h1 className="text-4xl font-light text-zinc-900 mb-1 tracking-tight">
          {personalInfo.firstName} <span className="font-semibold">{personalInfo.lastName}</span>
        </h1>
        {personalInfo.title && (
          <p className="text-lg text-zinc-500 font-medium mb-4">{personalInfo.title}</p>
        )}
        <div className="flex flex-col gap-1 text-sm text-zinc-500">
          <div className="flex gap-4">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {(personalInfo.city || personalInfo.state) && (
              <span>{[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</span>
            )}
          </div>
          <div className="flex gap-4">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Profile</h2>
          <p className="text-zinc-700 leading-relaxed text-sm">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-4 gap-4">
                <div className="col-span-1 text-sm text-zinc-500 font-medium pt-1">
                  {formatDate(exp.startDate)}<br/>
                  -<br/>
                  {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                </div>
                <div className="col-span-3">
                  <h3 className="text-lg font-semibold text-zinc-900">{exp.position}</h3>
                  <div className="text-zinc-600 font-medium mb-2">{exp.company}</div>
                  <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Education</h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-4 gap-4">
                <div className="col-span-1 text-sm text-zinc-500 font-medium pt-1">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
                <div className="col-span-3">
                  <h3 className="text-lg font-semibold text-zinc-900">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</h3>
                  <div className="text-zinc-600 mb-1">{edu.institution}</div>
                  {edu.description && <p className="text-sm text-zinc-700">{edu.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-semibold text-zinc-900">{project.title}</h3>
                  <p className="text-sm text-zinc-700 my-1">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Skills</h2>
            <ul className="list-disc list-inside text-sm text-zinc-700 space-y-1">
              {skills.map((skill) => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default CleanTemplate;
