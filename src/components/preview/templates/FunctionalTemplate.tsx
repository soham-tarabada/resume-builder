import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const FunctionalTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric' });
  };

  return (
    <div className="bg-white p-10 h-full text-slate-900 font-sans flex flex-col gap-6">
      <header className="flex justify-between items-end border-b-4 border-emerald-600 pb-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight text-slate-800">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <p className="text-xl font-bold text-emerald-600 mt-1 uppercase tracking-wider">{personalInfo.title}</p>
          )}
        </div>
        <div className="text-right text-sm text-slate-600 font-medium">
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
          {(personalInfo.city || personalInfo.state) && (
            <div>{[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</div>
          )}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="text-base text-slate-700 leading-relaxed font-medium">
          {personalInfo.summary}
        </section>
      )}

      {/* Functional focuses heavily on skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-2xl font-black uppercase text-emerald-700 mb-3 border-b-2 border-emerald-100 pb-1">
            Areas of Expertise
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center text-slate-800 font-semibold">
                <span className="w-2 h-2 bg-emerald-500 mr-2"></span>
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <h2 className="text-2xl font-black uppercase text-emerald-700 mb-4 border-b-2 border-emerald-100 pb-1">
            Relevant Projects / Achievements
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-lg text-slate-800">{project.title}</h3>
                <p className="text-slate-600 text-sm mt-1 leading-relaxed">{project.description}</p>
                {project.technologies && (
                  <p className="text-sm text-emerald-600 font-medium mt-1">Tools: {project.technologies}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {experience.length > 0 && (
          <section>
            <h2 className="text-xl font-black uppercase text-emerald-700 mb-4 border-b-2 border-emerald-100 pb-1">
              Work History
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="font-bold text-slate-800">{exp.position}</div>
                  <div className="text-slate-600">{exp.company}</div>
                  <div className="text-sm text-slate-500 font-semibold mt-1">
                    {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-black uppercase text-emerald-700 mb-4 border-b-2 border-emerald-100 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-800">{edu.degree}</div>
                  <div className="text-slate-600">{edu.institution}</div>
                  <div className="text-sm text-slate-500 font-semibold mt-1">
                    Class of {new Date(edu.endDate).getFullYear() || ''}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

    </div>
  );
};

export default FunctionalTemplate;
