import dotenv from "dotenv";
import app from "./app";

// Load .env locally only (Azure ignores it automatically)
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
