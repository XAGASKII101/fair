
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5f7F7H0cnF0x2DNKBCe3jFWN5H8Q0nIY",
  authDomain: "nexarion-ai.firebaseapp.com",
  projectId: "nexarion-ai",
  storageBucket: "nexarion-ai.firebasestorage.app",
  messagingSenderId: "192258451282",
  appId: "1:192258451282:web:50afac10bf234a892afc8b",
  measurementId: "G-6S1CNN4F23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
