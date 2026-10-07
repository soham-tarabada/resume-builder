import type { ResumeData } from '../context/ResumeContext';

export const resumeFileName = (data: ResumeData): string => {
  const name = `${data.personalInfo.firstName} ${data.personalInfo.lastName}`.trim();
  const slug = name.replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
  return slug ? `${slug}-Resume` : 'My-Resume';
};

/** Image-based PDF straight to the downloads folder. html2pdf is loaded on first use. */
export const downloadPDF = async (element: HTMLElement, fileName: string): Promise<void> => {
  await document.fonts?.ready;
  const { default: html2pdf } = await import('html2pdf.js');
  await html2pdf()
    .set({
      margin: 0,
      filename: `${fileName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      // Push entries that would straddle a page boundary onto the next page.
      pagebreak: { mode: ['css', 'legacy'], avoid: ['article', 'li', 'h2', 'h3', 'tr'] },
    })
    .from(element)
    .save();
};

export const downloadFile = (content: string, fileName: string, type: string): void => {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export const readFileAsText = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
