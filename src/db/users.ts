import { db } from './index.ts';
import { users, examProgress, studyPlanProgress, gameScores } from './schema.ts';
import { eq, and, desc } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, displayName?: string) {
  try {
    const result = await db
      .insert(users)
      .values({
        uid,
        email,
        displayName: displayName || null,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          displayName: displayName || null,
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database query failed in getOrCreateUser:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function getUserDashboardData(uid: string, email: string) {
  try {
    const user = await getOrCreateUser(uid, email);
    const progressRows = await db
      .select()
      .from(examProgress)
      .where(eq(examProgress.userId, user.id));
    const planRows = await db
      .select()
      .from(studyPlanProgress)
      .where(eq(studyPlanProgress.userId, user.id));
    const scoreRows = await db
      .select()
      .from(gameScores)
      .where(eq(gameScores.userId, user.id))
      .orderBy(desc(gameScores.score));

    return {
      user,
      examProgress: progressRows,
      studyPlanProgress: planRows,
      gameScores: scoreRows,
    };
  } catch (error) {
    console.error('Database query failed in getUserDashboardData:', error);
    throw new Error('Failed to load user progress from database.', { cause: error });
  }
}

export async function upsertExamProgress(
  uid: string,
  email: string,
  examId: string,
  mastered: boolean,
  bookmarked: boolean,
  bestScore: number
) {
  try {
    const user = await getOrCreateUser(uid, email);
    const existing = await db
      .select()
      .from(examProgress)
      .where(and(eq(examProgress.userId, user.id), eq(examProgress.examId, examId)));

    if (existing.length > 0) {
      const updated = await db
        .update(examProgress)
        .set({
          mastered,
          bookmarked,
          bestScore: Math.max(existing[0].bestScore, bestScore),
          updatedAt: new Date(),
        })
        .where(eq(examProgress.id, existing[0].id))
        .returning();
      return updated[0];
    } else {
      const inserted = await db
        .insert(examProgress)
        .values({
          userId: user.id,
          examId,
          mastered,
          bookmarked,
          bestScore,
        })
        .returning();
      return inserted[0];
    }
  } catch (error) {
    console.error('Database query failed in upsertExamProgress:', error);
    throw new Error('Failed to update exam progress.', { cause: error });
  }
}

export async function upsertStudyDay(
  uid: string,
  email: string,
  dayNumber: number,
  completed: boolean
) {
  try {
    const user = await getOrCreateUser(uid, email);
    const existing = await db
      .select()
      .from(studyPlanProgress)
      .where(
        and(eq(studyPlanProgress.userId, user.id), eq(studyPlanProgress.dayNumber, dayNumber))
      );

    if (existing.length > 0) {
      const updated = await db
        .update(studyPlanProgress)
        .set({ completed, updatedAt: new Date() })
        .where(eq(studyPlanProgress.id, existing[0].id))
        .returning();
      return updated[0];
    } else {
      const inserted = await db
        .insert(studyPlanProgress)
        .values({
          userId: user.id,
          dayNumber,
          completed,
        })
        .returning();
      return inserted[0];
    }
  } catch (error) {
    console.error('Database query failed in upsertStudyDay:', error);
    throw new Error('Failed to update study day status.', { cause: error });
  }
}

export async function recordGameScore(
  uid: string,
  email: string,
  gameMode: string,
  score: number,
  streak: number
) {
  try {
    const user = await getOrCreateUser(uid, email);
    const inserted = await db
      .insert(gameScores)
      .values({
        userId: user.id,
        gameMode,
        score,
        streak,
      })
      .returning();
    return inserted[0];
  } catch (error) {
    console.error('Database query failed in recordGameScore:', error);
    throw new Error('Failed to save game score.', { cause: error });
  }
}
