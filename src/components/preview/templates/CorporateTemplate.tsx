import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const CorporateTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white h-full text-gray-800 font-sans">
      <header className="bg-slate-800 text-white p-8">
        <h1 className="text-4xl font-light tracking-tight mb-2">
          {personalInfo.firstName} <span className="font-bold">{personalInfo.lastName}</span>
        </h1>
        {personalInfo.title && (
          <h2 className="text-lg text-slate-300 font-medium mb-4">{personalInfo.title}</h2>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
          {personalInfo.email && <div className="flex items-center gap-1">{personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-1">{personalInfo.phone}</div>}
          {(personalInfo.city || personalInfo.state) && (
            <div className="flex items-center gap-1">{[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</div>
          )}
          {personalInfo.linkedin && <div className="flex items-center gap-1">{personalInfo.linkedin}</div>}
        </div>
      </header>
      
      <div className="p-8">
        {personalInfo.summary && (
          <p className="text-gray-600 mb-8 leading-relaxed">
            {personalInfo.summary}
          </p>
        )}

        {experience.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-slate-800"></span> Experience
            </h3>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200">
                  <div className="absolute w-3 h-3 bg-slate-800 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-900 text-lg">{exp.position}</h4>
                    <span className="text-sm font-semibold text-slate-600 whitespace-nowrap ml-4 bg-slate-100 px-3 py-1 rounded-full">
                      {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="text-slate-600 font-medium mb-2">{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
                  <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          <div>
            {education.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-px bg-slate-800"></span> Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h4 className="font-bold text-gray-900">{edu.degree}{edu.fieldOfStudy ? ` • ${edu.fieldOfStudy}` : ''}</h4>
                      <div className="text-slate-600 text-sm mb-1">{edu.institution}</div>
                      <div className="text-xs text-slate-500 font-medium">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {skills.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-px bg-slate-800"></span> Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill.id} className="bg-slate-100 text-slate-700 px-3 py-1 text-sm font-medium rounded">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div>
            {projects.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-px bg-slate-800"></span> Projects
                </h3>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <h4 className="font-bold text-gray-900 mb-1">{project.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                      {project.technologies && (
                        <p className="text-xs text-slate-500 font-medium">Tech: {project.technologies}</p>
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

export default CorporateTemplate;
