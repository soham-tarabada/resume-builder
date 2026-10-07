import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Search, Sparkles, X } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { resumeTemplates, TEMPLATE_CATEGORIES } from '../../data/resumeTemplates';
import TemplateThumbnail from '../preview/TemplateThumbnail';

const FILTERS = ['All', ...TEMPLATE_CATEGORIES, 'ATS-friendly', 'New'] as const;
type Filter = (typeof FILTERS)[number];

interface TemplateGalleryProps {
  open: boolean;
  onClose: () => void;
}

/** Full-screen browser of every template, rendered live with sample content. */
const TemplateGallery: React.FC<TemplateGalleryProps> = ({ open, onClose }) => {
  const { resumeData, updateTemplate } = useResume();
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resumeTemplates.filter(template => {
      const passesFilter =
        filter === 'All' ||
        (filter === 'ATS-friendly' && template.atsFriendly) ||
        (filter === 'New' && template.isNew) ||
        template.category === filter;
      const passesQuery =
        !q || template.name.toLowerCase().includes(q) || template.description.toLowerCase().includes(q) || template.category.toLowerCase().includes(q);
      return passesFilter && passesQuery;
    });
  }, [filter, query]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { All: resumeTemplates.length };
    for (const template of resumeTemplates) {
      result[template.category] = (result[template.category] ?? 0) + 1;
      if (template.atsFriendly) result['ATS-friendly'] = (result['ATS-friendly'] ?? 0) + 1;
      if (template.isNew) result.New = (result.New ?? 0) + 1;
    }
    return result;
  }, []);

  if (!open) return null;

  const choose = (id: string) => {
    updateTemplate(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Template gallery">
      <div className="absolute inset-0 animate-fade-in bg-slate-950/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex h-[92vh] w-full max-w-6xl animate-scale-in flex-col overflow-hidden rounded-t-3xl bg-slate-50 shadow-2xl sm:h-[88vh] sm:rounded-3xl">
        <header className="border-b border-slate-200 bg-white px-5 pb-4 pt-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Choose your template</h2>
              <p className="text-sm text-slate-500">
                {resumeTemplates.length} designs, all live. Switch anytime and your content follows.
              </p>
            </div>
            <button type="button" onClick={onClose} className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative lg:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                ref={searchRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search templates…"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
            <div className="scrollbar-hide -mx-1 flex gap-1.5 overflow-x-auto px-1">
              {FILTERS.map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                    filter === item ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {item === 'New' && <Sparkles className="h-3.5 w-3.5" />}
                  {item}
                  <span className="text-xs text-slate-400">{counts[item] ?? 0}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          {visible.length === 0 ? (
            <p className="py-20 text-center text-slate-500">No templates match “{query}”.</p>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {visible.map(template => {
                const active = template.id === resumeData.selectedTemplate;
                return (
                  <button key={template.id} type="button" onClick={() => choose(template.id)} className="group text-left">
                    <span
                      className={`relative block overflow-hidden rounded-xl bg-white shadow-md ring-1 transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-indigo-500/10 ${
                        active ? 'ring-[3px] ring-indigo-500' : 'ring-slate-900/10'
                      }`}
                    >
                      <TemplateThumbnail templateId={template.id} accent={template.supportsAccent ? resumeData.theme.accent : null} />
                      <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-slate-950/60 via-slate-950/0 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                        <span className="translate-y-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition duration-300 group-hover:translate-y-0">
                          {active ? 'Selected' : 'Use this template'}
                        </span>
                      </span>
                      <span className="absolute bottom-2 left-2 flex gap-1">
                        {template.isNew && (
                          <span className="rounded-md bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white shadow">New</span>
                        )}
                        {template.atsFriendly && (
                          <span className="rounded-md bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white shadow">ATS</span>
                        )}
                      </span>
                      {active && (
                        <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg">
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </span>
                      )}
                    </span>
                    <span className="mt-3 flex items-baseline justify-between gap-2">
                      <span className="font-semibold text-slate-900">{template.name}</span>
                      <span className="text-xs font-medium text-slate-400">{template.category}</span>
                    </span>
                    <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-slate-500">{template.description}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateGallery;
