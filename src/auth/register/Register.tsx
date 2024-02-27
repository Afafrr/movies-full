import { auth, googleProvider } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { db } from "../../config/firebase";
import { getDocs, addDoc, collection } from "firebase/firestore";
import { AuthError } from "../AuthError";

const usersCollection = collection(db, "Users");
const friendList = collection(db, "friendList");

export const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ state: false, message: "" });
  const [success, setSuccess] = useState(false);

  const signIn = async () => {
    setError({ ...error, state: false });
    setSuccess(false);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(usersCollection, {
        username: username,
        friendList: null,
      });
      setEmail("");
      setUsername("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      console.error(err.message);
      setError({ state: true, message: err.message });
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-form ">
      <h2>Create your account.</h2>
      <form novalidate>
        <div className="form-floating">
          <input
            // id="username"
            id="validationCustom01"
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
            placeholder="Password..."
            className="form-control border-3"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button
          type="submit"
          onClick={signIn}
          className="btn btn-outline-dark mt-3"
        >
          Sign In
        </button>
      </form>
      <button onClick={signInWithGoogle} className="btn btn-outline-dark">
        Sign In With Google <i className="bi bi-google"></i>
      </button>

      <div className="alert-wrapper">
        {error.message ? (
          <div className="alert bg-danger">{error.message}</div>
        ) : null}
        {success ? (
          <div className="alert bg-success">
            Your account has been created, now log in!
          </div>
        ) : null}
      </div>
      
    </div>
  );
};
