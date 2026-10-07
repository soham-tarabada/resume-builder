import React from 'react';
import { FileText } from 'lucide-react';

const Logo: React.FC<{ className?: string; showName?: boolean }> = ({ className = '', showName = true }) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/30">
      <FileText className="h-[18px] w-[18px] text-white" strokeWidth={2.4} />
    </span>
    {showName && (
      <span className="text-[17px] font-bold tracking-tight text-slate-900">
        Resume<span className="text-indigo-600">Builder</span>
      </span>
    )}
  </span>
);

export default Logo;
