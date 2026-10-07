import React from 'react';
import { ArrowLeft, ArrowRight, Briefcase, Check, FolderGit2, GraduationCap, User, Wrench } from 'lucide-react';
import { ResumeData, useResume } from '../../context/ResumeContext';
import type { EditorSection } from '../../utils/resumeScore';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import PersonalInfoForm from './PersonalInfoForm';
import ProjectForm from './ProjectForm';
import SkillsForm from './SkillsForm';

const SECTIONS: { id: EditorSection; label: string; icon: React.ReactNode; isComplete: (data: ResumeData) => boolean }[] = [
  { id: 'personal', label: 'Personal', icon: <User className="h-4 w-4" />, isComplete: d => Boolean(d.personalInfo.firstName && d.personalInfo.email) },
  { id: 'experience', label: 'Experience', icon: <Briefcase className="h-4 w-4" />, isComplete: d => d.experience.length > 0 },
  { id: 'education', label: 'Education', icon: <GraduationCap className="h-4 w-4" />, isComplete: d => d.education.length > 0 },
  { id: 'projects', label: 'Projects', icon: <FolderGit2 className="h-4 w-4" />, isComplete: d => d.projects.length > 0 },
  { id: 'skills', label: 'Skills', icon: <Wrench className="h-4 w-4" />, isComplete: d => d.skills.length > 0 },
];

interface ResumeFormProps {
  section: EditorSection;
  onSectionChange: (section: EditorSection) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ section, onSectionChange }) => {
  const { resumeData } = useResume();
  const index = SECTIONS.findIndex(s => s.id === section);
  const previous = SECTIONS[index - 1];
  const next = SECTIONS[index + 1];

  const go = (target: EditorSection) => {
    onSectionChange(target);
    document.getElementById('editor-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      <nav
        id="editor-top"
        className="scrollbar-hide -mx-1 mb-8 flex scroll-mt-24 gap-1 overflow-x-auto rounded-2xl bg-slate-100/80 p-1"
        aria-label="Resume sections"
      >
        {SECTIONS.map(item => {
          const active = item.id === section;
          const complete = item.isComplete(resumeData);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange(item.id)}
              aria-current={active ? 'step' : undefined}
              className={`relative flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-2.5 py-2.5 text-sm font-semibold transition ${
                active ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className={`relative ${active ? 'text-indigo-600' : ''}`}>
                {item.icon}
                {complete && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-slate-100">
                    <Check className="h-2 w-2" strokeWidth={5} />
                  </span>
                )}
              </span>
              {item.label}
              {complete && <span className="sr-only">(complete)</span>}
            </button>
          );
        })}
      </nav>

      <div key={section}>
        {section === 'personal' && <PersonalInfoForm />}
        {section === 'experience' && <ExperienceForm />}
        {section === 'education' && <EducationForm />}
        {section === 'projects' && <ProjectForm />}
        {section === 'skills' && <SkillsForm />}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
        {previous ? (
          <button
            type="button"
            onClick={() => go(previous.id)}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" /> {previous.label}
          </button>
        ) : (
          <span />
        )}
        {next && (
          <button
            type="button"
            onClick={() => go(next.id)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 active:scale-[0.98]"
          >
            Next: {next.label} <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ResumeForm;
