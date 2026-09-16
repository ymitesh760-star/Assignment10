const express = require("express");
const { getDb } = require("../config/firebase");
const { validateUser } = require("../schema/userSchema");

const router = express.Router();

router.post("/", async (req, res) => {
  const userData = req.body;
  const validation = validateUser(userData);

  if (!validation.isValid) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validation.errors,
    });
  }

  try {
    const db = getDb();
    const userRef = db.collection("users").doc();
    const user = {
      ...userData,
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      course: userData.course.trim(),
      age: Number(userData.age),
      createdAt: new Date().toISOString(),
    };

    await userRef.set(user);

    return res.status(201).json({
      message: "User created successfully",
      userId: userRef.id,
      user,
    });
  } catch (error) {
    console.error("Error storing user:", error);
    return res.status(500).json({
      message: "Failed to store user data in Firestore",
      error: error.message,
    });
  }
});

module.exports = router;
