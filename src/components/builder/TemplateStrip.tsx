import React, { useEffect, useRef } from 'react';
import { Check, LayoutGrid } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { resumeTemplates } from '../../data/resumeTemplates';
import TemplateThumbnail from '../preview/TemplateThumbnail';

/** Horizontal rail of live template previews for one-click switching. */
const TemplateStrip: React.FC<{ onBrowseAll: () => void }> = ({ onBrowseAll }) => {
  const { resumeData, updateTemplate } = useResume();
  const { selectedTemplate, theme } = resumeData;
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selected = railRef.current?.querySelector<HTMLElement>('[aria-pressed="true"]');
    selected?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [selectedTemplate]);

  return (
    <div ref={railRef} className="scrollbar-hide mask-fade-x flex gap-3 overflow-x-auto px-4 pb-2 pt-1 sm:px-8">
      <button
        type="button"
        onClick={onBrowseAll}
        className="group flex w-[84px] shrink-0 flex-col items-center"
      >
        <span className="flex aspect-[210/297] w-full flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-slate-300 bg-white/70 text-slate-500 transition group-hover:border-indigo-400 group-hover:text-indigo-600">
          <LayoutGrid className="h-5 w-5" />
          <span className="text-[11px] font-semibold">All {resumeTemplates.length}</span>
        </span>
        <span className="mt-1.5 text-[11px] font-medium text-slate-500">Browse</span>
      </button>
      {resumeTemplates.map(template => {
        const active = template.id === selectedTemplate;
        return (
          <button
            key={template.id}
            type="button"
            aria-pressed={active}
            onClick={() => updateTemplate(template.id)}
            className="group flex w-[84px] shrink-0 flex-col items-center"
            title={template.description}
          >
            <span
              className={`relative block w-full overflow-hidden rounded-lg shadow-sm ring-1 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg ${
                active ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-100' : 'ring-slate-900/10'
              }`}
            >
              <TemplateThumbnail templateId={template.id} accent={template.supportsAccent ? theme.accent : null} />
              {active && (
                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white shadow">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              )}
              {template.isNew && !active && (
                <span className="absolute bottom-1 left-1 rounded bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-1 py-px text-[8px] font-bold uppercase text-white">
                  New
                </span>
              )}
            </span>
            <span className={`mt-1.5 truncate text-[11px] font-medium ${active ? 'text-indigo-700' : 'text-slate-600'}`}>{template.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TemplateStrip;
