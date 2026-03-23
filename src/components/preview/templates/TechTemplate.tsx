import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const TechTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 h-full text-slate-800 font-sans flex flex-col md:flex-row gap-8">
      {/* Left Column - Tech/Skills Focus */}
      <div className="w-1/3 bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-600 tracking-tight leading-none mb-2">
            {personalInfo.firstName}<br />{personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
              {personalInfo.title}
            </div>
          )}
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.github && <div className="font-semibold text-indigo-500">{personalInfo.github}</div>}
          {personalInfo.linkedin && <div className="font-semibold text-indigo-500">{personalInfo.linkedin}</div>}
        </div>

        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 border-b-2 border-slate-200 pb-1">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs font-bold rounded">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 border-b-2 border-slate-200 pb-1">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-800 text-sm leading-tight">{edu.degree}</div>
                  <div className="text-xs text-slate-500 mt-1">{edu.institution}</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">{new Date(edu.endDate).getFullYear() || ''}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Experience & Projects */}
      <div className="w-2/3 py-2">
        {personalInfo.summary && (
          <div className="mb-6">
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
              <span className="text-indigo-500">/</span> Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900 text-lg">{exp.position}</h3>
                    <div className="text-xs font-mono text-indigo-500 font-bold bg-indigo-50 px-2 py-1 rounded">
                      {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-slate-500 mb-2">{exp.company}</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
              <span className="text-indigo-500">/</span> Projects
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="border-l-4 border-indigo-200 pl-4 py-1">
                  <h3 className="font-bold text-slate-900">{project.title}</h3>
                  {project.technologies && (
                    <div className="text-xs font-mono text-slate-500 mt-1 mb-2">Tech: {project.technologies}</div>
                  )}
                  <p className="text-sm text-slate-600">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TechTemplate;
