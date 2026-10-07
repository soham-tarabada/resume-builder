import React, { useMemo } from 'react';
import { ChevronRight, PartyPopper } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { scoreColor, scoreResume } from '../../utils/resumeScore';
import ScoreRing from '../ui/ScoreRing';

/** Compact live score with the single most valuable next step. */
const ScoreCard: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  const { resumeData } = useResume();
  const { score, grade, checks } = useMemo(() => scoreResume(resumeData), [resumeData]);
  const nextStep = [...checks].sort((a, b) => b.points - b.earned - (a.points - a.earned)).find(check => check.earned < check.points);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group mb-8 flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm shadow-slate-900/[0.03] transition hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/5"
    >
      <ScoreRing score={score} size={60} stroke={6} label="Resume score" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-900">Resume score</span>
          <span
            className="rounded-full px-2 py-0.5 text-[11px] font-bold"
            style={{ color: scoreColor(score), backgroundColor: `${scoreColor(score)}1a` }}
          >
            {grade}
          </span>
        </div>
        <p className="mt-0.5 truncate text-sm text-slate-500">
          {nextStep ? (
            <>
              <span className="font-medium text-slate-700">Next: </span>
              {nextStep.label}
              <span className="text-emerald-600"> (+{nextStep.points - nextStep.earned} pts)</span>
            </>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-emerald-600">
              <PartyPopper className="h-4 w-4" /> Every check passed. You're ready to apply!
            </span>
          )}
        </p>
      </div>
      <span className="hidden items-center gap-1 rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition group-hover:bg-indigo-50 group-hover:text-indigo-700 sm:inline-flex">
        Insights <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </button>
  );
};

export default ScoreCard;
