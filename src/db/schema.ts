import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  displayName: text('display_name'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const examProgress = pgTable('exam_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  examId: text('exam_id').notNull(),
  mastered: boolean('mastered').default(false).notNull(),
  bookmarked: boolean('bookmarked').default(false).notNull(),
  bestScore: integer('best_score').default(0).notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const studyPlanProgress = pgTable('study_plan_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  dayNumber: integer('day_number').notNull(),
  completed: boolean('completed').default(false).notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const gameScores = pgTable('game_scores', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  gameMode: text('game_mode').notNull(),
  score: integer('score').notNull(),
  streak: integer('streak').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  examProgress: many(examProgress),
  studyPlanProgress: many(studyPlanProgress),
  gameScores: many(gameScores),
}));

export const examProgressRelations = relations(examProgress, ({ one }) => ({
  user: one(users, {
    fields: [examProgress.userId],
    references: [users.id],
  }),
}));

export const studyPlanProgressRelations = relations(studyPlanProgress, ({ one }) => ({
  user: one(users, {
    fields: [studyPlanProgress.userId],
    references: [users.id],
  }),
}));

export const gameScoresRelations = relations(gameScores, ({ one }) => ({
  user: one(users, {
    fields: [gameScores.userId],
    references: [users.id],
  }),
}));
