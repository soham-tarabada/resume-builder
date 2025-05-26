import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import ResumeForm from './form/ResumeForm';
import ResumePreview from './preview/ResumePreview';
import TemplateSelector from './form/TemplateSelector';
import { downloadPDF } from '../utils/pdfExport';

const ResumeBuilder: React.FC = () => {
  const { resumeData } = useResume();
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await downloadPDF('resume-preview', `${resumeData.personalInfo.firstName}-${resumeData.personalInfo.lastName}-Resume`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Mobile tabs */}
          <div className="lg:hidden flex border-b border-gray-200">
            <button
              className={`flex-1 py-3 px-4 text-center ${
                activeTab === 'edit' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('edit')}
            >
              Edit
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center ${
                activeTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
          </div>

          {/* Form section */}
          <div 
            className={`lg:w-1/2 border-r border-gray-200 ${
              activeTab === 'edit' ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="p-6">
              <ResumeForm />
            </div>
          </div>

          {/* Preview section */}
          <div 
            className={`lg:w-1/2 ${
              activeTab === 'preview' ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="p-6">
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">Resume Preview</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={handleExportPDF}
                    disabled={isExporting}
                    className="inline-flex items-center justify-center py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isExporting ? 'Exporting...' : 'Export PDF'}
                  </button>
                </div>
              </div>
              <TemplateSelector />
              <div className="mt-6 border border-gray-200 rounded-md">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;