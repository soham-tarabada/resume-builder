import React from 'react';
import { useResume } from '../../context/ResumeContext';
import ResumeDocument from './ResumeDocument';

export const RESUME_PREVIEW_ID = 'resume-preview';

/** The user's resume, rendered at A4 width. Wrap in ScaledPage to fit a panel. */
const ResumePreview: React.FC = () => {
  const { resumeData } = useResume();
  return <ResumeDocument id={RESUME_PREVIEW_ID} templateId={resumeData.selectedTemplate} theme={resumeData.theme} />;
};

export default ResumePreview;
