import React, { CSSProperties, useEffect } from 'react';
import { AccentContext } from '../../context/AccentContext';
import type { ResumeTheme } from '../../context/ResumeContext';
import { getTemplate } from '../../data/resumeTemplates';
import { accentVars, ensureFontLoaded, getFontOption } from '../../data/theme';
import { A4_MIN_HEIGHT_PX, A4_WIDTH_PX } from '../../utils/page';

interface ResumeDocumentProps {
  templateId: string;
  theme: ResumeTheme;
  id?: string;
}

/**
 * One resume page at true A4 width with the theme (accent + font) applied as
 * CSS variables on the root, so exports and clones carry the styling with them.
 */
const ResumeDocument: React.FC<ResumeDocumentProps> = ({ templateId, theme, id }) => {
  const template = getTemplate(templateId);
  const Template = template.component;
  const palette = template.supportsAccent && theme.accent ? theme.accent : template.defaultAccent;
  const font = getFontOption(theme.font);

  useEffect(() => {
    ensureFontLoaded(font);
  }, [font]);

  const style = {
    ...accentVars(palette),
    width: A4_WIDTH_PX,
    minHeight: A4_MIN_HEIGHT_PX,
    ...(font.stack ? { '--resume-font': font.stack } : {}),
  } as CSSProperties;

  return (
    <div
      id={id}
      className={`resume-document bg-white text-left ${font.stack ? 'resume-font-override' : ''}`}
      style={style}
    >
      <AccentContext.Provider value={palette}>
        <Template />
      </AccentContext.Provider>
    </div>
  );
};

export default ResumeDocument;
