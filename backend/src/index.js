import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express API" });
});

app.listen(5000, () => console.log("✅ Backend on port 5000"));
