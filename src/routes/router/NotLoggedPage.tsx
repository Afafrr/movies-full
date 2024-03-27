import { auth } from "../../services/config/firebase";

//NOT USED NOT USED NOT USED NOT USED
export const NotLoggedPage = () => {
  return (
    <div className="not-logged">
      <div>
        <h2>You are not logged in!</h2>
        <a className="btn  btn-outline-dark" href="../login">
          Log in
        </a>
        <a className="btn  btn-outline-dark" href="../register">
          Create account
        </a>
      </div>
    </div>
  );
};
