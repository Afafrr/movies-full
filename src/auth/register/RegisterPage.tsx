import { auth, googleProvider } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { AuthError } from "../AuthError";
import { AuthSuccess } from "../AuthSuccess";
import { Link } from "react-router-dom";

const usersCollection = collection(db, "Users");
const friendList = collection(db, "friendList");

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ state: false, message: "" });
  const [success, setSuccess] = useState(false);

  const signIn = async (e) => {
    e.preventDefault();
    setError({ ...error, state: false });
    setSuccess(false);

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: username });
        console.log("Updated profile");
        
        //TODO: ADD CHECK IF USERNAME ALREADY EXISTS
        await addDoc(usersCollection, {
          userEmail: email,
          username: username,
        });
      }
      setEmail("");
      setUsername("");
      setPassword("");
      setSuccess(true);
    } catch (err: any) {
      console.error(err.message);
      setError({ state: true, message: err.message });
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError({ state: true, message: err.message });
    }
  };

  return (
    <div className="auth-form ">
      <h2>Create your account.</h2>
      <form novalidate>
        <div className="form-floating">
          <input
            id="username"
            value={username}
            type="text"
            placeholder="Username..."
            className="form-control border-3"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username">Username</label>
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="form-floating">
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Email..."
            className="form-control border-3"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating">
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Password..."
            className="form-control border-3"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button onClick={signIn} className="btn btn-outline-dark mt-3">
          Sign In
        </button>
      </form>
      <button
        onClick={signInWithGoogle}
        className="btn btn-outline-dark btn-google"
      >
        <i className="bi bi-google"></i> Sign In With Google
      </button>
      <div className="alert-wrapper">
        {error.message && <AuthError mess={error.message} />}
        {success && (
          <AuthSuccess mess="Your account has been created. Now log in!" />
        )}
      </div>
      <div className="register-wrapper">
        If you have an account log in!
        <Link to="/login" className="btn btn-sm btn-outline-dark register-btn">
          Log in
        </Link>
      </div>
    </div>
  );
};
