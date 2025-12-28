import { Router } from "express";
import prisma from "../db";

const router = Router();

// GET /insights/today
router.get("/today", async (_req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const journalCount = await prisma.journalEntry.count({
    where: {
      createdAt: { gte: today },
    },
  });

  const latestMood = await prisma.mood.findFirst({
    orderBy: { createdAt: "desc" },
  });

  res.json({
    journalCount,
    latestMood,
  });
});

export default router;
