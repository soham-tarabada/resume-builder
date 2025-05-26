import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const ProfessionalTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white h-full text-gray-800 font-sans">
      {/* Header with colored background */}
      <header className="bg-blue-700 text-white p-8 mb-6">
        <h1 className="text-3xl font-bold mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <p className="text-xl text-blue-100 mb-4">{personalInfo.title}</p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-100">
          {personalInfo.email && <div>Email: {personalInfo.email}</div>}
          {personalInfo.phone && <div>Phone: {personalInfo.phone}</div>}
          {(personalInfo.city || personalInfo.state || personalInfo.country) && (
            <div>
              Location: {[personalInfo.city, personalInfo.state, personalInfo.country]
                .filter(Boolean)
                .join(', ')}
            </div>
          )}
          {personalInfo.linkedin && <div>LinkedIn: {personalInfo.linkedin}</div>}
          {personalInfo.github && <div>GitHub: {personalInfo.github}</div>}
          {personalInfo.website && <div>Website: {personalInfo.website}</div>}
        </div>
      </header>

      <div className="px-8 pb-8">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-700 mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-700 mb-3">
              Professional Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                    <h3 className="font-bold text-gray-800 text-lg">{exp.position}</h3>
                    <span className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 font-semibold mb-2">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education Section */}
          <div>
            {education.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold text-blue-700 mb-3">
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-4">
                      <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                      <p className="text-gray-600 mb-1">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</p>
                      <p className="text-sm text-gray-500 mb-1">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                      {edu.description && (
                        <p className="text-sm text-gray-600">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills Section */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-blue-700 mb-3">
                  Skills
                </h2>
                <div className="grid grid-cols-2 gap-1">
                  {skills.map((skill) => (
                    <div key={skill.id} className="mb-2 flex items-center">
                      <span className="text-gray-800">{skill.name}</span>
                      <div className="ml-2 flex">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full mx-0.5 ${
                              i < skill.level ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Projects Section */}
          <div>
            {projects.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-blue-700 mb-3">
                  Projects
                </h2>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="mb-4">
                      <h3 className="font-bold text-gray-800">{project.title}</h3>
                      <p className="text-sm text-gray-600 mb-1">{project.description}</p>
                      {project.technologies && (
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-semibold">Technologies:</span> {project.technologies}
                        </p>
                      )}
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;