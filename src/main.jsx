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
import EditSUbmiteTask from "./Pages/DashBoard/EmployeePage/SubmittedTask/EditSUbmiteTask.jsx";
import EditSubmitTask from "./Pages/DashBoard/EmployeePage/SubmittedTask/EditSUbmiteTask.jsx";
import EmployeeList from "./Pages/DashBoard/HrPage/EmployeeList/EmployeeList.jsx";
import PayEmployee from "./Pages/DashBoard/HrPage/PayEmployee/PayEmployee.jsx";
import EmployeeDetailsPage from "./Pages/DashBoard/HrPage/EmployeeDetailsPage/EmployeeDetailsPage.jsx";
import EmpProgress from "./Pages/DashBoard/EmployeePage/EmpProgress/EmpProgress.jsx";
import EmpPayHistory from "./Pages/DashBoard/EmployeePage/EmpPayHistory/EmpPayHistory.jsx";
import ViewContactUsMssge from "./Pages/Homepage/ContactUs/ViewContactUsMssge.jsx";
import EmployeeRoute from "./Authentication/PrivateRoutes/EmployeeRoute.jsx";
import AdminHomePage from "./Pages/DashBoard/AdminPage/AdminHomePage/AdminHomePage.jsx";
import HrHomePage from "./Pages/DashBoard/HrPage/HrHomePage/HrHomePage.jsx";
import Payment from "./Pages/DashBoard/Payment/Payment.jsx";
import ContactUsPage from "./Pages/ContactUsPage/ContactUsPage.jsx";
import WhyChooseUSPage from "./Pages/WhyChooseUSPage/WhyChooseUSPage.jsx";

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
        loader: () =>
          fetch("https://b8-a12-hrms-server.vercel.app/mongoose/joboffer"),
      },
      {
        path: "/jobsAdd",
        element: (
          <PrivateRoutes>
            <JobAddPage></JobAddPage>
          </PrivateRoutes>
        ),
        loader: () =>
          fetch("https://b8-a12-hrms-server.vercel.app/mongoose/joboffer"),
      },
      {
        path: "/jobsUpdate/:id",
        element: <JobUpdatePage></JobUpdatePage>,
        loader: ({ params }) =>
          fetch(
            `https://b8-a12-hrms-server.vercel.app/mongoose/joboffer/${params.id}`
          ),
      },
      {
        path: "/application",
        element: (
          <PrivateRoutes>
            <ViewJobApplicationPage></ViewJobApplicationPage>
          </PrivateRoutes>
        ),
        loader: () =>
          fetch("https://b8-a12-hrms-server.vercel.app/mongoose/application"),
      },
      {
        path: "/application/:id",
        element: (
          <PrivateRoutes>
            <JobApplicationPage></JobApplicationPage>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://b8-a12-hrms-server.vercel.app/mongoose/joboffer/${params.id}`
          ),
      },
      {
        path: "/signIn",
        element: <SignInPage></SignInPage>,
      },
      {
        path: "/hContact",
        element: <ContactUsPage></ContactUsPage>,
      },
      {
        path: "/about",
        element: <WhyChooseUSPage></WhyChooseUSPage>,
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
    element: (
      <PrivateRoutes>
        <DashBoardPage></DashBoardPage>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHomePage></AdminHomePage>
          </AdminRoute>
        ),
      },
      {
        path: "allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>,
          </AdminRoute>
        ),
      },
      {
        path: "hrHome",
        element: (
          <HrRoute>
            <HrHomePage></HrHomePage>
          </HrRoute>
        ),
      },
      {
        path: "employeeList",
        element: (
          <HrRoute>
            <EmployeeList></EmployeeList>,
          </HrRoute>
        ),
      },
      {
        path: "empProgress",
        element: (
          <HrRoute>
            <EmpProgress></EmpProgress>,
          </HrRoute>
        ),
      },
      {
        path: "payment/:email",
        element: (
          <HrRoute>
            <PayEmployee></PayEmployee>
          </HrRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://b8-a12-hrms-server.vercel.app/users/${params.email}`),
      },
      {
        path: "stripe",
        element: (
          <PrivateRoutes>
            <Payment></Payment>
          </PrivateRoutes>
        ),
      },
      {
        path: "employeeDetails/:email",
        element: (
          <HrRoute>
            <EmployeeDetailsPage></EmployeeDetailsPage>
          </HrRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://b8-a12-hrms-server.vercel.app/users/${params.email}`),
      },
      {
        path: "empHome",
        element: (
          <EmployeeRoute>
            <EmployeeHomePage></EmployeeHomePage>
          </EmployeeRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <EmployeeRoute>
            <EmpPayHistory></EmpPayHistory>
          </EmployeeRoute>
        ),
      },
      {
        path: "submitTask",
        element: (
          <EmployeeRoute>
            <SubmittedTask></SubmittedTask>
          </EmployeeRoute>
        ),
      },
      {
        path: "contactUs",
        element: <ViewContactUsMssge></ViewContactUsMssge>,
        loader: () => fetch("https://b8-a12-hrms-server.vercel.app/contact"),
      },

      {
        path: "taskUpdate/:email/:id",
        element: (
          <EmployeeRoute>
            <EditSubmitTask></EditSubmitTask>
          </EmployeeRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://b8-a12-hrms-server.vercel.app/worksheet/${params.email}/${params.id}`
          ),
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
