import React from 'react';
import { HoerenExam } from '../data/types';

interface VisualBubbleStripProps {
  exam: HoerenExam;
  compact?: boolean;
}

export const VisualBubbleStrip: React.FC<VisualBubbleStripProps> = ({ exam, compact = false }) => {
  const isTeil2 = exam.teil === 2;
  const digits = isTeil2 ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] : [1, 2, 3, 4, 5];
  const baseNumber = exam.teil === 1 ? 40 : exam.teil === 2 ? 45 : 55;

  return (
    <div className="flex flex-col gap-1.5" dir="ltr">
      {/* Rhythm Code Badge */}
      <div className="flex items-center gap-2 flex-wrap">
        {isTeil2 ? (
          <div className="inline-flex items-center rounded-md border border-slate-700/80 bg-slate-950/90 px-2.5 py-1 font-mono text-sm font-bold tracking-wider shadow-inner">
            <span className="text-emerald-400" title="النصف الأول (1-5)">
              [ {exam.rhythmFirstHalf || '—'} ]
            </span>
            <span className="mx-1.5 text-slate-500">•</span>
            <span className="text-amber-400" title="النصف الثاني (6-0)">
              [ {exam.rhythmSecondHalf || '—'} ]
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center rounded-md border border-emerald-500/40 bg-emerald-950/60 px-3 py-1 font-mono text-base font-extrabold tracking-widest text-emerald-300 shadow-inner">
            CODE: {exam.codeFormatted}
          </div>
        )}

        <span className="font-mono text-xs text-slate-400">
          {exam.bubbles.filter(Boolean).length}/{exam.bubbles.length} Richtig (+)
        </span>
      </div>

      {/* Authentic TELC B2 Answer Sheet Bubble Row */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {exam.bubbles.map((isTrue, idx) => {
          const digit = digits[idx];
          const taskNum = baseNumber + idx + 1;
          const isSecondHalf = isTeil2 && idx >= 5;

          return (
            <React.Fragment key={taskNum}>
              {isTeil2 && idx === 5 && (
                <div className="mx-1 h-6 w-0.5 bg-slate-600/80 rounded-full" title="5+5 Split" />
              )}
              <div
                title={`Aufgabe ${taskNum} (Digit ${digit}): ${isTrue ? '+ Richtig' : '- Falsch'}`}
                className={`flex flex-col items-center justify-center rounded border transition-all ${
                  compact ? 'w-6 h-7 text-[10px]' : 'w-7 h-8 text-xs'
                } font-mono font-bold ${
                  isTrue
                    ? isSecondHalf
                      ? 'border-amber-400 bg-amber-500/25 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.35)]'
                      : 'border-emerald-400 bg-emerald-500/25 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.35)]'
                    : 'border-slate-700/70 bg-slate-900/50 text-slate-500'
                }`}
              >
                <span className="leading-none">{isTrue ? '●' : '○'}</span>
                <span className="text-[9px] opacity-80 leading-none mt-0.5">{digit}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
