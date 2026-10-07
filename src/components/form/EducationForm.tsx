import React from 'react';
import { GraduationCap } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { useRemoveWithUndo } from '../../hooks/useRemoveWithUndo';
import { dateRange } from '../../utils/format';
import EmptyState from '../ui/EmptyState';
import FormField from '../ui/FormField';
import ItemCard from '../ui/ItemCard';
import SectionHeader from '../ui/SectionHeader';
import TextAreaField from '../ui/TextAreaField';

const EducationForm: React.FC = () => {
  const { resumeData, addEducation, updateEducation, moveItem } = useResume();
  const removeWithUndo = useRemoveWithUndo();
  const { education } = resumeData;

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateEducation(id, { [name]: value });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader
        title="Education"
        description="Degrees, bootcamps and certifications."
        addLabel="Add education"
        onAdd={addEducation}
      />

      {education.length === 0 ? (
        <EmptyState
          icon={<GraduationCap className="h-6 w-6" />}
          title="No education yet"
          description="Add your degree, or a certification that's relevant to the roles you want."
          actionLabel="Add education"
          onAction={addEducation}
        />
      ) : (
        education.map((edu, index) => (
          <ItemCard
            key={edu.id}
            index={index}
            total={education.length}
            title={edu.institution || 'New education'}
            subtitle={[edu.degree, dateRange(edu.startDate, edu.endDate)].filter(Boolean).join(' · ')}
            onMove={direction => moveItem('education', edu.id, direction)}
            onRemove={() => removeWithUndo('education', edu.id, edu.institution || 'Education')}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField idPrefix={edu.id} label="Institution" name="institution" value={edu.institution} onChange={e => handleChange(edu.id, e)} placeholder="University of Washington" required className="sm:col-span-2" />
              <FormField idPrefix={edu.id} label="Degree" name="degree" value={edu.degree} onChange={e => handleChange(edu.id, e)} placeholder="B.S. Computer Science" />
              <FormField idPrefix={edu.id} label="Field of study" name="fieldOfStudy" value={edu.fieldOfStudy} onChange={e => handleChange(edu.id, e)} placeholder="Human-Computer Interaction" />
              <FormField idPrefix={edu.id} label="Start date" name="startDate" type="month" value={edu.startDate} onChange={e => handleChange(edu.id, e)} />
              <FormField idPrefix={edu.id} label="End date (or expected)" name="endDate" type="month" value={edu.endDate} onChange={e => handleChange(edu.id, e)} />
            </div>
            <TextAreaField
              idPrefix={edu.id}
              label="Highlights"
              name="description"
              value={edu.description}
              onChange={e => handleChange(edu.id, e)}
              rows={3}
              placeholder="GPA 3.8 · Dean's List · Led the campus ACM chapter"
            />
          </ItemCard>
        ))
      )}
    </div>
  );
};

export default EducationForm;
