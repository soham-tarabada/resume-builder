import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const AnalystTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 h-full text-slate-800 font-sans tracking-tight">
      <header className="mb-6 flex justify-between items-end border-b-2 border-slate-300 pb-2">
        <div>
          <h1 className="text-3xl font-extrabold uppercase text-slate-900 tracking-tighter">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <div className="text-sm font-bold text-teal-700 uppercase tracking-widest mt-1">
              {personalInfo.title}
            </div>
          )}
        </div>
        <div className="text-right text-xs font-mono text-slate-600 space-y-0.5">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
          {(personalInfo.city || personalInfo.state) && (
            <div>{[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</div>
          )}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase text-slate-900 mb-2 border-l-4 border-teal-600 pl-2">Summary Overview</h2>
          <p className="text-sm text-slate-700 leading-relaxed tabular-nums">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase text-slate-900 mb-2 border-l-4 border-teal-600 pl-2">Key Competencies</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-700">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></span>
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase text-slate-900 mb-3 border-l-4 border-teal-600 pl-2">Professional Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-12 gap-4">
                <div className="col-span-3 text-sm font-mono text-slate-500 pt-1">
                  {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                </div>
                <div className="col-span-9">
                  <h3 className="font-bold text-slate-900">{exp.position}</h3>
                  <div className="text-sm font-semibold text-teal-700 mb-1">{exp.company}{exp.location && ` • ${exp.location}`}</div>
                  <ul className="list-disc list-outside ml-4 text-sm text-slate-700 tabular-nums leading-relaxed">
                    {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                      <li key={i}>{line.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase text-slate-900 mb-3 border-l-4 border-teal-600 pl-2">Analytical Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="grid grid-cols-12 gap-4">
                <div className="col-span-3 text-xs font-mono text-slate-500 pt-1">
                  {project.technologies || 'N/A Tools'}
                </div>
                <div className="col-span-9">
                  <h3 className="font-bold text-slate-900">{project.title}</h3>
                  <p className="text-sm text-slate-700 tabular-nums">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase text-slate-900 mb-3 border-l-4 border-teal-600 pl-2">Education & Certifications</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-12 gap-4">
                <div className="col-span-3 text-sm font-mono text-slate-500">
                  {new Date(edu.endDate).getFullYear() || ''}
                </div>
                <div className="col-span-9">
                  <h3 className="font-bold text-slate-900">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</h3>
                  <div className="text-sm text-slate-700">{edu.institution}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AnalystTemplate;
