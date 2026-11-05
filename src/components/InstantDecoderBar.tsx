import React from 'react';
import {
  Search,
  X,
  Flame,
  AlertTriangle,
  Star,
  CheckCircle2,
  Play,
  Layers,
} from 'lucide-react';
import { HoerenExam, FilterCategory } from '../data/types';
import { VisualBubbleStrip } from './VisualBubbleStrip';

interface InstantDecoderBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeFilter: FilterCategory;
  onFilterChange: (f: FilterCategory) => void;
  filteredExams: HoerenExam[];
  bookmarkedIds: string[];
  masteredIds: string[];
  onToggleBookmark: (id: string) => void;
  onToggleMastered: (id: string) => void;
  onOpenExamInSimulator: (exam: HoerenExam) => void;
  onOpenTrapGroup?: (trapGroupId: string) => void;
}

export const InstantDecoderBar: React.FC<InstantDecoderBarProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  filteredExams,
  bookmarkedIds,
  masteredIds,
  onToggleBookmark,
  onToggleMastered,
  onOpenExamInSimulator,
  onOpenTrapGroup,
}) => {
  const filterTabs: { id: FilterCategory; label: string; count?: string }[] = [
    { id: 'all', label: 'الكل (154)' },
    { id: 'teil1', label: 'Teil 1 (52)' },
    { id: 'teil2', label: 'Teil 2 (56)' },
    { id: 'teil3', label: 'Teil 3 (46)' },
    { id: 'new2026', label: '🔥 جديد 2026' },
    { id: 'traps', label: '⚠️ فخاخ الأساسي vs المعدل' },
    { id: 'bookmarked', label: '⭐ المفضلة واللي باقي ما حفظتش' },
  ];

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="sticky top-0 z-30 border-b border-slate-800/90 bg-slate-950/95 backdrop-blur-md shadow-xl">
      <div className="mx-auto max-w-7xl px-4 py-3">
        {/* Search Input + Quick Filter Bar */}
        <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="⚡ رادار 3 ثواني: اكتب أول كلمة بالألمانية، العربية، أو رقم الكود (مثال: luf, rol, bier, 24, 134890)..."
              className="w-full rounded-xl border border-emerald-500/40 bg-slate-900/95 py-2.5 pr-10 pl-10 text-sm text-white placeholder-slate-400 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
            />
            {isSearching && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                title="مسح البحث"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {filterTabs.map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onFilterChange(tab.id)}
                  className={`shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
                    active
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Instant 3-Second Decoder Results Overlay when typing */}
        {isSearching && (
          <div className="mt-3 max-h-[62vh] overflow-y-auto rounded-2xl border border-emerald-500/40 bg-slate-900/98 p-3.5 shadow-2xl">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800">
              <span className="text-xs font-bold text-emerald-400">
                ⚡ نتائج فك الشفرة الفوري ({filteredExams.length} امتحان مطابق لـ &quot;{searchQuery}&quot;)
              </span>
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="text-xs font-semibold text-slate-400 hover:text-white"
              >
                إغلاق النتائج ✕
              </button>
            </div>

            {filteredExams.length === 0 ? (
              <div className="py-6 text-center text-sm text-slate-400">
                ما لقينا حتى امتحان بهاد الاسم أو الكود. جرب تكتب غير 3 حروف اللولة (بحال: <span className="font-mono text-emerald-400">luf</span> أو <span className="font-mono text-emerald-400">stein</span> أو <span className="font-mono text-emerald-400">24</span>).
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {filteredExams.slice(0, 18).map((exam) => {
                  const isBookmarked = bookmarkedIds.includes(exam.id);
                  const isMastered = masteredIds.includes(exam.id);

                  return (
                    <div
                      key={exam.id}
                      className={`rounded-xl border p-3 transition-all ${
                        exam.isTrap
                          ? 'border-rose-500/50 bg-rose-950/20'
                          : 'border-slate-800 bg-slate-950/90'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[11px] font-bold text-emerald-400">
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
                          <h4 className="mt-1 font-sans text-sm font-bold text-white" dir="ltr">
                            {exam.title}
                          </h4>
                          <p className="text-xs text-slate-300">{exam.arabicTitle}</p>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onToggleBookmark(exam.id)}
                            className={`rounded p-1 ${
                              isBookmarked ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                            }`}
                            title="إضافة للمفضلة"
                          >
                            <Star className="w-4 h-4 fill-current" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onToggleMastered(exam.id)}
                            className={`rounded p-1 ${
                              isMastered ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                            }`}
                            title="تم الحفظ"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-2">
                        <VisualBubbleStrip exam={exam} compact />
                      </div>

                      {exam.isTrap && exam.trapWarningDarija && (
                        <div className="mt-2 rounded-lg border border-rose-500/40 bg-rose-950/40 p-2 text-[11px] font-semibold text-rose-200">
                          {exam.trapWarningDarija}
                        </div>
                      )}

                      <div className="mt-2 rounded-lg bg-slate-900/90 p-2 text-xs text-emerald-200">
                        🇲🇦 {exam.darijaStory}
                      </div>

                      <div className="mt-2.5 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            onOpenExamInSimulator(exam);
                            onSearchChange('');
                          }}
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-emerald-500"
                        >
                          <Play className="w-3 h-3" />
                          <span>فتح فـ المحاكي</span>
                        </button>

                        {exam.isTrap && exam.trapGroupId && onOpenTrapGroup && (
                          <button
                            type="button"
                            onClick={() => {
                              onOpenTrapGroup(exam.trapGroupId!);
                              onSearchChange('');
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-rose-500/40 bg-rose-950/50 px-2 py-1 text-[11px] font-bold text-rose-300 hover:bg-rose-900/50"
                          >
                            <Layers className="w-3 h-3" />
                            <span>قارن النسختين</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
