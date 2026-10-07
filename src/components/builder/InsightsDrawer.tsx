import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, Gauge, Plus, Target, X } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { extractKeywords, matchKeywords } from '../../utils/keywords';
import { EditorSection, scoreColor, scoreResume } from '../../utils/resumeScore';
import { inputClass } from '../ui/FormField';
import ScoreRing from '../ui/ScoreRing';
import { useToast } from '../ui/Toast';

export type InsightsTab = 'score' | 'match';

interface InsightsDrawerProps {
  open: boolean;
  tab: InsightsTab;
  onTabChange: (tab: InsightsTab) => void;
  onClose: () => void;
  onNavigate: (section: EditorSection) => void;
}

const JD_STORAGE_KEY = 'resumeBuilder.jobDescription';

const readStoredJobDescription = () => {
  try {
    return localStorage.getItem(JD_STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
};

const ScoreTab: React.FC<{ onNavigate: (section: EditorSection) => void }> = ({ onNavigate }) => {
  const { resumeData } = useResume();
  const { score, grade, checks } = useMemo(() => scoreResume(resumeData), [resumeData]);
  const open = checks.filter(check => check.earned < check.points).sort((a, b) => b.points - b.earned - (a.points - a.earned));
  const done = checks.filter(check => check.earned >= check.points);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/60 p-5 ring-1 ring-slate-900/5">
        <ScoreRing score={score} size={92} stroke={9} label="Resume score" />
        <div>
          <p className="text-2xl font-bold tracking-tight" style={{ color: scoreColor(score) }}>
            {grade}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {open.length ? `${open.length} improvement${open.length === 1 ? '' : 's'} could add ${100 - score} points.` : 'Every check passed. Recruiters will love this.'}
          </p>
        </div>
      </div>

      {open.length > 0 && (
        <section>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Biggest wins first</h3>
          <ul className="space-y-2">
            {open.map(check => (
              <li key={check.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(check.section)}
                  className="group flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-left transition hover:border-indigo-200 hover:bg-indigo-50/40"
                >
                  <span className="mt-0.5 flex h-6 min-w-[2.5rem] items-center justify-center rounded-md bg-amber-50 px-1.5 text-[11px] font-bold tabular-nums text-amber-700">
                    +{check.points - check.earned}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-900">{check.label}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-slate-500">{check.tip}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {done.length > 0 && (
        <section>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Nailed it</h3>
          <ul className="space-y-1.5">
            {done.map(check => (
              <li key={check.id} className="flex items-center gap-2.5 text-sm text-slate-600">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {check.label}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

const MatchTab: React.FC = () => {
  const { resumeData, addSkill } = useResume();
  const notify = useToast();
  const [jobDescription, setJobDescription] = useState(readStoredJobDescription);

  useEffect(() => {
    try {
      localStorage.setItem(JD_STORAGE_KEY, jobDescription);
    } catch {
      // Storage unavailable: the text simply won't persist.
    }
  }, [jobDescription]);

  const keywords = useMemo(() => extractKeywords(jobDescription), [jobDescription]);
  const { matched, missing, percent } = useMemo(() => matchKeywords(keywords, resumeData), [keywords, resumeData]);

  const addAsSkill = (keyword: string) => {
    addSkill(keyword);
    notify(`Added “${keyword}” to your skills`);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="job-description" className="mb-1.5 block text-sm font-semibold text-slate-900">
          Paste a job description
        </label>
        <p className="mb-3 text-[13px] text-slate-500">
          We'll pull out the keywords hiring managers and applicant tracking systems look for and check them against your resume. Everything stays in
          your browser.
        </p>
        <textarea
          id="job-description"
          value={jobDescription}
          onChange={e => setJobDescription(e.target.value)}
          rows={7}
          placeholder="We're looking for a Senior Frontend Engineer with 5+ years of React and TypeScript…"
          className={`${inputClass} resize-y text-sm leading-relaxed`}
        />
      </div>

      {keywords.length > 0 ? (
        <>
          <div className="flex items-center gap-5 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/60 p-5 ring-1 ring-slate-900/5">
            <ScoreRing score={percent} size={84} stroke={8} label="Keyword match" />
            <div>
              <p className="text-lg font-bold text-slate-900">{percent}% keyword match</p>
              <p className="mt-0.5 text-sm text-slate-600">
                {matched.length} of {keywords.length} key terms found.{' '}
                {percent >= 75 ? 'Strong alignment!' : 'Weave the missing ones into your bullets where they’re true.'}
              </p>
            </div>
          </div>

          {missing.length > 0 && (
            <section>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Missing · tap to add as a skill</h3>
              <div className="flex flex-wrap gap-2">
                {missing.map(keyword => (
                  <button
                    key={keyword}
                    type="button"
                    onClick={() => addAsSkill(keyword)}
                    className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[13px] font-medium text-rose-700 transition hover:border-rose-300 hover:bg-rose-100 active:scale-95"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    {keyword}
                  </button>
                ))}
              </div>
            </section>
          )}

          {matched.length > 0 && (
            <section>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Already on your resume</h3>
              <div className="flex flex-wrap gap-2">
                {matched.map(keyword => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[13px] font-medium text-emerald-700"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {keyword}
                  </span>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
          Your keyword report appears here as soon as you paste a posting.
        </div>
      )}
    </div>
  );
};

/** Slide-over with the full score checklist and the job-description matcher. */
const InsightsDrawer: React.FC<InsightsDrawerProps> = ({ open, tab, onTabChange, onClose, onNavigate }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const tabs: { id: InsightsTab; label: string; icon: React.ReactNode }[] = [
    { id: 'score', label: 'Resume score', icon: <Gauge className="h-4 w-4" /> },
    { id: 'match', label: 'Job match', icon: <Target className="h-4 w-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Resume insights">
      <div className="absolute inset-0 animate-fade-in bg-slate-950/40 backdrop-blur-sm" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md animate-slide-in-right flex-col bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-900">Insights</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="px-6 pt-4">
          <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
            {tabs.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition ${
                  tab === item.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">{tab === 'score' ? <ScoreTab onNavigate={onNavigate} /> : <MatchTab />}</div>
      </aside>
    </div>
  );
};

export default InsightsDrawer;
