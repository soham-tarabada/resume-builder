import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';
import { Plus, Trash2 } from 'lucide-react';

const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResume();
  const { skills } = resumeData;

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateSkill(id, { [name]: value });
  };

  const handleLevelChange = (id: string, level: number) => {
    updateSkill(id, { level });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Skills</h3>
        <button
          type="button"
          onClick={addSkill}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Skill
        </button>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">No skills added yet. Click "Add Skill" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="p-4 border border-gray-200 rounded-lg flex items-center">
              <div className="flex-1">
                <FormField
                  label="Skill Name"
                  name="name"
                  value={skill.name}
                  onChange={(e) => handleChange(skill.id, e)}
                  placeholder="JavaScript"
                  className="mb-0"
                  required
                />
              </div>
              
              <div className="ml-4 flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proficiency
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleLevelChange(skill.id, level)}
                      className={`w-6 h-6 rounded-full ${
                        level <= skill.level
                          ? 'bg-blue-600'
                          : 'bg-gray-200'
                      }`}
                      aria-label={`Proficiency level ${level}`}
                    />
                  ))}
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove skill"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;