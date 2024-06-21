import { auth, googleProvider } from "../../services/config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { AuthError } from "../AuthError";
import { AuthSuccess } from "../AuthSuccess";
import { Link, useOutletContext } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { UserService } from "../../services/userService";
import { IsLoadingContext } from "../../routes/router/Router";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ state: false, message: "" });
  const [success, setSuccess] = useState(false);
  const { setIsLoading }: IsLoadingContext = useOutletContext();

  const navigate = useNavigate();

  const resetStates = () => {
    setError({ state: false, message: "" });
    setSuccess(false);
    setIsLoading(true);
  };

  const logIn = async (e: React.FormEvent) => {
    e.preventDefault();
    resetStates();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setEmail("");
      setPassword("");
    } catch (err: any) {
      console.error(err.message);
      setError({ state: true, message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const logInWithGoogle = async () => {
    resetStates();
    //google doest not have separate login and register methods
    //so after the login there is a check if user has username set
    try {
      const user = await signInWithPopup(auth, googleProvider);
      //if user does not have username redirect
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError({ state: true, message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Log in to your account.</h2>
      <form novalidate onSubmit={logIn}>
        <div className="form-floating">
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Email..."
            autoComplete="email"
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
        <button type="submit" className="btn btn-outline-dark mt-3">
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
        {success && (
          <>
            <AuthSuccess
              mess={`You've looged in as ${auth.currentUser?.displayName}`}
            />
            <Navigate to={"/dashboard"}></Navigate>
          </>
        )}
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
