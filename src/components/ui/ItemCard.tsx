import React, { ReactNode } from 'react';
import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react';

interface ItemCardProps {
  index: number;
  total: number;
  title: string;
  subtitle?: string;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
  children: ReactNode;
}

const iconButton =
  'rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:pointer-events-none disabled:opacity-30';

/** Shell for one repeatable entry (a job, a degree…) with reorder and delete. */
const ItemCard: React.FC<ItemCardProps> = ({ index, total, title, subtitle, onMove, onRemove, children }) => (
  <div className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.03] transition hover:border-slate-300 sm:p-6">
    <div className="mb-5 flex items-start gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
        {index + 1}
      </span>
      <div className="min-w-0 flex-1">
        <h4 className="truncate font-semibold text-slate-900">{title}</h4>
        {subtitle && <p className="truncate text-sm text-slate-500">{subtitle}</p>}
      </div>
      <div className="flex shrink-0 items-center">
        <button type="button" className={iconButton} onClick={() => onMove(-1)} disabled={index === 0} aria-label="Move up">
          <ArrowUp className="h-4 w-4" />
        </button>
        <button type="button" className={iconButton} onClick={() => onMove(1)} disabled={index === total - 1} aria-label="Move down">
          <ArrowDown className="h-4 w-4" />
        </button>
        <button type="button" className={`${iconButton} hover:bg-rose-50 hover:text-rose-600`} onClick={onRemove} aria-label="Remove">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

export default ItemCard;
