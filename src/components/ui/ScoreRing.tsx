import React from 'react';
import { useAnimatedNumber } from '../../hooks/useAnimatedNumber';
import { scoreColor } from '../../utils/resumeScore';

interface ScoreRingProps {
  score: number;
  size?: number;
  stroke?: number;
  label?: string;
  className?: string;
}

/** Circular 0–100 gauge whose arc and number animate as the score changes. */
const ScoreRing: React.FC<ScoreRingProps> = ({ score, size = 64, stroke = 7, label, className = '' }) => {
  const display = useAnimatedNumber(score);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = scoreColor(score);

  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }} role="img" aria-label={`${label ?? 'Score'}: ${score} out of 100`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-slate-100" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - Math.min(100, Math.max(0, score)) / 100)}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1), stroke 0.4s' }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-bold tabular-nums text-slate-900" style={{ fontSize: size * 0.3 }}>
        {display}
      </span>
    </div>
  );
};

export default ScoreRing;
