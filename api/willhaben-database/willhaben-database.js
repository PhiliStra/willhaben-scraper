const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export default function writeResults(result) {
  const date = new Date(Date.now());
  const db = getDatabase();
  set(ref(db, `${date.getMonth()}/${date.getDay()}/`), result);
}
