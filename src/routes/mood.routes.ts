import { Router } from "express";
import prisma from "../db";

const router = Router();

// POST /moods
router.post("/", async (req, res) => {
  const { feeling } = req.body;

  if (!feeling) {
    return res.status(400).json({ error: "Feeling is required" });
  }

  const mood = await prisma.mood.create({
    data: { feeling },
  });

  res.status(201).json(mood);
});

// GET /moods
router.get("/", async (_req, res) => {
  const moods = await prisma.mood.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(moods);
});

// GET /moods/summary
router.get("/summary", async (_req, res) => {
  const summary = await prisma.mood.groupBy({
    by: ["feeling"],
    _count: true,
  });

  res.json(summary);
});

export default router;
