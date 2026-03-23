import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const BoldTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 h-full text-gray-900 font-sans">
      <header className="mb-6 bg-gray-900 text-white p-6 inset-x-0">
        <h1 className="text-5xl font-black uppercase tracking-tight mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <h2 className="text-2xl font-bold text-gray-400 mb-4">{personalInfo.title}</h2>
        )}
        <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-300">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {(personalInfo.city || personalInfo.state) && (
            <span>{[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</span>
          )}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-6">
          <h3 className="text-2xl font-black uppercase mb-2 border-b-4 border-gray-900 pb-1">Overview</h3>
          <p className="text-base font-semibold leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-gray-900 pb-1">Experience</h3>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-xl font-black">{exp.company}</h4>
                  <span className="text-sm font-black bg-gray-900 text-white px-2 py-1">
                    {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-600 mb-2">{exp.position}{exp.location && ` | ${exp.location}`}</div>
                <p className="text-sm font-semibold leading-relaxed whitespace-pre-line text-justify">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-gray-900 pb-1">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="bg-gray-200 text-gray-900 text-sm font-black px-3 py-1 uppercase">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-gray-900 pb-1">Projects</h3>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h4 className="text-lg font-black">{project.title}</h4>
                <p className="text-sm font-semibold my-1 text-justify">{project.description}</p>
                {project.technologies && (
                  <p className="text-xs font-black text-gray-500 uppercase">TECH: {project.technologies}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-gray-900 pb-1">Education</h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-lg font-black">{edu.institution}</h4>
                  <span className="text-sm font-bold text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="text-base font-bold text-gray-700">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BoldTemplate;
