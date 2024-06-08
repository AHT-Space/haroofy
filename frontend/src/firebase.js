// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "haroofy-1ce74.firebaseapp.com",
  projectId: "haroofy-1ce74",
  storageBucket: "haroofy-1ce74.appspot.com",
  messagingSenderId: "344576063232",
  appId: "1:344576063232:web:5d62f2522b5fd69247e5e5",
  measurementId: "G-N8NFCC40Y0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);