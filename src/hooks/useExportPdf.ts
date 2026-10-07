import { useCallback, useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { hasContent } from '../context/resumeData';
import { getTemplate } from '../data/resumeTemplates';
import { accentHex } from '../data/theme';
import { RESUME_PREVIEW_ID } from '../components/preview/ResumePreview';
import { useToast } from '../components/ui/Toast';
import { launchConfetti } from '../utils/confetti';
import { downloadPDF, resumeFileName } from '../utils/exporters';

/** Downloads the live preview as a PDF and celebrates in the resume's own colors. */
export const useExportPdf = () => {
  const { resumeData } = useResume();
  const notify = useToast();
  const [exporting, setExporting] = useState(false);

  const exportPdf = useCallback(async () => {
    if (!hasContent(resumeData)) {
      notify('Add your details first. Your PDF will be built from them.', { tone: 'info' });
      return;
    }
    const element = document.getElementById(RESUME_PREVIEW_ID);
    if (!element) return;
    setExporting(true);
    try {
      await downloadPDF(element, resumeFileName(resumeData));
      const template = getTemplate(resumeData.selectedTemplate);
      const palette = template.supportsAccent && resumeData.theme.accent ? resumeData.theme.accent : template.defaultAccent;
      launchConfetti([accentHex(palette, '300'), accentHex(palette, '500'), accentHex(palette, '700'), '#fbbf24', '#f472b6', '#818cf8']);
      notify('PDF downloaded. Go get that job!');
    } catch (error) {
      console.error('PDF export failed', error);
      notify('PDF export failed. Try “Print / Save as PDF” instead.', { tone: 'error' });
    } finally {
      setExporting(false);
    }
  }, [resumeData, notify]);

  return { exporting, exportPdf };
};
