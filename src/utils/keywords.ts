import type { ResumeData } from '../context/ResumeContext';

const STOPWORDS = new Set(
  `a about above across after again against all also am an and any are as at be because been before being below between both
  but by can could did do does doing down during each either else ever every few for from further get gets had has have having
  he her here hers him his how i if in into is it its itself just let like may me might more most much must my no nor not now
  of off on once only or other our ours out over own per same she should so some such than that the their theirs them then
  there these they this those through to too under until up upon us very via was we were what when where which while who whom
  why will with within without would yet you your yours
  ability able apply applicant applicants based benefit benefits best bonus candidate candidates company culture day days
  degree demonstrated description desired duties environment equal equivalent etc excellent experience experienced familiarity
  field full good great help highly ideal including include includes job join knowledge level looking make manage minimum
  new offer opportunity opportunities paid plus position preferred proficiency proficient proven qualification qualifications
  related required requirement requirements responsibilities responsibility role salary seeking skill skills strong success
  successful team teams time understanding using use well work working world year years
  build building collaborate collaborating create creating deliver delivering delightful drive driving dynamic ensure
  exciting fast-paced help helping impact innovative leverage nice passionate partner partnering self-starter support thrive`.split(/\s+/)
);

const TOKEN = /[a-z0-9][a-z0-9+#./-]*/g;

const cleanToken = (token: string) => token.replace(/[./-]+$/, '');

const isKeyword = (token: string) => token.length > 1 && !STOPWORDS.has(token) && /[a-z]/.test(token);

/** Merges simple plurals ("systems" → "system") without mangling short terms like "aws". */
const keyOf = (token: string) => (token.length > 4 && token.endsWith('s') && !token.endsWith('ss') ? token.slice(0, -1) : token);

interface TermStats {
  display: string;
  score: number;
  first: number;
}

/**
 * Pulls the most significant terms out of a job description: frequent words
 * and recurring two-word phrases, boosted when written as proper nouns or
 * tool names (React, AWS, C++, Node.js).
 */
export const extractKeywords = (text: string, limit = 24): string[] => {
  const terms = new Map<string, TermStats>();
  const bump = (key: string, display: string, amount: number, position: number) => {
    const entry = terms.get(key);
    if (entry) entry.score += amount;
    else terms.set(key, { display, score: amount, first: position });
  };

  // Split on sentence punctuation, but keep dots inside names like Node.js.
  const sentences = text.split(/[\n;:!?•·()]+|\.(?=\s|$)/);
  let position = 0;
  for (const sentence of sentences) {
    const originals = sentence.match(/[A-Za-z0-9][A-Za-z0-9+#./-]*/g) ?? [];
    const tokens = (sentence.toLowerCase().match(TOKEN) ?? []).map(cleanToken);
    tokens.forEach((token, i) => {
      position++;
      if (!isKeyword(token)) return;
      const original = cleanToken(originals[i] ?? token);
      const looksNamed = (i > 0 && /^[A-Z]/.test(original)) || /[+#.]/.test(token) || /^[A-Z0-9]{2,}$/.test(original);
      // Display the term as the posting wrote it ("Kubernetes", "CI/CD"), unless it only led a sentence.
      const display = i === 0 && /^[A-Z][a-z]+$/.test(original) ? token : original;
      bump(keyOf(token), display, looksNamed ? 2 : 1, position);
      const next = tokens[i + 1];
      if (next && isKeyword(next)) bump(`${keyOf(token)} ${keyOf(next)}`, `${original} ${cleanToken(originals[i + 1] ?? next)}`, 1, position);
    });
  }

  const ranked = [...terms.entries()]
    // A phrase only earns a slot when it recurs; otherwise its words already count.
    .filter(([key, { score }]) => !key.includes(' ') || score >= 2)
    .sort((a, b) => b[1].score - a[1].score || a[1].first - b[1].first);

  const picked: { key: string; display: string }[] = [];
  const phraseWords = new Set<string>();
  for (const [key, { display }] of ranked) {
    if (key.includes(' ')) {
      const words = key.split(' ');
      if (words.some(word => phraseWords.has(word))) continue;
      words.forEach(word => phraseWords.add(word));
      // A phrase replaces the single words it contains.
      for (let i = picked.length - 1; i >= 0; i--) if (words.includes(picked[i].key)) picked.splice(i, 1);
      picked.push({ key, display });
    } else if (!phraseWords.has(key)) {
      picked.push({ key, display });
    }
  }
  return picked.slice(0, limit).map(term => term.display);
};

export const resumeToPlainText = (data: ResumeData): string => {
  const { personalInfo: p, experience, education, projects, skills } = data;
  const lines: string[] = [];
  lines.push(`${p.firstName} ${p.lastName}`.trim());
  if (p.title) lines.push(p.title);
  lines.push([p.email, p.phone, [p.city, p.state, p.country].filter(Boolean).join(', ')].filter(Boolean).join(' | '));
  const links = [p.linkedin, p.github, p.website].filter(Boolean);
  if (links.length) lines.push(links.join(' | '));
  if (p.summary) lines.push('', 'SUMMARY', p.summary);
  if (experience.length) {
    lines.push('', 'EXPERIENCE');
    for (const exp of experience) {
      lines.push(`${exp.position}, ${exp.company}${exp.location ? ` (${exp.location})` : ''}`);
      lines.push(`${exp.startDate || ''} - ${exp.isCurrentPosition ? 'Present' : exp.endDate || ''}`);
      if (exp.description) lines.push(exp.description);
      lines.push('');
    }
  }
  if (education.length) {
    lines.push('EDUCATION');
    for (const edu of education) {
      lines.push(`${[edu.degree, edu.fieldOfStudy].filter(Boolean).join(', ')}, ${edu.institution}`);
      if (edu.description) lines.push(edu.description);
    }
  }
  if (projects.length) {
    lines.push('', 'PROJECTS');
    for (const project of projects) {
      lines.push(`${project.title}${project.technologies ? ` (${project.technologies})` : ''}`);
      if (project.description) lines.push(project.description);
    }
  }
  if (skills.length) lines.push('', 'SKILLS', skills.map(skill => skill.name).filter(Boolean).join(', '));
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Splits keywords into those the resume already mentions and those it lacks. */
export const matchKeywords = (keywords: string[], data: ResumeData) => {
  const haystack = resumeToPlainText(data).toLowerCase();
  const matched: string[] = [];
  const missing: string[] = [];
  for (const keyword of keywords) {
    const lower = keyword.toLowerCase();
    const stem = lower.endsWith('s') && lower.length > 3 ? lower.slice(0, -1) : lower;
    const pattern = new RegExp(`(^|[^a-z0-9])${escapeRegExp(stem)}(s|es)?(?=$|[^a-z0-9])`);
    (pattern.test(haystack) ? matched : missing).push(keyword);
  }
  const percent = keywords.length ? Math.round((matched.length / keywords.length) * 100) : 0;
  return { matched, missing, percent };
};
