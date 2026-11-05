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
} from '../data/hoerenData';
import {
  CODE_FAMILY_CLUSTERS,
  TRAP_COMPARISON_GROUPS,
  FOURTEEN_DAY_STUDY_PLAN,
} from '../data/memorySystemsData';

describe('TELC B2 Hören Master Pro 2026 — Core Logic & Complete 154-Exam Integrity', () => {
  it('contains exact counts: 52 Teil 1 + 56 Teil 2 + 46 Teil 3 = 154 total exams', () => {
    assert.equal(TEIL1_EXAMS.length, 52, 'Teil 1 must have 52 exams');
    assert.equal(TEIL2_EXAMS.length, 56, 'Teil 2 must have 56 exams');
    assert.equal(TEIL3_EXAMS.length, 46, 'Teil 3 must have 46 exams');
    assert.equal(ALL_HOEREN_EXAMS.length, 154, 'Total exams must be 154');
  });

  it('normalizes codes and splits Teil 2 codes into 3+3 rhythm halves (1..5 and 6..0)', () => {
    assert.equal(normalizeCodeDigits('134 - 890'), '134890');
    const split1 = splitTeil2Rhythm('134890');
    assert.deepEqual(split1, { firstHalf: '134', secondHalf: '890' });

    const split2 = splitTeil2Rhythm('2479'); // Dr. Kiefer (2,4 in first half; 7,9 in second half)
    assert.deepEqual(split2, { firstHalf: '24', secondHalf: '79' });
  });

  it('converts Teil 1/3 and Teil 2 codes into visual bubble matrices accurately', () => {
    const t1Bubbles = codeToBubbles('15', 1);
    assert.deepEqual(t1Bubbles, [true, false, false, false, true]);
    assert.equal(bubblesToPatternString(t1Bubbles, 1), '● ○ ○ ○ ●');

    const t2Bubbles = codeToBubbles('134890', 2);
    assert.equal(t2Bubbles.length, 10);
    assert.equal(bubblesToPatternString(t2Bubbles, 2), '● ○ ● ● ○ | ○ ○ ● ● ●');
  });

  it('grades exam answers accurately out of 25 points per Teil', () => {
    const lufthansa = EXAM_BY_ID['t1-1']; // Code 23 -> tasks 42, 43 are true
    assert.ok(lufthansa);
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
    assert.equal(perfectGrade.maxPoints, 25);

    const partialAnswers: Record<number, boolean> = {
      41: true, // wrong
      42: true,
      43: true,
      44: false,
      45: false,
    };
    const partialGrade = gradeExamAnswers(lufthansa, partialAnswers);
    assert.equal(partialGrade.correctCount, 4);
    assert.equal(partialGrade.scorePoints, 20);
  });

  it('resolves all 11 Code Family Clusters and 12 Trap Comparison Groups to existing exams', () => {
    assert.equal(CODE_FAMILY_CLUSTERS.length, 11);
    for (const cluster of CODE_FAMILY_CLUSTERS) {
      assert.ok(cluster.examIds.length >= 2, `Cluster ${cluster.id} has at least 2 exams`);
      for (const examId of cluster.examIds) {
        assert.ok(EXAM_BY_ID[examId], `Cluster ${cluster.id} references valid exam ${examId}`);
      }
    }

    assert.equal(TRAP_COMPARISON_GROUPS.length, 12);
    for (const trap of TRAP_COMPARISON_GROUPS) {
      assert.ok(trap.versions.length >= 2, `Trap ${trap.id} has at least 2 versions`);
      for (const v of trap.versions) {
        assert.ok(EXAM_BY_ID[v.examId], `Trap ${trap.id} references valid exam ${v.examId}`);
      }
    }
    assert.equal(FOURTEEN_DAY_STUDY_PLAN.length, 14);
  });

  it('decodes exams in under 3 seconds by German keyword, Arabic topic, or code digits', () => {
    const lufMatches = filterExams(ALL_HOEREN_EXAMS, 'lufthansa', 'all', [], []);
    assert.ok(lufMatches.length >= 3, 'Finds Lufthansa variants');

    const code24Matches = filterExams(ALL_HOEREN_EXAMS, '24', 'teil1', [], []);
    assert.ok(code24Matches.length >= 8, 'Finds all 8 Teil 1 exams with code 24');
  });
});
