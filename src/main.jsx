import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root/Root.jsx";
import ErrorPage from "./ErrorPage/ErrorPage.jsx";
import Home from "./Pages/Homepage/Home/Home.jsx";
import JobPage from "./Pages/JobPage/JobPage.jsx";
import AuthProvider from "./Authentication/AuthProvider/AuthProvider.jsx";
import SignInPage from "./Pages/SignInPage/SignInPage.jsx";
import SignUpPage from "./Pages/SignUpPage/SignUpPage.jsx";
import JobAddPage from "./Pages/JobAddUpdateViewPage/JobAddPage.jsx";
import JobUpdatePage from "./Pages/JobAddUpdateViewPage/JobUpdatePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/jobs",
        element: <JobPage></JobPage>,
      },
      {
        path: "/jobsAdd",
        element: <JobAddPage></JobAddPage>,
        loader: () => fetch("http://localhost:5000/mongoose/joboffer"),
      },
      {
        path: "/jobsUpdate",
        element: <JobUpdatePage></JobUpdatePage>,
      },
      {
        path: "/signIn",
        element: <SignInPage></SignInPage>,
      },
      {
        path: "/signUp",
        element: <SignUpPage></SignUpPage>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
