import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeCodeDigits,
  splitTeil2Rhythm,
  codeToBubbles,
  bubblesToPatternString,
  gradeExamAnswers,
  filterExams,
} from './hoerenLogic';
import {
  ALL_HOEREN_EXAMS,
  TEIL1_EXAMS,
  TEIL2_EXAMS,
  TEIL3_EXAMS,
  EXAM_BY_ID,
  OCI_BUCKET_BASE_URL,
  REAL_OCI_BUCKET_MP3S,
} from '../data/hoerenData';
import {
  CODE_FAMILY_CLUSTERS,
  TRAP_COMPARISON_GROUPS,
  FOURTEEN_DAY_STUDY_PLAN,
} from '../data/memorySystemsData';

describe('TELC B2 Hören Master Pro 2026 — Verbatim Dataset, OCI Audio & Strict Statement Counts', () => {
  it('enforces strict statement counts: 5 for Teil 1 (41-45), 10 for Teil 2 (46-55), and 5 for Teil 3 (56-60, never 10!)', () => {
    assert.equal(TEIL1_EXAMS.length, 52, 'Teil 1 must have 52 verbatim exams');
    assert.equal(TEIL2_EXAMS.length, 55, 'Teil 2 must have 55 verbatim exams');
    assert.equal(TEIL3_EXAMS.length, 44, 'Teil 3 must have 44 verbatim exams');

    for (const ex of TEIL1_EXAMS) {
      assert.equal(ex.statements.length, 5, `Teil 1 exam ${ex.id} must have strictly 5 statements`);
      assert.deepEqual(
        ex.statements.map((s) => s.number),
        [41, 42, 43, 44, 45],
        `Teil 1 exam ${ex.id} must be numbered 41..45`
      );
    }

    for (const ex of TEIL2_EXAMS) {
      assert.equal(ex.statements.length, 10, `Teil 2 exam ${ex.id} must have strictly 10 statements`);
      assert.deepEqual(
        ex.statements.map((s) => s.number),
        [46, 47, 48, 49, 50, 51, 52, 53, 54, 55],
        `Teil 2 exam ${ex.id} must be numbered 46..55`
      );
    }

    for (const ex of TEIL3_EXAMS) {
      assert.equal(
        ex.statements.length,
        5,
        `Teil 3 exam ${ex.id} (${ex.title}) must have strictly 5 statements (56-60), never 10!`
      );
      assert.deepEqual(
        ex.statements.map((s) => s.number),
        [56, 57, 58, 59, 60],
        `Teil 3 exam ${ex.id} must be numbered 56..60`
      );
    }
  });

  it('contains zero generic placeholder sentences and preserves verbatim official statements & codes', () => {
    for (const ex of ALL_HOEREN_EXAMS) {
      for (const stmt of ex.statements) {
        assert.ok(
          !stmt.germanText.includes('gesetzlich vollständig abgeschafft'),
          `Exam ${ex.id} has generic placeholder text`
        );
        assert.ok(
          !stmt.germanText.includes('ausschließlich finanzielle Nachteile'),
          `Exam ${ex.id} has generic placeholder text`
        );
      }
    }

    // Verify specific verbatim PDF statements & codes
    const luf = EXAM_BY_ID['t1-1'];
    assert.equal(luf.code, '23');
    assert.equal(luf.statements[0].germanText, 'Die Deutsche Lufthansa hat ihre Führungsposition verloren.');
    assert.equal(luf.statements[1].germanText, 'Ein Bonner Sportverein zeigt der Öffentlichkeit sein Angebot.');
    assert.equal(luf.statements[1].isRichtig, true);

    const mallorca = EXAM_BY_ID['t2-1'];
    assert.equal(mallorca.code, '347');
    assert.equal(mallorca.statements[2].isRichtig, true); // 48 (3)
    assert.equal(mallorca.statements[3].isRichtig, true); // 49 (4)
    assert.equal(mallorca.statements[6].isRichtig, true); // 52 (7)

    const telefon = EXAM_BY_ID['t3-1'];
    assert.equal(telefon.code, '1');
    assert.equal(telefon.statements.length, 5);
    assert.equal(telefon.statements[0].isRichtig, true); // 56 (1)
    assert.equal(telefon.statements[1].isRichtig, false); // 57 (2)
  });

  it('uses the exact OCI bucket hostname axkykllqugzn (with two lowercase ls) and maps all 56 real MP3s', () => {
    assert.equal(
      OCI_BUCKET_BASE_URL,
      'https://axkykllqugzn.objectstorage.eu-marseille-1.oci.customer-oci.com/n/axkykllqugzn/b/sahla-b2-audios/o/'
    );
    assert.equal(REAL_OCI_BUCKET_MP3S.length, 56);
    assert.equal(
      EXAM_BY_ID['t1-1'].audioUrlPrimary,
      'https://axkykllqugzn.objectstorage.eu-marseille-1.oci.customer-oci.com/n/axkykllqugzn/b/sahla-b2-audios/o/Lufthansa.mp3'
    );
  });

  it('resolves all 11 Code Family Clusters, 12 Trap Comparison Groups, and 14 Study Plan days to valid exams', () => {
    assert.equal(CODE_FAMILY_CLUSTERS.length, 11);
    for (const cluster of CODE_FAMILY_CLUSTERS) {
      for (const examId of cluster.examIds) {
        assert.ok(EXAM_BY_ID[examId], `Cluster ${cluster.id} references valid exam ${examId}`);
      }
    }

    assert.equal(TRAP_COMPARISON_GROUPS.length, 12);
    for (const trap of TRAP_COMPARISON_GROUPS) {
      for (const v of trap.versions) {
        assert.ok(EXAM_BY_ID[v.examId], `Trap ${trap.id} references valid exam ${v.examId}`);
      }
    }

    assert.equal(FOURTEEN_DAY_STUDY_PLAN.length, 14);
    for (const day of FOURTEEN_DAY_STUDY_PLAN) {
      for (const examId of day.examIds) {
        assert.ok(EXAM_BY_ID[examId], `Study day ${day.day} references valid exam ${examId}`);
      }
    }
  });

  it('grades exam answers accurately out of 25 points per Teil', () => {
    const lufthansa = EXAM_BY_ID['t1-1']; // Code 23 -> tasks 42, 43 are true
    const perfectAnswers: Record<number, boolean> = {
      41: false,
      42: true,
      43: true,
      44: false,
      45: false,
    };
    const perfectGrade = gradeExamAnswers(lufthansa, perfectAnswers);
    assert.equal(perfectGrade.correctCount, 5);
    assert.equal(perfectGrade.scorePoints, 25);

    const split1 = splitTeil2Rhythm('134890');
    assert.deepEqual(split1, { firstHalf: '134', secondHalf: '890' });
    assert.equal(bubblesToPatternString(codeToBubbles('15', 1), 1), '● ○ ○ ○ ●');
    assert.ok(filterExams(ALL_HOEREN_EXAMS, 'lufthansa', 'all', [], []).length >= 3);
  });
});
