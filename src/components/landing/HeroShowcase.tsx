import React, { useEffect, useRef, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { getTemplate } from '../../data/resumeTemplates';
import { accentHex } from '../../data/theme';
import { prefersReducedMotion } from '../../hooks/useInView';
import TemplateThumbnail from '../preview/TemplateThumbnail';
import ScoreRing from '../ui/ScoreRing';

const SHOWCASE = ['aurora', 'midnight', 'modern', 'swiss', 'cards', 'editorial', 'infographic', 'timeline', 'monogram', 'split'];
const SCORES = [94, 88, 97, 91, 86, 95, 99, 92, 90, 96];

/** A tilting 3D stack of live resumes that cycles through templates. */
const HeroShowcase: React.FC = () => {
  const [index, setIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timer = window.setInterval(() => setIndex(i => (i + 1) % SHOWCASE.length), 2600);
    return () => window.clearInterval(timer);
  }, []);

  // Tilt toward the cursor by writing CSS variables directly (no re-renders).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const onMove = (event: PointerEvent) => {
      const stage = stageRef.current;
      if (!stage) return;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      stage.style.setProperty('--ry', `${x * 14 - 8}deg`);
      stage.style.setProperty('--rx', `${-y * 10 + 4}deg`);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const at = (offset: number) => SHOWCASE[(index + offset) % SHOWCASE.length];
  const front = getTemplate(at(0));

  return (
    <div className="relative mx-auto w-full max-w-[420px] [perspective:1800px]">
      <div
        ref={stageRef}
        className="relative transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        style={{ transform: 'rotateY(var(--ry, -8deg)) rotateX(var(--rx, 4deg))' }}
      >
        <div className="absolute inset-0 translate-x-[22%] translate-y-[6%] rotate-[7deg] scale-[0.86] overflow-hidden rounded-xl opacity-60 shadow-2xl ring-1 ring-slate-900/10">
          <div key={at(2)} className="animate-fade-in">
            <TemplateThumbnail templateId={at(2)} eager />
          </div>
        </div>
        <div className="absolute inset-0 translate-x-[11%] translate-y-[3%] rotate-[3.5deg] scale-[0.93] overflow-hidden rounded-xl opacity-80 shadow-2xl ring-1 ring-slate-900/10">
          <div key={at(1)} className="animate-fade-in">
            <TemplateThumbnail templateId={at(1)} eager />
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-white shadow-[0_40px_100px_-20px_rgba(79,70,229,0.45)] ring-1 ring-slate-900/10">
          <div key={at(0)} className="animate-fade-in">
            <TemplateThumbnail templateId={at(0)} eager />
          </div>
        </div>
      </div>

      {/* Floating proof points */}
      <div className="absolute -left-4 top-[14%] hidden animate-float items-center gap-3 rounded-2xl bg-white/95 p-3 pr-4 shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/5 backdrop-blur sm:flex lg:-left-16">
        <ScoreRing score={SCORES[index]} size={48} stroke={5} label="Resume score" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Resume score</p>
          <p className="text-sm font-bold text-emerald-600">Outstanding</p>
        </div>
      </div>

      <div className="absolute -right-3 top-[4%] hidden animate-float rounded-2xl bg-white/95 p-3 shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/5 backdrop-blur [animation-delay:-2s] sm:block lg:-right-12">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Accent</p>
        <div className="flex gap-1.5">
          {SHOWCASE.slice(0, 6).map((id, i) => {
            const palette = getTemplate(id).defaultAccent;
            const active = palette === front.defaultAccent;
            return (
              <span
                key={id + i}
                className={`h-5 w-5 rounded-full transition-transform duration-300 ${active ? 'scale-125 ring-2 ring-slate-900 ring-offset-2' : ''}`}
                style={{ backgroundColor: accentHex(palette, '500') }}
              />
            );
          })}
        </div>
      </div>

      <div className="absolute -right-2 bottom-[12%] hidden w-56 animate-float rounded-2xl bg-white/95 p-3.5 shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/5 backdrop-blur [animation-delay:-4s] sm:block lg:-right-14">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Job match</p>
          <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-bold text-emerald-600">92%</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {['React', 'TypeScript', 'GraphQL'].map(word => (
            <span key={word} className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
              <Check className="h-3 w-3" /> {word}
            </span>
          ))}
          <span className="inline-flex items-center gap-0.5 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-600">+ Kubernetes</span>
        </div>
      </div>

      <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xl">
        <Sparkles className="h-3.5 w-3.5 text-amber-300" />
        <span key={front.id} className="animate-fade-in">
          {front.name} template
        </span>
      </div>
    </div>
  );
};

export default HeroShowcase;
