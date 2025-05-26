import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const MinimalTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 h-full text-gray-800 font-sans">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-1 tracking-wide">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        
        {personalInfo.title && (
          <p className="text-xl text-gray-500 mb-4">{personalInfo.title}</p>
        )}
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
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
        
        {personalInfo.summary && (
          <p className="text-gray-600 mt-6 leading-relaxed max-w-3xl">
            {personalInfo.summary}
          </p>
        )}
      </header>

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-normal text-gray-900 uppercase tracking-widest mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <div className="text-sm text-gray-500 md:text-right">
                    <div>{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
                    <div>
                      {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-normal text-gray-900 uppercase tracking-widest mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                  <div>
                    <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                    <p className="text-gray-700">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-normal text-gray-900 uppercase tracking-widest mb-4">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="mb-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                  <h3 className="font-medium text-gray-900">{project.title}</h3>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      {project.link}
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                {project.technologies && (
                  <p className="text-sm text-gray-500 mt-1 italic">
                    {project.technologies}
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
          <h2 className="text-lg font-normal text-gray-900 uppercase tracking-widest mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {skills.map((skill) => (
              <span key={skill.id} className="text-gray-700">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;