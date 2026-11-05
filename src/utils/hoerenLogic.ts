import { ExamStatement, FilterCategory, HoerenExam, TeilNumber } from '../data/types';

/**
 * Normalizes a raw code string into clean digits ('1'-'9', '0').
 */
export function normalizeCodeDigits(rawCode: string): string {
  return rawCode.replace(/[^0-9]/g, '');
}

/**
 * Splits a code into Two Rhythmic Halves for Teil 2:
 * First Half: digits 1, 2, 3, 4, 5 (Aufgaben 46-50)
 * Second Half: digits 6, 7, 8, 9, 0 (Aufgaben 51-55)
 */
export function splitTeil2Rhythm(rawCode: string): { firstHalf: string; secondHalf: string } {
  const digits = normalizeCodeDigits(rawCode).split('');
  const firstHalf = digits.filter((d) => ['1', '2', '3', '4', '5'].includes(d)).join('');
  const secondHalf = digits.filter((d) => ['6', '7', '8', '9', '0'].includes(d)).join('');
  return {
    firstHalf: firstHalf || '—',
    secondHalf: secondHalf || '—',
  };
}

/**
 * Converts an official exam code into a boolean bubble array:
 * - Teil 1 & Teil 3: 5 bubbles corresponding to digits '1', '2', '3', '4', '5'
 * - Teil 2: 10 bubbles corresponding to digits '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
 */
export function codeToBubbles(rawCode: string, teil: TeilNumber): boolean[] {
  const clean = normalizeCodeDigits(rawCode);
  if (teil === 2) {
    const order = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    return order.map((digit) => clean.includes(digit));
  }
  const order = ['1', '2', '3', '4', '5'];
  return order.map((digit) => clean.includes(digit));
}

/**
 * Converts a boolean bubble array back to its visual symbol pattern, e.g. "○ ● ● ○ ○"
 */
export function bubblesToPatternString(bubbles: boolean[], _teil?: TeilNumber): string {
  if (bubbles.length === 10) {
    const first5 = bubbles
      .slice(0, 5)
      .map((b) => (b ? '●' : '○'))
      .join(' ');
    const second5 = bubbles
      .slice(5, 10)
      .map((b) => (b ? '●' : '○'))
      .join(' ');
    return `${first5} | ${second5}`;
  }
  return bubbles.map((b) => (b ? '●' : '○')).join(' ');
}

/**
 * Calculates official TELC B2 Hören score for an exam:
 * - Teil 1 (5 items): 5 points per correct answer = 25 points max
 * - Teil 2 (10 items): 2.5 points per correct answer = 25 points max
 * - Teil 3 (5 items): 5 points per correct answer = 25 points max
 */
export function gradeExamAnswers(
  examOrStatements: HoerenExam | ExamStatement[],
  userAnswers: Record<number, boolean | undefined>,
  teilArg?: TeilNumber
): {
  correctCount: number;
  totalCount: number;
  totalStatements: number;
  points: number;
  scorePoints: number;
  maxPoints: number;
  percentage: number;
  passed: boolean;
} {
  const statements = Array.isArray(examOrStatements)
    ? examOrStatements
    : examOrStatements.statements;
  const teil = Array.isArray(examOrStatements)
    ? teilArg || (statements.length === 10 ? 2 : 1)
    : examOrStatements.teil;

  const totalCount = statements.length;
  const pointsPerItem = teil === 2 ? 2.5 : 5;
  let correctCount = 0;

  for (const stmt of statements) {
    const ans = userAnswers[stmt.taskNumber] ?? userAnswers[stmt.number];
    if (ans !== undefined && ans === stmt.isRichtig) {
      correctCount++;
    }
  }

  const points = Number((correctCount * pointsPerItem).toFixed(1));
  const maxPoints = 25;
  const percentage = Math.round((points / maxPoints) * 100);

  return {
    correctCount,
    totalCount,
    totalStatements: totalCount,
    points,
    scorePoints: points,
    maxPoints,
    percentage,
    passed: percentage >= 60,
  };
}

/**
 * 3-Second Instant First-Word & Multi-Field Decoder Filter
 */
export function filterExams(
  exams: HoerenExam[],
  queryOrOptions:
    | string
    | {
        query: string;
        teilFilter: 'all' | 1 | 2 | 3 | 'new2026' | 'traps' | 'bookmarks';
        codeFamilyFilter?: string | null;
        bookmarkedIds?: Set<string>;
        masteredIds?: Set<string>;
      },
  activeFilter: FilterCategory = 'all',
  bookmarkedIds: string[] = [],
  masteredIds: string[] = []
): HoerenExam[] {
  const q =
    typeof queryOrOptions === 'string'
      ? queryOrOptions.trim().toLowerCase()
      : queryOrOptions.query.trim().toLowerCase();

  return exams.filter((exam) => {
    if (typeof queryOrOptions === 'object') {
      const tf = queryOrOptions.teilFilter;
      if (tf === 1 && exam.teil !== 1) return false;
      if (tf === 2 && exam.teil !== 2) return false;
      if (tf === 3 && exam.teil !== 3) return false;
      if (tf === 'new2026' && !exam.isNew2026) return false;
      if (tf === 'traps' && !exam.isTrap) return false;
      if (
        tf === 'bookmarks' &&
        queryOrOptions.bookmarkedIds &&
        !queryOrOptions.bookmarkedIds.has(exam.id)
      ) {
        return false;
      }
      if (queryOrOptions.codeFamilyFilter && exam.code !== queryOrOptions.codeFamilyFilter) {
        return false;
      }
    } else {
      if (activeFilter === 'teil1' && exam.teil !== 1) return false;
      if (activeFilter === 'teil2' && exam.teil !== 2) return false;
      if (activeFilter === 'teil3' && exam.teil !== 3) return false;
      if (activeFilter === 'new2026' && !exam.isNew2026) return false;
      if (activeFilter === 'traps' && !exam.isTrap) return false;
      if (activeFilter === 'bookmarked') {
        const isBookmarked = bookmarkedIds.includes(exam.id);
        const isUnmastered = !masteredIds.includes(exam.id);
        if (!isBookmarked && !isUnmastered) return false;
      }
    }

    if (!q) return true;

    const cleanCode = exam.code.toLowerCase();
    const rhythm = `${exam.rhythmFirstHalf}-${exam.rhythmSecondHalf}`.toLowerCase();
    const inTitle = exam.title.toLowerCase().includes(q);
    const inArabic = exam.arabicTitle.toLowerCase().includes(q);
    const inFirstWords = exam.firstWords.toLowerCase().includes(q);
    const inCode = cleanCode.includes(q) || rhythm.includes(q);
    const inDarija = exam.darijaStory.toLowerCase().includes(q);
    const inStatements = exam.statements.some(
      (s) =>
        s.text.toLowerCase().includes(q) ||
        s.triggerKeywords.some((kw) => kw.toLowerCase().includes(q))
    );

    return inTitle || inArabic || inFirstWords || inCode || inDarija || inStatements;
  });
}

/**
 * Deterministic or seeded statement shuffler for Anti-Shuffle 2026 Exam Mode
 */
export function shuffleStatements(statements: ExamStatement[], seed = Date.now()): ExamStatement[] {
  const copy = [...statements];
  let s = seed;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) % 4294967296;
    const j = Math.floor((s / 4294967296) * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}
