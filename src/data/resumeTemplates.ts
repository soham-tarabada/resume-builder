import type { FC } from 'react';
import type { PaletteName } from './palettes';

import ModernTemplate from '../components/preview/templates/ModernTemplate';
import ClassicTemplate from '../components/preview/templates/ClassicTemplate';
import ProfessionalTemplate from '../components/preview/templates/ProfessionalTemplate';
import CreativeTemplate from '../components/preview/templates/CreativeTemplate';
import MinimalTemplate from '../components/preview/templates/MinimalTemplate';
import ExecutiveTemplate from '../components/preview/templates/ExecutiveTemplate';
import DeveloperTemplate from '../components/preview/templates/DeveloperTemplate';
import AcademicTemplate from '../components/preview/templates/AcademicTemplate';
import CorporateTemplate from '../components/preview/templates/CorporateTemplate';
import CleanTemplate from '../components/preview/templates/CleanTemplate';
import ElegantTemplate from '../components/preview/templates/ElegantTemplate';
import StandardTemplate from '../components/preview/templates/StandardTemplate';
import TechTemplate from '../components/preview/templates/TechTemplate';
import ManagerTemplate from '../components/preview/templates/ManagerTemplate';
import ChronologicalTemplate from '../components/preview/templates/ChronologicalTemplate';
import FunctionalTemplate from '../components/preview/templates/FunctionalTemplate';
import HybridTemplate from '../components/preview/templates/HybridTemplate';
import SoftwareTemplate from '../components/preview/templates/SoftwareTemplate';
import EngineeringTemplate from '../components/preview/templates/EngineeringTemplate';
import AnalystTemplate from '../components/preview/templates/AnalystTemplate';
import MarketingTemplate from '../components/preview/templates/MarketingTemplate';
import SalesTemplate from '../components/preview/templates/SalesTemplate';
import ProductTemplate from '../components/preview/templates/ProductTemplate';
import DesignerTemplate from '../components/preview/templates/DesignerTemplate';
import BoldTemplate from '../components/preview/templates/BoldTemplate';
import SimpleTemplate from '../components/preview/templates/SimpleTemplate';
import AuroraTemplate from '../components/preview/templates/AuroraTemplate';
import MidnightTemplate from '../components/preview/templates/MidnightTemplate';
import TimelineTemplate from '../components/preview/templates/TimelineTemplate';
import InfographicTemplate from '../components/preview/templates/InfographicTemplate';
import CardsTemplate from '../components/preview/templates/CardsTemplate';
import SwissTemplate from '../components/preview/templates/SwissTemplate';
import SplitTemplate from '../components/preview/templates/SplitTemplate';
import HighlightTemplate from '../components/preview/templates/HighlightTemplate';
import EditorialTemplate from '../components/preview/templates/EditorialTemplate';
import MonogramTemplate from '../components/preview/templates/MonogramTemplate';
import CompactTemplate from '../components/preview/templates/CompactTemplate';
import IvyTemplate from '../components/preview/templates/IvyTemplate';

export const TEMPLATE_CATEGORIES = ['Professional', 'Modern', 'Creative', 'Minimal', 'Tech'] as const;
export type TemplateCategory = (typeof TEMPLATE_CATEGORIES)[number];

export interface ResumeTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  component: FC;
  /** Palette the template was designed with; used when the user keeps "Template default". */
  defaultAccent: PaletteName;
  /** False for templates with a fixed color scheme (e.g. the code-editor theme). */
  supportsAccent: boolean;
  /** Single-column, plain-structure layouts that applicant tracking systems parse reliably. */
  atsFriendly: boolean;
  isNew?: boolean;
}

export const resumeTemplates: ResumeTemplate[] = [
  { id: 'modern', name: 'Modern', category: 'Modern', description: 'Two-column layout with an icon-led contact row and crisp accent headings.', component: ModernTemplate, defaultAccent: 'blue', supportsAccent: true, atsFriendly: false },
  { id: 'aurora', name: 'Aurora', category: 'Modern', description: 'Luminous gradient header with glassy contact chips and skill meters.', component: AuroraTemplate, defaultAccent: 'violet', supportsAccent: true, atsFriendly: false, isNew: true },
  { id: 'midnight', name: 'Midnight', category: 'Creative', description: 'Dark full-height sidebar with segmented skill bars and a monogram badge.', component: MidnightTemplate, defaultAccent: 'cyan', supportsAccent: true, atsFriendly: false, isNew: true },
  { id: 'timeline', name: 'Timeline', category: 'Modern', description: 'Your career on a vertical timeline, with dates in a clean left rail.', component: TimelineTemplate, defaultAccent: 'sky', supportsAccent: true, atsFriendly: false, isNew: true },
  { id: 'infographic', name: 'Infographic', category: 'Creative', description: 'Headline stats, a career Gantt chart and skill proficiency rings.', component: InfographicTemplate, defaultAccent: 'emerald', supportsAccent: true, atsFriendly: false, isNew: true },
  { id: 'cards', name: 'Cards', category: 'Modern', description: 'Dashboard-style cards on a soft canvas: friendly, structured, modern.', component: CardsTemplate, defaultAccent: 'indigo', supportsAccent: true, atsFriendly: false, isNew: true },
  { id: 'swiss', name: 'Swiss', category: 'Minimal', description: 'International Typographic Style: strict grid, numbered sections, huge name.', component: SwissTemplate, defaultAccent: 'red', supportsAccent: true, atsFriendly: false, isNew: true },
  { id: 'split', name: 'Split', category: 'Modern', description: 'Two-tone layout with a tinted right rail for contact, skills and education.', component: SplitTemplate, defaultAccent: 'orange', supportsAccent: true, atsFriendly: false, isNew: true },
  { id: 'highlight', name: 'Highlight', category: 'Creative', description: 'Marker-highlighted headings with a confident, personable voice.', component: HighlightTemplate, defaultAccent: 'yellow', supportsAccent: true, atsFriendly: true, isNew: true },
  { id: 'editorial', name: 'Editorial', category: 'Creative', description: 'Magazine masthead, drop-cap lede and a ruled two-column spread.', component: EditorialTemplate, defaultAccent: 'rose', supportsAccent: true, atsFriendly: false, isNew: true },
  { id: 'monogram', name: 'Monogram', category: 'Professional', description: 'Luxury serif styling with a double-ring monogram crest.', component: MonogramTemplate, defaultAccent: 'amber', supportsAccent: true, atsFriendly: false, isNew: true },
  { id: 'compact', name: 'Compact', category: 'Professional', description: 'Dense, ATS-first one-pager that fits a long career on a single page.', component: CompactTemplate, defaultAccent: 'blue', supportsAccent: true, atsFriendly: true, isNew: true },
  { id: 'ivy', name: 'Ivy', category: 'Professional', description: 'The classic university career-office format: serif, education first.', component: IvyTemplate, defaultAccent: 'neutral', supportsAccent: true, atsFriendly: true, isNew: true },
  { id: 'classic', name: 'Classic', category: 'Professional', description: 'Timeless centered header with ruled, uppercase section titles.', component: ClassicTemplate, defaultAccent: 'gray', supportsAccent: true, atsFriendly: true },
  { id: 'professional', name: 'Professional', category: 'Professional', description: 'Bold color header band with a balanced two-column body.', component: ProfessionalTemplate, defaultAccent: 'blue', supportsAccent: true, atsFriendly: false },
  { id: 'creative', name: 'Creative', category: 'Creative', description: 'Colored sidebar with monogram, skill meters and a timeline.', component: CreativeTemplate, defaultAccent: 'teal', supportsAccent: true, atsFriendly: false },
  { id: 'minimal', name: 'Minimal', category: 'Minimal', description: 'Light type and generous whitespace that lets your content breathe.', component: MinimalTemplate, defaultAccent: 'gray', supportsAccent: true, atsFriendly: true },
  { id: 'executive', name: 'Executive', category: 'Professional', description: 'Authoritative, centered format built for senior leadership roles.', component: ExecutiveTemplate, defaultAccent: 'gray', supportsAccent: true, atsFriendly: true },
  { id: 'developer', name: 'Developer', category: 'Tech', description: 'Engineer-friendly layout that puts projects and stack front and center.', component: DeveloperTemplate, defaultAccent: 'blue', supportsAccent: true, atsFriendly: false },
  { id: 'academic', name: 'Academic', category: 'Professional', description: 'Formal CV structure suited to research, teaching and grad school.', component: AcademicTemplate, defaultAccent: 'neutral', supportsAccent: true, atsFriendly: true },
  { id: 'corporate', name: 'Corporate', category: 'Professional', description: 'Dark header band and a timeline for a polished corporate look.', component: CorporateTemplate, defaultAccent: 'slate', supportsAccent: true, atsFriendly: false },
  { id: 'clean', name: 'Clean', category: 'Minimal', description: 'Airy grid with whisper-quiet labels and razor-sharp typography.', component: CleanTemplate, defaultAccent: 'zinc', supportsAccent: true, atsFriendly: false },
  { id: 'elegant', name: 'Elegant', category: 'Minimal', description: 'Refined serif styling with centered, symmetrical sections.', component: ElegantTemplate, defaultAccent: 'stone', supportsAccent: true, atsFriendly: false },
  { id: 'standard', name: 'Standard', category: 'Professional', description: 'No-nonsense, ATS-first format that recruiters scan in seconds.', component: StandardTemplate, defaultAccent: 'neutral', supportsAccent: true, atsFriendly: true },
  { id: 'tech', name: 'Tech', category: 'Tech', description: 'Sidebar-driven layout with monospace details for technical roles.', component: TechTemplate, defaultAccent: 'indigo', supportsAccent: true, atsFriendly: false },
  { id: 'manager', name: 'Manager', category: 'Professional', description: 'Dense one-pager that highlights leadership and initiatives.', component: ManagerTemplate, defaultAccent: 'neutral', supportsAccent: true, atsFriendly: true },
  { id: 'chronological', name: 'Chronological', category: 'Professional', description: 'Career story told in order, with strong uppercase section rules.', component: ChronologicalTemplate, defaultAccent: 'gray', supportsAccent: true, atsFriendly: true },
  { id: 'functional', name: 'Functional', category: 'Modern', description: 'Skills-first layout for career changers and diverse backgrounds.', component: FunctionalTemplate, defaultAccent: 'emerald', supportsAccent: true, atsFriendly: false },
  { id: 'hybrid', name: 'Hybrid', category: 'Modern', description: 'Blends a skills summary with a detailed work history.', component: HybridTemplate, defaultAccent: 'blue', supportsAccent: true, atsFriendly: true },
  { id: 'software', name: 'Software', category: 'Tech', description: 'Your resume as source code, in a dark editor theme.', component: SoftwareTemplate, defaultAccent: 'blue', supportsAccent: false, atsFriendly: false },
  { id: 'engineering', name: 'Engineering', category: 'Tech', description: 'Blueprint-inspired modules with a structured, technical feel.', component: EngineeringTemplate, defaultAccent: 'slate', supportsAccent: true, atsFriendly: false },
  { id: 'analyst', name: 'Analyst', category: 'Modern', description: 'Precise 12-column grid with tabular dates for data roles.', component: AnalystTemplate, defaultAccent: 'teal', supportsAccent: true, atsFriendly: false },
  { id: 'marketing', name: 'Marketing', category: 'Creative', description: 'Vibrant, brand-forward design for storytellers and growth pros.', component: MarketingTemplate, defaultAccent: 'rose', supportsAccent: true, atsFriendly: false },
  { id: 'sales', name: 'Sales', category: 'Modern', description: 'Metrics pop in bold so your numbers do the talking.', component: SalesTemplate, defaultAccent: 'amber', supportsAccent: true, atsFriendly: false },
  { id: 'product', name: 'Product', category: 'Modern', description: 'Gradient-topped layout that balances impact with craft.', component: ProductTemplate, defaultAccent: 'violet', supportsAccent: true, atsFriendly: false },
  { id: 'designer', name: 'Designer', category: 'Creative', description: 'Oversized type and a confident editorial grid.', component: DesignerTemplate, defaultAccent: 'zinc', supportsAccent: true, atsFriendly: false },
  { id: 'bold', name: 'Bold', category: 'Creative', description: 'Heavy type and high contrast for a resume that refuses to blend in.', component: BoldTemplate, defaultAccent: 'gray', supportsAccent: true, atsFriendly: false },
  { id: 'simple', name: 'Simple', category: 'Minimal', description: 'Plain, elegant and universally readable by humans and machines.', component: SimpleTemplate, defaultAccent: 'gray', supportsAccent: true, atsFriendly: true },
];

const templatesById = new Map(resumeTemplates.map(template => [template.id, template]));

export const getTemplate = (id: string): ResumeTemplate => templatesById.get(id) ?? resumeTemplates[0];
