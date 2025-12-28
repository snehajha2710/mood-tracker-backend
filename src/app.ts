import express from "express";
import journalRoutes from "./routes/journal.routes";
import moodRoutes from "./routes/mood.routes";
import insightsRoutes from "./routes/insights.routes";

const app = express();

app.use(express.json());

// health
app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

// routes
app.use("/moods", moodRoutes);
app.use("/journal", journalRoutes);
app.use("/insights", insightsRoutes);

export default app;
