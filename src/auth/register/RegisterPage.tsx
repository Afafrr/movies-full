import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { AuthError } from "../AuthError";
import { AuthSuccess } from "../AuthSuccess";
import { Register } from "../../services/register/authFirebase";
import { Navigate } from "react-router-dom";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ state: false, message: "" });
  const [success, setSuccess] = useState(false);

  const {
    setIsLoading,
  }: { setIsLoading: React.Dispatch<React.SetStateAction<boolean>> } =
    useOutletContext();

  const resetStates = () => {
    setError({ state: false, message: "" });
    setSuccess(false);
    setIsLoading(true);
  };

  //create instance of the registration class
  const register = new Register(email, password);
  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    resetStates();
    try {
      //create user in firebase auth
      await register.registerWithEmailAndPassword();
      //clear form fields
      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (err: any) {
      console.error(err.message);
      setError({ state: true, message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    resetStates();
    try {
      //create user in firebase auth with google
      await register.registerWithGoogle();
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError({ state: true, message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form ">
      <h2>Create your account.</h2>
      <form novalidate onSubmit={signIn}>
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
        <button type="submit" className="btn btn-dark btn-sign-in">
          Sign In
        </button>
      </form>
      <button onClick={signInWithGoogle} className="btn btn-dark btn-google">
        <i className="bi bi-google"></i> Sign In With Google
      </button>
      <div className="alert-wrapper">
        {error.state && <AuthError mess={error.message} />}
        {success && (
          <>
            <AuthSuccess mess="Your account has been created." />
            <Navigate to="/register/username"></Navigate>
          </>
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
