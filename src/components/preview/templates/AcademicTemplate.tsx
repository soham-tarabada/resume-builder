import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const AcademicTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white p-10 h-full text-gray-900 font-serif leading-relaxed">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-normal mb-2 tracking-wide text-black">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-sm text-gray-700 flex flex-wrap justify-center gap-x-3 gap-y-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>♦ {personalInfo.phone}</span>}
          {(personalInfo.city || personalInfo.state || personalInfo.country) && (
            <span>♦ {[personalInfo.city, personalInfo.state, personalInfo.country].filter(Boolean).join(', ')}</span>
          )}
          {personalInfo.linkedin && <span>♦ {personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Education First for Academic Template */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest text-black border-b border-black mb-4 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start font-bold text-black mb-1">
                  <span>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
                  <span className="font-normal text-sm">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="text-black">{edu.institution}</div>
                {edu.description && <p className="text-sm text-gray-800 mt-2">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest text-black border-b border-black mb-4 pb-1">
            Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start font-bold text-black mb-1">
                  <span>{exp.position}</span>
                  <span className="font-normal text-sm">
                    {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="text-black mb-2">{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
                <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest text-black border-b border-black mb-4 pb-1">
            Research & Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="font-bold text-black mb-1">
                  {project.title} {project.link && <span className="font-normal text-sm">({project.link})</span>}
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest text-black border-b border-black mb-4 pb-1">
            Skills & Competencies
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed">
            {skills.map((s) => s.name).join(', ')}
          </p>
        </section>
      )}
    </div>
  );
};

export default AcademicTemplate;
