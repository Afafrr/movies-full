import { Dropdown } from "./Dropdown";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Navbar = ({ isLoading }: { isLoading: boolean }) => {
  let { pathname } = useLocation();
  let authLocation = true;
  //display more navigation options if on logged
  if (pathname === ("/login" || "/register" || "/register/username")) {
    authLocation = false;
  }

  const navBtns: React.ReactNode = (
    <div className="nav-btns-container">
      <a className="btn" href="/dashboard/post">
        Create Post
      </a>
      <a className="btn" href="/dashboard/movies">
        Popular movies
      </a>
    </div>
  );

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

          {authLocation && (
            <>
              <div className="nav-Btns-wrapper">{navBtns}</div>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                <Dropdown navBtns={navBtns} />
              </div>
            </>
          )}
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
