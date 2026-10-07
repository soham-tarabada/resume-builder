import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { PaletteName } from '../data/palettes';
import { sampleResume } from '../data/sampleResume';
import { defaultResumeData, normalizeResume, STORAGE_KEY } from './resumeData';

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrentPosition: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  title: string;
  summary: string;
  linkedin: string;
  website: string;
  github: string;
}

export interface ResumeTheme {
  /** Accent palette override; `null` keeps the template's own color. */
  accent: PaletteName | null;
  /** Font id from FONT_OPTIONS; `default` keeps the template's own font. */
  font: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  selectedTemplate: string;
  theme: ResumeTheme;
}

export type ListSection = 'education' | 'experience' | 'projects' | 'skills';

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addSkill: (name?: string) => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  moveItem: (section: ListSection, id: string, direction: -1 | 1) => void;
  /** Puts a removed entry back at its old position (powers "Undo"). */
  restoreItem: <S extends ListSection>(section: S, item: ResumeData[S][number], index: number) => void;
  updateTemplate: (templateId: string) => void;
  updateTheme: (theme: Partial<ResumeTheme>) => void;
  loadSample: () => void;
  importResume: (data: unknown) => void;
  resetResume: () => void;
  /** Epoch ms of the last successful local save, or null if storage is unavailable. */
  savedAt: number | null;
}

const loadSaved = (): ResumeData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? normalizeResume(JSON.parse(saved)) : defaultResumeData;
  } catch {
    return defaultResumeData;
  }
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components -- hook is co-located with its provider
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

const noop = () => {};

/**
 * Renders templates against fixed data (thumbnails, the landing page) without
 * touching the user's resume. Actions are inert inside this provider.
 */
export const ResumeDataProvider: React.FC<{ data: ResumeData; children: ReactNode }> = ({ data, children }) => {
  const value = useMemo<ResumeContextType>(
    () => ({
      resumeData: data,
      updatePersonalInfo: noop,
      addEducation: noop,
      updateEducation: noop,
      removeEducation: noop,
      addExperience: noop,
      updateExperience: noop,
      removeExperience: noop,
      addProject: noop,
      updateProject: noop,
      removeProject: noop,
      addSkill: noop,
      updateSkill: noop,
      removeSkill: noop,
      moveItem: noop,
      restoreItem: noop,
      updateTemplate: noop,
      updateTheme: noop,
      loadSample: noop,
      importResume: noop,
      resetResume: noop,
      savedAt: null
    }),
    [data]
  );
  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(loadSaved);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
      setSavedAt(Date.now());
    } catch {
      // Private mode or quota exceeded: keep working in memory.
      setSavedAt(null);
    }
  }, [resumeData]);

  const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  }, []);

  const addEducation = useCallback(() => {
    const newEducation: Education = {
      id: uuidv4(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    };

    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  }, []);

  const updateEducation = useCallback((id: string, data: Partial<Education>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, ...data } : edu
      )
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  }, []);

  const addExperience = useCallback(() => {
    const newExperience: Experience = {
      id: uuidv4(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrentPosition: false
    };

    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  }, []);

  const updateExperience = useCallback((id: string, data: Partial<Experience>) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, ...data } : exp
      )
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  }, []);

  const addProject = useCallback(() => {
    const newProject: Project = {
      id: uuidv4(),
      title: '',
      description: '',
      technologies: '',
      link: ''
    };

    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  }, []);

  const updateProject = useCallback((id: string, data: Partial<Project>) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj =>
        proj.id === id ? { ...proj, ...data } : proj
      )
    }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  }, []);

  const addSkill = useCallback((name = '') => {
    const newSkill: Skill = {
      id: uuidv4(),
      name,
      level: 3
    };

    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  }, []);

  const updateSkill = useCallback((id: string, data: Partial<Skill>) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, ...data } : skill
      )
    }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  }, []);

  const moveItem = useCallback((section: ListSection, id: string, direction: -1 | 1) => {
    setResumeData(prev => {
      const items = [...prev[section]] as { id: string }[];
      const from = items.findIndex(item => item.id === id);
      const to = from + direction;
      if (from < 0 || to < 0 || to >= items.length) return prev;
      [items[from], items[to]] = [items[to], items[from]];
      return { ...prev, [section]: items };
    });
  }, []);

  const restoreItem = useCallback(<S extends ListSection>(section: S, item: ResumeData[S][number], index: number) => {
    setResumeData(prev => {
      const items = [...prev[section]] as ResumeData[S][number][];
      if (items.some(existing => existing.id === item.id)) return prev;
      items.splice(Math.min(index, items.length), 0, item);
      return { ...prev, [section]: items };
    });
  }, []);

  const updateTemplate = useCallback((templateId: string) => {
    setResumeData(prev => ({
      ...prev,
      selectedTemplate: templateId
    }));
  }, []);

  const updateTheme = useCallback((theme: Partial<ResumeTheme>) => {
    setResumeData(prev => ({
      ...prev,
      theme: { ...prev.theme, ...theme }
    }));
  }, []);

  const loadSample = useCallback(() => {
    setResumeData(prev => ({
      ...normalizeResume(sampleResume),
      selectedTemplate: prev.selectedTemplate,
      theme: prev.theme
    }));
  }, []);

  const importResume = useCallback((data: unknown) => {
    setResumeData(normalizeResume(data));
  }, []);

  const resetResume = useCallback(() => {
    setResumeData(prev => ({ ...defaultResumeData, selectedTemplate: prev.selectedTemplate, theme: prev.theme }));
  }, []);

  const value = useMemo(
    () => ({
      resumeData,
      updatePersonalInfo,
      addEducation,
      updateEducation,
      removeEducation,
      addExperience,
      updateExperience,
      removeExperience,
      addProject,
      updateProject,
      removeProject,
      addSkill,
      updateSkill,
      removeSkill,
      moveItem,
      restoreItem,
      updateTemplate,
      updateTheme,
      loadSample,
      importResume,
      resetResume,
      savedAt
    }),
    [
      resumeData,
      updatePersonalInfo,
      addEducation,
      updateEducation,
      removeEducation,
      addExperience,
      updateExperience,
      removeExperience,
      addProject,
      updateProject,
      removeProject,
      addSkill,
      updateSkill,
      removeSkill,
      moveItem,
      restoreItem,
      updateTemplate,
      updateTheme,
      loadSample,
      importResume,
      resetResume,
      savedAt
    ]
  );

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};
