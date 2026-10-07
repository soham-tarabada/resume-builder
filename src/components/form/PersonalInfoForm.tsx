import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';
import SectionHeader from '../ui/SectionHeader';
import TextAreaField from '../ui/TextAreaField';

const PersonalInfoForm: React.FC = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader title="Personal details" description="Your headline and how recruiters will reach you." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="First name" name="firstName" value={personalInfo.firstName} onChange={handleChange} placeholder="Jordan" required />
        <FormField label="Last name" name="lastName" value={personalInfo.lastName} onChange={handleChange} placeholder="Avery" required />
        <FormField
          label="Professional title"
          name="title"
          value={personalInfo.title}
          onChange={handleChange}
          placeholder="Senior Product Engineer"
          className="sm:col-span-2"
        />
        <FormField label="Email" name="email" type="email" value={personalInfo.email} onChange={handleChange} placeholder="jordan@example.com" required />
        <FormField label="Phone" name="phone" type="tel" value={personalInfo.phone} onChange={handleChange} placeholder="(415) 555-0142" />
        <FormField label="City" name="city" value={personalInfo.city} onChange={handleChange} placeholder="San Francisco" />
        <FormField label="State / Province" name="state" value={personalInfo.state} onChange={handleChange} placeholder="CA" />
        <FormField label="Country" name="country" value={personalInfo.country} onChange={handleChange} placeholder="USA" className="sm:col-span-2" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
        <p className="mb-3 text-[13px] font-semibold text-slate-700">Online presence</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="LinkedIn" name="linkedin" type="url" value={personalInfo.linkedin} onChange={handleChange} placeholder="linkedin.com/in/jordan" />
          <FormField label="GitHub" name="github" type="url" value={personalInfo.github} onChange={handleChange} placeholder="github.com/jordan" />
          <FormField
            label="Portfolio website"
            name="website"
            type="url"
            value={personalInfo.website}
            onChange={handleChange}
            placeholder="jordan.dev"
            className="sm:col-span-2"
          />
        </div>
      </div>

      <TextAreaField
        label="Professional summary"
        name="summary"
        value={personalInfo.summary}
        onChange={handleChange}
        rows={5}
        wordRange={[25, 90]}
        placeholder="Product-minded engineer with 8 years of experience shipping web platforms used by millions…"
        hint="Formula: who you are + your strongest skills + the impact you deliver, in 2–3 sentences."
      />
    </div>
  );
};

export default PersonalInfoForm;
