import React from 'react';
import { inputClass } from './FormField';

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  hint?: React.ReactNode;
  idPrefix?: string;
  /** Continue "• " bullets automatically when pressing Enter. */
  bullets?: boolean;
  /** Show a live word count against a recommended range. */
  wordRange?: [number, number];
}

const BULLET = '• ';

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, name, value, onChange, placeholder, rows = 4, hint, idPrefix, bullets = false, wordRange }) => {
  const id = idPrefix ? `${idPrefix}-${name}` : name;

  const emit = (target: HTMLTextAreaElement, next: string, caret: number) => {
    target.value = next;
    target.setSelectionRange(caret, caret);
    onChange({ target, currentTarget: target } as React.ChangeEvent<HTMLTextAreaElement>);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!bullets || event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return;
    const target = event.currentTarget;
    const { selectionStart, selectionEnd } = target;
    const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
    const line = value.slice(lineStart, selectionStart);
    if (!line.startsWith(BULLET)) return;
    event.preventDefault();
    if (line.trim() === '•') {
      // Enter on an empty bullet ends the list.
      emit(target, value.slice(0, lineStart) + value.slice(selectionEnd), lineStart);
      return;
    }
    const insert = `\n${BULLET}`;
    emit(target, value.slice(0, selectionStart) + insert + value.slice(selectionEnd), selectionStart + insert.length);
  };

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (bullets && !value) emit(event.currentTarget, BULLET, BULLET.length);
  };

  // Don't leave a lone bullet behind when the field was focused but never used.
  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (bullets && value.trim() === '•') emit(event.currentTarget, '', 0);
  };

  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const inRange = wordRange ? words >= wordRange[0] && words <= wordRange[1] : true;

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="block text-[13px] font-medium text-slate-700">
          {label}
        </label>
        {wordRange && (
          <span className={`text-xs font-medium tabular-nums ${words === 0 ? 'text-slate-400' : inRange ? 'text-emerald-600' : 'text-amber-600'}`}>
            {words} words · aim for {wordRange[0]}–{wordRange[1]}
          </span>
        )}
      </div>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={rows}
        placeholder={placeholder}
        className={`${inputClass} resize-y leading-relaxed`}
      />
      {hint && <div className="mt-1.5 text-xs text-slate-500">{hint}</div>}
    </div>
  );
};

export default TextAreaField;
