import React, { ReactNode } from 'react';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, actionLabel, onAction }) => (
  <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/60 px-6 py-10 text-center">
    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">{icon}</div>
    <h4 className="font-semibold text-slate-900">{title}</h4>
    <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
    <button
      type="button"
      onClick={onAction}
      className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 active:scale-[0.98]"
    >
      <Plus className="h-4 w-4" />
      {actionLabel}
    </button>
  </div>
);

export default EmptyState;
