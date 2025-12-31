import { Router } from "express";
import prisma from "../db";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

// CREATE mood (protected)
router.post("/", requireAuth, async (req, res) => {
  const { feeling } = req.body;

  if (!feeling) {
    return res.status(400).json({ error: "Feeling is required" });
  }

  const mood = await prisma.mood.create({
    data: {
      feeling,
      userId: req.userId, // 🔥 THIS shows real backend skill
    },
  });

  res.status(201).json(mood);
});

// GET moods (protected)
router.get("/", requireAuth, async (req, res) => {
  const moods = await prisma.mood.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: "desc" },
  });

  res.json(moods);
});

// GET moods summary (protected)
router.get("/summary", requireAuth, async (req, res) => {
  const summary = await prisma.mood.groupBy({
    by: ["feeling"],
    where: { userId: req.userId },
    _count: true,
  });

  res.json(summary);
});

export default router;
