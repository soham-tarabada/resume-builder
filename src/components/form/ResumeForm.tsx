import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import ProjectForm from './ProjectForm';
import SkillsForm from './SkillsForm';

const ResumeForm: React.FC = () => {
  const [activeSection, setActiveSection] = useState('personal');

  const sections = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Your Resume</h2>
      
      <div className="mb-8 border-b border-gray-200 overflow-x-auto">
        <nav className="flex -mb-px space-x-8">
          {sections.map(section => (
            <button
              key={section.id}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeSection === section.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeSection === 'personal' && <PersonalInfoForm />}
        {activeSection === 'education' && <EducationForm />}
        {activeSection === 'experience' && <ExperienceForm />}
        {activeSection === 'projects' && <ProjectForm />}
        {activeSection === 'skills' && <SkillsForm />}
      </div>
    </div>
  );
};

export default ResumeForm;