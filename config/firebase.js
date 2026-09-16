const path = require("path");
const admin = require("firebase-admin");

let db = null;

function initializeFirebase() {
  if (db) {
    return db;
  }

  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT
    ? path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT)
    : path.join(__dirname, "..", "serviceAccount.json");

  if (!require("fs").existsSync(serviceAccountPath)) {
    throw new Error(`Firebase credentials not found at ${serviceAccountPath}`);
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });

  db = admin.firestore();
  return db;
}

function getDb() {
  if (!db) {
    return initializeFirebase();
  }
  return db;
}

module.exports = {
  initializeFirebase,
  getDb,
};
