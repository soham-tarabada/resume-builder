import type { CSSProperties } from 'react';
import { ACCENT_SHADES, PALETTES, PaletteName } from './palettes';

export interface AccentOption {
  id: PaletteName;
  label: string;
}

/** Accent colors offered in the design studio, in picker order. */
export const ACCENT_OPTIONS: AccentOption[] = [
  { id: 'blue', label: 'Ocean' },
  { id: 'indigo', label: 'Indigo' },
  { id: 'violet', label: 'Violet' },
  { id: 'fuchsia', label: 'Orchid' },
  { id: 'rose', label: 'Rose' },
  { id: 'red', label: 'Crimson' },
  { id: 'orange', label: 'Tangerine' },
  { id: 'amber', label: 'Amber' },
  { id: 'emerald', label: 'Emerald' },
  { id: 'teal', label: 'Teal' },
  { id: 'cyan', label: 'Lagoon' },
  { id: 'slate', label: 'Graphite' },
];

/** CSS custom properties consumed by the `accent-*` Tailwind colors. */
export const accentVars = (palette: PaletteName): CSSProperties => {
  const channels = PALETTES[palette] ?? PALETTES.blue;
  const vars: Record<string, string> = {};
  ACCENT_SHADES.forEach((shade, i) => {
    vars[`--accent-${shade}`] = channels[i];
  });
  return vars as CSSProperties;
};

export const accentHex = (palette: PaletteName, shade: (typeof ACCENT_SHADES)[number] = '600'): string => {
  const channels = PALETTES[palette][ACCENT_SHADES.indexOf(shade)];
  return `#${channels
    .split(' ')
    .map(c => Number(c).toString(16).padStart(2, '0'))
    .join('')}`;
};

export interface FontOption {
  id: string;
  label: string;
  stack: string;
  /** Google Fonts family query, loaded on demand. */
  googleFamily?: string;
  kind: 'Sans' | 'Serif' | 'Mono';
}

export const FONT_OPTIONS: FontOption[] = [
  { id: 'default', label: 'Template default', stack: '', kind: 'Sans' },
  { id: 'inter', label: 'Inter', stack: "'Inter', system-ui, sans-serif", kind: 'Sans' },
  { id: 'lato', label: 'Lato', stack: "'Lato', 'Helvetica Neue', Arial, sans-serif", googleFamily: 'Lato:wght@300;400;700;900', kind: 'Sans' },
  { id: 'poppins', label: 'Poppins', stack: "'Poppins', 'Helvetica Neue', Arial, sans-serif", googleFamily: 'Poppins:wght@300;400;500;600;700', kind: 'Sans' },
  { id: 'source-sans', label: 'Source Sans 3', stack: "'Source Sans 3', 'Helvetica Neue', Arial, sans-serif", googleFamily: 'Source+Sans+3:wght@300;400;600;700', kind: 'Sans' },
  { id: 'merriweather', label: 'Merriweather', stack: "'Merriweather', Georgia, serif", googleFamily: 'Merriweather:wght@300;400;700', kind: 'Serif' },
  { id: 'lora', label: 'Lora', stack: "'Lora', Georgia, serif", googleFamily: 'Lora:wght@400;500;600;700', kind: 'Serif' },
  { id: 'playfair', label: 'Playfair Display', stack: "'Playfair Display', Georgia, serif", googleFamily: 'Playfair+Display:wght@400;600;700;800', kind: 'Serif' },
  { id: 'garamond', label: 'EB Garamond', stack: "'EB Garamond', Garamond, Georgia, serif", googleFamily: 'EB+Garamond:wght@400;500;600;700', kind: 'Serif' },
  { id: 'jetbrains', label: 'JetBrains Mono', stack: "'JetBrains Mono', ui-monospace, monospace", googleFamily: 'JetBrains+Mono:wght@400;500;700', kind: 'Mono' },
];

export const getFontOption = (id: string): FontOption =>
  FONT_OPTIONS.find(font => font.id === id) ?? FONT_OPTIONS[0];

/** Injects the Google Fonts stylesheet for a font the first time it is used. */
export const ensureFontLoaded = (font: FontOption): void => {
  if (!font.googleFamily || typeof document === 'undefined') return;
  const id = `font-${font.id}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${font.googleFamily}&display=swap`;
  document.head.appendChild(link);
};
