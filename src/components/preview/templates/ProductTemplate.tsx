import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const ProductTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-slate-50 p-8 h-full text-slate-800 font-sans">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
        {/* Header Ribbon */}
        <div className="h-3 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
        
        <div className="p-8 flex-grow flex flex-col">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              {personalInfo.title && (
                <p className="text-lg font-medium text-violet-600 mt-1">{personalInfo.title}</p>
              )}
            </div>
            <div className="flex flex-col items-end text-sm font-medium text-slate-500 gap-1">
              {personalInfo.email && <div className="hover:text-violet-600">{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.linkedin && <div className="text-violet-600 font-semibold">{personalInfo.linkedin}</div>}
              {(personalInfo.city || personalInfo.state) && (
                <div>{[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</div>
              )}
            </div>
          </header>

          <div className="grid grid-cols-12 gap-8 flex-grow">
            {/* Left Column */}
            <div className="col-span-4 flex flex-col gap-8">
              {personalInfo.summary && (
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">About</h2>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {personalInfo.summary}
                  </p>
                </section>
              )}

              {skills.length > 0 && (
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Skills</h2>
                  <div className="flex flex-col gap-2">
                    {skills.map((skill) => (
                      <div key={skill.id} className="bg-slate-100 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700">
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {education.length > 0 && (
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Education</h2>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id}>
                        <div className="font-bold text-slate-800 text-sm">{edu.degree}</div>
                        <div className="text-xs font-medium text-slate-500 mt-1">{edu.institution}</div>
                        <div className="text-xs font-semibold text-violet-500 mt-1">
                          {new Date(edu.endDate).getFullYear() || ''}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column */}
            <div className="col-span-8 flex flex-col gap-8">
              {experience.length > 0 && (
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Experience</h2>
                  <div className="space-y-6">
                    {experience.map((exp) => (
                      <div key={exp.id} className="group">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-lg text-slate-900 group-hover:text-violet-600 transition-colors">{exp.position}</h3>
                          <div className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                            {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-slate-600 mb-2">{exp.company}</div>
                        <p className="text-sm text-slate-500 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {projects.length > 0 && (
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Features & Projects</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {projects.map((project) => (
                      <div key={project.id} className="border border-slate-200 rounded-xl p-4 hover:border-violet-300 transition-colors">
                        <h3 className="font-bold text-slate-800 mb-1">{project.title}</h3>
                        <p className="text-xs text-slate-500 mb-3">{project.description}</p>
                        {project.technologies && (
                          <div className="text-xs font-medium text-violet-600 bg-violet-50 inline-block px-2 py-1 rounded-md">
                            {project.technologies}
                          </div>
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
    </div>
  );
};

export default ProductTemplate;
