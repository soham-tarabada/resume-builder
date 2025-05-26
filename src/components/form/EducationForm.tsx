import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm: React.FC = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateEducation(id, { [name]: value });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Education</h3>
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">No education added yet. Click "Add Education" to get started.</p>
        </div>
      ) : (
        education.map((edu, index) => (
          <div key={edu.id} className="p-6 border border-gray-200 rounded-lg relative">
            <button
              type="button"
              onClick={() => removeEducation(edu.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove education"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            
            <h4 className="font-medium text-gray-900 mb-4">Education #{index + 1}</h4>
            
            <div className="space-y-4">
              <FormField
                label="Institution"
                name="institution"
                value={edu.institution}
                onChange={(e) => handleChange(edu.id, e)}
                placeholder="Harvard University"
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Degree"
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleChange(edu.id, e)}
                  placeholder="Bachelor of Science"
                />
                
                <FormField
                  label="Field of Study"
                  name="fieldOfStudy"
                  value={edu.fieldOfStudy}
                  onChange={(e) => handleChange(edu.id, e)}
                  placeholder="Computer Science"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Start Date"
                  name="startDate"
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => handleChange(edu.id, e)}
                />
                
                <FormField
                  label="End Date (or Expected)"
                  name="endDate"
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => handleChange(edu.id, e)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description / Achievements
                </label>
                <textarea
                  name="description"
                  value={edu.description}
                  onChange={(e) => handleChange(edu.id, e)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your studies, achievements, relevant coursework, etc."
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EducationForm;