import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const DeveloperTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 h-full text-gray-800 font-mono text-sm leading-snug">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-1">
          &lt;{personalInfo.firstName} {personalInfo.lastName} /&gt;
        </h1>
        {personalInfo.title && (
          <p className="text-lg text-blue-600 font-bold mb-4">{personalInfo.title}</p>
        )}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          {personalInfo.email && <div>✉ {personalInfo.email}</div>}
          {personalInfo.phone && <div>☎ {personalInfo.phone}</div>}
          {personalInfo.github && <div>gh: {personalInfo.github}</div>}
          {personalInfo.linkedin && <div>in: {personalInfo.linkedin}</div>}
          {personalInfo.website && <div>w: {personalInfo.website}</div>}
          {(personalInfo.city || personalInfo.state) && (
            <div>loc: {[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</div>
          )}
        </div>
        {personalInfo.summary && (
          <p className="mt-4 text-gray-700 bg-gray-50 p-3 rounded border border-gray-200">
            // {personalInfo.summary}
          </p>
        )}
      </header>

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-200">## Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-sm text-xs font-semibold">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-200">## Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <div className="text-blue-600 font-medium">{exp.company}{exp.location ? ` | ${exp.location}` : ''}</div>
                  </div>
                  <div className="text-xs text-gray-500 font-semibold text-right whitespace-nowrap ml-4">
                    [{formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}]
                  </div>
                </div>
                <p className="mt-2 text-gray-700 whitespace-pre-line text-xs">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-200">## Projects</h2>
          <div className="grid grid-cols-1 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="border border-gray-200 p-3 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900">{project.title}</h3>
                  {project.link && (
                    <span className="text-xs text-blue-500 underline">{project.link}</span>
                  )}
                </div>
                <p className="text-xs text-gray-700 mb-2">{project.description}</p>
                {project.technologies && (
                  <div className="text-xs text-gray-500 font-bold">Stack: {project.technologies}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-200">## Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                  <div className="text-xs text-gray-700">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</div>
                  {edu.description && <p className="text-xs text-gray-500 mt-1">{edu.description}</p>}
                </div>
                <div className="text-xs text-gray-500 font-semibold text-right">
                  [{formatDate(edu.startDate)} - {formatDate(edu.endDate)}]
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DeveloperTemplate;
