import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const ClassicTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 h-full text-gray-800 font-serif">
      {/* Header */}
      <header className="text-center mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wider mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <p className="text-xl text-gray-600 mb-3">{personalInfo.title}</p>
        )}
        
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-sm">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {(personalInfo.city || personalInfo.state || personalInfo.country) && (
            <span>
              {[personalInfo.city, personalInfo.state, personalInfo.country]
                .filter(Boolean)
                .join(', ')}
            </span>
          )}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-gray-800">{exp.position}</h3>
                  <span className="text-sm">
                    {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-800 italic mb-2">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                <p className="text-sm text-gray-700 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                  <span className="text-sm">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-gray-800 italic mb-2">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</p>
                {edu.description && (
                  <p className="text-sm text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-gray-800">{project.title}</h3>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:underline"
                    >
                      {project.link}
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                {project.technologies && (
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Technologies:</span> {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap">
            {skills.map((skill) => (
              <span 
                key={skill.id} 
                className="mr-2 mb-2 py-1 px-2 border border-gray-300 rounded text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;