import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ChevronDown,
  ClipboardCopy,
  Cloud,
  CloudOff,
  Download,
  FileJson,
  Gauge,
  LayoutTemplate,
  Loader2,
  MoreHorizontal,
  Printer,
  RotateCcw,
  Upload,
  Wand2,
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { hasContent } from '../../context/resumeData';
import { useDismiss } from '../../hooks/useDismiss';
import { useExportPdf } from '../../hooks/useExportPdf';
import { downloadFile, readFileAsText, resumeFileName } from '../../utils/exporters';
import { resumeToPlainText } from '../../utils/keywords';
import { scoreColor, scoreResume } from '../../utils/resumeScore';
import Logo from '../ui/Logo';
import { useToast } from '../ui/Toast';

interface BuilderHeaderProps {
  onOpenGallery: () => void;
  onOpenInsights: () => void;
  onPrint: () => void;
}

const MenuItem: React.FC<{ icon: React.ReactNode; title: string; description?: string; onClick: () => void; danger?: boolean }> = ({
  icon,
  title,
  description,
  onClick,
  danger,
}) => (
  <button
    type="button"
    role="menuitem"
    onClick={onClick}
    className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${danger ? 'hover:bg-rose-50' : 'hover:bg-slate-50'}`}
  >
    <span className={`mt-0.5 ${danger ? 'text-rose-500' : 'text-slate-400'}`}>{icon}</span>
    <span>
      <span className={`block text-sm font-semibold ${danger ? 'text-rose-600' : 'text-slate-800'}`}>{title}</span>
      {description && <span className="block text-xs text-slate-500">{description}</span>}
    </span>
  </button>
);

const menuPanel = 'absolute right-0 top-full z-50 mt-2 w-72 animate-scale-in rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl shadow-slate-900/10';

const BuilderHeader: React.FC<BuilderHeaderProps> = ({ onOpenGallery, onOpenInsights, onPrint }) => {
  const { resumeData, savedAt, loadSample, importResume, resetResume } = useResume();
  const notify = useToast();
  const { exporting, exportPdf } = useExportPdf();
  const [menu, setMenu] = useState<'export' | 'more' | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const closeMenu = useCallback(() => setMenu(null), []);
  useDismiss(exportRef, menu === 'export', closeMenu);
  useDismiss(moreRef, menu === 'more', closeMenu);

  const { score } = useMemo(() => scoreResume(resumeData), [resumeData]);

  const run = (action: () => void) => () => {
    setMenu(null);
    action();
  };

  const withUndo = (message: string, change: () => void) => {
    const snapshot = resumeData;
    change();
    notify(message, { tone: 'info', action: { label: 'Undo', onClick: () => importResume(snapshot) } });
  };

  const copyPlainText = async () => {
    try {
      await navigator.clipboard.writeText(resumeToPlainText(resumeData));
      notify('Plain-text resume copied to clipboard');
    } catch {
      notify('Clipboard access was blocked by the browser', { tone: 'error' });
    }
  };

  const backup = () => {
    downloadFile(JSON.stringify(resumeData, null, 2), `${resumeFileName(resumeData)}.json`, 'application/json');
    notify('Backup saved. Import it anytime to pick up where you left off.');
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const parsed = JSON.parse(await readFileAsText(file));
      withUndo('Backup imported', () => importResume(parsed));
    } catch {
      notify('That file is not a valid resume backup', { tone: 'error' });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1680px] items-center gap-3 px-4 sm:px-6">
        <a href="#/" className="shrink-0 rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30" aria-label="Back to home">
          <Logo className="sm:hidden" showName={false} />
          <Logo className="hidden sm:inline-flex" />
        </a>

        <span
          className={`hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium md:inline-flex ${
            savedAt ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
          }`}
        >
          {savedAt ? <Cloud className="h-3.5 w-3.5" /> : <CloudOff className="h-3.5 w-3.5" />}
          {savedAt ? 'Saved in this browser' : 'Not saved: storage unavailable'}
        </span>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onOpenGallery}
            className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
          >
            <LayoutTemplate className="h-4 w-4" /> Templates
          </button>

          <button
            type="button"
            onClick={onOpenInsights}
            className="inline-flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:px-3"
            aria-label={`Insights, resume score ${score}`}
          >
            <Gauge className="h-4 w-4" />
            <span className="hidden lg:inline">Insights</span>
            <span className="rounded-md px-1.5 py-0.5 text-xs font-bold tabular-nums text-white" style={{ backgroundColor: scoreColor(score) }}>
              {score}
            </span>
          </button>

          <div ref={exportRef} className="relative flex">
            <button
              type="button"
              onClick={exportPdf}
              disabled={exporting}
              className="inline-flex items-center gap-2 rounded-l-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-2 pl-3.5 pr-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:from-indigo-500 hover:to-violet-500 disabled:opacity-70"
            >
              {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              <span className="hidden sm:inline">{exporting ? 'Preparing…' : 'Download PDF'}</span>
            </button>
            <button
              type="button"
              onClick={() => setMenu(menu === 'export' ? null : 'export')}
              aria-expanded={menu === 'export'}
              aria-haspopup="menu"
              aria-label="More export options"
              className="rounded-r-xl border-l border-white/20 bg-violet-600 px-2 text-white transition hover:bg-violet-500"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            {menu === 'export' && (
              <div className={menuPanel} role="menu">
                <MenuItem icon={<Download className="h-4 w-4" />} title="Download PDF" description="Pixel-perfect copy, straight to your downloads" onClick={run(exportPdf)} />
                <MenuItem icon={<Printer className="h-4 w-4" />} title="Print / Save as PDF" description="Selectable text, best for ATS uploads" onClick={run(onPrint)} />
                <MenuItem icon={<ClipboardCopy className="h-4 w-4" />} title="Copy as plain text" description="For pasting into application forms" onClick={run(copyPlainText)} />
                <MenuItem icon={<FileJson className="h-4 w-4" />} title="Save backup (.json)" description="Move your resume to another device" onClick={run(backup)} />
              </div>
            )}
          </div>

          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMenu(menu === 'more' ? null : 'more')}
              aria-expanded={menu === 'more'}
              aria-haspopup="menu"
              aria-label="More actions"
              className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
            {menu === 'more' && (
              <div className={menuPanel} role="menu">
                <MenuItem
                  icon={<LayoutTemplate className="h-4 w-4" />}
                  title="Browse templates"
                  onClick={run(onOpenGallery)}
                />
                <MenuItem
                  icon={<Wand2 className="h-4 w-4" />}
                  title="Load example resume"
                  description="See every template at its best"
                  onClick={run(() => withUndo('Example resume loaded', loadSample))}
                />
                <MenuItem
                  icon={<Upload className="h-4 w-4" />}
                  title="Import backup (.json)"
                  onClick={run(() => fileRef.current?.click())}
                />
                <div className="my-1 h-px bg-slate-100" />
                <MenuItem
                  icon={<RotateCcw className="h-4 w-4" />}
                  title="Start over"
                  description="Clear all content (you can undo)"
                  danger
                  onClick={run(() => hasContent(resumeData) && withUndo('Resume cleared', resetResume))}
                />
              </div>
            )}
            <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={handleImport} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default BuilderHeader;
