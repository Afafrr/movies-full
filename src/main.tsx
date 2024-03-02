import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/app.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/Root.tsx";
import { Account } from "./routes/Account.tsx";
import { ErrorPage } from "./components/ErrorPage.tsx";
import { RegisterPage } from "./auth/register/RegisterPage.tsx";
import { LoginPage } from "./auth/login/LoginPage.tsx";
import { Navbar } from "./components/Navbar.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/account",
    element: <Account />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
);
