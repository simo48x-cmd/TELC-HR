import React, { useState, useEffect, useMemo } from 'react';
import {
  Brain,
  Headphones,
  ShieldAlert,
  Sparkles,
  Gamepad2,
  Sun,
  Moon,
  Cloud,
  LogOut,
  CheckCircle2,
  Flame,
} from 'lucide-react';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, googleProvider } from './lib/firebase';
import { ALL_HOEREN_EXAMS } from './data/hoerenData';
import { HoerenExam, FilterCategory } from './data/types';
import { filterExams } from './utils/hoerenLogic';
import { InstantDecoderBar } from './components/InstantDecoderBar';
import { CodeMasteryTab } from './components/CodeMasteryTab';
import { ExamSimulatorTab } from './components/ExamSimulatorTab';
import { TrapRadarTab } from './components/TrapRadarTab';
import { DarijaFlashcardsTab } from './components/DarijaFlashcardsTab';
import { BlitzGamesAndPlanTab } from './components/BlitzGamesAndPlanTab';

type MainTabId = 'mastery' | 'simulator' | 'traps' | 'flashcards' | 'games';

const STORAGE_KEYS = {
  MASTERED: 'simo_telc_b2_mastered_v1',
  BOOKMARKED: 'simo_telc_b2_bookmarked_v1',
  STUDY_DAYS: 'simo_telc_b2_study_days_v1',
  HIGH_SCORES: 'simo_telc_b2_high_scores_v1',
  THEME: 'simo_telc_b2_theme_v1',
};

export function App() {
  const [activeTab, setActiveTab] = useState<MainTabId>('mastery');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedExam, setSelectedExam] = useState<HoerenExam>(ALL_HOEREN_EXAMS[0]);
  const [highlightedTrapGroupId, setHighlightedTrapGroupId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return saved ? saved === 'dark' : true;
  });

  // Persistent Progress State (Offline-first localStorage + optional Cloud SQL sync)
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.MASTERED) || '[]');
    } catch {
      return [];
    }
  });
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKED) || '[]');
    } catch {
      return [];
    }
  });
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDY_DAYS) || '[1]');
    } catch {
      return [1];
    }
  });
  const [highScores, setHighScores] = useState<Record<string, { score: number; streak: number }>>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.HIGH_SCORES) || '{}');
    } catch {
      return {};
    }
  });

  // Local MP3/M4A Object URLs mapped by examId
  const [localAudioMap, setLocalAudioMap] = useState<Record<string, string>>({});

  // Optional Cloud SQL + Firebase Auth State
  const [user, setUser] = useState<User | null>(null);
  const [syncStatus, setSyncStatus] = useState<string>('محفوظ محلياً 100%');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MASTERED, JSON.stringify(masteredIds));
  }, [masteredIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKED, JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDY_DAYS, JSON.stringify(completedDays));
  }, [completedDays]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HIGH_SCORES, JSON.stringify(highScores));
  }, [highScores]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Listen to Firebase Auth and sync with Cloud SQL PostgreSQL if signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          const res = await fetch('/api/progress', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data.examProgress)) {
              const cloudMastered = data.examProgress
                .filter((p: { mastered?: boolean }) => p.mastered)
                .map((p: { examId: string }) => p.examId);
              const cloudBookmarked = data.examProgress
                .filter((p: { bookmarked?: boolean }) => p.bookmarked)
                .map((p: { examId: string }) => p.examId);
              setMasteredIds((prev) => Array.from(new Set([...prev, ...cloudMastered])));
              setBookmarkedIds((prev) => Array.from(new Set([...prev, ...cloudBookmarked])));
            }
            if (Array.isArray(data.studyPlan)) {
              const cloudDays = data.studyPlan
                .filter((d: { completed?: boolean }) => d.completed)
                .map((d: { dayNumber: number }) => d.dayNumber);
              setCompletedDays((prev) => Array.from(new Set([...prev, ...cloudDays])));
            }
            setSyncStatus('متصل بـ Cloud SQL ☁️');
          }
        } catch {
          setSyncStatus('محفوظ محلياً');
        }
      } else {
        setSyncStatus('محفوظ محلياً 100%');
      }
    });
    return () => unsubscribe();
  }, []);

  const pushExamProgressToCloud = async (
    examId: string,
    updates: { mastered?: boolean; bookmarked?: boolean; lastScore?: number }
  ) => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      await fetch('/api/progress/exam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ examId, ...updates }),
      });
    } catch {
      // Offline fallback already handled by localStorage
    }
  };

  const handleToggleMastered = (examId: string) => {
    setMasteredIds((prev) => {
      const exists = prev.includes(examId);
      const next = exists ? prev.filter((id) => id !== examId) : [...prev, examId];
      pushExamProgressToCloud(examId, { mastered: !exists });
      return next;
    });
  };

  const handleToggleBookmark = (examId: string) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(examId);
      const next = exists ? prev.filter((id) => id !== examId) : [...prev, examId];
      pushExamProgressToCloud(examId, { bookmarked: !exists });
      return next;
    });
  };

  const handleRecordExamScore = (examId: string, score: number, mastered: boolean) => {
    if (mastered && !masteredIds.includes(examId)) {
      setMasteredIds((prev) => [...prev, examId]);
    }
    pushExamProgressToCloud(examId, { lastScore: score, mastered });
  };

  const handleToggleStudyDay = async (dayNumber: number) => {
    const exists = completedDays.includes(dayNumber);
    const next = exists
      ? completedDays.filter((d) => d !== dayNumber)
      : [...completedDays, dayNumber];
    setCompletedDays(next);

    if (user) {
      try {
        const token = await user.getIdToken();
        await fetch('/api/progress/study-day', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ dayNumber, completed: !exists }),
        });
      } catch {
        // Handled by localStorage
      }
    }
  };

  const handleSaveGameScore = async (gameMode: string, score: number, streak: number) => {
    setHighScores((prev) => {
      const curr = prev[gameMode] || { score: 0, streak: 0 };
      if (score > curr.score) {
        return { ...prev, [gameMode]: { score, streak: Math.max(curr.streak, streak) } };
      }
      return prev;
    });

    if (user) {
      try {
        const token = await user.getIdToken();
        await fetch('/api/progress/game-score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ gameMode, score, streak }),
        });
      } catch {
        // Handled by localStorage
      }
    }
  };

  const handleUploadLocalAudio = (examId: string, file: File) => {
    const objUrl = URL.createObjectURL(file);
    setLocalAudioMap((prev) => ({ ...prev, [examId]: objUrl }));
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch {
      setSyncStatus('محفوظ محلياً 100%');
    }
  };

  const filteredExams = useMemo(
    () =>
      filterExams(
        ALL_HOEREN_EXAMS,
        searchQuery,
        activeFilter,
        bookmarkedIds,
        masteredIds
      ),
    [searchQuery, activeFilter, bookmarkedIds, masteredIds]
  );

  const mainTabs: { id: MainTabId; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'mastery',
      label: '🧠 تحفيظ الكودات العبقرية',
      icon: <Brain className="w-4 h-4" />,
      badge: '11 عائلة',
    },
    {
      id: 'simulator',
      label: '🎧 محاكي الامتحان + الأوديو',
      icon: <Headphones className="w-4 h-4" />,
      badge: '75 نقطة',
    },
    {
      id: 'traps',
      label: '⚠️ رادار الفخاخ (الأساسي vs المعدل)',
      icon: <ShieldAlert className="w-4 h-4" />,
      badge: '12 فخ',
    },
    {
      id: 'flashcards',
      label: '🇲🇦 قصص الدارجة ضد القليب',
      icon: <Sparkles className="w-4 h-4" />,
      badge: '154 بطاقة',
    },
    {
      id: 'games',
      label: '🎮 ألعاب السرعة + خطة 14 يوم',
      icon: <Gamepad2 className="w-4 h-4" />,
      badge: `${completedDays.length}/14`,
    },
  ];

  return (
    <div
      dir="rtl"
      className={`min-h-screen font-['Cairo',sans-serif] transition-colors ${
        darkMode
          ? 'bg-[#090D16] text-slate-100'
          : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* Top Executive Header */}
      <header className="border-b border-slate-800/90 bg-gradient-to-l from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Brand Title & Simo Badge */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-500 font-mono text-lg font-black text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                B2
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[11px] font-black text-emerald-300">
                    SIMO EDITION 🇲🇦🇩🇪 2026
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/20 px-2 py-0.5 text-[11px] font-black text-amber-300">
                    <Flame className="w-3 h-3" /> 154 امتحان كامل (Teil 1 + 2 + 3)
                  </span>
                </div>
                <h1 className="mt-0.5 text-lg sm:text-xl font-black tracking-tight text-white">
                  TELC B2 HÖREN MASTER PRO — نظام الكودات، الأوديو والدارجة
                </h1>
              </div>
            </div>

            {/* Live Mastery Progress Counter + Cloud Sync + Theme */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-slate-900/90 px-3 py-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <div className="text-xs">
                  <span className="font-bold text-slate-300">المحفوظ: </span>
                  <span className="font-mono font-black text-emerald-400">
                    {masteredIds.length} / 154
                  </span>
                </div>
              </div>

              {user ? (
                <button
                  type="button"
                  onClick={() => signOut(auth)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-slate-800"
                  title="تسجيل الخروج"
                >
                  <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{user.displayName || 'Simo'}</span>
                  <LogOut className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-300 hover:border-emerald-500/50 hover:text-white"
                  title={syncStatus}
                >
                  <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                  <span>مزامنة السحابة ({syncStatus})</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-300 hover:bg-slate-800"
                title="تغيير الإضاءة"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 5 Main Pillar Tabs Navigation */}
          <nav className="mt-4 flex flex-wrap items-center gap-2">
            {mainTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-black transition-all ${
                    isActive
                      ? 'bg-gradient-to-l from-emerald-600 to-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                      : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] font-extrabold ${
                        isActive
                          ? 'bg-slate-950/40 text-emerald-100'
                          : 'bg-slate-800 text-amber-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Sticky 3-Second First-Word Decoder Bar */}
      <InstantDecoderBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        filteredExams={filteredExams}
        bookmarkedIds={bookmarkedIds}
        masteredIds={masteredIds}
        onToggleBookmark={handleToggleBookmark}
        onToggleMastered={handleToggleMastered}
        onOpenExamInSimulator={(exam) => {
          setSelectedExam(exam);
          setActiveTab('simulator');
        }}
        onOpenTrapGroup={(trapId) => {
          setHighlightedTrapGroupId(trapId);
          setActiveTab('traps');
        }}
      />

      {/* Main Content Workspace */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {activeTab === 'mastery' && (
          <CodeMasteryTab
            exams={filteredExams}
            bookmarkedIds={bookmarkedIds}
            masteredIds={masteredIds}
            onToggleBookmark={handleToggleBookmark}
            onToggleMastered={handleToggleMastered}
            onOpenExamInSimulator={(exam) => {
              setSelectedExam(exam);
              setActiveTab('simulator');
            }}
            onSwitchToTrapTab={(trapGroupId) => {
              if (trapGroupId) setHighlightedTrapGroupId(trapGroupId);
              setActiveTab('traps');
            }}
          />
        )}

        {activeTab === 'simulator' && (
          <ExamSimulatorTab
            selectedExam={selectedExam}
            onSelectExam={setSelectedExam}
            localAudioMap={localAudioMap}
            onUploadLocalAudio={handleUploadLocalAudio}
            onRecordExamScore={handleRecordExamScore}
          />
        )}

        {activeTab === 'traps' && (
          <TrapRadarTab
            highlightedTrapGroupId={highlightedTrapGroupId}
            onOpenExamInSimulator={(exam) => {
              setSelectedExam(exam);
              setActiveTab('simulator');
            }}
          />
        )}

        {activeTab === 'flashcards' && (
          <DarijaFlashcardsTab
            exams={filteredExams}
            bookmarkedIds={bookmarkedIds}
            masteredIds={masteredIds}
            onToggleBookmark={handleToggleBookmark}
            onToggleMastered={handleToggleMastered}
          />
        )}

        {activeTab === 'games' && (
          <BlitzGamesAndPlanTab
            completedDays={completedDays}
            onToggleStudyDay={handleToggleStudyDay}
            highScores={highScores}
            onSaveGameScore={handleSaveGameScore}
          />
        )}
      </main>
    </div>
  );
}

export default App;
