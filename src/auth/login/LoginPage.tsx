import { auth, googleProvider } from "../../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { AuthError } from "../AuthError";
import { AuthSuccess } from "../AuthSuccess";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ state: false, message: "" });
  const [success, setSuccess] = useState(false);
  console.log(auth.currentUser);

  const logIn = async (e) => {
    e.preventDefault();

    setError({ ...error, state: false });
    setSuccess(false);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(email);
      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (err: any) {
      console.error(err.message);
      setError({ state: true, message: err.message });
    }
  };

  const logInWithGoogle = async () => {
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
      <h2>Log in to your account.</h2>
      <form novalidate>
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
        <button onClick={logIn} className="btn btn-outline-dark mt-3">
          Log in
        </button>
      </form>
      <button
        onClick={logInWithGoogle}
        className="btn btn-outline-dark btn-google"
      >
        <i className="bi bi-google" /> Log in with Google
      </button>
      <div className="alert-wrapper">
        {error.message && <AuthError mess={error.message} />}
        {success && <AuthSuccess mess="You are logged in!" />}
      </div>
      <div className="register-wrapper">
        If you dont have an account create it!
        <Link
          to="/register"
          className="btn btn-sm btn-outline-dark register-btn"
        >
          Regsiter
        </Link>
      </div>
    </div>
  );
};
