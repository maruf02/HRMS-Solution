import React, { useContext } from "react";
import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../../CustomHooks/useAdmin";
import useHr from "../../../CustomHooks/useHr";
import useEmployee from "../../../CustomHooks/useEmployee";
import { AuthContext } from "../../../Authentication/AuthProvider/AuthProvider";

const DashBoardPage = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isHR] = useHr();
  const [isEmployee] = useEmployee();
  return (
    <div className="flex   text-white">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen md:visible bg-orange-400">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allusers">
                  <FaUsers></FaUsers>
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
          {isHR ? (
            <>
              <li>
                <NavLink to="/dashboard/hrHome">
                  <FaHome></FaHome>
                  HR Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/employeeList">
                  <FaUsers></FaUsers>
                  HR Users(Employee's)
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
          {isEmployee ? (
            <>
              <li>
                <Link className="bg-green-400 hover:bg-green-400 text-white">
                  <FaUsers className="text-2xl text-red-600"></FaUsers>
                  <p className="text-xl uppercase font-bold">
                    {user.displayName}
                  </p>
                  <br />
                  <p>{user.email}</p>
                </Link>
              </li>
              <li>
                <NavLink to="/dashboard/empHome">
                  <FaHome></FaHome>
                  Employee Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/submitTask">
                  <FaUsers></FaUsers>
                  Submitted Task
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}

          {/* shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoardPage;
