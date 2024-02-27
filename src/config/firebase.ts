// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDERfXyHznbJU4AJ06RRnZxbwpPkg4MNj0",
  authDomain: "movies-app-192fe.firebaseapp.com",
  projectId: "movies-app-192fe",
  storageBucket: "movies-app-192fe.appspot.com",
  messagingSenderId: "349635471278",
  appId: "1:349635471278:web:f9b7a4a39e68b2c80d4a3f",
  measurementId: "G-S20TZL3BKP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
