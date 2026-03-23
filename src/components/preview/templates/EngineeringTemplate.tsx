import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const EngineeringTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 h-full text-slate-800 font-sans border-8 border-slate-800">
      <header className="mb-6 flex justify-between items-center bg-slate-100 p-4 border-2 border-slate-800">
        <div>
          <h1 className="text-3xl font-black uppercase text-slate-900 tracking-tighter">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <div className="text-lg font-bold text-slate-700 uppercase mt-1">
              ENGINEER / {personalInfo.title}
            </div>
          )}
        </div>
        <div className="text-right text-xs font-bold text-slate-700 space-y-1 bg-white p-2 border border-slate-300">
          {personalInfo.phone && <div>TEL: {personalInfo.phone}</div>}
          {personalInfo.email && <div>EML: {personalInfo.email}</div>}
          {personalInfo.linkedin && <div>LNK: {personalInfo.linkedin}</div>}
          {personalInfo.github && <div>GIT: {personalInfo.github}</div>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-6 border-b-2 border-slate-800 pb-4">
          <div className="bg-slate-800 text-white font-bold uppercase text-xs inline-block px-2 py-1 mb-2">Summary Component</div>
          <p className="text-sm font-medium text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6 border-b-2 border-slate-800 pb-4">
          <div className="bg-slate-800 text-white font-bold uppercase text-xs inline-block px-2 py-1 mb-4">Experience Module</div>
          <table className="w-full text-sm text-left">
            <tbody>
              {experience.map((exp) => (
                <tr key={exp.id} className="border-b border-slate-200 last:border-0 align-top">
                  <td className="py-3 w-1/4 pr-4 font-bold border-r border-slate-200">
                    <div className="text-slate-900">{formatDate(exp.startDate)}</div>
                    <div className="text-slate-500 text-xs">TO</div>
                    <div className="text-slate-900">{exp.isCurrentPosition ? 'PRESENT' : formatDate(exp.endDate)}</div>
                  </td>
                  <td className="py-3 pl-4">
                    <div className="font-extrabold text-slate-900 text-lg uppercase">{exp.position}</div>
                    <div className="font-bold text-slate-600 uppercase mb-2">@ {exp.company} {exp.location && `| ${exp.location}`}</div>
                    <div className="text-slate-700 whitespace-pre-line text-xs font-medium">{exp.description}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {education.length > 0 && (
          <section>
            <div className="bg-slate-800 text-white font-bold uppercase text-xs inline-block px-2 py-1 mb-3">Education Array</div>
            <div className="border border-slate-300 bg-slate-50 p-3 space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="border-b border-slate-200 last:border-0 pb-2 last:pb-0">
                  <div className="font-black text-slate-900 text-sm uppercase">{edu.degree}</div>
                  <div className="font-bold text-slate-700 text-xs">{edu.institution}</div>
                  <div className="font-mono text-xs text-slate-500 mt-1">
                    [{formatDate(edu.startDate)} - {formatDate(edu.endDate)}]
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="space-y-6">
          {skills.length > 0 && (
            <section>
              <div className="bg-slate-800 text-white font-bold uppercase text-xs inline-block px-2 py-1 mb-3">Core Skills</div>
              <div className="flex flex-wrap gap-1 p-3 border border-slate-300 bg-slate-50">
                {skills.map((skill) => (
                  <span key={skill.id} className="border border-slate-800 px-2 py-0.5 text-xs font-bold uppercase bg-white">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <div className="bg-slate-800 text-white font-bold uppercase text-xs inline-block px-2 py-1 mb-3">Projects Logs</div>
              <div className="space-y-2 border border-slate-300 bg-slate-50 p-3">
                {projects.map((project) => (
                  <div key={project.id} className="text-xs">
                    <span className="font-black text-slate-900 uppercase underline">{project.title}</span> — 
                    <span className="text-slate-700 font-medium ml-1">{project.description}</span>
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

export default EngineeringTemplate;
