import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const SoftwareTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, projects, skills } = resumeData;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-[#1e1e1e] p-8 h-full text-[#d4d4d4] font-mono text-sm leading-relaxed overflow-hidden">
      <header className="mb-6">
        <div className="text-[#569cd6] font-bold text-2xl mb-2">
          const <span className="text-[#4fc1ff]">{personalInfo.firstName}_{personalInfo.lastName}</span> = {'{'}
        </div>
        <div className="pl-6 space-y-1">
          {personalInfo.title && <div><span className="text-[#9cdcfe]">role</span>: <span className="text-[#ce9178]">"{personalInfo.title}"</span>,</div>}
          {personalInfo.email && <div><span className="text-[#9cdcfe]">email</span>: <span className="text-[#ce9178]">"{personalInfo.email}"</span>,</div>}
          {personalInfo.phone && <div><span className="text-[#9cdcfe]">phone</span>: <span className="text-[#ce9178]">"{personalInfo.phone}"</span>,</div>}
          {personalInfo.linkedin && <div><span className="text-[#9cdcfe]">linkedin</span>: <span className="text-[#ce9178]">"{personalInfo.linkedin}"</span>,</div>}
          {personalInfo.github && <div><span className="text-[#9cdcfe]">github</span>: <span className="text-[#ce9178]">"{personalInfo.github}"</span>,</div>}
        </div>
        <div className="text-[#569cd6] font-bold text-2xl mt-2">{'}'};</div>
      </header>

      {personalInfo.summary && (
        <section className="mb-6">
          <div className="text-[#6a9955] italic">{'/*'}</div>
          <p className="text-[#6a9955] italic pl-4 pr-4 text-justify">
            {personalInfo.summary}
          </p>
          <div className="text-[#6a9955] italic">{'*/'}</div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <div className="text-[#c586c0]">export const</div> <span className="text-[#4fc1ff]">skills</span> = [
          <div className="pl-4 text-[#ce9178]">
            {skills.map((skill, index) => (
              <span key={skill.id}>"{skill.name}"{index < skills.length - 1 ? ', ' : ''}</span>
            ))}
          </div>
          ];
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <div className="text-[#c586c0]">interface</div> <span className="text-[#4ec9b0]">Experience</span> {'{'} ... {'}'}<br/>
          <div className="text-[#c586c0]">const</div> <span className="text-[#4fc1ff]">workHistory</span>: <span className="text-[#4ec9b0]">Experience</span>[] = [
          <div className="pl-4 space-y-4 mt-2">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l border-[#404040] pl-4">
                <div><span className="text-[#9cdcfe]">company</span>: <span className="text-[#ce9178]">"{exp.company}"</span>,</div>
                <div><span className="text-[#9cdcfe]">role</span>: <span className="text-[#ce9178]">"{exp.position}"</span>,</div>
                <div><span className="text-[#9cdcfe]">period</span>: <span className="text-[#ce9178]">"{formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}"</span>,</div>
                <div>
                  <span className="text-[#9cdcfe]">details</span>: <span className="text-[#ce9178]">`</span>
                  <div className="text-[#ce9178] pl-4 whitespace-pre-line">{exp.description}</div>
                  <span className="text-[#ce9178]">`</span>
                </div>
              </div>
            ))}
          </div>
          ];
        </section>
      )}

      <div className="grid grid-cols-2 gap-4">
        {education.length > 0 && (
          <section>
            <div className="text-[#c586c0]">const</div> <span className="text-[#4fc1ff]">education</span> = [
            <div className="pl-4 space-y-2 mt-2">
              {education.map((edu) => (
                <div key={edu.id} className="border-l border-[#404040] pl-4">
                  <div><span className="text-[#9cdcfe]">degree</span>: <span className="text-[#ce9178]">"{edu.degree}"</span>,</div>
                  <div><span className="text-[#9cdcfe]">school</span>: <span className="text-[#ce9178]">"{edu.institution}"</span>,</div>
                  <div><span className="text-[#9cdcfe]">year</span>: <span className="text-[#b5cea8]">{new Date(edu.endDate).getFullYear() || 'null'}</span></div>
                </div>
              ))}
            </div>
            ];
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <div className="text-[#c586c0]">const</div> <span className="text-[#4fc1ff]">projects</span> = [
            <div className="pl-4 space-y-2 mt-2">
              {projects.map((project) => (
                <div key={project.id} className="border-l border-[#404040] pl-4">
                  <div><span className="text-[#9cdcfe]">name</span>: <span className="text-[#ce9178]">"{project.title}"</span>,</div>
                  <div><span className="text-[#9cdcfe]">tech</span>: <span className="text-[#ce9178]">"{project.technologies || ''}"</span>,</div>
                </div>
              ))}
            </div>
            ];
          </section>
        )}
      </div>
    </div>
  );
};

export default SoftwareTemplate;
