import React from 'react';
import { FolderGit2 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { useRemoveWithUndo } from '../../hooks/useRemoveWithUndo';
import EmptyState from '../ui/EmptyState';
import FormField from '../ui/FormField';
import ItemCard from '../ui/ItemCard';
import SectionHeader from '../ui/SectionHeader';
import TextAreaField from '../ui/TextAreaField';

const ProjectForm: React.FC = () => {
  const { resumeData, addProject, updateProject, moveItem } = useResume();
  const removeWithUndo = useRemoveWithUndo();
  const { projects } = resumeData;

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateProject(id, { [name]: value });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader
        title="Projects"
        description="Side projects, open source and portfolio pieces."
        addLabel="Add project"
        onAdd={addProject}
      />

      {projects.length === 0 ? (
        <EmptyState
          icon={<FolderGit2 className="h-6 w-6" />}
          title="No projects yet"
          description="Projects prove you can ship. Add one with a sentence on what it does and why it matters."
          actionLabel="Add a project"
          onAction={addProject}
        />
      ) : (
        projects.map((project, index) => (
          <ItemCard
            key={project.id}
            index={index}
            total={projects.length}
            title={project.title || 'New project'}
            subtitle={project.technologies}
            onMove={direction => moveItem('projects', project.id, direction)}
            onRemove={() => removeWithUndo('projects', project.id, project.title || 'Project')}
          >
            <FormField idPrefix={project.id} label="Project name" name="title" value={project.title} onChange={e => handleChange(project.id, e)} placeholder="Pulseboard" required />
            <TextAreaField
              idPrefix={project.id}
              label="Description"
              name="description"
              value={project.description}
              onChange={e => handleChange(project.id, e)}
              rows={3}
              placeholder="Open-source real-time analytics dashboard with 2.1k GitHub stars."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField idPrefix={project.id} label="Technologies" name="technologies" value={project.technologies} onChange={e => handleChange(project.id, e)} placeholder="React, WebSockets, ClickHouse" />
              <FormField idPrefix={project.id} label="Link" name="link" type="url" value={project.link} onChange={e => handleChange(project.id, e)} placeholder="github.com/you/project" />
            </div>
          </ItemCard>
        ))
      )}
    </div>
  );
};

export default ProjectForm;
