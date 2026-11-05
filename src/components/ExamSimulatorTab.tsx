import React, { useState, useEffect } from 'react';
import {
  Shuffle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  AlertTriangle,
  Sparkles,
  Dices,
  Eye,
  EyeOff,
} from 'lucide-react';
import { HoerenExam, ExamStatement } from '../data/types';
import { TEIL1_EXAMS, TEIL2_EXAMS, TEIL3_EXAMS } from '../data/hoerenData';
import { gradeExamAnswers, shuffleStatements } from '../utils/hoerenLogic';
import { soundFX } from '../utils/audioEngine';
import { AudioPlayerBar } from './AudioPlayerBar';
import { VisualBubbleStrip } from './VisualBubbleStrip';

interface ExamSimulatorTabProps {
  selectedExam: HoerenExam;
  onSelectExam: (exam: HoerenExam) => void;
  localAudioMap: Record<string, string>;
  onUploadLocalAudio: (examId: string, file: File) => void;
  onRecordExamScore: (examId: string, score: number, mastered: boolean) => void;
}

export const ExamSimulatorTab: React.FC<ExamSimulatorTabProps> = ({
  selectedExam,
  onSelectExam,
  localAudioMap,
  onUploadLocalAudio,
  onRecordExamScore,
}) => {
  const [mode, setMode] = useState<'single' | 'full-mock'>('single');
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [showDarijaShield, setShowDarijaShield] = useState<boolean>(true);
  const [displayedStatements, setDisplayedStatements] = useState<ExamStatement[]>(
    selectedExam.statements
  );
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Full 3-Teil Mock Exam State (Teil 1 + Teil 2 + Teil 3 = 75 pts)
  const [mockExams, setMockExams] = useState<[HoerenExam, HoerenExam, HoerenExam]>(() => [
    TEIL1_EXAMS[0],
    TEIL2_EXAMS[0],
    TEIL3_EXAMS[0],
  ]);
  const [activeMockIndex, setActiveMockIndex] = useState<0 | 1 | 2>(0);
  const [mockAnswers, setMockAnswers] = useState<Record<string, Record<number, boolean>>>({});
  const [mockSubmitted, setMockSubmitted] = useState<boolean>(false);

  const currentExam = mode === 'single' ? selectedExam : mockExams[activeMockIndex];

  useEffect(() => {
    const base = currentExam.statements;
    setDisplayedStatements(isShuffled ? shuffleStatements(base) : base);
    if (mode === 'single') {
      setAnswers({});
      setSubmitted(false);
    }
  }, [currentExam.id, isShuffled, mode]);

  const handleToggleShuffle = () => {
    const next = !isShuffled;
    setIsShuffled(next);
    setDisplayedStatements(
      next ? shuffleStatements(currentExam.statements) : currentExam.statements
    );
    setSubmitted(false);
  };

  const handleAnswerSelect = (taskNumber: number, value: boolean) => {
    if (mode === 'single') {
      if (submitted) return;
      setAnswers((prev) => ({ ...prev, [taskNumber]: value }));
    } else {
      if (mockSubmitted) return;
      setMockAnswers((prev) => ({
        ...prev,
        [currentExam.id]: {
          ...(prev[currentExam.id] || {}),
          [taskNumber]: value,
        },
      }));
    }
  };

  const handleSingleSubmit = () => {
    setSubmitted(true);
    const result = gradeExamAnswers(currentExam, answers);
    if (result.scorePoints >= 20) {
      soundFX.playSuccessChime();
    } else {
      soundFX.playErrorBuzz();
    }
    onRecordExamScore(currentExam.id, result.scorePoints, result.scorePoints === 25);
  };

  const handleGenerateNewFullMock = () => {
    const r1 = TEIL1_EXAMS[Math.floor(Math.random() * TEIL1_EXAMS.length)];
    const r2 = TEIL2_EXAMS[Math.floor(Math.random() * TEIL2_EXAMS.length)];
    const r3 = TEIL3_EXAMS[Math.floor(Math.random() * TEIL3_EXAMS.length)];
    setMockExams([r1, r2, r3]);
    setActiveMockIndex(0);
    setMockAnswers({});
    setMockSubmitted(false);
    setMode('full-mock');
  };

  const handleMockSubmitAll = () => {
    setMockSubmitted(true);
    let total = 0;
    mockExams.forEach((ex) => {
      const g = gradeExamAnswers(ex, mockAnswers[ex.id] || {});
      total += g.scorePoints;
      onRecordExamScore(ex.id, g.scorePoints, g.scorePoints === 25);
    });
    if (total >= 45) {
      soundFX.playSuccessChime();
    } else {
      soundFX.playErrorBuzz();
    }
  };

  const activeAnswers = mode === 'single' ? answers : mockAnswers[currentExam.id] || {};
  const isGraded = mode === 'single' ? submitted : mockSubmitted;
  const currentGrade = gradeExamAnswers(currentExam, activeAnswers);

  const totalMockPoints = mockExams.reduce((acc, ex) => {
    return acc + gradeExamAnswers(ex, mockAnswers[ex.id] || {}).scorePoints;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Mode Switcher + Exam Selector Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/95 p-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setMode('single')}
            className={`rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-all ${
              mode === 'single'
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🎧 تدريب على موضوع واحد (25 نقطة)
          </button>

          <button
            type="button"
            onClick={handleGenerateNewFullMock}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-all ${
              mode === 'full-mock'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-800 text-amber-300 border border-amber-500/40 hover:bg-slate-700'
            }`}
          >
            <Dices className="w-4 h-4" />
            <span>🏆 امتحان تجريبي رسمي كامل (Teil 1 + 2 + 3 = 75 نقطة)</span>
          </button>
        </div>

        {/* Anti-Shuffle 2026 Toggle + Darija Shield Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleToggleShuffle}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-extrabold transition-all ${
              isShuffled
                ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600'
            }`}
          >
            <Shuffle className="w-4 h-4" />
            <span>🔀 وضع امتحان 2026 المقلوب: {isShuffled ? 'مُفعّل (مقلوب!)' : 'الترتيب العادي'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowDarijaShield(!showDarijaShield)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
              showDarijaShield
                ? 'border-emerald-500/50 bg-emerald-950/60 text-emerald-300'
                : 'border-slate-700 bg-slate-800 text-slate-400'
            }`}
          >
            {showDarijaShield ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>{showDarijaShield ? 'إخفاء القصة والكود' : 'إظهار القصة والكود'}</span>
          </button>
        </div>
      </div>

      {/* Single Exam Quick Picker OR Full Mock 3-Teil Switcher */}
      {mode === 'single' ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-3.5">
          {[
            { label: `Teil 1 — Globalverstehen 41–45 (${TEIL1_EXAMS.length})`, list: TEIL1_EXAMS, teil: 1 },
            { label: `Teil 2 — Detailverstehen 46–55 (${TEIL2_EXAMS.length})`, list: TEIL2_EXAMS, teil: 2 },
            { label: `Teil 3 — Selektives Verstehen 56–60 (${TEIL3_EXAMS.length})`, list: TEIL3_EXAMS, teil: 3 },
          ].map((group) => (
            <div key={group.teil}>
              <label className="block text-xs font-bold text-slate-400 mb-1" dir="ltr">
                {group.label}
              </label>
              <select
                value={selectedExam.teil === group.teil ? selectedExam.id : ''}
                onChange={(e) => {
                  const found = group.list.find((x) => x.id === e.target.value);
                  if (found) onSelectExam(found);
                }}
                dir="ltr"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="" disabled>
                  -- اختر موضوع Teil {group.teil} --
                </option>
                {group.list.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    #{ex.number} {ex.title} [{ex.codeFormatted}] {ex.isTrap ? `⚠️ ${ex.versionTag}` : ''}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-500/40 bg-amber-950/20 p-4">
          <div className="flex items-center gap-2 flex-wrap">
            {mockExams.map((mex, idx) => {
              const g = gradeExamAnswers(mex, mockAnswers[mex.id] || {});
              return (
                <button
                  key={mex.id}
                  type="button"
                  onClick={() => setActiveMockIndex(idx as 0 | 1 | 2)}
                  className={`rounded-xl px-4 py-2 text-xs font-extrabold transition-all ${
                    activeMockIndex === idx
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-200 border border-slate-700'
                  }`}
                >
                  Teil {mex.teil}: {mex.title} ({mockSubmitted ? `${g.scorePoints}/25` : '25 نقطة'})
                </button>
              );
            })}
          </div>

          {mockSubmitted && (
            <div className="rounded-xl border border-emerald-400 bg-emerald-950/90 px-4 py-2 font-mono text-sm font-black text-emerald-300">
              النتيجة الإجمالية: {totalMockPoints} / 75 نقطة ({totalMockPoints >= 45 ? 'ناجح B2 🎉' : 'خاصك تزيد تراجع 💪'})
            </div>
          )}
        </div>
      )}

      {/* Main Split Simulator Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left / Top Column: Audio + Darija Anti-Shuffle Shield */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-5 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block rounded-md bg-emerald-500/20 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-300">
                  TELC B2 Hören • Teil {currentExam.teil} #{currentExam.number}
                </span>
                <h2 className="mt-1.5 font-sans text-xl font-black text-white" dir="ltr">
                  {currentExam.title}
                </h2>
                <p className="text-sm font-bold text-slate-300">{currentExam.arabicTitle}</p>
              </div>
              <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-bold text-amber-300">
                {currentExam.versionTag}
              </span>
            </div>

            {/* Audio Player Bar */}
            <div className="mt-4">
              <AudioPlayerBar
                exam={currentExam}
                localAudioMap={localAudioMap}
                onUploadLocalAudio={onUploadLocalAudio}
              />
            </div>

            {/* Trap Alert if this exam has a twin */}
            {currentExam.isTrap && currentExam.trapWarningDarija && (
              <div className="mt-4 rounded-xl border border-rose-500/50 bg-rose-950/35 p-3.5 text-xs font-bold text-rose-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>{currentExam.trapWarningDarija}</div>
              </div>
            )}

            {/* Toggleable Darija Story & Visual Bubble Matrix Shield */}
            {showDarijaShield && (
              <div className="mt-4 space-y-3 pt-4 border-t border-slate-800">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/25 p-3.5">
                  <div className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>🇲🇦 القصة بالدارجة ضد قلب الترتيب (Anti-Shuffle Story):</span>
                  </div>
                  <p className="text-sm font-bold leading-relaxed text-white">
                    {currentExam.darijaStory}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-400 mb-1.5">
                    الكلمات المفتاحية اللي ديما كتكون Richtig (+) وخا يتقلب الترتيب:
                  </div>
                  <div className="flex flex-wrap gap-1.5" dir="ltr">
                    {currentExam.triggerKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-amber-500/40 bg-amber-500/15 px-2.5 py-1 font-sans text-xs font-bold text-amber-300"
                      >
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {!isShuffled && (
                  <div className="pt-2">
                    <div className="text-xs font-bold text-slate-400 mb-1.5">
                      مصفوفة ورقة الإجابة الرسمية (الكود الأصلي):
                    </div>
                    <VisualBubbleStrip exam={currentExam} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Official TELC B2 Answer Sheet (Aufgaben 41-45 / 46-55 / 56-60) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-5 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-extrabold text-white">
                  📝 ورقة الإجابة الرسمية TELC Deutsch B2 (25 نقطة)
                </h3>
                <p className="text-xs text-slate-400">
                  {isShuffled
                    ? '🔀 الترتيب مقلوب! اعتمد على القصة بالدارجة والكلمات المفتاحية باش تختار (+) أو (-).'
                    : 'اختر [+ Richtig] أو [- Falsch] لكل جملة ثم اضغط على تصحيح الورقة.'}
                </p>
              </div>

              {isGraded && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-950/80 px-3.5 py-1.5">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-sm font-black text-emerald-300">
                    {currentGrade.scorePoints} / {currentGrade.maxPoints} pts ({currentGrade.correctCount}/{currentGrade.totalStatements})
                  </span>
                </div>
              )}
            </div>

            {/* Statements List */}
            <div className="mt-4 space-y-3">
              {displayedStatements.map((stmt, displayIdx) => {
                const baseNum =
                  currentExam.teil === 1 ? 41 : currentExam.teil === 2 ? 46 : 56;
                const displayNumber = isShuffled ? baseNum + displayIdx : stmt.number;
                const userAnswer = activeAnswers[stmt.number];
                const isCorrect = isGraded && userAnswer === stmt.isRichtig;
                const isWrong = isGraded && userAnswer !== stmt.isRichtig;

                return (
                  <div
                    key={stmt.number}
                    className={`rounded-xl border p-3.5 transition-all ${
                      isCorrect
                        ? 'border-emerald-500/60 bg-emerald-950/25'
                        : isWrong
                          ? 'border-rose-500/60 bg-rose-950/25'
                          : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3 flex-1" dir="ltr">
                        <span className="flex h-7 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 font-mono text-xs font-black text-emerald-400">
                          {displayNumber}
                        </span>
                        <div className="space-y-1">
                          <p className="font-sans text-sm font-semibold leading-relaxed text-slate-100">
                            {stmt.germanText}
                          </p>
                          {(isGraded || showDarijaShield) && stmt.isRichtig && (
                            <span className="inline-block rounded bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-300">
                              🔑 مفتاح الصح: {stmt.triggerKeyword}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* [ + Richtig ] / [ - Falsch ] Buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center" dir="ltr">
                        <button
                          type="button"
                          onClick={() => handleAnswerSelect(stmt.number, true)}
                          className={`flex items-center gap-1 rounded-xl border px-3.5 py-2 font-mono text-xs font-black transition-all ${
                            userAnswer === true
                              ? 'border-emerald-400 bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                              : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-emerald-500/50'
                          }`}
                        >
                          <span>+ Richtig</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAnswerSelect(stmt.number, false)}
                          className={`flex items-center gap-1 rounded-xl border px-3.5 py-2 font-mono text-xs font-black transition-all ${
                            userAnswer === false
                              ? 'border-rose-400 bg-rose-600 text-white shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                              : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-rose-500/50'
                          }`}
                        >
                          <span>- Falsch</span>
                        </button>
                      </div>
                    </div>

                    {/* Instant Darija Explanation after Grading */}
                    {isGraded && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span
                          className={`flex items-center gap-1.5 font-bold ${
                            isCorrect ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 shrink-0" />
                          )}
                          <span>{stmt.darijaHint}</span>
                        </span>

                        <span className="font-mono font-bold text-slate-300" dir="ltr">
                          الحل الرسمي: {stmt.isRichtig ? '+ Richtig' : '- Falsch'}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit / Reset Footer */}
            <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              {mode === 'single' ? (
                <>
                  <button
                    type="button"
                    onClick={handleSingleSubmit}
                    disabled={submitted}
                    className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-black text-white shadow-lg hover:bg-emerald-500 disabled:opacity-50"
                  >
                    ✅ تصحيح الورقة وحساب النقاط (25 نقطة)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAnswers({});
                      setSubmitted(false);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>إعادة المحاولة</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleMockSubmitAll}
                    disabled={mockSubmitted}
                    className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-black text-slate-950 shadow-lg hover:bg-amber-400 disabled:opacity-50"
                  >
                    🏆 تصحيح الامتحان الكامل (Teil 1 + 2 + 3 = 75 نقطة)
                  </button>

                  <button
                    type="button"
                    onClick={handleGenerateNewFullMock}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
                  >
                    <Dices className="w-4 h-4" />
                    <span>توليد امتحان تجريبي جديد</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
