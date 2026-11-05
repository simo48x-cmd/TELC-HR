import React, { useState } from 'react';
import {
  Zap,
  ShieldAlert,
  Sparkles,
  Calendar,
  Trophy,
  Flame,
  CheckCircle2,
  Delete,
  ArrowRight,
} from 'lucide-react';
import { ALL_HOEREN_EXAMS, EXAM_BY_ID } from '../data/hoerenData';
import {
  TRAP_COMPARISON_GROUPS,
  FOURTEEN_DAY_STUDY_PLAN,
} from '../data/memorySystemsData';
import { normalizeCodeDigits } from '../utils/hoerenLogic';
import { soundFX } from '../utils/audioEngine';

interface BlitzGamesAndPlanTabProps {
  completedDays: number[];
  onToggleStudyDay: (dayNumber: number) => void;
  highScores: Record<string, { score: number; streak: number }>;
  onSaveGameScore: (gameMode: string, score: number, streak: number) => void;
}

export const BlitzGamesAndPlanTab: React.FC<BlitzGamesAndPlanTabProps> = ({
  completedDays,
  onToggleStudyDay,
  highScores,
  onSaveGameScore,
}) => {
  const [activeGame, setActiveGame] = useState<'code-blitz' | 'trap-duel' | 'darija-quiz' | 'plan-14'>('code-blitz');

  // --- GAME 1: CODE BLITZ STATE ---
  const [blitzExamIndex, setBlitzExamIndex] = useState<number>(0);
  const [typedCode, setTypedCode] = useState<string>('');
  const [blitzScore, setBlitzScore] = useState<number>(0);
  const [blitzStreak, setBlitzStreak] = useState<number>(0);
  const [blitzFeedback, setBlitzFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const blitzExam = ALL_HOEREN_EXAMS[blitzExamIndex % ALL_HOEREN_EXAMS.length];

  const handleKeypadDigit = (digit: string) => {
    if (typedCode.length < 8) {
      setTypedCode((prev) => prev + digit);
    }
  };

  const handleCheckBlitzCode = () => {
    const cleanTarget = normalizeCodeDigits(blitzExam.code);
    const cleanInput = normalizeCodeDigits(typedCode);

    if (cleanInput === cleanTarget) {
      soundFX.playSuccessChime();
      const nextScore = blitzScore + 10 + blitzStreak * 2;
      const nextStreak = blitzStreak + 1;
      setBlitzScore(nextScore);
      setBlitzStreak(nextStreak);
      setBlitzFeedback({
        ok: true,
        msg: `🎉 تبارك الله عليك آ سيمو! الكود الصحيح هو ${blitzExam.codeFormatted} — ${blitzExam.darijaStory}`,
      });
      onSaveGameScore('code-blitz', nextScore, nextStreak);
    } else {
      soundFX.playErrorBuzz();
      setBlitzStreak(0);
      setBlitzFeedback({
        ok: false,
        msg: `❌ الكود الصحيح ديال "${blitzExam.title}" هو ${blitzExam.codeFormatted}. تفكر: ${blitzExam.darijaStory}`,
      });
    }
  };

  const handleNextBlitzQuestion = () => {
    setTypedCode('');
    setBlitzFeedback(null);
    setBlitzExamIndex(Math.floor(Math.random() * ALL_HOEREN_EXAMS.length));
  };

  // --- GAME 2: TRAP DUEL STATE ---
  const [trapIdx, setTrapIdx] = useState<number>(0);
  const [variantIdx, setVariantIdx] = useState<number>(0);
  const [trapScore, setTrapScore] = useState<number>(0);
  const [trapStreak, setTrapStreak] = useState<number>(0);
  const [trapFeedback, setTrapFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const currentTrapGroup = TRAP_COMPARISON_GROUPS[trapIdx % TRAP_COMPARISON_GROUPS.length];
  const targetVariant =
    currentTrapGroup.versions[variantIdx % currentTrapGroup.versions.length];

  const handleGuessTrapVariant = (chosenCodeDisplay: string) => {
    if (trapFeedback) return;
    if (chosenCodeDisplay === targetVariant.codeDisplay) {
      soundFX.playSuccessChime();
      const ns = trapScore + 15;
      const nst = trapStreak + 1;
      setTrapScore(ns);
      setTrapStreak(nst);
      setTrapFeedback({
        ok: true,
        msg: `✅ واعر! فرقنا بين الأساسي والمعدل بـ "${targetVariant.highlightedWord}" ➔ الكود ${targetVariant.codeDisplay}!`,
      });
      onSaveGameScore('trap-duel', ns, nst);
    } else {
      soundFX.playErrorBuzz();
      setTrapStreak(0);
      setTrapFeedback({
        ok: false,
        msg: `⚠️ رد بالك! ملي تشوف "${targetVariant.highlightedWord}" فـ ${currentTrapGroup.title} راه الكود هو ${targetVariant.codeDisplay}!`,
      });
    }
  };

  const handleNextTrapQuestion = () => {
    setTrapFeedback(null);
    const nextG = Math.floor(Math.random() * TRAP_COMPARISON_GROUPS.length);
    const group = TRAP_COMPARISON_GROUPS[nextG];
    setTrapIdx(nextG);
    setVariantIdx(Math.floor(Math.random() * group.versions.length));
  };

  // --- GAME 3: DARIJA ANTI-SHUFFLE QUIZ STATE ---
  const [quizExamIdx, setQuizExamIdx] = useState<number>(5);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizStreak, setQuizStreak] = useState<number>(0);
  const [quizFeedback, setQuizFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const quizExam = ALL_HOEREN_EXAMS[quizExamIdx % ALL_HOEREN_EXAMS.length];
  const trueStmt =
    quizExam.statements.find((s) => s.isRichtig) || quizExam.statements[0];
  const falseStmts = quizExam.statements.filter((s) => !s.isRichtig).slice(0, 2);
  const quizOptions = [trueStmt, ...falseStmts].sort((a, b) => a.number - b.number);

  const handlePickDarijaQuizOption = (isRichtig: boolean) => {
    if (quizFeedback) return;
    if (isRichtig) {
      soundFX.playSuccessChime();
      const ns = quizScore + 15;
      const nst = quizStreak + 1;
      setQuizScore(ns);
      setQuizStreak(nst);
      setQuizFeedback({
        ok: true,
        msg: `🎯 برافو! هادي هي الجملة الصحيحة (+) اللي مطابقة للقصة بالدارجة!`,
      });
      onSaveGameScore('darija-quiz', ns, nst);
    } else {
      soundFX.playErrorBuzz();
      setQuizStreak(0);
      setQuizFeedback({
        ok: false,
        msg: `❌ لا، هاد الجملة فخ (-). الجملة الصحيحة (+) هي: "${trueStmt.germanText}"`,
      });
    }
  };

  const handleNextDarijaQuiz = () => {
    setQuizFeedback(null);
    setQuizExamIdx(Math.floor(Math.random() * ALL_HOEREN_EXAMS.length));
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation between the 3 Games + 14-Day Plan */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/95 p-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveGame('code-blitz')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-black transition-all ${
              activeGame === 'code-blitz'
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>1. ⚡ سرعة الكود (Code-Blitz)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveGame('trap-duel')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-black transition-all ${
              activeGame === 'trap-duel'
                ? 'bg-rose-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>2. ⚠️ تحدي الفخاخ (Trap-Duel)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveGame('darija-quiz')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-black transition-all ${
              activeGame === 'darija-quiz'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>3. 🇲🇦 تحدي القصة بالدارجة ضد القليب</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveGame('plan-14')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-black transition-all ${
              activeGame === 'plan-14'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>4. 📅 خطة 14 يوم لـ 75/75 ({completedDays.length}/14)</span>
          </button>
        </div>

        {/* High Score Badge */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-950/30 px-3 py-1.5 text-xs font-extrabold text-amber-300">
            <Trophy className="w-4 h-4" />
            <span>
              أعلى سكور: {highScores[activeGame]?.score || 0} نقطة
            </span>
          </div>
        </div>
      </div>

      {/* GAME 1: CODE BLITZ WITH INTERACTIVE KEYPAD */}
      {activeGame === 'code-blitz' && (
        <div className="mx-auto max-w-2xl rounded-3xl border border-emerald-500/40 bg-slate-900/95 p-6 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="rounded-lg bg-emerald-500/20 px-3 py-1 font-mono text-xs font-black text-emerald-300">
              Teil {blitzExam.teil} #{blitzExam.number} • {blitzExam.versionTag}
            </span>
            <div className="flex items-center gap-3 font-mono text-xs font-bold">
              <span className="text-amber-400 flex items-center gap-1">
                <Flame className="w-4 h-4" /> Streak: {blitzStreak}
              </span>
              <span className="text-emerald-400">Score: {blitzScore}</span>
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="text-xs font-bold text-slate-400">
              شنو هو الكود الصحيح ديال هاد الامتحان؟
            </div>
            <h3 className="font-sans text-2xl font-black text-white" dir="ltr">
              {blitzExam.title}
            </h3>
            <p className="text-xs font-mono text-slate-400" dir="ltr">
              أول كلمات: &quot;{blitzExam.firstWordsTrigger}&quot;
            </p>
          </div>

          {/* Digital Code Display */}
          <div
            dir="ltr"
            className="mx-auto flex h-14 max-w-xs items-center justify-center rounded-2xl border-2 border-emerald-500/60 bg-slate-950 font-mono text-2xl font-black tracking-widest text-emerald-300 shadow-inner"
          >
            {typedCode || '— — —'}
          </div>

          {/* Numeric Keypad */}
          <div className="mx-auto max-w-xs grid grid-cols-5 gap-2" dir="ltr">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => handleKeypadDigit(d)}
                className="h-12 rounded-xl border border-slate-700 bg-slate-800 font-mono text-lg font-black text-white hover:border-emerald-400 hover:bg-slate-700 active:scale-95 transition-all"
              >
                {d}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setTypedCode((prev) => prev.slice(0, -1))}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
            >
              <Delete className="w-4 h-4" />
              <span>مسح رقم</span>
            </button>

            <button
              type="button"
              onClick={handleCheckBlitzCode}
              disabled={!typedCode}
              className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-black text-white shadow-lg hover:bg-emerald-500 disabled:opacity-40"
            >
              ✅ تأكيد الكود
            </button>

            <button
              type="button"
              onClick={handleNextBlitzQuestion}
              className="inline-flex items-center gap-1 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-black text-slate-950 hover:bg-amber-400"
            >
              <span>الموضوع التالي</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {blitzFeedback && (
            <div
              className={`rounded-2xl border p-4 text-sm font-bold ${
                blitzFeedback.ok
                  ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200'
                  : 'border-rose-500/60 bg-rose-950/40 text-rose-200'
              }`}
            >
              {blitzFeedback.msg}
            </div>
          )}
        </div>
      )}

      {/* GAME 2: TRAP DUEL (الأساسي VS المعدل) */}
      {activeGame === 'trap-duel' && (
        <div className="mx-auto max-w-2xl rounded-3xl border border-rose-500/40 bg-slate-900/95 p-6 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="rounded-lg bg-rose-500/20 px-3 py-1 text-xs font-black text-rose-300">
              ⚠️ تحدي الفخاخ • Teil {currentTrapGroup.teil}
            </span>
            <div className="flex items-center gap-3 font-mono text-xs font-bold">
              <span className="text-amber-400">Streak: {trapStreak}</span>
              <span className="text-emerald-400">Score: {trapScore}</span>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className="font-sans text-2xl font-black text-white" dir="ltr">
              {currentTrapGroup.title}
            </h3>
            <p className="text-sm font-bold text-rose-300">{currentTrapGroup.subtitleDarija}</p>
            <div className="mx-auto max-w-lg rounded-2xl border border-amber-500/50 bg-slate-950 p-4">
              <div className="text-xs font-bold text-slate-400 mb-1">
                لقيتي فـ ورقة الامتحان هاد الكلمة المفتاحية:
              </div>
              <div className="font-sans text-lg font-black text-amber-300" dir="ltr">
                &quot;{targetVariant.highlightedWord}&quot;
              </div>
              <div className="mt-1 text-xs text-slate-300" dir="ltr">
                ({targetVariant.triggerPhrase})
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {currentTrapGroup.versions.map((v) => (
              <button
                key={v.examId}
                type="button"
                onClick={() => handleGuessTrapVariant(v.codeDisplay)}
                className="flex flex-col items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 p-4 hover:border-emerald-400 hover:bg-slate-800 transition-all"
              >
                <span className="text-xs font-bold text-slate-400">{v.versionName}</span>
                <span className="mt-1 font-mono text-xl font-black text-emerald-400" dir="ltr">
                  {v.codeDisplay}
                </span>
              </button>
            ))}
          </div>

          {trapFeedback && (
            <div className="space-y-3">
              <div
                className={`rounded-2xl border p-4 text-sm font-bold ${
                  trapFeedback.ok
                    ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200'
                    : 'border-rose-500/60 bg-rose-950/40 text-rose-200'
                }`}
              >
                {trapFeedback.msg}
              </div>
              <button
                type="button"
                onClick={handleNextTrapQuestion}
                className="w-full rounded-xl bg-amber-500 py-2.5 text-sm font-black text-slate-950 hover:bg-amber-400"
              >
                الفخ التالي ➔
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 3: DARIJA ANTI-SHUFFLE QUIZ */}
      {activeGame === 'darija-quiz' && (
        <div className="mx-auto max-w-2xl rounded-3xl border border-amber-500/40 bg-slate-900/95 p-6 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-black text-amber-300">
              🇲🇦 تحدي القصة بالدارجة ضد قلب الترتيب • Teil {quizExam.teil}
            </span>
            <div className="flex items-center gap-3 font-mono text-xs font-bold">
              <span className="text-amber-400">Streak: {quizStreak}</span>
              <span className="text-emerald-400">Score: {quizScore}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/25 p-4">
            <div className="text-xs font-bold text-emerald-400">
              الموضوع: {quizExam.title}
            </div>
            <p className="mt-1.5 text-base font-black text-white">
              🇲🇦 القصة بالدارجة: &quot;{quizExam.darijaStory}&quot;
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-bold text-slate-300">
              إينا جملة من هادو هي اللي <span className="text-emerald-400">Richtig (+)</span> على حساب القصة بالدارجة؟
            </div>
            {quizOptions.map((opt) => (
              <button
                key={opt.number}
                type="button"
                dir="ltr"
                onClick={() => handlePickDarijaQuizOption(opt.isRichtig)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-left font-sans text-sm font-semibold text-slate-100 hover:border-amber-400 hover:bg-slate-800 transition-all"
              >
                {opt.germanText}
              </button>
            ))}
          </div>

          {quizFeedback && (
            <div className="space-y-3">
              <div
                className={`rounded-2xl border p-4 text-sm font-bold ${
                  quizFeedback.ok
                    ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200'
                    : 'border-rose-500/60 bg-rose-950/40 text-rose-200'
                }`}
              >
                {quizFeedback.msg}
              </div>
              <button
                type="button"
                onClick={handleNextDarijaQuiz}
                className="w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-black text-white hover:bg-emerald-500"
              >
                السؤال التالي ➔
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW 4: 14-DAY HÖREN 75/75 STUDY PLAN */}
      {activeGame === 'plan-14' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-blue-500/40 bg-blue-950/20 p-5">
            <h2 className="text-xl font-black text-white">
              📅 خطة 14 يوم لـ Simo (محمد) لضمان 75/75 فـ TELC B2 Hören
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              كل نهار فيه هدف واضح ومحدد (عائلات الكودات ➔ الفخاخ ➔ إيقاع 3+3 ➔ الامتحانات التجريبية المقلوبة). كوشي النهار اللي كملتيه!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {FOURTEEN_DAY_STUDY_PLAN.map((day) => {
              const isDone = completedDays.includes(day.day);
              const sampleExams = day.examIds
                .slice(0, 4)
                .map((id) => EXAM_BY_ID[id])
                .filter(Boolean);

              return (
                <div
                  key={day.day}
                  className={`flex flex-col justify-between rounded-2xl border p-4 transition-all ${
                    isDone
                      ? 'border-emerald-500/60 bg-emerald-950/20'
                      : 'border-slate-800 bg-slate-900/95'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="rounded-md bg-blue-500/20 px-2.5 py-0.5 font-mono text-xs font-black text-blue-300">
                          اليوم {day.day} من 14 • {day.focusDe}
                        </span>
                        <h3 className="mt-1.5 text-base font-black text-white">
                          {day.titleAr}
                        </h3>
                        <p className="mt-1 text-xs font-semibold text-amber-300">
                          🎯 النصيحة: {day.targetTipDarija}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleStudyDay(day.day)}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all ${
                          isDone
                            ? 'border-emerald-400 bg-emerald-600 text-white'
                            : 'border-slate-700 bg-slate-950 text-slate-500 hover:text-white'
                        }`}
                        title={isDone ? 'مكتمل ✓' : 'تحديد كمكتمل'}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5" dir="ltr">
                      {sampleExams.map((ex) => (
                        <span
                          key={ex.id}
                          className="rounded-md bg-slate-950 px-2 py-0.5 font-mono text-[11px] text-slate-300 border border-slate-800"
                        >
                          {ex.title} ({ex.codeFormatted})
                        </span>
                      ))}
                      {day.examIds.length > 4 && (
                        <span className="rounded-md bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-emerald-300">
                          +{day.examIds.length - 4} أخرى
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
