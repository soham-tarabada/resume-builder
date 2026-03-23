import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const HybridTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white h-full flex font-sans text-gray-800">
      {/* Sidebar */}
      <div className="w-[35%] bg-blue-900 text-white p-6 flex flex-col gap-6">
        <div className="text-center mb-4">
          <div className="w-24 h-24 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-white/20">
            <span className="text-3xl font-bold text-white">
              {personalInfo.firstName?.charAt(0)}{personalInfo.lastName?.charAt(0)}
            </span>
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-wide">
            {personalInfo.firstName} <br/> {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <p className="text-blue-300 font-medium uppercase text-sm tracking-widest mt-2">{personalInfo.title}</p>
          )}
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-300 border-b border-blue-700 pb-1 mb-3">Contact</h2>
          <div className="space-y-2 text-sm text-blue-100">
            {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {(personalInfo.city || personalInfo.state) && (
              <div>{[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</div>
            )}
            {personalInfo.linkedin && <div className="break-all">{personalInfo.linkedin}</div>}
            {personalInfo.website && <div className="break-all">{personalInfo.website}</div>}
          </div>
        </div>

        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-300 border-b border-blue-700 pb-1 mb-3">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="text-sm">
                  <div className="font-bold text-white">{edu.degree}</div>
                  <div className="text-blue-200 mt-1">{edu.institution}</div>
                  <div className="text-blue-400 text-xs mt-1">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-300 border-b border-blue-700 pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="bg-white/10 text-white px-2 py-1 text-xs font-medium rounded">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-[65%] p-8 bg-gray-50 flex flex-col gap-8">
        {personalInfo.summary && (
          <section>
            <h2 className="text-2xl font-black text-gray-800 mb-3">Profile</h2>
            <p className="text-sm text-gray-600 leading-relaxed font-medium text-justify">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-black text-gray-800 mb-5">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="font-semibold text-gray-600 mb-2">{exp.company}{exp.location && ` | ${exp.location}`}</div>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-black text-gray-800 mb-5">Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-gray-900">{project.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 my-2">{project.description}</p>
                  {project.technologies && (
                    <div className="text-xs font-semibold text-gray-500">Tech: {project.technologies}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HybridTemplate;
