import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Palette, Type } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { getTemplate } from '../../data/resumeTemplates';
import { ACCENT_OPTIONS, accentHex, ensureFontLoaded, FONT_OPTIONS, getFontOption } from '../../data/theme';
import { useDismiss } from '../../hooks/useDismiss';

const triggerClass =
  'inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50';

const popoverClass =
  'absolute right-0 top-full z-30 mt-2 animate-scale-in rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10';

const ColorPicker: React.FC = () => {
  const { resumeData, updateTheme } = useResume();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  const template = getTemplate(resumeData.selectedTemplate);
  const current = resumeData.theme.accent ?? template.defaultAccent;

  return (
    <div ref={ref} className="relative">
      <button type="button" className={triggerClass} onClick={() => setOpen(o => !o)} aria-expanded={open} disabled={!template.supportsAccent}>
        <Palette className="h-4 w-4 text-slate-400" />
        <span className="h-4 w-4 rounded-full ring-2 ring-white" style={{ backgroundColor: accentHex(current) }} />
        <span className="hidden sm:inline">Color</span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
      </button>
      {open && (
        <div className={`${popoverClass} w-[264px]`}>
          <p className="px-1 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Accent color</p>
          <button
            type="button"
            onClick={() => updateTheme({ accent: null })}
            className={`mb-2 flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm transition hover:bg-slate-50 ${
              resumeData.theme.accent === null ? 'bg-indigo-50/70' : ''
            }`}
          >
            <span
              className="h-7 w-7 rounded-full ring-2 ring-white shadow"
              style={{ background: `conic-gradient(${accentHex(template.defaultAccent)} 0 50%, ${accentHex(template.defaultAccent, '300')} 0)` }}
            />
            <span className="flex-1">
              <span className="block font-semibold text-slate-800">Template default</span>
              <span className="block text-xs text-slate-500">As {template.name} was designed</span>
            </span>
            {resumeData.theme.accent === null && <Check className="h-4 w-4 text-indigo-600" />}
          </button>
          <div className="grid grid-cols-6 gap-2">
            {ACCENT_OPTIONS.map(option => {
              const selected = resumeData.theme.accent === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => updateTheme({ accent: option.id })}
                  title={option.label}
                  aria-label={option.label}
                  aria-pressed={selected}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition hover:scale-110 ${
                    selected ? 'ring-2 ring-slate-900 ring-offset-2' : ''
                  }`}
                  style={{ background: `linear-gradient(135deg, ${accentHex(option.id, '400')}, ${accentHex(option.id, '700')})` }}
                >
                  {selected && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const FontPicker: React.FC = () => {
  const { resumeData, updateTheme } = useResume();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);
  const current = getFontOption(resumeData.theme.font);

  // Load every typeface once the menu opens so each option previews itself.
  useEffect(() => {
    if (open) FONT_OPTIONS.forEach(ensureFontLoaded);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button type="button" className={triggerClass} onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <Type className="h-4 w-4 text-slate-400" />
        <span className="hidden max-w-[110px] truncate sm:inline">{current.id === 'default' ? 'Font' : current.label}</span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
      </button>
      {open && (
        <div className={`${popoverClass} w-[248px] p-2`}>
          {FONT_OPTIONS.map(font => {
            const selected = font.id === current.id;
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => {
                  updateTheme({ font: font.id });
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-slate-50 ${selected ? 'bg-indigo-50/70' : ''}`}
              >
                <span className="text-[15px] text-slate-800" style={font.stack ? { fontFamily: font.stack } : undefined}>
                  {font.label}
                </span>
                <span className="flex items-center gap-2">
                  {font.id !== 'default' && <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{font.kind}</span>}
                  {selected && <Check className="h-4 w-4 text-indigo-600" />}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ZOOM_STEPS = [0.6, 0.8, 1, 1.25, 1.5];

export const ZoomControl: React.FC<{ zoom: number; onChange: (zoom: number) => void }> = ({ zoom, onChange }) => {
  const index = ZOOM_STEPS.indexOf(zoom);
  return (
    <div className="hidden items-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 shadow-sm md:inline-flex">
      <button type="button" className="px-2.5 py-2 transition hover:text-slate-900 disabled:opacity-30" onClick={() => onChange(ZOOM_STEPS[index - 1])} disabled={index <= 0} aria-label="Zoom out">
        −
      </button>
      <button type="button" className="min-w-[52px] px-1 py-2 tabular-nums transition hover:text-slate-900" onClick={() => onChange(1)} title="Fit to width">
        {Math.round(zoom * 100)}%
      </button>
      <button
        type="button"
        className="px-2.5 py-2 transition hover:text-slate-900 disabled:opacity-30"
        onClick={() => onChange(ZOOM_STEPS[index + 1])}
        disabled={index >= ZOOM_STEPS.length - 1}
        aria-label="Zoom in"
      >
        +
      </button>
    </div>
  );
};

const DesignControls: React.FC = () => (
  <div className="flex items-center gap-2">
    <ColorPicker />
    <FontPicker />
  </div>
);

export default DesignControls;
