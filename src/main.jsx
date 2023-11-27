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
import JobApplicationPage from "./Pages/JobApplicationPage/JobApplicationPage.jsx";
import ViewJobApplicationPage from "./Pages/ViewJobApplicationPage/ViewJobApplicationPage.jsx";
import PrivateRoutes from "./Authentication/PrivateRoutes/PrivateRoutes.jsx";
import TestRoute from "./Pages/TestRoute/TestRoute.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashBoardPage from "./Pages/DashBoard/DashBoardPage/DashBoardPage.jsx";
import AllUsers from "./Pages/DashBoard/AdminPage/AllUsers/AllUsers.jsx";
import AdminRoute from "./Authentication/PrivateRoutes/AdminRoute.jsx";
import HrRoute from "./Authentication/PrivateRoutes/HrRoute.jsx";
import SubmittedTask from "./Pages/DashBoard/EmployeePage/SubmittedTask/SubmittedTask.jsx";
import EmployeeHomePage from "./Pages/DashBoard/EmployeePage/EmployeeHomePage/EmployeeHomePage.jsx";

const queryClient = new QueryClient();

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
        loader: () => fetch("http://localhost:5000/mongoose/joboffer"),
      },
      {
        path: "/jobsAdd",
        element: <JobAddPage></JobAddPage>,
        loader: () => fetch("http://localhost:5000/mongoose/joboffer"),
      },
      {
        path: "/jobsUpdate/:id",
        element: <JobUpdatePage></JobUpdatePage>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/mongoose/joboffer/${params.id}`),
      },
      {
        path: "/application",
        element: <ViewJobApplicationPage></ViewJobApplicationPage>,
        loader: () => fetch("http://localhost:5000/mongoose/application"),
      },
      {
        path: "/application/:id",
        element: <JobApplicationPage></JobApplicationPage>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/mongoose/joboffer/${params.id}`),
      },
      {
        path: "/signIn",
        element: <SignInPage></SignInPage>,
      },
      {
        path: "/signUp",
        element: <SignUpPage></SignUpPage>,
      },
      {
        path: "/test",
        element: (
          <PrivateRoutes>
            <TestRoute></TestRoute>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashBoard",
    element: <DashBoardPage></DashBoardPage>,
    children: [
      {
        path: "allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>,
          </AdminRoute>
        ),
      },
      {
        path: "hrusers",
        element: (
          <HrRoute>
            <AllUsers></AllUsers>,
          </HrRoute>
        ),
      },
      {
        path: "empHome",
        element: <EmployeeHomePage></EmployeeHomePage>,
      },
      {
        path: "submitTask",
        element: <SubmittedTask></SubmittedTask>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
