import { Navbar } from "../../components/layout/Navbar/Navbar.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { RegisterPage } from "../../auth/register/RegisterPage.tsx";
import { LoginPage } from "../../auth/login/LoginPage.tsx";
import { ErrorPage } from "../../components/ErrorPage.tsx";
import { CreateUsername } from "../../auth/register/CreateUsername.tsx";
import { NotFound } from "./NotFound.tsx";
import { DashboardRouter } from "./DashboardRouter.tsx";
import { useEffect, useState } from "react";

export const Router = () => {
  //dashboard has logic for redirecting unauth users
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<Root />} errorElement={<ErrorPage />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="register/username" element={<CreateUsername />} />
        <Route path="dashboard/*" element={<DashboardRouter />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export type IsLoadingContext = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  friendsRequests: {};
};
import { FirestoreProvider } from "../Friends/FirestoreProvider.tsx";
import { auth } from "../../services/config/firebase.ts";

export const Root = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [currUserEmail, setCurrUserEmail] = useState();
  //root path is redirected to /dashboard

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user?.email, "is logged");
        setCurrUserEmail(user?.email);
      }
    });
  }, [location.pathname]);

  return (
    <FirestoreProvider currUserEmail={currUserEmail}>
      <Navbar isLoading={isLoading} />
      <Outlet context={{ setIsLoading, currUserEmail }} />
    </FirestoreProvider>
  );
};
