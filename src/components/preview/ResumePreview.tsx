import React from 'react';
import { useResume } from '../../context/ResumeContext';

import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

import ExecutiveTemplate from './templates/ExecutiveTemplate';
import DeveloperTemplate from './templates/DeveloperTemplate';
import AcademicTemplate from './templates/AcademicTemplate';
import CorporateTemplate from './templates/CorporateTemplate';
import CleanTemplate from './templates/CleanTemplate';
import ElegantTemplate from './templates/ElegantTemplate';
import StandardTemplate from './templates/StandardTemplate';
import TechTemplate from './templates/TechTemplate';
import ManagerTemplate from './templates/ManagerTemplate';
import ChronologicalTemplate from './templates/ChronologicalTemplate';
import FunctionalTemplate from './templates/FunctionalTemplate';
import HybridTemplate from './templates/HybridTemplate';
import SoftwareTemplate from './templates/SoftwareTemplate';
import EngineeringTemplate from './templates/EngineeringTemplate';
import AnalystTemplate from './templates/AnalystTemplate';
import MarketingTemplate from './templates/MarketingTemplate';
import SalesTemplate from './templates/SalesTemplate';
import ProductTemplate from './templates/ProductTemplate';
import DesignerTemplate from './templates/DesignerTemplate';
import BoldTemplate from './templates/BoldTemplate';
import SimpleTemplate from './templates/SimpleTemplate';

const ResumePreview: React.FC = () => {
  const { resumeData } = useResume();
  const { selectedTemplate } = resumeData;

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern': return <ModernTemplate />;
      case 'classic': return <ClassicTemplate />;
      case 'professional': return <ProfessionalTemplate />;
      case 'creative': return <CreativeTemplate />;
      case 'minimal': return <MinimalTemplate />;
      case 'executive': return <ExecutiveTemplate />;
      case 'developer': return <DeveloperTemplate />;
      case 'academic': return <AcademicTemplate />;
      case 'corporate': return <CorporateTemplate />;
      case 'clean': return <CleanTemplate />;
      case 'elegant': return <ElegantTemplate />;
      case 'standard': return <StandardTemplate />;
      case 'tech': return <TechTemplate />;
      case 'manager': return <ManagerTemplate />;
      case 'chronological': return <ChronologicalTemplate />;
      case 'functional': return <FunctionalTemplate />;
      case 'hybrid': return <HybridTemplate />;
      case 'software': return <SoftwareTemplate />;
      case 'engineering': return <EngineeringTemplate />;
      case 'analyst': return <AnalystTemplate />;
      case 'marketing': return <MarketingTemplate />;
      case 'sales': return <SalesTemplate />;
      case 'product': return <ProductTemplate />;
      case 'designer': return <DesignerTemplate />;
      case 'bold': return <BoldTemplate />;
      case 'simple': return <SimpleTemplate />;
      default: return <ModernTemplate />;
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