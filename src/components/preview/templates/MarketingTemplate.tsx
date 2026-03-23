import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const MarketingTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-[#fcfbf9] p-8 h-full text-slate-800 font-sans tracking-wide">
      <header className="mb-8">
        <div className="bg-rose-100 rounded-2xl p-8 text-center text-rose-950">
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <h2 className="text-lg font-bold uppercase tracking-widest text-rose-700 mb-4">{personalInfo.title}</h2>
          )}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
            {personalInfo.email && <span className="flex items-center gap-1">✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1">☏ {personalInfo.phone}</span>}
            {personalInfo.linkedin && <span className="flex items-center gap-1">in/ {personalInfo.linkedin}</span>}
            {(personalInfo.city || personalInfo.state) && (
              <span className="flex items-center gap-1">📍 {[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</span>
            )}
          </div>
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-8 px-4">
          <p className="text-center text-lg text-slate-700 font-medium leading-relaxed italic">
            "{personalInfo.summary}"
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-black uppercase text-rose-950 mb-6 flex justify-center items-center gap-4">
            <div className="h-px bg-rose-200 flex-grow"></div>
            Experience
            <div className="h-px bg-rose-200 flex-grow"></div>
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-6">
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-rose-400"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-xl text-slate-900">{exp.position}</h3>
                  <div className="text-sm font-bold text-rose-600">
                    {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                <div className="text-slate-600 font-semibold mb-2">{exp.company}{exp.location && ` • ${exp.location}`}</div>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        <div>
          {skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-black uppercase text-rose-950 mb-4 flex items-center gap-4">
                Skills
                <div className="h-px bg-rose-200 flex-grow"></div>
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="bg-white border border-rose-200 text-rose-900 px-3 py-1.5 text-xs font-bold rounded-full shadow-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-black uppercase text-rose-950 mb-4 flex items-center gap-4">
                Education
                <div className="h-px bg-rose-200 flex-grow"></div>
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <div className="text-sm text-slate-600 font-medium my-1">{edu.institution}</div>
                    <div className="text-xs font-bold text-rose-500">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div>
          {projects.length > 0 && (
            <section>
              <h2 className="text-xl font-black uppercase text-rose-950 mb-4 flex items-center gap-4">
                Campaigns / Projects
                <div className="h-px bg-rose-200 flex-grow"></div>
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-slate-900 mb-1">{project.title}</h3>
                    <p className="text-sm text-slate-600 mb-2">{project.description}</p>
                    {project.technologies && (
                      <div className="text-xs font-bold text-rose-500">Tools: {project.technologies}</div>
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

export default MarketingTemplate;
