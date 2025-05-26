import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';
import { Plus, Trash2 } from 'lucide-react';

const ProjectForm: React.FC = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { projects } = resumeData;

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateProject(id, { [name]: value });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Projects</h3>
        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">No projects added yet. Click "Add Project" to get started.</p>
        </div>
      ) : (
        projects.map((project, index) => (
          <div key={project.id} className="p-6 border border-gray-200 rounded-lg relative">
            <button
              type="button"
              onClick={() => removeProject(project.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove project"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            
            <h4 className="font-medium text-gray-900 mb-4">Project #{index + 1}</h4>
            
            <div className="space-y-4">
              <FormField
                label="Project Title"
                name="title"
                value={project.title}
                onChange={(e) => handleChange(project.id, e)}
                placeholder="E-commerce Website"
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={project.description}
                  onChange={(e) => handleChange(project.id, e)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the project, your role, and its impact..."
                />
              </div>
              
              <FormField
                label="Technologies Used"
                name="technologies"
                value={project.technologies}
                onChange={(e) => handleChange(project.id, e)}
                placeholder="React, Node.js, MongoDB, Express"
              />
              
              <FormField
                label="Project Link"
                name="link"
                value={project.link}
                onChange={(e) => handleChange(project.id, e)}
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectForm;