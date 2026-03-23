import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const ElegantTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-stone-50 p-10 h-full text-stone-800 font-sans">
      <div className="border-4 border-double border-stone-200 p-8 h-full">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-serif text-stone-900 tracking-widest uppercase mb-3">
            {personalInfo.firstName} <span className="font-light">{personalInfo.lastName}</span>
          </h1>
          {personalInfo.title && (
            <p className="text-lg font-serif italic text-stone-600 mb-4">{personalInfo.title}</p>
          )}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-stone-500 uppercase tracking-wider">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {(personalInfo.city || personalInfo.state) && (
              <span>{[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</span>
            )}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </header>

        <div className="flex justify-center mb-8">
          <div className="w-16 h-px bg-stone-300"></div>
        </div>

        {personalInfo.summary && (
          <p className="text-center text-stone-600 leading-loose text-sm mb-8 px-8">
            {personalInfo.summary}
          </p>
        )}

        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-center text-xl font-serif uppercase tracking-widest text-stone-800 mb-6">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="flex gap-6">
                  <div className="w-1/4 text-right">
                    <div className="text-sm font-semibold text-stone-700 uppercase tracking-wider">{exp.company}</div>
                    <div className="text-xs text-stone-500 italic mt-1">
                      {formatDate(exp.startDate)} -<br/>{exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="w-3/4 pb-4 border-b border-stone-100 last:border-0">
                    <h3 className="text-lg font-serif font-medium text-stone-900 mb-2">{exp.position}</h3>
                    <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="flex justify-center mb-8">
          <div className="w-16 h-px bg-stone-300"></div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          {education.length > 0 && (
            <section>
              <h2 className="text-center text-xl font-serif uppercase tracking-widest text-stone-800 mb-6">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="text-center">
                    <h3 className="font-serif font-medium text-stone-900">{edu.degree}</h3>
                    <div className="text-sm text-stone-600 my-1">{edu.institution}</div>
                    <div className="text-xs text-stone-400 italic">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-center text-xl font-serif uppercase tracking-widest text-stone-800 mb-6">Expertise</h2>
              <div className="flex flex-col items-center gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-sm text-stone-600 uppercase tracking-widest">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElegantTemplate;
