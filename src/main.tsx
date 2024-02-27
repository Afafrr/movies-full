import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/app.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/Root.tsx";
import { ErrorPage } from "./components/ErrorPage.tsx";
import { Register } from "./auth/register/Register.tsx";
import { Login } from "./auth/login/Login.tsx";
import { Navbar } from "./components/Navbar.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
);
