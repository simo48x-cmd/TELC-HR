export type TeilNumber = 1 | 2 | 3;

export type FilterCategory =
  | 'all'
  | 'teil1'
  | 'teil2'
  | 'teil3'
  | 'new2026'
  | 'traps'
  | 'bookmarked';

export interface ExamStatement {
  taskNumber: number; // 41-45 (Teil 1), 46-55 (Teil 2), 56-60 (Teil 3)
  number: number; // alias for taskNumber
  digit: string | number; // '1'..'5' for Teil 1/3, '1'..'9','0' for Teil 2
  text: string;
  germanText: string; // alias for text
  isRichtig: boolean;
  triggerKeywords: string[];
  triggerKeyword: string;
  darijaHint: string;
}

export interface HoerenExam {
  id: string;
  teil: TeilNumber;
  indexInTeil: number;
  number: number; // alias for indexInTeil
  title: string;
  arabicTitle: string;
  firstWords: string;
  firstWordsTrigger: string; // alias for firstWords
  code: string; // e.g. '23', '134890', '145'
  codeFormatted: string;
  altCodeNote?: string;
  rhythmFirstHalf: string;
  rhythmSecondHalf: string;
  versionTag: string;
  bubbles: boolean[];
  statements: ExamStatement[];
  darijaStory: string;
  darijaRhythmHint?: string;
  triggerKeywords: string[];
  audioSlug: string;
  audioUrlPrimary: string;
  audioUrlFallback: string;
  radioTranscript: string;
  isNew2026: boolean;
  is2026New: boolean;
  isTrap: boolean;
  trapGroupId?: string;
  trapVersionLabel?: string;
  trapDistinguishingWord?: string;
  trapWarningDarija?: string;
  familyCodeId?: string;
}

export interface CodeFamilyCluster {
  id: string;
  code: string;
  teil: TeilNumber;
  titleAr: string;
  titleArabic?: string;
  badgeText: string;
  darijaStory: string;
  familyDarijaStory?: string;
  darijaRhyme?: string;
  examTitles: string[];
  examIds: string[];
}

export interface TrapVersionItem {
  versionName: string;
  versionLabel?: string;
  examId: string;
  triggerPhrase: string;
  highlightedWord: string;
  keyDifferenceGerman?: string;
  codeDisplay: string;
  code?: string;
  explanationDarija: string;
  keyDifferenceArabic?: string;
}

export interface TrapComparisonGroup {
  id: string;
  teil: TeilNumber;
  title: string;
  topicTitle?: string;
  subtitleDarija: string;
  arabicTopic?: string;
  memoryRuleDarija?: string;
  versions: TrapVersionItem[];
  variants?: TrapVersionItem[];
}

export interface StudyDayPlan {
  day: number;
  titleAr: string;
  titleArabic?: string;
  focusDe: string;
  examIds: string[];
  trapGroupIds: string[];
  targetTipDarija: string;
  targetGoalArabic?: string;
}
