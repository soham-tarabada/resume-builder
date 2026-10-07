import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Download, FileCheck2, Github, LayoutTemplate, PenLine, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { hasContent } from '../../context/resumeData';
import { resumeTemplates } from '../../data/resumeTemplates';
import { ACCENT_OPTIONS, FONT_OPTIONS } from '../../data/theme';
import { prefersReducedMotion, useInView } from '../../hooks/useInView';
import Logo from '../ui/Logo';
import FeatureBento from './FeatureBento';
import HeroShowcase from './HeroShowcase';
import Reveal from './Reveal';
import TemplateMarquee from './TemplateMarquee';

const REPO_URL = 'https://github.com/soham-tarabada/resume-builder';

const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/** Counts up from zero the first time it scrolls into view. */
const CountUp: React.FC<{ to: number; suffix?: string }> = ({ to, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 4))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
};

const SectionHeading: React.FC<{ eyebrow: string; title: React.ReactNode; description: string }> = ({ eyebrow, title, description }) => (
  <Reveal className="mx-auto mb-12 max-w-2xl text-center">
    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">{eyebrow}</p>
    <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{title}</h2>
    <p className="mt-4 text-lg text-slate-500">{description}</p>
  </Reveal>
);

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const { resumeData, updateTemplate } = useResume();
  const returning = hasContent(resumeData);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const startWith = (templateId: string) => {
    updateTemplate(templateId);
    onStart();
  };

  // Soft spotlight that follows the cursor across the hero.
  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  const ctaLabel = returning ? 'Continue your resume' : 'Build my resume, free';

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      {/* Nav */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
          scrolled ? 'border-b border-slate-200/70 bg-white/75 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Resume Builder home">
            <Logo />
          </button>
          <div className="hidden items-center gap-1 text-sm font-medium text-slate-600 md:flex">
            {[
              ['templates', 'Templates'],
              ['features', 'Features'],
              ['how-it-works', 'How it works'],
            ].map(([id, label]) => (
              <button key={id} type="button" onClick={() => scrollToId(id)} className="rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
                {label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:block"
              aria-label="Source code on GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={onStart}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 active:scale-[0.98]"
            >
              {returning ? 'Continue' : 'Get started'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        onPointerMove={handlePointerMove}
        className="relative isolate overflow-hidden pb-24 pt-28 sm:pt-36 lg:pb-32"
        style={{ backgroundImage: 'radial-gradient(600px circle at var(--mx, 70%) var(--my, 30%), rgba(129, 140, 248, 0.13), transparent 45%)' }}
      >
        <div className="bg-grid mask-fade-b absolute inset-0 -z-10" />
        <div className="absolute -left-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute -right-32 top-20 -z-10 h-[460px] w-[460px] rounded-full bg-fuchsia-300/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 -z-10 h-[300px] w-[300px] rounded-full bg-amber-200/30 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="text-center lg:text-left">
            <button
              type="button"
              onClick={() => scrollToId('templates')}
              className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-indigo-200/70 bg-white/80 py-1 pl-1 pr-3 text-sm font-medium text-slate-600 shadow-sm backdrop-blur transition hover:border-indigo-300"
            >
              <span className="rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-2.5 py-0.5 text-xs font-bold text-white">New</span>
              12 fresh templates, live ATS score & job matching
              <ArrowRight className="h-3.5 w-3.5 text-indigo-500" />
            </button>

            <h1 className="animate-fade-up text-[44px] font-extrabold leading-[1.02] tracking-tight text-slate-950 [animation-delay:80ms] sm:text-6xl lg:text-[76px]">
              Build a resume
              <br />
              they{' '}
              <span className="text-gradient animate-shimmer pr-2 font-display text-[1.12em] font-normal italic">can’t ignore.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-slate-600 [animation-delay:160ms] sm:text-xl lg:mx-0">
              Pick from {resumeTemplates.length} live templates, type once, and watch a recruiter-ready resume build itself, scored in real time and
              matched to the job you want.
            </p>

            <div className="mt-9 flex animate-fade-up flex-col items-center justify-center gap-3 [animation-delay:240ms] sm:flex-row lg:justify-start">
              <button
                type="button"
                onClick={onStart}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-indigo-600/30 transition hover:shadow-indigo-600/50 active:scale-[0.98] sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full" />
                {ctaLabel}
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => scrollToId('templates')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-7 py-4 text-base font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:border-slate-300 hover:bg-white sm:w-auto"
              >
                <LayoutTemplate className="h-5 w-5 text-slate-400" /> Browse templates
              </button>
            </div>

            <ul className="mt-9 flex animate-fade-up flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-slate-500 [animation-delay:320ms] lg:justify-start">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> 100% private, no sign-up
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" /> Real-time preview
              </li>
              <li className="flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-indigo-500" /> ATS-friendly PDFs
              </li>
            </ul>
          </div>

          <div className="animate-fade-up px-6 [animation-delay:200ms] sm:px-12 lg:px-6">
            <HeroShowcase />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-100 bg-slate-50/60">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {[
            { value: resumeTemplates.length, suffix: '', label: 'Live templates' },
            { value: (ACCENT_OPTIONS.length + 1) * FONT_OPTIONS.length, suffix: '', label: 'Color & font combos' },
            { value: 100, suffix: '', label: 'Point resume score' },
            { value: 0, suffix: '', label: 'Sign-ups required' },
          ].map(stat => (
            <Reveal key={stat.label} className="text-center">
              <p className="bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="scroll-mt-16 py-24 sm:py-32">
        <div className="px-4 sm:px-6">
          <SectionHeading
            eyebrow="Templates"
            title={
              <>
                {resumeTemplates.length} designs.{' '}
                <span className="font-display text-[1.1em] font-normal italic text-indigo-600">Every one is live.</span>
              </>
            }
            description="From ATS-safe classics to bold creative layouts. Click any template to start with it. You can switch anytime without retyping a thing."
          />
        </div>
        <TemplateMarquee onPick={startWith} />
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-16 bg-gradient-to-b from-slate-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Features"
            title={
              <>
                Everything you need.{' '}
                <span className="font-display text-[1.1em] font-normal italic text-indigo-600">Nothing you don’t.</span>
              </>
            }
            description="A writing coach, a design studio and an ATS checker, all running right in your browser."
          />
          <FeatureBento />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-16 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                From blank page to <span className="font-display text-[1.1em] font-normal italic text-indigo-600">hired</span> in three steps.
              </>
            }
            description="Switch templates, colors and fonts anytime. Your content always follows."
          />
          <div className="relative grid gap-6 md:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-11 hidden border-t-2 border-dashed border-slate-200 md:block" />
            {[
              { icon: <LayoutTemplate className="h-6 w-6" />, title: 'Pick a template', body: 'Browse every design live with real content, and recolor it to match your style.' },
              { icon: <PenLine className="h-6 w-6" />, title: 'Tell your story', body: 'Guided sections, bullet helpers and a live score show you exactly what to improve.' },
              { icon: <Download className="h-6 w-6" />, title: 'Download & apply', body: 'Export a pixel-perfect PDF or an ATS-ready print version, and send it out with confidence.' },
            ].map((step, i) => (
              <Reveal key={step.title} delay={i * 120} className="relative text-center">
                <div className="relative mx-auto mb-6 flex h-[88px] w-[88px] items-center justify-center rounded-3xl bg-white shadow-xl shadow-indigo-500/10 ring-1 ring-slate-900/5">
                  <span className="text-indigo-600">{step.icon}</span>
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-xs font-bold text-white shadow-lg">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-slate-500">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-24 sm:px-6">
        <Reveal className="mx-auto max-w-6xl">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-20 text-center shadow-2xl sm:px-16">
            <div className="absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-indigo-600/40 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 -z-10 h-80 w-80 rounded-full bg-fuchsia-600/30 blur-3xl" />
            <div className="bg-grid absolute inset-0 -z-10 opacity-20" />
            <Sparkles className="mx-auto mb-6 h-8 w-8 text-amber-300" />
            <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Your next role is one great resume{' '}
              <span className="font-display font-normal italic text-indigo-300">away.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">No account. No credit card. No catch. Just a resume you’ll be proud to send.</p>
            <button
              type="button"
              onClick={onStart}
              className="group mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-2xl shadow-indigo-500/20 transition hover:bg-indigo-50 active:scale-[0.98]"
            >
              {ctaLabel}
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-slate-500 sm:flex-row sm:px-6">
          <Logo />
          <p>Built with React, TypeScript & Tailwind CSS. Your data never leaves your browser.</p>
          <div className="flex items-center gap-4">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-slate-900">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
