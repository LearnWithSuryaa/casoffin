// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDDrFFKVUuENNfMEyXvLx6ETtWRU-e3C6Y",
  authDomain: "website-kelas-bf7e0.firebaseapp.com",
  projectId: "website-kelas-bf7e0",
  storageBucket: "website-kelas-bf7e0.appspot.com",
  messagingSenderId: "998137660207",
  appId: "1:998137660207:web:5358ba5003775d506757da",
  measurementId: "G-TM7YG4HZ90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export the necessary values
export { storage, db, auth, provider };
