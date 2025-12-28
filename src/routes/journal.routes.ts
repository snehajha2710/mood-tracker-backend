import { Router } from "express";
import prisma from "../db";

const router = Router();

/**
 * CREATE journal entry
 * POST /journal
 */
router.post("/", async (req, res) => {
  const { content, feeling } = req.body;

  if (content.length < 5) {
  return res.status(400).json({ error: "Journal entry too short" });
}


  if (!content || !feeling) {
    return res.status(400).json({
      error: "Content and feeling are required",
    });
  }

  try {
    const entry = await prisma.journalEntry.create({
      data: {
        content,
        feeling,
      },
    });

    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create journal entry",
    });
  }
});

/**
 * GET all journal entries
 * GET /journal
 */
router.get("/", async (_req, res) => {
  try {
    const entries = await prisma.journalEntry.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch journal entries",
    });
  }
});

/**
 * GET latest journal entry
 * GET /journal/latest
 */
router.get("/latest", async (_req, res) => {
  try {
    const entry = await prisma.journalEntry.findFirst({
      orderBy: { createdAt: "desc" },
    });

    res.json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch latest journal entry",
    });
  }
});

export default router;

// GET latest journal entry
router.get("/latest", async (_req, res) => {
  const entry = await prisma.journalEntry.findFirst({
    orderBy: { createdAt: "desc" },
  });

  res.json(entry);
});
router.get("/", async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;

  const entries = await prisma.journalEntry.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
  });

  res.json(entries);
});
