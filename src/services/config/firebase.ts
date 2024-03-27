// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDERfXyHznbJU4AJ06RRnZxbwpPkg4MNj0",
//   authDomain: "movies-app-192fe.firebaseapp.com",
//   projectId: "movies-app-192fe",
//   storageBucket: "movies-app-192fe.appspot.com",
//   messagingSenderId: "349635471278",
//   appId: "1:349635471278:web:f9b7a4a39e68b2c80d4a3f",
//   measurementId: "G-S20TZL3BKP",
// };
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
