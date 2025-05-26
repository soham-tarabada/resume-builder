import React from 'react';
import { useResume } from '../../context/ResumeContext';

const Header: React.FC = () => {
  const { resetResume } = useResume();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset your resume? All data will be lost.')) {
                resetResume();
              }
            }}
            className="text-sm py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;