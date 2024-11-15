// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-d9b29.firebaseapp.com",
  projectId: "real-estate-d9b29",
  storageBucket: "real-estate-d9b29.firebasestorage.app",
  messagingSenderId: "188097806868",
  appId: "1:188097806868:web:4e4ba651eb768d0782dd01"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);