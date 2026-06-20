import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// ======================
// REGISTER
// ======================
router.post("/register", async (req, res) => {
  try {
    console.log("🔥 REGISTER HIT");
    console.log("BODY:", req.body);

    const { name, email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    console.log("✅ USER CREATED:", newUser.email);

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (err) {
    console.log("❌ REGISTER ERROR:");
    console.log(err);

    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

// ======================
// LOGIN
// ======================
router.post("/login", async (req, res) => {
  try {
    console.log("🔥 LOGIN HIT");
    console.log("BODY:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful 🎮",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.log("❌ LOGIN ERROR:");
    console.log(err);

    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

export default router;