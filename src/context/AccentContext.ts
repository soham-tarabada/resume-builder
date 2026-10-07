import { createContext, useContext } from 'react';
import type { AccentShade, PaletteName } from '../data/palettes';
import { accentHex } from '../data/theme';

export const AccentContext = createContext<PaletteName>('blue');

/**
 * Literal hex for an accent shade. Use for SVG fills/strokes: PDF export
 * rasterizes SVG in isolation, where CSS variables and currentColor don't resolve.
 */
export const useAccentHex = () => {
  const palette = useContext(AccentContext);
  return (shade: AccentShade = '600') => accentHex(palette, shade);
};
