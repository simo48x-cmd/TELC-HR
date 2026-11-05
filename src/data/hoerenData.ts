import { HoerenExam, ExamStatement, TeilNumber } from './types';
import {
  VERBATIM_TEIL1_EXAMS,
  VerbatimExamDef,
  OCI_BUCKET_BASE_URL,
  REAL_OCI_BUCKET_MP3S,
} from './verbatimTeil1';
import { VERBATIM_TEIL2_EXAMS } from './verbatimTeil2';
import { VERBATIM_TEIL3_EXAMS } from './verbatimTeil3';
import { normalizeCodeDigits, splitTeil2Rhythm, codeToBubbles } from '../utils/hoerenLogic';

export { OCI_BUCKET_BASE_URL, REAL_OCI_BUCKET_MP3S };

const STOPWORDS_DE = new Set([
  'der',
  'die',
  'das',
  'den',
  'dem',
  'des',
  'ein',
  'eine',
  'einer',
  'einem',
  'einen',
  'und',
  'oder',
  'aber',
  'in',
  'im',
  'auf',
  'an',
  'am',
  'für',
  'mit',
  'von',
  'vom',
  'zu',
  'zum',
  'zur',
  'bei',
  'beim',
  'nach',
  'aus',
  'über',
  'unter',
  'vor',
  'durch',
  'ist',
  'sind',
  'war',
  'wird',
  'werden',
  'wurde',
  'wurden',
  'hat',
  'haben',
  'hatte',
  'kann',
  'können',
  'muss',
  'müssen',
  'soll',
  'sollen',
  'sich',
  'sie',
  'er',
  'es',
  'man',
]);

function extractKeyPhrase(sentence: string): string {
  const words = sentence
    .replace(/[„“"().,:;!?]/g, '')
    .split(/\s+/)
    .filter(Boolean);
  const meaningful = words.filter((w) => !STOPWORDS_DE.has(w.toLowerCase()));
  if (meaningful.length >= 3) {
    return meaningful.slice(0, 4).join(' ');
  }
  return words.slice(0, 4).join(' ');
}

function buildVerbatimStatements(def: VerbatimExamDef): ExamStatement[] {
  const isTeil2 = def.teil === 2;
  // Strictly 5 statements for Teil 1 (41-45) and Teil 3 (56-60); 10 statements for Teil 2 (46-55)
  const expectedCount = isTeil2 ? 10 : 5;
  const digits = isTeil2
    ? ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    : ['1', '2', '3', '4', '5'];
  const baseNumber = def.teil === 1 ? 40 : def.teil === 2 ? 45 : 55;
  const cleanCode = normalizeCodeDigits(def.code);

  return def.statements.slice(0, expectedCount).map((germanText, idx) => {
    const taskNumber = baseNumber + idx + 1;
    const digitStr = digits[idx];
    const isRichtig = cleanCode.includes(digitStr);
    const keyPhrase = extractKeyPhrase(germanText);

    return {
      taskNumber,
      number: taskNumber,
      digit: digitStr,
      text: germanText,
      germanText,
      isRichtig,
      triggerKeywords: [keyPhrase],
      triggerKeyword: keyPhrase,
      darijaHint: isRichtig
        ? `✅ جملة صحيحة (+) فـ الكود الرسمي (${def.code}) — مفتاح الجملة: "${keyPhrase}"`
        : `❌ جملة خاطئة (-) فـ الكود الرسمي (${def.code})`,
    };
  });
}

function buildGermanRadioTranscript(def: VerbatimExamDef, statements: ExamStatement[]): string {
  const teilLabel =
    def.teil === 1
      ? 'Hören Teil 1: Globalverstehen — Nachrichtenmeldungen.'
      : def.teil === 2
        ? 'Hören Teil 2: Detailverstehen — Rundfunk-Interview.'
        : 'Hören Teil 3: Selektives Verstehen — Kurze Ansagen und Durchsagen.';

  const richtigTexts = statements
    .filter((s) => s.isRichtig)
    .map((s) => s.germanText)
    .join(' Darüber hinaus gilt: ');

  return `${teilLabel} Thema: ${def.title}. Herzlich willkommen zu unserer Sendung. ${richtigTexts} Vielen Dank für Ihre Aufmerksamkeit.`;
}

function hydrateVerbatimExam(def: VerbatimExamDef): HoerenExam {
  const statements = buildVerbatimStatements(def);
  const { firstHalf, secondHalf } =
    def.teil === 2
      ? splitTeil2Rhythm(def.code)
      : { firstHalf: def.code, secondHalf: '' };
  const bubbles = codeToBubbles(def.code, def.teil as TeilNumber);

  const codeFormatted =
    def.teil === 2 && secondHalf && secondHalf !== '—'
      ? `${firstHalf} - ${secondHalf}`
      : def.code;

  const firstWords = statements[0]?.germanText || def.title;
  const triggerKeywords = statements
    .filter((s) => s.isRichtig)
    .map((s) => `${s.number}(+): ${s.triggerKeyword}`);

  const audioFile = def.ociAudioFile || '';
  const primaryAudioUrl = audioFile
    ? `${OCI_BUCKET_BASE_URL}${audioFile}`
    : def.fallbackAudioUrl || '';

  const fallbackAudioUrl =
    def.fallbackAudioUrl ||
    (audioFile ? `${OCI_BUCKET_BASE_URL}${audioFile}` : '');

  return {
    id: def.id,
    teil: def.teil,
    indexInTeil: def.number,
    number: def.number,
    title: def.title,
    arabicTitle: def.arabicTitle,
    firstWords,
    firstWordsTrigger: firstWords,
    code: def.code,
    codeFormatted,
    altCodeNote: def.altCodeNote,
    rhythmFirstHalf: firstHalf,
    rhythmSecondHalf: secondHalf,
    versionTag: def.versionTag || 'الأساسي',
    bubbles,
    statements,
    darijaStory: def.darijaStory,
    darijaRhythmHint: def.darijaRhythmHint,
    triggerKeywords,
    audioSlug: audioFile,
    audioUrlPrimary: primaryAudioUrl,
    audioUrlFallback: fallbackAudioUrl,
    radioTranscript: buildGermanRadioTranscript(def, statements),
    isNew2026: Boolean(def.is2026New),
    is2026New: Boolean(def.is2026New),
    isTrap: Boolean(def.isTrap),
    trapGroupId: def.trapGroupId,
    trapVersionLabel: def.versionTag,
    trapWarningDarija: def.trapWarningDarija,
  };
}

export const TEIL1_EXAMS: HoerenExam[] = VERBATIM_TEIL1_EXAMS.map(hydrateVerbatimExam);
export const TEIL2_EXAMS: HoerenExam[] = VERBATIM_TEIL2_EXAMS.map(hydrateVerbatimExam);
export const TEIL3_EXAMS: HoerenExam[] = VERBATIM_TEIL3_EXAMS.map(hydrateVerbatimExam);

export const ALL_HOEREN_EXAMS: HoerenExam[] = [
  ...TEIL1_EXAMS,
  ...TEIL2_EXAMS,
  ...TEIL3_EXAMS,
];

export const EXAM_BY_ID: Record<string, HoerenExam> = Object.fromEntries(
  ALL_HOEREN_EXAMS.map((exam) => [exam.id, exam])
);
