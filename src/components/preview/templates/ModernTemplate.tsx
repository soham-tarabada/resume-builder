import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Linkedin, Github, Globe, Mail, Phone, MapPin } from 'lucide-react';

const ModernTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 h-full text-gray-800 leading-relaxed">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl text-blue-600 mb-4">{personalInfo.title}</p>
        
        {personalInfo.summary && (
          <p className="text-gray-600 mb-4 leading-relaxed">
            {personalInfo.summary}
          </p>
        )}
        
        <div className="flex flex-wrap gap-3">
          {personalInfo.email && (
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-4 w-4 mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {(personalInfo.city || personalInfo.state || personalInfo.country) && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {[personalInfo.city, personalInfo.state, personalInfo.country]
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center text-sm text-gray-600">
              <Linkedin className="h-4 w-4 mr-1" />
              <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
            </div>
          )}
          
          {personalInfo.github && (
            <div className="flex items-center text-sm text-gray-600">
              <Github className="h-4 w-4 mr-1" />
              <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center text-sm text-gray-600">
              <Globe className="h-4 w-4 mr-1" />
              <span>{personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Experience Section */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium text-blue-600">{exp.position}</h3>
                      <span className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-800 font-medium">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium text-blue-600">{project.title}</h3>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{project.description}</p>
                    {project.technologies && (
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Technologies:</span> {project.technologies}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          {/* Education Section */}
          {education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium text-blue-600">{edu.institution}</h3>
                      <span className="text-sm text-gray-500">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-800">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</p>
                    {edu.description && (
                      <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div 
                    key={skill.id} 
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill.name}
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

export default ModernTemplate;