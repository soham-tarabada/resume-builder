import React from 'react';
import { resumeTemplates, ResumeTemplate } from '../../data/resumeTemplates';
import TemplateThumbnail from '../preview/TemplateThumbnail';

const MarqueeRow: React.FC<{ templates: ResumeTemplate[]; reverse?: boolean; onPick: (id: string) => void }> = ({ templates, reverse, onPick }) => (
  <div className="group mask-fade-x overflow-hidden py-3">
    {/* Two identical copies; the track slides exactly one copy's width, then loops. */}
    <div className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}>
      {[...templates, ...templates].map((template, i) => (
        <div key={`${template.id}-${i}`} className="pr-6" aria-hidden={i >= templates.length}>
          <button
            type="button"
            onClick={() => onPick(template.id)}
            tabIndex={i >= templates.length ? -1 : 0}
            className="group/card block w-[190px] text-left sm:w-[220px]"
          >
            <span className="relative block overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/10 transition duration-300 group-hover/card:-translate-y-2 group-hover/card:shadow-2xl group-hover/card:shadow-indigo-500/20">
              <TemplateThumbnail templateId={template.id} />
              <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-slate-950/70 via-transparent p-4 opacity-0 transition duration-300 group-hover/card:opacity-100">
                <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-slate-900 shadow-lg">Use {template.name}</span>
              </span>
              {template.isNew && (
                <span className="absolute bottom-2 left-2 rounded-md bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white shadow group-hover/card:opacity-0">
                  New
                </span>
              )}
            </span>
            <span className="mt-3 flex items-baseline justify-between px-1">
              <span className="font-semibold text-slate-900">{template.name}</span>
              <span className="text-xs text-slate-400">{template.category}</span>
            </span>
          </button>
        </div>
      ))}
    </div>
  </div>
);

/** Two counter-scrolling rows of every template, rendered live. */
const TemplateMarquee: React.FC<{ onPick: (id: string) => void }> = ({ onPick }) => {
  const rowA = resumeTemplates.filter((_, i) => i % 2 === 0);
  const rowB = resumeTemplates.filter((_, i) => i % 2 === 1);
  return (
    <div className="space-y-4">
      <MarqueeRow templates={rowA} onPick={onPick} />
      <MarqueeRow templates={rowB} onPick={onPick} reverse />
    </div>
  );
};

export default TemplateMarquee;
