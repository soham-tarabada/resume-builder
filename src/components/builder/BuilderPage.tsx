import React, { useCallback, useState } from 'react';
import { Download, Eye, Loader2, PenLine, Wand2 } from 'lucide-react';
import { ResumeDataProvider, useResume } from '../../context/ResumeContext';
import { hasContent } from '../../context/resumeData';
import { getTemplate } from '../../data/resumeTemplates';
import { sampleResume } from '../../data/sampleResume';
import { useExportPdf } from '../../hooks/useExportPdf';
import type { EditorSection } from '../../utils/resumeScore';
import ResumeForm from '../form/ResumeForm';
import ResumeDocument from '../preview/ResumeDocument';
import ResumePreview from '../preview/ResumePreview';
import ScaledPage from '../preview/ScaledPage';
import { useToast } from '../ui/Toast';
import BuilderHeader from './BuilderHeader';
import DesignControls, { ZoomControl } from './DesignControls';
import InsightsDrawer, { InsightsTab } from './InsightsDrawer';
import PrintPortal from './PrintPortal';
import ScoreCard from './ScoreCard';
import TemplateGallery from './TemplateGallery';
import TemplateStrip from './TemplateStrip';

const BuilderPage: React.FC = () => {
  const { resumeData, loadSample } = useResume();
  const { exporting, exportPdf } = useExportPdf();
  const notify = useToast();
  const [section, setSection] = useState<EditorSection>('personal');
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [insightsTab, setInsightsTab] = useState<InsightsTab>('score');
  const [printing, setPrinting] = useState(false);
  const [zoom, setZoom] = useState(1);

  const template = getTemplate(resumeData.selectedTemplate);
  const openGallery = useCallback(() => setGalleryOpen(true), []);
  const closeGallery = useCallback(() => setGalleryOpen(false), []);
  const closeInsights = useCallback(() => setInsightsOpen(false), []);
  const finishPrinting = useCallback(() => setPrinting(false), []);

  const openInsights = (tab: InsightsTab) => {
    setInsightsTab(tab);
    setInsightsOpen(true);
  };

  const jumpToSection = (target: EditorSection) => {
    setSection(target);
    setMobileView('edit');
    setInsightsOpen(false);
    requestAnimationFrame(() => document.getElementById('editor-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <BuilderHeader onOpenGallery={openGallery} onOpenInsights={() => openInsights('score')} onPrint={() => (hasContent(resumeData) ? setPrinting(true) : notify('Add your details first, then print.', { tone: 'info' }))} />

      <div className="mx-auto grid max-w-[1680px] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">
        {/* Editor */}
        <section className={`px-4 pb-32 pt-6 sm:px-8 lg:pb-16 lg:pt-8 ${mobileView === 'edit' ? '' : 'hidden lg:block'}`} aria-label="Editor">
          <div className="mx-auto max-w-2xl">
            <ScoreCard onOpen={() => openInsights('score')} />

            {!hasContent(resumeData) && (
              <div className="mb-8 flex flex-col gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-5 text-white shadow-xl shadow-indigo-600/20 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <p className="font-semibold">Starting from a blank page?</p>
                  <p className="mt-0.5 text-sm text-indigo-100">Load a complete example to see each template at its best, then make it yours.</p>
                </div>
                <button
                  type="button"
                  onClick={loadSample}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50 active:scale-[0.98]"
                >
                  <Wand2 className="h-4 w-4" /> Load example
                </button>
              </div>
            )}

            <ResumeForm section={section} onSectionChange={setSection} />
          </div>
        </section>

        {/* Live preview */}
        <section
          className={`border-slate-200 bg-slate-100 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto lg:border-l ${
            mobileView === 'preview' ? 'min-h-[calc(100vh-4rem)]' : 'hidden lg:block'
          }`}
          aria-label="Live preview"
        >
          <div className="sticky top-0 z-20 border-b border-slate-200/70 bg-slate-100/85 pt-4 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 pb-3 sm:px-8">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Template</p>
                <button type="button" onClick={openGallery} className="group flex items-center gap-2 text-left">
                  <span className="truncate text-base font-bold text-slate-900">{template.name}</span>
                  <span className="rounded-md bg-white px-1.5 py-0.5 text-[11px] font-semibold text-slate-500 ring-1 ring-slate-200 transition group-hover:text-indigo-600 group-hover:ring-indigo-200">
                    Change
                  </span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <DesignControls />
                <ZoomControl zoom={zoom} onChange={setZoom} />
              </div>
            </div>
            <TemplateStrip onBrowseAll={openGallery} />
          </div>

          <div className="overflow-x-auto px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
            {/* Below 100% the page narrows; above it, it grows past the panel and scrolls sideways. */}
            <div className="mx-auto" style={zoom > 1 ? { width: `${zoom * 100}%` } : { maxWidth: 820 * zoom }}>
              <div className="overflow-hidden rounded-sm bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/5">
                {hasContent(resumeData) ? (
                  <ScaledPage showPageBreaks>
                    <ResumePreview />
                  </ScaledPage>
                ) : (
                  <div className="relative">
                    <div className="pointer-events-none select-none opacity-35 grayscale-[30%]" aria-hidden="true">
                      <ScaledPage clipToPage>
                        <ResumeDataProvider data={sampleResume}>
                          <ResumeDocument templateId={resumeData.selectedTemplate} theme={resumeData.theme} />
                        </ResumeDataProvider>
                      </ScaledPage>
                    </div>
                    <div className="absolute inset-x-0 top-[18%] flex justify-center px-6">
                      <div className="max-w-xs rounded-2xl bg-white/95 p-5 text-center shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5 backdrop-blur">
                        <p className="font-semibold text-slate-900">This is {template.name} with example content</p>
                        <p className="mt-1 text-sm text-slate-500">Start typing on the left and your resume builds itself here, live.</p>
                        <button
                          type="button"
                          onClick={loadSample}
                          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          <Wand2 className="h-4 w-4" /> Load example to edit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-slate-400">
              What you see is exactly what you download. Dashed lines mark page breaks.
            </p>
          </div>
        </section>
      </div>

      {/* Mobile switcher */}
      <div className="fixed inset-x-4 bottom-4 z-40 flex items-center gap-1 rounded-2xl bg-slate-900/95 p-1.5 text-white shadow-2xl shadow-slate-900/40 backdrop-blur lg:hidden">
        {[
          { id: 'edit' as const, label: 'Edit', icon: <PenLine className="h-4 w-4" /> },
          { id: 'preview' as const, label: 'Preview', icon: <Eye className="h-4 w-4" /> },
        ].map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setMobileView(item.id);
              window.scrollTo({ top: 0 });
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${
              mobileView === item.id ? 'bg-white text-slate-900' : 'text-slate-300'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
        <button
          type="button"
          onClick={exportPdf}
          disabled={exporting}
          className="flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5"
          aria-label="Download PDF"
        >
          {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        </button>
      </div>

      <TemplateGallery open={galleryOpen} onClose={closeGallery} />
      <InsightsDrawer open={insightsOpen} tab={insightsTab} onTabChange={setInsightsTab} onClose={closeInsights} onNavigate={jumpToSection} />
      {printing && <PrintPortal onDone={finishPrinting} />}
    </div>
  );
};

export default BuilderPage;
