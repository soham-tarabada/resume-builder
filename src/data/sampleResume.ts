import type { ResumeData } from '../context/ResumeContext';

/**
 * A fictional, fully filled-in resume. Powers template thumbnails, the landing
 * page showcase, and the "Load example" action in the builder.
 */
export const sampleResume: ResumeData = {
  personalInfo: {
    firstName: 'Jordan',
    lastName: 'Avery',
    title: 'Senior Product Engineer',
    email: 'jordan.avery@example.com',
    phone: '(415) 555-0142',
    address: '',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '',
    country: 'USA',
    summary:
      'Product-minded engineer with 8 years of experience shipping web platforms used by millions. I pair deep TypeScript expertise with a designer’s eye to turn fuzzy ideas into fast, delightful products.',
    linkedin: 'https://linkedin.com/in/jordan-avery',
    github: 'https://github.com/jordanavery',
    website: 'https://jordanavery.dev'
  },
  experience: [
    {
      id: 'sample-exp-1',
      company: 'Lumen Labs',
      position: 'Senior Product Engineer',
      location: 'San Francisco, CA',
      startDate: '2023-03',
      endDate: '',
      isCurrentPosition: true,
      description:
        '• Led a 6-engineer squad rebuilding onboarding, lifting activation 27%\n• Migrated 40+ screens to a new design system, cutting UI bugs 35%\n• Cut p95 page load from 3.1s to 1.2s with code-splitting and edge caching'
    },
    {
      id: 'sample-exp-2',
      company: 'Northwind Commerce',
      position: 'Software Engineer II',
      location: 'Seattle, WA',
      startDate: '2020-06',
      endDate: '2023-02',
      isCurrentPosition: false,
      description:
        '• Built a real-time inventory service handling 12k events/sec at 99.98% uptime\n• Launched one-click checkout, lifting conversion 9% ($4.2M a year)\n• Mentored 4 engineers and introduced an RFC process used company-wide'
    },
    {
      id: 'sample-exp-3',
      company: 'Brightpath Health',
      position: 'Frontend Developer',
      location: 'Remote',
      startDate: '2018-07',
      endDate: '2020-05',
      isCurrentPosition: false,
      description:
        '• Shipped a WCAG 2.1 AA patient portal for 300k monthly users\n• Automated visual regression tests, saving QA 15 hours per release'
    }
  ],
  education: [
    {
      id: 'sample-edu-1',
      institution: 'University of Washington',
      degree: 'B.S. Computer Science',
      fieldOfStudy: 'Human-Computer Interaction',
      startDate: '2014-09',
      endDate: '2018-06',
      description: 'GPA 3.8 · Dean’s List · ACM chapter lead'
    }
  ],
  projects: [
    {
      id: 'sample-proj-1',
      title: 'Pulseboard',
      description: 'Open-source real-time analytics dashboard with 2.1k GitHub stars.',
      technologies: 'React, WebSockets, ClickHouse',
      link: 'https://github.com/jordanavery/pulseboard'
    },
    {
      id: 'sample-proj-2',
      title: 'Tiny Forms',
      description: 'A 3 kB accessible form-validation library.',
      technologies: 'TypeScript, Vitest',
      link: 'https://jordanavery.dev/tiny-forms'
    }
  ],
  skills: [
    { id: 'sample-skill-1', name: 'TypeScript', level: 5 },
    { id: 'sample-skill-2', name: 'React', level: 5 },
    { id: 'sample-skill-3', name: 'Node.js', level: 4 },
    { id: 'sample-skill-4', name: 'GraphQL', level: 4 },
    { id: 'sample-skill-5', name: 'PostgreSQL', level: 4 },
    { id: 'sample-skill-6', name: 'AWS', level: 3 },
    { id: 'sample-skill-7', name: 'Design Systems', level: 5 },
    { id: 'sample-skill-8', name: 'Product Strategy', level: 4 }
  ],
  selectedTemplate: 'modern',
  theme: { accent: null, font: 'default' }
};
