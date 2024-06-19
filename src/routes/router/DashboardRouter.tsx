import { Routes, Route, useNavigate } from "react-router-dom";
import { Account } from "../Account.tsx";
import { Dashboard } from "../Dashboard.tsx";
import { auth } from "../../services/config/firebase.ts";
import { Friends } from "../Friends/Friends.tsx";
import { LoggedOut } from "../../components/layout/Navbar/LoggedOut.tsx";
import { useEffect } from "react";
import { UserService } from "../../services/register/userService.ts";
import { MoviesPopular } from "../MoviesPopular.tsx";

export const DashboardRouter = () => {
  const navigate = useNavigate();
  //every route after /dashboard is protected
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="account" element={<Account />} />
        <Route path="friends" element={<Friends />} />
        <Route path="movies" element={<MoviesPopular />} />
        <Route path="notLogged" element={<LoggedOut />} />
      </Routes>
    </>
  );
};
