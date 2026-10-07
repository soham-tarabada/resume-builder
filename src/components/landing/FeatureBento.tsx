import React, { ReactNode, useMemo, useRef, useState } from 'react';
import { ClipboardCopy, FileJson, FileText, Lock, Printer, Target, Wand2 } from 'lucide-react';
import { ResumeData, ResumeDataProvider } from '../../context/ResumeContext';
import type { PaletteName } from '../../data/palettes';
import { sampleResume } from '../../data/sampleResume';
import { ACCENT_OPTIONS, accentHex } from '../../data/theme';
import { useInView } from '../../hooks/useInView';
import ResumeDocument from '../preview/ResumeDocument';
import ScaledPage from '../preview/ScaledPage';
import TemplateThumbnail from '../preview/TemplateThumbnail';
import ScoreRing from '../ui/ScoreRing';
import Reveal from './Reveal';

const Card: React.FC<{ className?: string; children: ReactNode; delay?: number }> = ({ className = '', children, delay = 0 }) => (
  <Reveal delay={delay} className={className}>
    <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-900/[0.04] transition duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/[0.08] sm:p-7">
      {children}
    </div>
  </Reveal>
);

const Eyebrow: React.FC<{ icon: ReactNode; children: ReactNode }> = ({ icon, children }) => (
  <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
    {icon}
    {children}
  </p>
);

/** Type into real inputs and watch a real template update. */
const LiveDemo: React.FC = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const data = useMemo<ResumeData>(() => {
    const [first, ...rest] = name.trim().split(/\s+/);
    return {
      ...sampleResume,
      personalInfo: {
        ...sampleResume.personalInfo,
        firstName: name.trim() ? first : sampleResume.personalInfo.firstName,
        lastName: name.trim() ? rest.join(' ') : sampleResume.personalInfo.lastName,
        title: title.trim() || sampleResume.personalInfo.title,
      },
    };
  }, [name, title]);

  return (
    <div className="grid h-full gap-6 md:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col">
        <Eyebrow icon={<Wand2 className="h-4 w-4" />}>Live preview</Eyebrow>
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Every keystroke, <span className="font-display text-[1.15em] font-normal italic text-indigo-600">instantly</span> on the page.
        </h3>
        <p className="mt-3 text-slate-500">No “generate” button, no waiting. Go on, try it:</p>
        <div className="mt-5 space-y-3">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            aria-label="Your name"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          />
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Your dream job title"
            aria-label="Your dream job title"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
      </div>
      <div className="relative -mb-6 -mr-6 flex flex-col overflow-hidden rounded-tl-2xl border-l border-t border-slate-200 bg-slate-100 pl-5 pt-5 sm:-mb-7 sm:-mr-7">
        <div className="mask-fade-b min-h-[300px] flex-1 overflow-hidden rounded-tl-xl shadow-2xl ring-1 ring-slate-900/10">
          <ScaledPage clipToPage>
            <ResumeDataProvider data={data}>
              <ResumeDocument templateId="aurora" theme={{ accent: null, font: 'default' }} />
            </ResumeDataProvider>
          </ScaledPage>
        </div>
      </div>
    </div>
  );
};

const ScoreDemo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <div ref={ref}>
      <Eyebrow icon={<Target className="h-4 w-4" />}>Resume score</Eyebrow>
      <div className="flex items-center gap-4">
        <ScoreRing score={inView ? 96 : 0} size={76} stroke={8} label="Example resume score" />
        <div>
          <p className="text-xl font-bold text-slate-900">A coach in your corner</p>
          <p className="text-sm text-slate-500">12 checks drawn from common recruiter advice, scored live.</p>
        </div>
      </div>
      <ul className="mt-5 space-y-2 text-sm">
        {[
          ['Quantified achievements', true],
          ['Bullets start with action verbs', true],
          ['Replace “responsible for”', false],
        ].map(([label, ok]) => (
          <li key={String(label)} className="flex items-center gap-2.5 text-slate-600">
            <span className={`h-2 w-2 rounded-full ${ok ? 'bg-emerald-500' : 'bg-amber-400'}`} />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const MatchDemo: React.FC = () => (
  <div>
    <Eyebrow icon={<Target className="h-4 w-4" />}>Job match</Eyebrow>
    <p className="text-xl font-bold text-slate-900">Speak the job’s language</p>
    <p className="mt-1 text-sm text-slate-500">Paste a posting. See which keywords you hit and add what’s missing in one tap.</p>
    <div className="mt-4 flex flex-wrap gap-1.5">
      {['React', 'TypeScript', 'Design systems', 'GraphQL'].map(word => (
        <span key={word} className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          ✓ {word}
        </span>
      ))}
      {['Kubernetes', 'CI/CD'].map(word => (
        <span key={word} className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">
          + {word}
        </span>
      ))}
    </div>
  </div>
);

const DesignDemo: React.FC = () => {
  const [accent, setAccent] = useState<PaletteName>('violet');
  return (
    <div className="flex h-full gap-5">
      <div className="flex-1">
        <Eyebrow icon={<Wand2 className="h-4 w-4" />}>Design studio</Eyebrow>
        <p className="text-xl font-bold text-slate-900">Make any template yours</p>
        <p className="mt-1 text-sm text-slate-500">12 accent colors and 10 typefaces work across every design. Tap a color:</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {ACCENT_OPTIONS.slice(0, 8).map(option => (
            <button
              key={option.id}
              type="button"
              onClick={() => setAccent(option.id)}
              aria-label={option.label}
              className={`h-7 w-7 rounded-full transition hover:scale-110 ${accent === option.id ? 'ring-2 ring-slate-900 ring-offset-2' : ''}`}
              style={{ background: `linear-gradient(135deg, ${accentHex(option.id, '400')}, ${accentHex(option.id, '700')})` }}
            />
          ))}
        </div>
      </div>
      <div className="w-[38%] shrink-0 self-center overflow-hidden rounded-lg shadow-xl ring-1 ring-slate-900/10 transition">
        <TemplateThumbnail templateId="cards" accent={accent} eager />
      </div>
    </div>
  );
};

const PrivateDemo: React.FC = () => (
  <div>
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
      <Lock className="h-5 w-5" />
    </div>
    <p className="text-xl font-bold text-slate-900">Private by design</p>
    <p className="mt-1 text-sm leading-relaxed text-slate-500">
      No account, no backend, no analytics. Your resume is saved only in your own browser, and you can back it up to a file anytime.
    </p>
  </div>
);

const ExportDemo: React.FC = () => (
  <div>
    <p className="text-xl font-bold text-slate-900">Export your way</p>
    <p className="mt-1 text-sm text-slate-500">Recruiter-ready in one click.</p>
    <ul className="mt-4 grid grid-cols-2 gap-2 text-sm font-medium text-slate-700">
      {[
        [<FileText key="pdf" className="h-4 w-4" />, 'PDF download'],
        [<Printer key="print" className="h-4 w-4" />, 'ATS-ready print'],
        [<ClipboardCopy key="copy" className="h-4 w-4" />, 'Plain text'],
        [<FileJson key="json" className="h-4 w-4" />, 'JSON backup'],
      ].map(([icon, label]) => (
        <li key={String(label)} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 ring-1 ring-slate-900/5">
          <span className="text-indigo-600">{icon}</span>
          {label}
        </li>
      ))}
    </ul>
  </div>
);

const FeatureBento: React.FC = () => (
  <div className="grid gap-5 lg:grid-cols-6">
    <Card className="lg:col-span-4 lg:row-span-2">
      <LiveDemo />
    </Card>
    <Card className="lg:col-span-2" delay={100}>
      <ScoreDemo />
    </Card>
    <Card className="lg:col-span-2" delay={200}>
      <MatchDemo />
    </Card>
    <Card className="lg:col-span-2">
      <DesignDemo />
    </Card>
    <Card className="lg:col-span-2" delay={100}>
      <PrivateDemo />
    </Card>
    <Card className="lg:col-span-2" delay={200}>
      <ExportDemo />
    </Card>
  </div>
);

export default FeatureBento;
