import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const DesignerTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-[#f0f0f0] p-10 h-full text-zinc-900 font-sans">
      <header className="mb-12">
        <h1 className="text-6xl font-black tracking-tighter uppercase mb-2 leading-none">
          {personalInfo.firstName}
          <br />
          <span className="text-zinc-500">{personalInfo.lastName}</span>
        </h1>
        {personalInfo.title && (
          <p className="text-xl font-bold uppercase tracking-widest mt-4 text-zinc-800 border-l-4 border-zinc-900 pl-4">{personalInfo.title}</p>
        )}
      </header>

      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-1 space-y-10">
          <section>
            <h2 className="text-sm font-black uppercase tracking-widest mb-4 border-b-2 border-zinc-900 pb-1">Contact</h2>
            <div className="space-y-3 text-sm font-medium text-zinc-600">
              {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.linkedin && <div className="break-all">{personalInfo.linkedin}</div>}
              {personalInfo.website && <div className="break-all">{personalInfo.website}</div>}
              {(personalInfo.city || personalInfo.state) && (
                <div>{[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</div>
              )}
            </div>
          </section>

          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest mb-4 border-b-2 border-zinc-900 pb-1">Skills</h2>
              <div className="flex flex-col gap-2 text-sm font-bold text-zinc-800">
                {skills.map((skill) => (
                  <div key={skill.id}>{skill.name}</div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest mb-4 border-b-2 border-zinc-900 pb-1">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-zinc-900 leading-tight">{edu.degree}</div>
                    <div className="text-sm font-medium text-zinc-600 mt-1">{edu.institution}</div>
                    <div className="text-xs font-black text-zinc-400 mt-2">
                      {new Date(edu.endDate).getFullYear() || ''}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-2 space-y-10">
          {personalInfo.summary && (
            <section>
              <p className="text-lg font-medium text-zinc-700 leading-relaxed text-justify">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest mb-6 border-b-2 border-zinc-900 pb-1">Experience</h2>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-black text-xl text-zinc-900">{exp.position}</h3>
                      <div className="text-xs font-black uppercase tracking-widest text-zinc-500">
                        {formatDate(exp.startDate)} — {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-zinc-600 mb-3 uppercase tracking-wider">{exp.company}</div>
                    <p className="text-sm text-zinc-700 leading-relaxed font-medium text-justify">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest mb-6 border-b-2 border-zinc-900 pb-1">Projects</h2>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-black text-zinc-900 mb-1">{project.title}</h3>
                    <p className="text-sm font-medium text-zinc-700 leading-relaxed mt-2 text-justify">{project.description}</p>
                    {project.technologies && (
                      <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mt-2">
                        {project.technologies}
                      </p>
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

export default DesignerTemplate;
