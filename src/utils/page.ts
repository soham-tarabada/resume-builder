/** A4 at 96 CSS px per inch: 210mm × 297mm (793.7 × 1122.5px). */
export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1122;

/**
 * Minimum rendered page height. Kept a hair under a full page so a one-page
 * resume never rounds up into a blank second PDF page.
 */
export const A4_MIN_HEIGHT_PX = A4_HEIGHT_PX - 2;
