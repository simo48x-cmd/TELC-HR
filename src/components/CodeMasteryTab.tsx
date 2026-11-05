import React, { useState } from 'react';
import {
  Sparkles,
  Flame,
  AlertTriangle,
  Star,
  CheckCircle2,
  Play,
  Printer,
  Layers,
  PhoneCall,
  BookOpen,
  ShieldAlert,
} from 'lucide-react';
import { HoerenExam, CodeFamilyCluster } from '../data/types';
import { CODE_FAMILY_CLUSTERS, TRAP_COMPARISON_GROUPS } from '../data/memorySystemsData';
import { EXAM_BY_ID } from '../data/hoerenData';
import { VisualBubbleStrip } from './VisualBubbleStrip';

interface CodeMasteryTabProps {
  exams: HoerenExam[];
  bookmarkedIds: string[];
  masteredIds: string[];
  onToggleBookmark: (id: string) => void;
  onToggleMastered: (id: string) => void;
  onOpenExamInSimulator: (exam: HoerenExam) => void;
  onSwitchToTrapTab: (trapGroupId?: string) => void;
}

export const CodeMasteryTab: React.FC<CodeMasteryTabProps> = ({
  exams,
  bookmarkedIds,
  masteredIds,
  onToggleBookmark,
  onToggleMastered,
  onOpenExamInSimulator,
  onSwitchToTrapTab,
}) => {
  const [subView, setSubView] = useState<'families' | 'rhythm-teil2' | 'all-154' | 'cheat-sheet'>('families');
  const [selectedFamilyTeil, setSelectedFamilyTeil] = useState<'all' | 1 | 3>('all');

  const visibleClusters = CODE_FAMILY_CLUSTERS.filter(
    (c) => selectedFamilyTeil === 'all' || c.teil === selectedFamilyTeil
  );

  const teil2Exams = exams.filter((e) => e.teil === 2);

  return (
    <div className="space-y-6">
      {/* Sub-navigation Bar for the 7 Cognitive Systems */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 p-3.5 shadow-lg">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSubView('families')}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-all ${
              subView === 'families'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>1. عائلات الكودات المشتركة (11 عائلة)</span>
          </button>

          <button
            type="button"
            onClick={() => setSubView('rhythm-teil2')}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-all ${
              subView === 'rhythm-teil2'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>2. تقنية 3+3 نمرو د التيليفون (Teil 2 - 56)</span>
          </button>

          <button
            type="button"
            onClick={() => setSubView('all-154')}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-all ${
              subView === 'all-154'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>3. موسوعة الامتحانات الكاملة ({exams.length})</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setSubView(subView === 'cheat-sheet' ? 'families' : 'cheat-sheet')}
          className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs sm:text-sm font-extrabold transition-all ${
            subView === 'cheat-sheet'
              ? 'border-amber-400 bg-amber-500 text-slate-950 shadow-lg'
              : 'border-amber-500/50 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>🖨️ ورقة المراجعة السريعة قبل الامتحان بـ 15 دقيقة</span>
        </button>
      </div>

      {/* VIEW 1: CODE FAMILY CLUSTERING (SYSTEM 1) */}
      {subView === 'families' && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
            <div>
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>نظام عائلات الكودات (Code Family Clustering) — احفظ عشرات الامتحانات فـ 11 قصة فقط!</span>
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-300">
                عوض ما تحفظ كل امتحان بوحدو وتدوخ نهار الامتحان، جمعنا كاع الامتحانات اللي عندهم <span className="font-bold text-emerald-400">نفس الكود بالضبط</span> فـ عائلة وحدة مع قصة مغربية كتجمعهم كاملين!
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {(['all', 1, 3] as const).map((t) => (
                <button
                  key={String(t)}
                  type="button"
                  onClick={() => setSelectedFamilyTeil(t)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    selectedFamilyTeil === t
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {t === 'all' ? 'الكل (11 عائلة)' : `عائلات Teil ${t}`}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {visibleClusters.map((cluster: CodeFamilyCluster) => {
              const memberExams = cluster.examIds
                .map((id) => EXAM_BY_ID[id])
                .filter(Boolean);

              return (
                <div
                  key={cluster.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/95 p-5 shadow-xl hover:border-emerald-500/50 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
                      <div>
                        <span className="inline-block rounded-md bg-emerald-500/20 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-300">
                          {cluster.badgeText} • {memberExams.length} امتحانات مشتركة
                        </span>
                        <h3 className="mt-1.5 text-lg font-extrabold text-white">
                          {cluster.titleAr}
                        </h3>
                      </div>

                      <div
                        dir="ltr"
                        className="rounded-xl border-2 border-emerald-400/70 bg-emerald-950/80 px-4 py-2 text-center font-mono text-2xl font-black tracking-widest text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                      >
                        {cluster.code}
                      </div>
                    </div>

                    {/* Master Darija Family Story */}
                    <div className="mt-3.5 rounded-xl border border-amber-500/30 bg-amber-950/25 p-3.5">
                      <div className="text-xs font-bold text-amber-300 mb-1">
                        🇲🇦 القصة السحرية ديال العائلة بالدارجة:
                      </div>
                      <p className="text-sm font-bold leading-relaxed text-amber-100">
                        {cluster.darijaStory}
                      </p>
                    </div>

                    {/* Member Exams List */}
                    <div className="mt-4 space-y-2">
                      <div className="text-xs font-bold text-slate-400">
                        الأعضاء ديال هاد العائلة ({memberExams.length} امتحانات — كاملين كودهم <span className="font-mono text-emerald-400">{cluster.code}</span>):
                      </div>
                      {memberExams.map((exam) => (
                        <div
                          key={exam.id}
                          className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-800/90 bg-slate-950/80 px-3 py-2 hover:border-slate-700"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs font-bold text-emerald-400" dir="ltr">
                                Teil {exam.teil} #{exam.number} {exam.title}
                              </span>
                              {exam.is2026New && (
                                <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
                                  🔥 2026
                                </span>
                              )}
                              {exam.isTrap && (
                                <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[10px] font-bold text-rose-300">
                                  ⚠️ {exam.versionTag}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-300 mt-0.5">
                              <span className="text-emerald-300">{exam.darijaStory}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => onToggleMastered(exam.id)}
                              className={`rounded-lg p-1.5 transition-colors ${
                                masteredIds.includes(exam.id)
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-slate-900 text-slate-500 hover:text-slate-300'
                              }`}
                              title="تم الحفظ"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onOpenExamInSimulator(exam)}
                              className="inline-flex items-center gap-1 rounded-lg bg-emerald-600/90 px-2.5 py-1 text-xs font-bold text-white hover:bg-emerald-500"
                            >
                              <Play className="w-3 h-3" />
                              <span>تدرب</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: TEIL 2 PHONE-NUMBER RHYTHM CHUNKING (3+3) */}
      {subView === 'rhythm-teil2' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-4">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-amber-400" />
              <span>تقنية 3+3 (إيقاع نمرو د التيليفون) — Teil 2 (56 امتحان كاملين)</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              الدماغ البشري ما كيبغيش 6 أرقام ملاصقين! قسمنا كل كود ديال Teil 2 (الأسئلة 46–55) لجوج طروفة:
              <span className="mx-1 font-mono font-bold text-emerald-400">[ الأسئلة 1..5 بالأخضر ]</span>
              •
              <span className="mx-1 font-mono font-bold text-amber-400">[ الأسئلة 6..0 بالذهبي ]</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teil2Exams.map((exam) => {
              const isMastered = masteredIds.includes(exam.id);
              const isBookmarked = bookmarkedIds.includes(exam.id);

              return (
                <div
                  key={exam.id}
                  className={`flex flex-col justify-between rounded-2xl border p-4 transition-all ${
                    exam.isTrap
                      ? 'border-rose-500/50 bg-rose-950/15'
                      : 'border-slate-800 bg-slate-900/95'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-xs font-bold text-amber-400">
                            Teil 2 #{exam.number}
                          </span>
                          {exam.is2026New && (
                            <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
                              🔥 جديد 2026
                            </span>
                          )}
                          {exam.isTrap && (
                            <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[10px] font-bold text-rose-300">
                              ⚠️ {exam.versionTag}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1.5 font-sans text-base font-extrabold text-white" dir="ltr">
                          {exam.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onToggleBookmark(exam.id)}
                          className={`rounded p-1 ${
                            isBookmarked ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleMastered(exam.id)}
                          className={`rounded p-1 ${
                            isMastered ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <VisualBubbleStrip exam={exam} />
                    </div>

                    {exam.darijaRhythmHint && (
                      <div className="mt-2 rounded-lg bg-amber-500/10 border border-amber-500/30 p-2 text-xs font-bold text-amber-300">
                        🎵 {exam.darijaRhythmHint}
                      </div>
                    )}

                    {exam.isTrap && exam.trapWarningDarija && (
                      <div className="mt-2.5 rounded-lg border border-rose-500/40 bg-rose-950/40 p-2 text-xs font-bold text-rose-200">
                        {exam.trapWarningDarija}
                      </div>
                    )}

                    <div className="mt-2.5 rounded-xl bg-slate-950/90 p-2.5 text-xs leading-relaxed text-emerald-200">
                      🇲🇦 {exam.darijaStory}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-slate-400 truncate max-w-[180px]" dir="ltr">
                      {exam.firstWords}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenExamInSimulator(exam)}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 shrink-0"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>سمع وتدرب</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: ALL 154 EXAMS BROWSER */}
      {subView === 'all-154' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white">
              📚 قائمة الامتحانات الكاملة ({exams.length} امتحان مطابق للفلتر الحالي)
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => {
              const isMastered = masteredIds.includes(exam.id);
              const isBookmarked = bookmarkedIds.includes(exam.id);

              return (
                <div
                  key={exam.id}
                  className={`flex flex-col justify-between rounded-2xl border p-4 transition-all ${
                    exam.isTrap
                      ? 'border-rose-500/50 bg-rose-950/15'
                      : 'border-slate-800 bg-slate-900/95'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-xs font-bold text-emerald-400">
                            Teil {exam.teil} #{exam.number}
                          </span>
                          {exam.is2026New && (
                            <span className="inline-flex items-center gap-0.5 rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
                              <Flame className="w-3 h-3" /> 2026
                            </span>
                          )}
                          {exam.isTrap && (
                            <span className="inline-flex items-center gap-0.5 rounded bg-rose-500/20 px-1.5 py-0.5 text-[10px] font-bold text-rose-300">
                              <AlertTriangle className="w-3 h-3" /> {exam.versionTag}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1.5 font-sans text-base font-extrabold text-white" dir="ltr">
                          {exam.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onToggleBookmark(exam.id)}
                          className={`rounded p-1 ${
                            isBookmarked ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleMastered(exam.id)}
                          className={`rounded p-1 ${
                            isMastered ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <VisualBubbleStrip exam={exam} />
                    </div>

                    {exam.isTrap && exam.trapWarningDarija && (
                      <div className="mt-2.5 rounded-lg border border-rose-500/40 bg-rose-950/40 p-2 text-xs font-bold text-rose-200">
                        {exam.trapWarningDarija}
                      </div>
                    )}

                    <div className="mt-2.5 rounded-xl bg-slate-950/90 p-2.5 text-xs leading-relaxed text-emerald-200">
                      🇲🇦 {exam.darijaStory}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenExamInSimulator(exam)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>فتح فـ المحاكي</span>
                    </button>

                    {exam.isTrap && exam.trapGroupId && (
                      <button
                        type="button"
                        onClick={() => onSwitchToTrapTab(exam.trapGroupId)}
                        className="inline-flex items-center gap-1 rounded-lg border border-rose-500/40 bg-rose-950/50 px-2.5 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-900/50"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>رادار الفخاخ</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 4: LAST-MINUTE 15-MINUTE CHEAT SHEET */}
      {subView === 'cheat-sheet' && (
        <div className="space-y-6 rounded-2xl border-2 border-amber-500/50 bg-slate-900/95 p-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="rounded-md bg-amber-500/20 px-2.5 py-1 text-xs font-extrabold text-amber-300">
                ⚡ ملخص الطوارئ لـ Simo (محمد)
              </span>
              <h2 className="mt-1 text-xl font-black text-white">
                🖨️ ورقة المراجعة السريعة قبل الدخول للامتحان بـ 15 دقيقة (75/75 نقطة)
              </h2>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-black text-slate-950 hover:bg-amber-400"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / حفظ PDF</span>
            </button>
          </div>

          {/* Section A: The 11 Code Families */}
          <div>
            <h3 className="text-base font-extrabold text-emerald-400 mb-3">
              1️⃣ عائلات الكودات الـ 11 (Teil 1 & Teil 3) — احفظ القصة وتفكر الكود فوراً:
            </h3>
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
              {CODE_FAMILY_CLUSTERS.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/90 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white">{c.titleAr}</div>
                    <div className="text-xs text-amber-200 mt-0.5">{c.darijaStory}</div>
                  </div>
                  <div
                    dir="ltr"
                    className="shrink-0 rounded-lg border border-emerald-500/50 bg-emerald-950 px-3 py-1.5 font-mono text-lg font-black text-emerald-300"
                  >
                    {c.code}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: The 12 Deadly Traps */}
          <div>
            <h3 className="text-base font-extrabold text-rose-400 mb-3">
              2️⃣ الفخاخ الـ 12 القاتلة (الأساسي vs المعدل) — الكلمة المفتاحية اللي كتبدل الكود:
            </h3>
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
              {TRAP_COMPARISON_GROUPS.map((trap) => (
                <div
                  key={trap.id}
                  className="rounded-xl border border-rose-500/30 bg-rose-950/15 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-black text-white" dir="ltr">
                      {trap.title}
                    </span>
                    <span className="text-xs text-rose-300 font-bold">Teil {trap.teil}</span>
                  </div>
                  <p className="mt-1 text-xs text-amber-200 font-semibold">
                    {trap.subtitleDarija}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
