import { useState } from "react";
import { UserService } from "../../services/register/userService";
import { AuthError } from "../AuthError";
import { AuthSuccess } from "../AuthSuccess";
import { Navigate } from "react-router-dom";

export const CreateUsername = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState({ state: false, message: "" });
  const [success, setSuccess] = useState(false);

  const createUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError({ state: false, message: "" });

    const userService = new UserService();

    try {
      //method checks if username is unique and if same email adress already has username defined in db
      await userService.createUserInDB(username);

      setSuccess(true);
    } catch (error: any) {
      setError({ state: true, message: error.message });
    }
  };

  return (
    <div className="username-form">
      <h2>Create your username</h2>
      <form novalidate onSubmit={createUsername}>
        <div className="form-floating">
          <input
            id="username"
            type="username"
            value={username}
            placeholder="Username..."
            className="form-control border-3"
            autoComplete="name"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username">Username</label>
        </div>
        <button type="submit" className="btn btn-dark mt-3">
          Create
        </button>
        {error.state && <AuthError mess={error.message} />}
        {success && (
          <>
            <AuthSuccess mess="Your username has been set." />
            <Navigate to={"/"}></Navigate>
          </>
        )}
      </form>
    </div>
  );
};
