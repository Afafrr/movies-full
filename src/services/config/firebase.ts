// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAepZX-fe6bq4k8xrgnEu83vabl29WpBIg",
  authDomain: "movies-app-26923.firebaseapp.com",
  projectId: "movies-app-26923",
  storageBucket: "movies-app-26923.appspot.com",
  messagingSenderId: "890948807576",
  appId: "1:890948807576:web:41a17910b51145790159ed",
  measurementId: "G-6QTK2SKZQ2",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
