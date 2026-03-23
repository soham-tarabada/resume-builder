import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const SimpleTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-10 h-full text-black font-sans text-sm">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-normal mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-gray-600">
          {[
            personalInfo.email,
            personalInfo.phone,
            [personalInfo.city, personalInfo.state].filter(Boolean).join(', '),
            personalInfo.linkedin
          ].filter(Boolean).join(' • ')}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-justify">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2 pb-1">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start font-bold">
                  <span>{exp.position}</span>
                  <span className="font-normal text-gray-600">
                    {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="italic text-gray-800 mb-1">{exp.company}</div>
                <div className="whitespace-pre-line text-justify pl-4">{exp.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2 pb-1">Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between font-bold">
                  <span>{edu.degree}</span>
                  <span className="font-normal text-gray-600">{formatDate(edu.endDate)}</span>
                </div>
                <div className="italic text-gray-800">{edu.institution}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2 pb-1">Skills</h2>
          <p>{skills.map((s) => s.name).join(', ')}</p>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2 pb-1">Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="font-bold">{project.title}</div>
                <div className="text-justify">{project.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SimpleTemplate;
