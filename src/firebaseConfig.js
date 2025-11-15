// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBBDezxHoj7hJ24hcYJW5TOuRbL7SJ6XZI",
  authDomain: "sevahealth-6e1f5.firebaseapp.com",
  projectId: "sevahealth-6e1f5",
  storageBucket: "sevahealth-6e1f5.firebasestorage.app",
  messagingSenderId: "758562577221",
  appId: "1:758562577221:web:f9452cc125f269eb80fc2c",
  databaseURL: "https://sevahealth-6e1f5-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services for use in other files
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDb = getDatabase(app);


export { app };
