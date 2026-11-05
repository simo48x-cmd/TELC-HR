import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import {
  getUserDashboardData,
  upsertExamProgress,
  upsertStudyDay,
  recordGameScore,
} from './src/db/users.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '5mb' }));

  // Authenticated Cloud SQL Progress Endpoints
  app.get('/api/progress', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email || 'simo@telcb2.de';
      const data = await getUserDashboardData(uid, email);
      res.json(data);
    } catch (error: any) {
      console.error('Failed to fetch user progress:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch user progress' });
    }
  });

  app.post('/api/progress/exam', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email || 'simo@telcb2.de';
      const { examId, mastered, bookmarked, bestScore } = req.body;
      if (!examId || typeof examId !== 'string') {
        return res.status(400).json({ error: 'examId is required' });
      }
      const updated = await upsertExamProgress(
        uid,
        email,
        examId,
        Boolean(mastered),
        Boolean(bookmarked),
        Number(bestScore) || 0
      );
      res.json(updated);
    } catch (error: any) {
      console.error('Failed to update exam progress:', error);
      res.status(500).json({ error: error.message || 'Failed to update exam progress' });
    }
  });

  app.post('/api/progress/study-day', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email || 'simo@telcb2.de';
      const { dayNumber, completed } = req.body;
      if (typeof dayNumber !== 'number' || dayNumber < 1 || dayNumber > 14) {
        return res.status(400).json({ error: 'Valid dayNumber (1-14) is required' });
      }
      const updated = await upsertStudyDay(uid, email, dayNumber, Boolean(completed));
      res.json(updated);
    } catch (error: any) {
      console.error('Failed to update study day:', error);
      res.status(500).json({ error: error.message || 'Failed to update study day' });
    }
  });

  app.post('/api/progress/game-score', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email || 'simo@telcb2.de';
      const { gameMode, score, streak } = req.body;
      if (!gameMode || typeof score !== 'number') {
        return res.status(400).json({ error: 'gameMode and score are required' });
      }
      const inserted = await recordGameScore(
        uid,
        email,
        String(gameMode),
        Number(score),
        Number(streak) || 0
      );
      res.json(inserted);
    } catch (error: any) {
      console.error('Failed to record game score:', error);
      res.status(500).json({ error: error.message || 'Failed to record game score' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
