import { v4 as uuidv4 } from 'uuid';
import { PALETTES } from '../data/palettes';
import type { PaletteName } from '../data/palettes';
import type { Education, Experience, PersonalInfo, Project, ResumeData, ResumeTheme, Skill } from './ResumeContext';

export const DEFAULT_TEMPLATE_ID = 'modern';
export const STORAGE_KEY = 'resumeData';

const defaultPersonalInfo: PersonalInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  title: '',
  summary: '',
  linkedin: '',
  website: '',
  github: ''
};

const defaultTheme: ResumeTheme = { accent: null, font: 'default' };

export const defaultResumeData: ResumeData = {
  personalInfo: defaultPersonalInfo,
  education: [],
  experience: [],
  projects: [],
  skills: [],
  selectedTemplate: DEFAULT_TEMPLATE_ID,
  theme: defaultTheme
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const withIds = <T extends { id: string }>(items: unknown, fallback: Omit<T, 'id'>): T[] =>
  Array.isArray(items)
    ? items.filter(isRecord).map(item => ({ ...fallback, ...item, id: typeof item.id === 'string' ? item.id : uuidv4() }) as T)
    : [];

/**
 * Accepts anything (an older save, an imported backup) and returns a complete
 * ResumeData, so a missing field never crashes a template.
 */
export const normalizeResume = (raw: unknown): ResumeData => {
  if (!isRecord(raw)) return defaultResumeData;
  const theme = isRecord(raw.theme) ? raw.theme : {};
  const accent = typeof theme.accent === 'string' && theme.accent in PALETTES ? (theme.accent as PaletteName) : null;

  return {
    personalInfo: { ...defaultPersonalInfo, ...(isRecord(raw.personalInfo) ? raw.personalInfo : {}) } as PersonalInfo,
    education: withIds<Education>(raw.education, { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' }),
    experience: withIds<Experience>(raw.experience, { company: '', position: '', location: '', startDate: '', endDate: '', description: '', isCurrentPosition: false }),
    projects: withIds<Project>(raw.projects, { title: '', description: '', technologies: '', link: '' }),
    skills: withIds<Skill>(raw.skills, { name: '', level: 3 }),
    selectedTemplate: typeof raw.selectedTemplate === 'string' ? raw.selectedTemplate : DEFAULT_TEMPLATE_ID,
    theme: { accent, font: typeof theme.font === 'string' ? theme.font : 'default' }
  };
};

/** True when the resume has any user-entered content worth "continuing". */
export const hasContent = (data: ResumeData): boolean =>
  Boolean(
    data.personalInfo.firstName ||
      data.personalInfo.lastName ||
      data.experience.length ||
      data.education.length ||
      data.projects.length ||
      data.skills.length
  );
