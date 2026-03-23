import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const ChronologicalTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 h-full text-gray-800 font-sans">
      <header className="mb-8 border-b-2 border-gray-800 pb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-900 mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <p className="text-lg text-gray-600 mb-3">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
          {(personalInfo.city || personalInfo.state) && (
            <span>• {[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</span>
          )}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed text-sm">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8 relative auto-rows-min">
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-900 mb-6 bg-white inline-block pr-4 relative z-10 w-full border-b border-gray-300 pb-2">
            Professional History
          </h2>
          <div className="relative pl-4">
            <div className="absolute left-[3px] top-2 bottom-0 w-px bg-gray-300"></div>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="absolute w-2 h-2 rounded-full bg-gray-800 -left-[14px] top-1.5 ring-4 ring-white"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                    <div className="text-sm font-semibold text-gray-600 ml-4">
                      {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="text-gray-700 font-medium mb-2">{exp.company} {exp.location && `— ${exp.location}`}</div>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        <div>
          {education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold uppercase tracking-widest text-gray-900 mb-4 border-b border-gray-300 pb-2">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                    <div className="text-gray-700 font-medium">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                    {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div>
          {skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold uppercase tracking-widest text-gray-900 mb-4 border-b border-gray-300 pb-2">
                Skills & Abilities
              </h2>
              <div className="flex flex-col gap-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-gray-700">{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {projects.length > 0 && (
        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Selected Projects
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-50 p-4 rounded border border-gray-100">
                <h3 className="font-bold text-gray-900">{project.title}</h3>
                {project.link && <a href={project.link} className="text-sm text-gray-500 break-all">{project.link}</a>}
                <p className="text-sm text-gray-600 mt-2 mb-2">{project.description}</p>
                {project.technologies && (
                  <div className="text-xs text-gray-500 italic">[{project.technologies}]</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ChronologicalTemplate;
