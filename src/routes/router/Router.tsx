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
import { useEffect } from "react";

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

export const Root = () => {
  //root path is redirected to /dashboard
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
