const express = require("express");
const { initializeFirebase } = require("./config/firebase");
const userRouter = require("./router/userRouter");

const app = express();
const port = process.env.PORT || 3000;

try {
  initializeFirebase();
  console.log("Firebase Firestore connected successfully.");
} catch (error) {
  console.error("Firebase connection failed:", error.message);
  console.log("Add your serviceAccount.json or set FIREBASE_SERVICE_ACCOUNT before starting the server.");
  process.exit(1);
}

app.use(express.json());
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Users API is running" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
