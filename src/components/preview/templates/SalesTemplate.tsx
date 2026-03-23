import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const SalesTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white h-full text-slate-900 font-sans p-8 flex flex-col gap-6">
      <header className="border-b-4 border-amber-500 pb-4">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <h2 className="text-xl font-extrabold text-amber-600 uppercase tracking-widest mb-3">{personalInfo.title}</h2>
        )}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-bold text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {(personalInfo.city || personalInfo.state) && (
            <span>{[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</span>
          )}
        </div>
      </header>

      {personalInfo.summary && (
        <section>
          <p className="text-lg font-bold text-slate-800 leading-snug">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <h2 className="text-2xl font-black uppercase text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-4 h-4 bg-amber-500 inline-block"></span>
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-black text-xl text-slate-900">{exp.position}</h3>
                  <div className="text-sm font-bold text-slate-500">
                    {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                <div className="text-lg font-bold text-amber-600 mb-2">{exp.company}{exp.location && ` • ${exp.location}`}</div>
                <ul className="list-disc list-outside ml-5 text-slate-700 font-medium leading-relaxed">
                  {exp.description.split('\n').filter(line => line.trim()).map((line, i) => {
                    const content = line.replace(/^- /, '');
                    return (
                      <li key={i}>
                        {/* Bolden numbers/metrics if possible, simple heuristic */}
                        {content.split(/((?:\$|\d+)[%kM]?(?:\.\d+)?)/g).map((part, index) => 
                           /^(?:\$|\d+)[%kM]?(?:\.\d+)?$/.test(part) ? <strong key={index} className="font-black text-slate-900">{part}</strong> : part
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="text-2xl font-black uppercase text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-4 h-4 bg-amber-500 inline-block"></span>
            Core Competencies
          </h2>
          <div className="flex flex-wrap gap-2 text-sm font-bold text-slate-800">
            {skills.map((skill, index) => (
              <React.Fragment key={skill.id}>
                <span>{skill.name}</span>
                {index < skills.length - 1 && <span className="text-amber-500 mx-2">|</span>}
              </React.Fragment>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-black uppercase text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-amber-500 inline-block"></span>
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-black text-slate-900">{edu.degree}</h3>
                  <div className="font-bold text-slate-600 my-1">{edu.institution}</div>
                  <div className="text-sm font-bold text-slate-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-black uppercase text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-amber-500 inline-block"></span>
              Key Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-black text-slate-900 mb-1">{project.title}</h3>
                  <p className="text-sm font-medium text-slate-700">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SalesTemplate;
