import { Routes, Route, useNavigate } from "react-router-dom";
import { Account } from "../Account.tsx";
import { Dashboard } from "../Dashboard.tsx";
import { auth } from "../../services/config/firebase.ts";
import { Friends } from "../Friends.tsx";
import { LoggedOut } from "../../components/layout/Navbar/LoggedOut.tsx";

export const DashboardRouter = () => {
  const navigate = useNavigate();
  //every route after /dashboard is protected
  auth.onAuthStateChanged((user) => {
    if (!user) {
      navigate("/login");
    }
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="account" element={<Account />} />1
        <Route path="friends" element={<Friends />} />1
        <Route path="notlogged" element={<LoggedOut />} />1
      </Routes>
    </>
  );
};
