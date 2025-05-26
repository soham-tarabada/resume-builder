import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';

const PersonalInfoForm: React.FC = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="First Name"
          name="firstName"
          value={personalInfo.firstName}
          onChange={handleChange}
          placeholder="John"
          required
        />
        <FormField
          label="Last Name"
          name="lastName"
          value={personalInfo.lastName}
          onChange={handleChange}
          placeholder="Doe"
          required
        />
      </div>

      <FormField
        label="Professional Title"
        name="title"
        value={personalInfo.title}
        onChange={handleChange}
        placeholder="Senior Software Engineer"
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        value={personalInfo.email}
        onChange={handleChange}
        placeholder="john.doe@example.com"
        required
      />

      <FormField
        label="Phone"
        name="phone"
        value={personalInfo.phone}
        onChange={handleChange}
        placeholder="(123) 456-7890"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="City"
          name="city"
          value={personalInfo.city}
          onChange={handleChange}
          placeholder="New York"
        />
        <FormField
          label="State/Province"
          name="state"
          value={personalInfo.state}
          onChange={handleChange}
          placeholder="NY"
        />
      </div>

      <FormField
        label="Country"
        name="country"
        value={personalInfo.country}
        onChange={handleChange}
        placeholder="United States"
      />

      <FormField
        label="LinkedIn"
        name="linkedin"
        value={personalInfo.linkedin}
        onChange={handleChange}
        placeholder="https://linkedin.com/in/johndoe"
      />

      <FormField
        label="GitHub"
        name="github"
        value={personalInfo.github}
        onChange={handleChange}
        placeholder="https://github.com/johndoe"
      />

      <FormField
        label="Portfolio Website"
        name="website"
        value={personalInfo.website}
        onChange={handleChange}
        placeholder="https://johndoe.com"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Professional Summary
        </label>
        <textarea
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Experienced software engineer with 5+ years of experience in web development..."
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;