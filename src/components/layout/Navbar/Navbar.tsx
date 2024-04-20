import { Dropdown } from "./Dropdown";
import { auth } from "../../../services/config/firebase";

export const Navbar = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-body-tertiary z-1">
        <div className="container-fluid">
          <a className="navbar-brand" href="/dashboard">
            movies-app
          </a>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-person-circle"></i>
          </button>
          <button
            onClick={() =>
              auth.onAuthStateChanged((user) => {
                console.log(user);

                console.log(auth.currentUser);
              })
            }
          >
            CHECK
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <Dropdown />
          </div>
        </div>
      </nav>
      {isLoading && (
        <p className="loading-bar placeholder-glow m-0 p-0">
          <span className="placeholder col-12 placeholder-xs"></span>
        </p>
      )}
    </div>
  );
};
