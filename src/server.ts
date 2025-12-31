import dotenv from "dotenv";

// 👇 Load env vars from prisma/.env
dotenv.config({ path: "prisma/.env" });

import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
