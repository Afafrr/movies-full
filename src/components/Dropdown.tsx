import { useState } from "react";

export const Dropdown = () => {
  const [visibility, setVisibility] = useState(true);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (popupRef.current && !popupRef.current.contains(event.target)) {
  //       setIsVisible(false); // Close the popup if clicked outside
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="dropdown">
      <button
        onClick={toggleVisibility}
        className="btn btn-secondary"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-person-circle"></i>
      </button>
      <div className={`dropdown-menu-custom ${visibility && "hidden"}`}>
        <ul>
          <li>
            <a href="">
              <i className="bi bi-person-circle"></i> Account
            </a>
          </li>
          <li>
            <a href="">
              <i className="bi bi-people-fill"></i> Friends
            </a>
          </li>
          <li>
            <a href="">
              <i className="bi bi-person-walking"></i> Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
