import type { ResumeData } from '../context/ResumeContext';
import { toBullets } from './format';

export type EditorSection = 'personal' | 'experience' | 'education' | 'projects' | 'skills';

export interface ScoreCheck {
  id: string;
  label: string;
  /** Shown when the check is not fully met. */
  tip: string;
  section: EditorSection;
  points: number;
  earned: number;
}

export interface ResumeScore {
  score: number;
  grade: 'Getting started' | 'Taking shape' | 'Strong' | 'Outstanding';
  checks: ScoreCheck[];
}

const ACTION_VERBS = new Set(
  `accelerated achieved administered analyzed architected authored automated boosted built championed coached collaborated
  conceived consolidated converted coordinated created cut decreased delivered deployed designed developed devised directed
  doubled drove eliminated enabled engineered enhanced established executed expanded facilitated formulated founded generated
  grew guided headed implemented improved increased influenced initiated integrated introduced invented launched led
  maintained managed maximized mentored migrated minimized modernized negotiated optimized orchestrated organized overhauled
  oversaw owned partnered pioneered planned presented prioritized produced programmed published raised rebuilt recruited
  redesigned reduced refactored resolved restructured revamped saved scaled secured shipped simplified spearheaded
  standardized streamlined strengthened supervised taught tested trained transformed tripled unified won wrote`.split(/\s+/)
);

const WEAK_PHRASES = ['responsible for', 'duties included', 'worked on', 'helped with', 'helped to', 'tasked with', 'in charge of'];

const wordCount = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0);

const firstWord = (line: string) => line.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '') ?? '';

/** Brand color for a 0–100 score band (rose → amber → indigo → emerald). */
export const scoreColor = (score: number): string => {
  if (score >= 90) return '#10b981';
  if (score >= 70) return '#6366f1';
  if (score >= 40) return '#f59e0b';
  return '#f43f5e';
};

export const gradeFor = (score: number): ResumeScore['grade'] => {
  if (score >= 90) return 'Outstanding';
  if (score >= 70) return 'Strong';
  if (score >= 40) return 'Taking shape';
  return 'Getting started';
};

/**
 * Heuristic resume quality score (0–100), modeled on common recruiter and ATS
 * advice. Every check carries a concrete tip so the score is actionable.
 */
export const scoreResume = (data: ResumeData): ResumeScore => {
  const { personalInfo: info, experience, education, projects, skills } = data;
  const checks: ScoreCheck[] = [];

  const contactEarned = (info.firstName && info.lastName ? 4 : 0) + (info.email ? 3 : 0) + (info.phone ? 3 : 0);
  checks.push({
    id: 'contact',
    label: 'Name, email and phone',
    tip: 'Recruiters need your full name, an email and a phone number to reach you.',
    section: 'personal',
    points: 10,
    earned: contactEarned,
  });

  checks.push({
    id: 'title',
    label: 'Professional title',
    tip: 'Add a headline like "Senior Product Engineer" so readers instantly know who you are.',
    section: 'personal',
    points: 5,
    earned: info.title.trim() ? 5 : 0,
  });

  const summaryWords = wordCount(info.summary);
  checks.push({
    id: 'summary',
    label: 'Summary of 25–90 words',
    tip:
      summaryWords > 90
        ? `Your summary is ${summaryWords} words. Trim it to the 2–3 sentences that matter most.`
        : 'Write a 2–3 sentence summary: who you are, your strongest skills and the impact you deliver.',
    section: 'personal',
    points: 10,
    earned: summaryWords >= 25 && summaryWords <= 90 ? 10 : summaryWords > 90 ? 6 : summaryWords > 0 ? 4 : 0,
  });

  const filledRoles = experience.filter(exp => exp.position.trim() && exp.company.trim());
  checks.push({
    id: 'experience',
    label: 'Work experience',
    tip: 'Add your roles with title and company. Two or more positions show progression.',
    section: 'experience',
    points: 10,
    earned: filledRoles.length >= 2 ? 10 : filledRoles.length === 1 ? 7 : 0,
  });

  const bulletsPerRole = experience.map(exp => toBullets(exp.description));
  const allBullets = bulletsPerRole.flat();
  const rolesWithBullets = bulletsPerRole.filter(lines => lines.length >= 2).length;
  checks.push({
    id: 'bullets',
    label: 'Two or more bullets per role',
    tip: 'Describe each role in 2–5 bullet points (one achievement per line).',
    section: 'experience',
    points: 10,
    earned: experience.length ? Math.round((rolesWithBullets / experience.length) * 10) : 0,
  });

  const quantified = allBullets.filter(line => /\d/.test(line)).length;
  checks.push({
    id: 'metrics',
    label: 'Quantified achievements',
    tip: 'Add numbers: percentages, revenue, users or time saved. "Cut costs by 30%" beats "reduced costs".',
    section: 'experience',
    points: 10,
    earned: allBullets.length ? Math.min(10, Math.round((quantified / allBullets.length) * 15)) : 0,
  });

  const strongStarts = allBullets.filter(line => ACTION_VERBS.has(firstWord(line))).length;
  checks.push({
    id: 'verbs',
    label: 'Bullets start with action verbs',
    tip: 'Open bullets with strong verbs like Led, Built, Launched, Reduced or Scaled.',
    section: 'experience',
    points: 10,
    earned: allBullets.length ? Math.min(10, Math.round((strongStarts / allBullets.length) * 12)) : 0,
  });

  const allText = [info.summary, ...experience.map(exp => exp.description)].join(' ').toLowerCase();
  const weakFound = WEAK_PHRASES.filter(phrase => allText.includes(phrase));
  checks.push({
    id: 'weak-phrases',
    label: 'No passive filler phrases',
    tip: weakFound.length
      ? `Replace "${weakFound[0]}" with what you actually achieved.`
      : 'Avoid filler like "responsible for" or "worked on". Lead with results.',
    section: 'experience',
    points: 5,
    earned: allBullets.length || info.summary ? (weakFound.length ? 0 : 5) : 0,
  });

  const filledEducation = education.filter(edu => edu.institution.trim() && edu.degree.trim());
  checks.push({
    id: 'education',
    label: 'Education',
    tip: 'Add your degree and institution (certifications and bootcamps count too).',
    section: 'education',
    points: 10,
    earned: filledEducation.length ? 10 : education.length ? 5 : 0,
  });

  const namedSkills = skills.filter(skill => skill.name.trim());
  checks.push({
    id: 'skills',
    label: 'Five or more skills',
    tip: 'List at least 5 relevant skills. They are the keywords ATS filters search for.',
    section: 'skills',
    points: 10,
    earned: namedSkills.length >= 5 ? 10 : namedSkills.length * 2,
  });

  checks.push({
    id: 'links',
    label: 'LinkedIn, GitHub or portfolio',
    tip: 'Link to LinkedIn, GitHub or a portfolio so reviewers can dig deeper.',
    section: 'personal',
    points: 5,
    earned: info.linkedin || info.github || info.website ? 5 : 0,
  });

  checks.push({
    id: 'projects',
    label: 'At least one project',
    tip: 'Showcase a project with a one-line description and the tech you used.',
    section: 'projects',
    points: 5,
    earned: projects.some(project => project.title.trim()) ? 5 : 0,
  });

  const score = Math.round(checks.reduce((sum, check) => sum + Math.min(check.earned, check.points), 0));
  return { score, grade: gradeFor(score), checks };
};
