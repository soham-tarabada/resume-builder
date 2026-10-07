import React from 'react';
import { Plus } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  description: string;
  addLabel?: string;
  onAdd?: () => void;
}

export const primaryButton =
  'inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30 active:scale-[0.98]';

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, addLabel, onAdd }) => (
  <div className="flex flex-wrap items-end justify-between gap-3">
    <div>
      <h3 className="text-xl font-bold tracking-tight text-slate-900">{title}</h3>
      <p className="mt-0.5 text-sm text-slate-500">{description}</p>
    </div>
    {onAdd && addLabel && (
      <button type="button" onClick={onAdd} className={primaryButton}>
        <Plus className="h-4 w-4" />
        {addLabel}
      </button>
    )}
  </div>
);

export default SectionHeader;
