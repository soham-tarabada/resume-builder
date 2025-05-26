import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const CreativeTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white h-full text-gray-800 font-sans">
      {/* Left sidebar */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-teal-600 text-white p-6">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-32 h-32 rounded-full bg-teal-400 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold">
                {personalInfo.firstName?.[0]}{personalInfo.lastName?.[0]}
              </span>
            </div>
            <h1 className="text-2xl font-bold">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.title && (
              <p className="text-teal-100 mt-1">{personalInfo.title}</p>
            )}
          </div>

          <div className="space-y-6">
            {/* Contact Section */}
            <section>
              <h2 className="text-lg font-bold border-b border-teal-400 pb-2 mb-3">
                Contact
              </h2>
              <div className="space-y-2 text-sm">
                {personalInfo.email && <p>Email: {personalInfo.email}</p>}
                {personalInfo.phone && <p>Phone: {personalInfo.phone}</p>}
                {(personalInfo.city || personalInfo.state || personalInfo.country) && (
                  <p>
                    Location: {[personalInfo.city, personalInfo.state, personalInfo.country]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                )}
                {personalInfo.linkedin && <p>LinkedIn: {personalInfo.linkedin}</p>}
                {personalInfo.github && <p>GitHub: {personalInfo.github}</p>}
                {personalInfo.website && <p>Website: {personalInfo.website}</p>}
              </div>
            </section>

            {/* Skills Section */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-lg font-bold border-b border-teal-400 pb-2 mb-3">
                  Skills
                </h2>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span>{skill.level}/5</span>
                      </div>
                      <div className="w-full bg-teal-700 rounded-full h-1.5">
                        <div 
                          className="bg-white h-1.5 rounded-full" 
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <section>
                <h2 className="text-lg font-bold border-b border-teal-400 pb-2 mb-3">
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-3">
                      <h3 className="font-bold">{edu.institution}</h3>
                      <p className="text-teal-100 text-sm">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</p>
                      <p className="text-xs opacity-80">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-2/3 p-6">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-teal-600 border-b-2 border-teal-600 pb-2 mb-3">
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience Section */}
          {experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-teal-600 border-b-2 border-teal-600 pb-2 mb-3">
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-4 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:bg-teal-500 before:rounded-full before:z-10 after:content-[''] after:absolute after:left-1.5 after:top-4 after:bottom-0 after:w-0.5 after:bg-teal-200 after:z-0">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1">
                      <h3 className="font-bold text-gray-800 text-lg">{exp.position}</h3>
                      <span className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-teal-600 font-medium mb-2">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-teal-600 border-b-2 border-teal-600 pb-2 mb-3">
                Projects
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="mb-4 bg-gray-50 p-4 rounded-lg border-l-4 border-teal-500">
                    <h3 className="font-bold text-gray-800 text-lg mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                    {project.technologies && (
                      <p className="text-sm text-gray-500 mb-2">
                        <span className="font-medium text-teal-600">Technologies:</span> {project.technologies}
                      </p>
                    )}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-teal-600 hover:underline"
                      >
                        View Project →
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
  );
};

export default CreativeTemplate;