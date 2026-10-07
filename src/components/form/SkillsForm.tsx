import React, { useState } from 'react';
import { Plus, Sparkles, X } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { useRemoveWithUndo } from '../../hooks/useRemoveWithUndo';
import { inputClass } from '../ui/FormField';
import SectionHeader from '../ui/SectionHeader';

const LEVELS = ['Beginner', 'Familiar', 'Proficient', 'Advanced', 'Expert'];

const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, updateSkill } = useResume();
  const removeWithUndo = useRemoveWithUndo();
  const { skills } = resumeData;
  const [draft, setDraft] = useState('');

  const commit = (raw: string) => {
    const existing = new Set(skills.map(skill => skill.name.trim().toLowerCase()));
    raw
      .split(/[,\n]/)
      .map(name => name.trim())
      .filter(name => name && !existing.has(name.toLowerCase()))
      .forEach(name => {
        existing.add(name.toLowerCase());
        addSkill(name);
      });
    setDraft('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      commit(draft);
    } else if (event.key === 'Backspace' && !draft && skills.length) {
      const last = skills[skills.length - 1];
      removeWithUndo('skills', last.id, last.name || 'Skill');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader title="Skills" description="Tools, languages and strengths. These are the keywords ATS filters scan for." />

      <div>
        <label htmlFor="skill-quick-add" className="mb-1.5 block text-[13px] font-medium text-slate-700">
          Quick add
        </label>
        <div className="flex gap-2">
          <input
            id="skill-quick-add"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={e => {
              const text = e.clipboardData.getData('text');
              if (/[,\n]/.test(text)) {
                e.preventDefault();
                commit(text);
              }
            }}
            placeholder="Type a skill and press Enter (or paste a comma-separated list)"
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => commit(draft)}
            disabled={!draft.trim()}
            className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>

      {skills.length === 0 ? (
        <div className="flex items-start gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-white/60 p-5 text-sm text-slate-500">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" />
          <p>
            Aim for 6–12 skills. Paste a list like <span className="font-medium text-slate-700">TypeScript, React, Figma, SQL</span> to add them all at once.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {skills.map(skill => (
            <li key={skill.id} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:flex-nowrap">
              <input
                aria-label="Skill name"
                value={skill.name}
                onChange={e => updateSkill(skill.id, { name: e.target.value })}
                placeholder="Skill"
                className="min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-2 py-1 font-medium text-slate-900 transition hover:border-slate-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
              <div className="flex items-center gap-2">
                <div className="flex gap-1" role="radiogroup" aria-label={`${skill.name || 'Skill'} proficiency`}>
                  {LEVELS.map((label, i) => (
                    <button
                      key={label}
                      type="button"
                      role="radio"
                      aria-checked={skill.level === i + 1}
                      title={label}
                      onClick={() => updateSkill(skill.id, { level: i + 1 })}
                      className={`h-2.5 w-6 rounded-full transition ${i < skill.level ? 'bg-indigo-600' : 'bg-slate-200 hover:bg-slate-300'}`}
                    />
                  ))}
                </div>
                <span className="w-[72px] text-xs font-medium text-slate-500">{LEVELS[Math.max(0, Math.min(4, skill.level - 1))]}</span>
              </div>
              <button
                type="button"
                onClick={() => removeWithUndo('skills', skill.id, skill.name || 'Skill')}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                aria-label={`Remove ${skill.name || 'skill'}`}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillsForm;
