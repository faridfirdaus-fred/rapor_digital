import "dotenv/config";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import authRoutes from "./routes/auth.js";
import kelasRoutes from "./routes/kelas.js";
import siswaRoutes from "./routes/siswa.js";
import nilaiRoutes from "./routes/nilai.js";
import bobotNilaiRoutes from "./routes/bobotnilai.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('rapordigital');
    console.log("✅ Connected to MongoDB - Database: rapordigital");
    
    // Make db globally available
    global.db = db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

app.get("/api", (req, res) => {
  res.json({ message: "Rapor Digital API - Backend Ready" });
});

// Public routes (no authentication required)
app.use("/api/auth", authRoutes);

// Protected routes (authentication required)
app.use("/api/kelas", authMiddleware, kelasRoutes);
app.use("/api/siswa", authMiddleware, siswaRoutes);
app.use("/api/nilai", authMiddleware, nilaiRoutes);
app.use("/api/bobot-nilai", authMiddleware, bobotNilaiRoutes);

// Start server after DB connection
connectDB().then(() => {
  app.listen(5000, () => console.log("✅ Backend on port 5000"));
});
