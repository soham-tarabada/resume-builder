import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import { formatMonthYear, toBullets } from '../../../utils/format';

const StandardTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (value: string) => formatMonthYear(value, 'numeric');

  return (
    <div className="bg-white p-8 h-full text-black font-sans leading-snug">
      <header className="mb-4 text-center">
        <h1 className="text-accent-900 text-2xl font-bold uppercase mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-sm">
          {personalInfo.city && personalInfo.state && `${personalInfo.city}, ${personalInfo.state}`}
          {personalInfo.phone && ` | ${personalInfo.phone}`}
          {personalInfo.email && ` | ${personalInfo.email}`}
          {personalInfo.linkedin && ` | ${personalInfo.linkedin}`}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-4">
          <h2 className="text-accent-900 text-lg font-bold uppercase border-b border-accent-900 mb-2">Professional Summary</h2>
          <p className="text-sm text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-accent-900 text-lg font-bold uppercase border-b border-accent-900 mb-2">Skills</h2>
          <p className="text-sm">
            {skills.map(s => s.name).join(', ')}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-accent-900 text-lg font-bold uppercase border-b border-accent-900 mb-2">Work Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-sm">
                  <span>{exp.position}</span>
                  <span>
                    {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="flex justify-between text-sm italic mb-1">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                <ul className="list-disc list-inside text-sm">
                  {toBullets(exp.description).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-accent-900 text-lg font-bold uppercase border-b border-accent-900 mb-2">Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between font-bold text-sm">
                  <span>{edu.institution}</span>
                  <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                </div>
                <div className="text-sm flex justify-between">
                  <span>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-accent-900 text-lg font-bold uppercase border-b border-accent-900 mb-2">Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="font-bold text-sm">
                  {project.title} {project.link && <span className="font-normal">| {project.link}</span>}
                </div>
                <p className="text-sm mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default StandardTemplate;
