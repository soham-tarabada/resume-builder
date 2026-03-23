import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const ExecutiveTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 h-full text-gray-900 font-serif">
      <header className="mb-6 border-b-2 border-gray-900 pb-4 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <h2 className="text-xl font-medium text-gray-700 uppercase tracking-widest mb-3">{personalInfo.title}</h2>
        )}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {(personalInfo.city || personalInfo.state) && (
            <span>• {[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</span>
          )}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
        {personalInfo.summary && (
          <p className="mt-4 text-justify leading-relaxed text-sm">
            {personalInfo.summary}
          </p>
        )}
      </header>

      {experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Professional Experience</h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900">{exp.position}</h4>
                  <span className="text-sm font-medium">
                    {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <div className="italic text-gray-700">{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
                </div>
                <p className="text-sm text-gray-700 text-justify whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Education</h3>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900">{edu.institution}</h4>
                  <span className="text-sm font-medium">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="italic text-gray-700">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</div>
                {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Key Projects</h3>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900">{project.title}</h4>
                  {project.link && (
                    <span className="text-sm text-gray-600">{project.link}</span>
                  )}
                </div>
                <p className="text-sm text-gray-700 text-justify mb-1">{project.description}</p>
                {project.technologies && (
                  <p className="text-sm text-gray-600 italic">Technologies: {project.technologies}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Core Competencies</h3>
          <div className="text-sm leading-relaxed text-gray-800">
            {skills.map((skill) => skill.name).join(' • ')}
          </div>
        </section>
      )}
    </div>
  );
};

export default ExecutiveTemplate;
