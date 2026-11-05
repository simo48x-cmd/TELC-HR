import { HoerenExam, ExamStatement, TeilNumber } from './types';
import { TEIL1_RAW_EXAMS, RawExamInput } from './teil1Data';
import { TEIL2_RAW_EXAMS } from './teil2Data';
import { TEIL3_RAW_EXAMS } from './teil3Data';
import { splitTeil2Rhythm, codeToBubbles } from '../utils/hoerenLogic';

const FALSCH_TEMPLATES_DE: Record<string, (topic: string) => string> = {
  '1': (t) => `Laut dem Bericht wird das Thema (${t}) bereits im nächsten Monat gesetzlich vollständig abgeschafft.`,
  '2': (t) => `Alle Befragten sind sich einig, dass ${t} ausschließlich finanzielle Nachteile für Verbraucher bringt.`,
  '3': (t) => `Die vorgestellte Maßnahme zu ${t} gilt bislang nur für Kinder und Jugendliche unter 14 Jahren.`,
  '4': (t) => `Experten betonen im Beitrag, dass es für ${t} überhaupt keine wissenschaftliche Grundlage gibt.`,
  '5': (t) => `Am Ende des Beitrags wird angekündigt, dass das Projekt (${t}) wegen fehlender Gelder sofort gestoppt wird.`,
  '6': (t) => `Die Gesprächspartnerin lehnt jede Veränderung im Bereich ${t} kategorisch ab.`,
  '7': (t) => `In der Sendung heißt es, dass ${t} erst vor wenigen Tagen zum allerersten Mal entdeckt wurde.`,
  '8': (t) => `Für die Teilnahme an ${t} müssen Interessierte mindestens fünf Jahre Berufserfahrung im Ausland nachweisen.`,
  '9': (t) => `Die Kosten im Zusammenhang mit ${t} werden vollständig von privaten Versicherungen übernommen.`,
  '0': (t) => `Zusammenfassend wird erklärt, dass ${t} in Zukunft nur noch außerhalb Europas angeboten wird.`,
};

function buildStatementsForExam(raw: RawExamInput): ExamStatement[] {
  const isTeil2 = raw.teil === 2;
  const digits = isTeil2
    ? ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    : ['1', '2', '3', '4', '5'];
  const baseNumber = raw.teil === 1 ? 40 : raw.teil === 2 ? 45 : 55;

  return digits.map((digitStr, idx) => {
    const taskNumber = baseNumber + idx + 1;
    const rEntry = raw.richtigMap?.[digitStr];

    if (rEntry) {
      const germanText = typeof rEntry === 'string' ? rEntry : rEntry.text;
      const triggers =
        typeof rEntry === 'object' && Array.isArray(rEntry.triggers) && rEntry.triggers.length > 0
          ? rEntry.triggers
          : [germanText.split(' ').slice(0, 4).join(' ')];

      return {
        taskNumber,
        number: taskNumber,
        digit: digitStr,
        text: germanText,
        germanText,
        isRichtig: true,
        triggerKeywords: triggers,
        triggerKeyword: triggers[0],
        darijaHint: `✅ جملة صحيحة (+) — الكلمة المفتاحية: "${triggers[0]}"`,
      };
    }

    const customFalsch = raw.falschMap?.[digitStr];
    const germanText =
      customFalsch ||
      FALSCH_TEMPLATES_DE[digitStr]?.(raw.title) ||
      `Im Beitrag wird behauptet, dass ${raw.title} keine Bedeutung mehr hat.`;

    return {
      taskNumber,
      number: taskNumber,
      digit: digitStr,
      text: germanText,
      germanText,
      isRichtig: false,
      triggerKeywords: [],
      triggerKeyword: customFalsch
        ? customFalsch.split(' ').slice(0, 4).join(' ')
        : 'Falsch-Aussage (-)',
      darijaHint: customFalsch
        ? `❌ انتبه فخ (-) — هاد الجملة غالطة فـ ${raw.title}!`
        : `❌ جملة خاطئة (-) — ما كايناش فالقصة بالدارجة ديال الكود ${raw.code}!`,
    };
  });
}

function buildGermanRadioTranscript(raw: RawExamInput, statements: ExamStatement[]): string {
  const teilLabel =
    raw.teil === 1
      ? 'Hören Teil 1: Globalverstehen — Nachrichtenmeldungen.'
      : raw.teil === 2
        ? 'Hören Teil 2: Detailverstehen — Radiointerview.'
        : 'Hören Teil 3: Selektives Verstehen — Kurze Ansagen und Durchsagen.';

  const richtigTexts = statements
    .filter((s) => s.isRichtig)
    .map((s) => s.germanText)
    .join(' Darüber hinaus gilt: ');

  return `${teilLabel} Thema: ${raw.title}. ${raw.firstWords} In unserer heutigen Sendung berichten wir ausführlich: ${richtigTexts} Vielen Dank für Ihr Interesse.`;
}

function hydrateRawExam(raw: RawExamInput): HoerenExam {
  const statements = buildStatementsForExam(raw);
  const { firstHalf, secondHalf } =
    raw.teil === 2
      ? splitTeil2Rhythm(raw.code)
      : { firstHalf: raw.code, secondHalf: '' };
  const bubbles = codeToBubbles(raw.code, raw.teil as TeilNumber);

  const codeFormatted =
    raw.teil === 2 && secondHalf && secondHalf !== '—'
      ? `${firstHalf} - ${secondHalf}`
      : raw.code;

  const allTriggers = statements
    .filter((s) => s.isRichtig)
    .flatMap((s) => s.triggerKeywords)
    .filter(Boolean);

  const versionTag =
    raw.trapVersionLabel || (raw.isNew2026 ? 'جديد 2026' : 'الأساسي');

  const trapWarningDarija = raw.isTrap
    ? `⚠️ رد بالك آ سيمو! هاد الموضوع (${raw.title}) عندو نسخة أخرى فـ الامتحان! الكلمة اللي كتميز هاد النسخة (${versionTag}) هي: "${raw.trapDistinguishingWord || raw.firstWords}" ➔ الكود هو ${codeFormatted}.`
    : undefined;

  const slug = raw.audioSlug || `${raw.id}.mp3`;

  return {
    id: raw.id,
    teil: raw.teil,
    indexInTeil: raw.indexInTeil,
    number: raw.indexInTeil,
    title: raw.title,
    arabicTitle: raw.darijaStory.split(':')[0] || raw.title,
    firstWords: raw.firstWords,
    firstWordsTrigger: raw.firstWords,
    code: raw.code,
    codeFormatted,
    altCodeNote: raw.altCodeNote,
    rhythmFirstHalf: firstHalf,
    rhythmSecondHalf: secondHalf,
    versionTag,
    bubbles,
    statements,
    darijaStory: raw.darijaStory,
    darijaRhythmHint: raw.darijaRhythmHint,
    triggerKeywords: allTriggers.length > 0 ? allTriggers : [raw.firstWords],
    audioSlug: slug,
    audioUrlPrimary: `https://telccfree.com/assets/audio/b2-hoeren/${slug}`,
    audioUrlFallback: `https://sahlab2.online/audio/telc-b2/${slug}`,
    radioTranscript: buildGermanRadioTranscript(raw, statements),
    isNew2026: Boolean(raw.isNew2026),
    is2026New: Boolean(raw.isNew2026),
    isTrap: Boolean(raw.isTrap),
    trapGroupId: raw.trapGroupId,
    trapVersionLabel: raw.trapVersionLabel,
    trapDistinguishingWord: raw.trapDistinguishingWord,
    trapWarningDarija,
  };
}

export const TEIL1_EXAMS: HoerenExam[] = TEIL1_RAW_EXAMS.map(hydrateRawExam);
export const TEIL2_EXAMS: HoerenExam[] = TEIL2_RAW_EXAMS.map(hydrateRawExam);
export const TEIL3_EXAMS: HoerenExam[] = TEIL3_RAW_EXAMS.map(hydrateRawExam);

export const ALL_HOEREN_EXAMS: HoerenExam[] = [
  ...TEIL1_EXAMS,
  ...TEIL2_EXAMS,
  ...TEIL3_EXAMS,
];

export const EXAM_BY_ID: Record<string, HoerenExam> = Object.fromEntries(
  ALL_HOEREN_EXAMS.map((exam) => [exam.id, exam])
);
