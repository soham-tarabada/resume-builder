# Resume Builder

Resume Builder is a modern, easy-to-use web application for creating beautiful, professional resumes. It features real-time preview, PDF export, and multiple templates, making it simple for users to craft and download their resumes quickly.

You can access the live version of this project at:  
[Live Portfolio Website Link](https://soham-tarabada.github.io/resume-builder/)

## Features
- **Live Resume Editing:** Fill out forms for personal info, education, experience, projects, and skills.
- **Multiple Templates:** Choose from various professionally designed resume templates.
- **Real-Time Preview:** Instantly see changes reflected in the resume preview.
- **PDF Export:** Download your resume as a PDF using html2pdf.js.
- **Responsive UI:** Built with React and styled using Tailwind CSS for a seamless experience on all devices.

## Tech Stack
- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **PDF Export:** html2pdf.js
- **State Management:** React Context API
- **Build Tool:** Vite
- **Linting:** ESLint

## Project Structure
```
Resume Builder/
│
├── public/                # Static assets (if any)
├── src/                   # Source code
│   ├── App.tsx            # Main app component
│   ├── index.css          # Global styles (Tailwind)
│   ├── main.tsx           # App entry point
│   ├── vite-env.d.ts      # Vite/TypeScript env types
│   ├── components/        # Reusable UI and form components
│   │   ├── ResumeBuilder.tsx
│   │   └── form/          # Form sections for resume fields
│   │       ├── EducationForm.tsx
│   │       ├── ExperienceForm.tsx
│   │       ├── PersonalInfoForm.tsx
│   │       ├── ProjectForm.tsx
│   │       ├── ResumeForm.tsx
│   │       ├── SkillsForm.tsx
│   │       └── TemplateSelector.tsx
│   │   └── layout/        # Layout components (e.g., Header)
│   │       └── Header.tsx
│   │   └── preview/       # Resume preview and templates
│   │       ├── ResumePreview.tsx
│   │       └── templates/
│   │           ├── ClassicTemplate.tsx
│   │           ├── CreativeTemplate.tsx
│   │           ├── MinimalTemplate.tsx
│   │           ├── ModernTemplate.tsx
│   │           └── ProfessionalTemplate.tsx
│   │   └── ui/            # UI primitives (e.g., FormField)
│   │       └── FormField.tsx
│   ├── context/           # React Context for state management
│   │   └── ResumeContext.tsx
│   ├── data/              # Static data (e.g., template configs)
│   │   └── resumeTemplates.ts
│   └── utils/             # Utility functions
│       └── pdfExport.ts
│
├── index.html             # Main HTML file
├── package.json           # Project metadata and scripts
├── tailwind.config.js     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
├── vite.config.ts         # Vite build config
├── tsconfig*.json         # TypeScript configs
├── eslint.config.js       # ESLint config
└── .gitignore             # Git ignore rules
```

## Getting Started
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```
4. **Preview production build:**
   ```sh
   npm run preview
   ```

## Deployment
- The app is configured for deployment to GitHub Pages (see `homepage` in `package.json` and `base` in `vite.config.ts`).
- To deploy:
  ```sh
  npm run deploy
  ```

## License
This project is licensed under the MIT License.
