import React from 'react';
import { useResume } from '../../context/ResumeContext';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

const ResumePreview: React.FC = () => {
  const { resumeData } = useResume();
  const { selectedTemplate } = resumeData;

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate />;
      case 'classic':
        return <ClassicTemplate />;
      case 'professional':
        return <ProfessionalTemplate />;
      case 'creative':
        return <CreativeTemplate />;
      case 'minimal':
        return <MinimalTemplate />;
      default:
        return <ModernTemplate />;
    }
  };

  return (
    <div 
      id="resume-preview" 
      className="bg-white overflow-hidden transition-all duration-300 animate-fadeIn"
      style={{ minHeight: '29.7cm', width: '100%', maxWidth: '21cm', margin: '0 auto' }}
    >
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;