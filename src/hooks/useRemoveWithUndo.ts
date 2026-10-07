import { useCallback } from 'react';
import { ListSection, useResume } from '../context/ResumeContext';
import { useToast } from '../components/ui/Toast';

/** Removes an entry and offers a one-click "Undo" toast. */
export const useRemoveWithUndo = () => {
  const { resumeData, removeEducation, removeExperience, removeProject, removeSkill, restoreItem } = useResume();
  const notify = useToast();

  return useCallback(
    (section: ListSection, id: string, label: string) => {
      const items = resumeData[section];
      const index = items.findIndex(item => item.id === id);
      if (index < 0) return;
      const item = items[index];
      const remove = { education: removeEducation, experience: removeExperience, projects: removeProject, skills: removeSkill }[section];
      remove(id);
      notify(`${label} removed`, {
        tone: 'info',
        action: { label: 'Undo', onClick: () => restoreItem(section, item, index) },
      });
    },
    [resumeData, removeEducation, removeExperience, removeProject, removeSkill, restoreItem, notify]
  );
};
