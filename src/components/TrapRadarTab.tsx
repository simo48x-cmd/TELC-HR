import React, { useState } from 'react';
import { ShieldAlert, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import { TRAP_COMPARISON_GROUPS } from '../data/memorySystemsData';
import { EXAM_BY_ID } from '../data/hoerenData';
import { HoerenExam, TrapComparisonGroup } from '../data/types';
import { VisualBubbleStrip } from './VisualBubbleStrip';

interface TrapRadarTabProps {
  highlightedTrapGroupId?: string | null;
  onOpenExamInSimulator: (exam: HoerenExam) => void;
}

export const TrapRadarTab: React.FC<TrapRadarTabProps> = ({
  highlightedTrapGroupId,
  onOpenExamInSimulator,
}) => {
  const [teilFilter, setTeilFilter] = useState<'all' | 1 | 2 | 3>('all');

  const filteredGroups = TRAP_COMPARISON_GROUPS.filter(
    (g) => teilFilter === 'all' || g.teil === teilFilter
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-rose-500/40 bg-rose-950/20 p-5 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-rose-500/20 px-2.5 py-1 text-xs font-extrabold text-rose-300">
            <ShieldAlert className="w-4 h-4" />
            <span>النظام المعرفي 3: رادار الفخاخ الـ 12 القاتلة</span>
          </div>
          <h2 className="mt-1.5 text-xl font-black text-white">
            ⚠️ مقارنة جنباً إلى جنب: الأساسي vs المعدل (12 فخ فـ TELC B2 2026)
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            أكبر سبب كيخلي الطلبة يضيعو النقط هو أن نفس الموضوع عندو جوج نسخ (الأساسي والمعدل) بكودات مختلفة! هنا درنا ليك الكلمة الواحدة اللي كتميز كل نسخة باش عمرك تغلط فيهم.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {(['all', 1, 2, 3] as const).map((t) => (
            <button
              key={String(t)}
              type="button"
              onClick={() => setTeilFilter(t)}
              className={`rounded-xl px-3.5 py-2 text-xs font-extrabold transition-all ${
                teilFilter === t
                  ? 'bg-rose-600 text-white shadow'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {t === 'all' ? 'كل الفخاخ (12)' : `Teil ${t}`}
            </button>
          ))}
        </div>
      </div>

      {/* Trap Comparison Cards Grid */}
      <div className="space-y-5">
        {filteredGroups.map((group: TrapComparisonGroup, index) => {
          const isHighlighted = highlightedTrapGroupId === group.id;

          return (
            <div
              key={group.id}
              className={`rounded-2xl border p-5 shadow-xl transition-all ${
                isHighlighted
                  ? 'border-amber-400 bg-amber-950/20 ring-2 ring-amber-400/50'
                  : 'border-slate-800 bg-slate-900/95'
              }`}
            >
              {/* Trap Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="rounded-lg bg-rose-600 px-2.5 py-1 font-mono text-xs font-black text-white">
                    فخ #{index + 1} • Teil {group.teil}
                  </span>
                  <h3 className="font-sans text-lg font-black text-white" dir="ltr">
                    {group.title}
                  </h3>
                </div>

                <span className="inline-flex items-center gap-1 rounded-lg bg-amber-500/15 border border-amber-500/40 px-3 py-1 text-xs font-bold text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>قاعدة الحفظ فـ ثانية وحدة</span>
                </span>
              </div>

              {/* Golden Darija Memory Rule */}
              <div className="mt-3.5 rounded-xl border border-amber-500/40 bg-amber-950/30 p-3.5 text-sm font-extrabold text-amber-100">
                💡 {group.subtitleDarija}
              </div>

              {/* Side-by-Side Variants Comparison */}
              <div
                className={`mt-4 grid grid-cols-1 gap-4 ${
                  group.versions.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'
                }`}
              >
                {group.versions.map((variant, vIdx) => {
                  const fullExam = EXAM_BY_ID[variant.examId];
                  const isFirst = vIdx === 0;

                  return (
                    <div
                      key={variant.examId}
                      className={`flex flex-col justify-between rounded-xl border p-4 ${
                        isFirst
                          ? 'border-emerald-500/40 bg-emerald-950/15'
                          : 'border-rose-500/40 bg-rose-950/15'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`rounded-md px-2.5 py-1 text-xs font-extrabold ${
                              isFirst
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-rose-500/20 text-rose-300'
                            }`}
                          >
                            {variant.versionName}
                          </span>

                          <span
                            dir="ltr"
                            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1 font-mono text-base font-black text-white"
                          >
                            {variant.codeDisplay}
                          </span>
                        </div>

                        {/* One-Word Trigger Difference */}
                        <div className="mt-3 rounded-lg bg-slate-950/90 p-2.5 border border-slate-800" dir="ltr">
                          <div className="text-[11px] font-bold text-slate-400">
                            {variant.triggerPhrase}
                          </div>
                          <div className="mt-0.5 font-sans text-sm font-black text-amber-300">
                            👉 الكلمة الفاصلة: &quot;{variant.highlightedWord}&quot;
                          </div>
                        </div>

                        <p className="mt-2.5 text-xs font-bold leading-relaxed text-slate-200">
                          <CheckCircle2 className="inline w-3.5 h-3.5 text-emerald-400 ml-1" />
                          {variant.explanationDarija}
                        </p>

                        {fullExam && (
                          <div className="mt-3">
                            <VisualBubbleStrip exam={fullExam} compact />
                          </div>
                        )}
                      </div>

                      {fullExam && (
                        <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-end">
                          <button
                            type="button"
                            onClick={() => onOpenExamInSimulator(fullExam)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-600 transition-colors"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>فتح فـ المحاكي</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
