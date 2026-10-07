export type MonthYearStyle = 'short' | 'long' | 'numeric' | 'year';

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LONG_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Formats a `YYYY-MM` value from an <input type="month">.
 *
 * Parsed by hand on purpose: `new Date('2023-05')` is read as UTC midnight,
 * which renders as the previous month for anyone west of Greenwich.
 */
export const formatMonthYear = (value: string, style: MonthYearStyle = 'short'): string => {
  const match = /^(\d{4})-(\d{1,2})/.exec(value ?? '');
  if (!match) return '';
  const year = match[1];
  const monthIndex = Number(match[2]) - 1;
  if (monthIndex < 0 || monthIndex > 11) return year;

  switch (style) {
    case 'year':
      return year;
    case 'numeric':
      return `${String(monthIndex + 1).padStart(2, '0')}/${year}`;
    case 'long':
      return `${LONG_MONTHS[monthIndex]} ${year}`;
    default:
      return `${SHORT_MONTHS[monthIndex]} ${year}`;
  }
};

/** Strips protocol and `www.` so links read cleanly on paper. */
export const prettyUrl = (url: string): string =>
  url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

/** Splits a free-text description into bullet lines, dropping leading bullet glyphs. */
export const toBullets = (text: string): string[] =>
  (text ?? '')
    .split('\n')
    .map(line => line.replace(/^\s*([-•*▪●◦]|\d+[.)])\s*/, '').trim())
    .filter(Boolean);

export const dateRange = (
  start: string,
  end: string,
  isCurrent = false,
  style: MonthYearStyle = 'short',
  separator = ' – '
): string => {
  const from = formatMonthYear(start, style);
  const to = isCurrent ? 'Present' : formatMonthYear(end, style);
  if (from && to) return `${from}${separator}${to}`;
  return from || to;
};

export const joinNonEmpty = (parts: Array<string | undefined | null | false>, separator = ', '): string =>
  parts.filter(Boolean).join(separator);

export const initials = (first: string, last: string): string =>
  `${(first ?? '').trim().charAt(0)}${(last ?? '').trim().charAt(0)}`.toUpperCase();

export interface ContactEntry {
  key: 'email' | 'phone' | 'location' | 'linkedin' | 'github' | 'website';
  label: string;
  value: string;
}

interface ContactSource {
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  linkedin: string;
  github: string;
  website: string;
}

export const locationOf = (info: Pick<ContactSource, 'city' | 'state' | 'country'>): string =>
  joinNonEmpty([info.city, info.state, info.country]);

/** Non-empty contact details in display order, with URLs prettified. */
export const contactEntries = (info: ContactSource): ContactEntry[] => {
  const entries: ContactEntry[] = [
    { key: 'email', label: 'Email', value: info.email },
    { key: 'phone', label: 'Phone', value: info.phone },
    { key: 'location', label: 'Location', value: locationOf(info) },
    { key: 'linkedin', label: 'LinkedIn', value: info.linkedin ? prettyUrl(info.linkedin) : '' },
    { key: 'github', label: 'GitHub', value: info.github ? prettyUrl(info.github) : '' },
    { key: 'website', label: 'Website', value: info.website ? prettyUrl(info.website) : '' },
  ];
  return entries.filter(entry => entry.value);
};
