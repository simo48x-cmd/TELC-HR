import React, { useState } from 'react';
import {
  RotateCw,
  ChevronRight,
  ChevronLeft,
  Star,
  CheckCircle2,
  Volume2,
  Sparkles,
  AlertTriangle,
  Shuffle,
} from 'lucide-react';
import { HoerenExam } from '../data/types';
import { VisualBubbleStrip } from './VisualBubbleStrip';
import { speakGermanExamRadio, stopGermanExamRadio } from '../utils/audioEngine';

interface DarijaFlashcardsTabProps {
  exams: HoerenExam[];
  bookmarkedIds: string[];
  masteredIds: string[];
  onToggleBookmark: (id: string) => void;
  onToggleMastered: (id: string) => void;
}

export const DarijaFlashcardsTab: React.FC<DarijaFlashcardsTabProps> = ({
  exams,
  bookmarkedIds,
  masteredIds,
  onToggleBookmark,
  onToggleMastered,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const safeExams = exams.length > 0 ? exams : [];
  const currentExam = safeExams[currentIndex % Math.max(1, safeExams.length)];

  if (!currentExam) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        لا توجد بطاقات مطابقة للفلتر الحالي. جرب اختيار &quot;الكل (154)&quot; من الأعلى.
      </div>
    );
  }

  const handleNext = () => {
    stopGermanExamRadio();
    setIsSpeaking(false);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % safeExams.length);
  };

  const handlePrev = () => {
    stopGermanExamRadio();
    setIsSpeaking(false);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + safeExams.length) % safeExams.length);
  };

  const handleRandomCard = () => {
    stopGermanExamRadio();
    setIsSpeaking(false);
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * safeExams.length));
  };

  const handleSpeakQuick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopGermanExamRadio();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakGermanExamRadio(
      currentExam,
      1.0,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const richtigStatements = currentExam.statements.filter((s) => s.isRichtig);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/95 p-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>🇲🇦 بطاقات القصة بالدارجة والدرع المضاد لقلب الترتيب (Flashcards 3D)</span>
          </h2>
          <p className="text-xs text-slate-400">
            اضغط على البطاقة باش تقلبها وتشوف الكود + القصة بالدارجة + الجمل الصحيحة (+) بالألمانية.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-slate-800 px-3 py-1.5 font-mono text-xs font-bold text-emerald-400">
            {currentIndex + 1} / {safeExams.length}
          </span>
          <button
            type="button"
            onClick={handleRandomCard}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-slate-700"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>بطاقة عشوائية</span>
          </button>
        </div>
      </div>

      {/* Interactive Flashcard Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl transition-all hover:border-emerald-400"
      >
        {/* Card Top Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-emerald-500/20 px-3 py-1 font-mono text-xs font-black text-emerald-300">
              Teil {currentExam.teil} #{currentExam.number}
            </span>
            <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-bold text-amber-300">
              {currentExam.versionTag}
            </span>
            {currentExam.isTrap && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-rose-500/20 px-2.5 py-1 text-xs font-bold text-rose-300">
                <AlertTriangle className="w-3.5 h-3.5" /> فخ مكرر!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={handleSpeakQuick}
              className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                isSpeaking
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-800 text-emerald-300 hover:bg-slate-700'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isSpeaking ? 'إيقاف الصوت' : 'نطق بالألمانية'}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleBookmark(currentExam.id)}
              className={`rounded-xl p-2 ${
                bookmarkedIds.includes(currentExam.id)
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Star className="w-4 h-4 fill-current" />
            </button>

            <button
              type="button"
              onClick={() => onToggleMastered(currentExam.id)}
              className={`rounded-xl p-2 ${
                masteredIds.includes(currentExam.id)
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* FRONT VS BACK */}
        {!isFlipped ? (
          <div className="py-10 text-center space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              الوجه الأمامي — تفكر الكود والقصة بالدارجة!
            </div>
            <h3 className="font-sans text-2xl sm:text-3xl font-black text-white" dir="ltr">
              {currentExam.title}
            </h3>
            <p className="text-lg font-bold text-amber-300">{currentExam.arabicTitle}</p>
            <div className="mx-auto max-w-md rounded-xl border border-slate-800 bg-slate-950/80 p-3 font-mono text-xs text-slate-300" dir="ltr">
              أول كلمات فـ الورقة: &quot;{currentExam.firstWordsTrigger}&quot;
            </div>
            <div className="pt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 px-4 py-2 text-xs font-extrabold text-emerald-300">
              <RotateCw className="w-4 h-4" />
              <span>اضغط هنا لقلب البطاقة وإظهار الكود والقصة بالدارجة</span>
            </div>
          </div>
        ) : (
          <div className="py-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-sans text-xl font-black text-white" dir="ltr">
                  {currentExam.title}
                </h3>
                <p className="text-sm font-bold text-slate-300">{currentExam.arabicTitle}</p>
              </div>
              <VisualBubbleStrip exam={currentExam} />
            </div>

            {currentExam.isTrap && currentExam.trapWarningDarija && (
              <div className="rounded-xl border border-rose-500/50 bg-rose-950/40 p-3.5 text-xs font-bold text-rose-200">
                {currentExam.trapWarningDarija}
              </div>
            )}

            <div className="rounded-2xl border border-amber-500/40 bg-amber-950/30 p-4">
              <div className="text-xs font-extrabold text-amber-300 mb-1">
                🇲🇦 القصة بالدارجة (باش تعقل على الجمل الصحيحة وخا يتقلب الترتيب):
              </div>
              <p className="text-base font-black leading-relaxed text-white">
                {currentExam.darijaStory}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-extrabold text-emerald-400">
                ✅ الجمل الصحيحة (+) والكلمات المفتاحية بالألمانية:
              </div>
              {richtigStatements.map((stmt) => (
                <div
                  key={stmt.number}
                  dir="ltr"
                  className="rounded-xl border border-emerald-500/30 bg-slate-950/90 p-3 text-xs sm:text-sm text-slate-100 flex items-start gap-2.5"
                >
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-xs font-black text-emerald-300 shrink-0">
                    #{stmt.number} (+)
                  </span>
                  <div>
                    <p className="font-semibold">{stmt.germanText}</p>
                    <span className="mt-1 inline-block text-[11px] font-bold text-amber-300">
                      🔑 Trigger: {stmt.triggerKeyword}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handlePrev}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
        >
          <ChevronRight className="w-4 h-4" />
          <span>البطاقة السابقة</span>
        </button>

        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black text-white shadow-lg hover:bg-emerald-500"
        >
          <RotateCw className="w-4 h-4" />
          <span>{isFlipped ? 'إخفاء الجواب' : 'إظهار الكود والقصة'}</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
        >
          <span>البطاقة التالية</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
