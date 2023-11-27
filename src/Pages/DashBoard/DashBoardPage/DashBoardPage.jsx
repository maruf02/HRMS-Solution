import React from "react";
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
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../../CustomHooks/useAdmin";
import useHr from "../../../CustomHooks/useHr";

const DashBoardPage = () => {
  const [isAdmin] = useAdmin();
  const [isHR] = useHr();
  return (
    <div className="flex text-white">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-orange-400">
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
                <NavLink to="/dashboard/hrusers">
                  <FaUsers></FaUsers>
                  hr Users
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
