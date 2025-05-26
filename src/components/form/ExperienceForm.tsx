import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm: React.FC = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const { experience } = resumeData;

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateExperience(id, { [name]: value });
  };

  const handleCheckboxChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateExperience(id, { [name]: checked });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">No experience added yet. Click "Add Experience" to get started.</p>
        </div>
      ) : (
        experience.map((exp, index) => (
          <div key={exp.id} className="p-6 border border-gray-200 rounded-lg relative">
            <button
              type="button"
              onClick={() => removeExperience(exp.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove experience"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            
            <h4 className="font-medium text-gray-900 mb-4">Experience #{index + 1}</h4>
            
            <div className="space-y-4">
              <FormField
                label="Company"
                name="company"
                value={exp.company}
                onChange={(e) => handleChange(exp.id, e)}
                placeholder="Google"
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Position"
                  name="position"
                  value={exp.position}
                  onChange={(e) => handleChange(exp.id, e)}
                  placeholder="Senior Software Engineer"
                  required
                />
                
                <FormField
                  label="Location"
                  name="location"
                  value={exp.location}
                  onChange={(e) => handleChange(exp.id, e)}
                  placeholder="Mountain View, CA"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Start Date"
                  name="startDate"
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => handleChange(exp.id, e)}
                />
                
                <div className={exp.isCurrentPosition ? 'opacity-50' : ''}>
                  <FormField
                    label="End Date"
                    name="endDate"
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => handleChange(exp.id, e)}
                    disabled={exp.isCurrentPosition}
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id={`isCurrentPosition-${exp.id}`}
                  name="isCurrentPosition"
                  type="checkbox"
                  checked={exp.isCurrentPosition}
                  onChange={(e) => handleCheckboxChange(exp.id, e)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`isCurrentPosition-${exp.id}`} className="ml-2 block text-sm text-gray-900">
                  I currently work here
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description / Responsibilities
                </label>
                <textarea
                  name="description"
                  value={exp.description}
                  onChange={(e) => handleChange(exp.id, e)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your responsibilities, achievements, and projects..."
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExperienceForm;