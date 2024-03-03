import { Dropdown } from "./Dropdown";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary z-1">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <Dropdown />
        </div>
      </div>
    </nav>
  );
};
