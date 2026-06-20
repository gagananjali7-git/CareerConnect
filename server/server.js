import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// ROUTES
// ======================
app.use("/api/auth", authRoutes);

// Home test route
app.get("/", (req, res) => {
  res.send("🎮 CareerConnect Server Running Successfully");
});

// ======================
// CONNECT DB + START SERVER
// ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("⚡ MongoDB Connected Successfully");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`🎮 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:");
    console.log(err.message);
  });