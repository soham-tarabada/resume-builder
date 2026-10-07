import React from 'react';
import { Briefcase } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { useRemoveWithUndo } from '../../hooks/useRemoveWithUndo';
import { dateRange, joinNonEmpty } from '../../utils/format';
import EmptyState from '../ui/EmptyState';
import FormField from '../ui/FormField';
import ItemCard from '../ui/ItemCard';
import SectionHeader from '../ui/SectionHeader';
import TextAreaField from '../ui/TextAreaField';

const VERB_HINTS = ['Led', 'Built', 'Launched', 'Reduced', 'Scaled', 'Increased'];

const ExperienceForm: React.FC = () => {
  const { resumeData, addExperience, updateExperience, moveItem } = useResume();
  const removeWithUndo = useRemoveWithUndo();
  const { experience } = resumeData;

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateExperience(id, { [name]: value });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader
        title="Work experience"
        description="Most recent first. Focus on outcomes, not duties."
        addLabel="Add position"
        onAdd={addExperience}
      />

      {experience.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="h-6 w-6" />}
          title="No experience yet"
          description="Add internships, freelance work and volunteering too. It all counts."
          actionLabel="Add your first position"
          onAction={addExperience}
        />
      ) : (
        experience.map((exp, index) => (
          <ItemCard
            key={exp.id}
            index={index}
            total={experience.length}
            title={joinNonEmpty([exp.position, exp.company], ' at ') || 'New position'}
            subtitle={dateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
            onMove={direction => moveItem('experience', exp.id, direction)}
            onRemove={() => removeWithUndo('experience', exp.id, exp.position || 'Position')}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField idPrefix={exp.id} label="Job title" name="position" value={exp.position} onChange={e => handleChange(exp.id, e)} placeholder="Senior Product Engineer" required />
              <FormField idPrefix={exp.id} label="Company" name="company" value={exp.company} onChange={e => handleChange(exp.id, e)} placeholder="Lumen Labs" required />
              <FormField idPrefix={exp.id} label="Location" name="location" value={exp.location} onChange={e => handleChange(exp.id, e)} placeholder="San Francisco, CA" className="sm:col-span-2" />
              <FormField idPrefix={exp.id} label="Start date" name="startDate" type="month" value={exp.startDate} onChange={e => handleChange(exp.id, e)} />
              <FormField
                idPrefix={exp.id}
                label="End date"
                name="endDate"
                type="month"
                value={exp.isCurrentPosition ? '' : exp.endDate}
                onChange={e => handleChange(exp.id, e)}
                disabled={exp.isCurrentPosition}
              />
            </div>

            <label className="inline-flex cursor-pointer select-none items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={exp.isCurrentPosition}
                onChange={e => updateExperience(exp.id, { isCurrentPosition: e.target.checked })}
              />
              <span className="relative h-6 w-11 rounded-full bg-slate-200 transition after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:bg-indigo-600 peer-checked:after:translate-x-5 peer-focus-visible:ring-4 peer-focus-visible:ring-indigo-500/20" />
              I currently work here
            </label>

            <TextAreaField
              idPrefix={exp.id}
              label="Achievements"
              name="description"
              value={exp.description}
              onChange={e => handleChange(exp.id, e)}
              rows={5}
              bullets
              placeholder="• Led a 6-engineer squad that lifted activation by 27%"
              hint={
                <span className="flex flex-wrap items-center gap-1.5">
                  Press Enter for a new bullet. Start strong:
                  {VERB_HINTS.map(verb => (
                    <span key={verb} className="rounded-md bg-slate-100 px-1.5 py-0.5 font-medium text-slate-600">
                      {verb}
                    </span>
                  ))}
                  and add a number.
                </span>
              }
            />
          </ItemCard>
        ))
      )}
    </div>
  );
};

export default ExperienceForm;
