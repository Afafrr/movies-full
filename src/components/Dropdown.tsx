import { useState, useEffect, useRef } from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export const Dropdown = () => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  let menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target)) {
        // Close the popup if clicked outside
        setVisibility(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="dropdown" ref={menuRef}>
      <button onClick={toggleVisibility} className="btn btn-secondary">
        <i className="bi bi-person-circle"></i>
      </button>
      <div className={`dropdown-menu-custom ${visibility || "hidden"}`}>
        <ul>
          <li>
            <a href="/account">
              <i className="bi bi-person-circle"></i> Account
            </a>
          </li>
          <li>
            <a href="/friends">
              <i className="bi bi-people-fill"></i> Friends
            </a>
          </li>
          <li>
            <a onClick={logout}>
              <i className="bi bi-person-walking"></i> Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
