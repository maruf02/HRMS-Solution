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
  FaAlignJustify,
} from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";

import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../../../CustomHooks/useAdmin";
import useHr from "../../../CustomHooks/useHr";
import useEmployee from "../../../CustomHooks/useEmployee";
import { AuthContext } from "../../../Authentication/AuthProvider/AuthProvider";
import NavBar from "../../../NavBar/NavBar";

const DashBoardPage = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch();
  };

  const [isAdmin] = useAdmin();
  const [isHR] = useHr();
  const [isEmployee] = useEmployee();
  return (
    <div className="flex  flex-col lg:flex-row   text-white">
      {/* testing */}

      {/* testing */}

      {/* for small */}
      <div className="w-14 h-14 rounded-2xl bg-lime-600  lg:hidden  ">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-4xl"
          >
            <FaAlignJustify />
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {isAdmin ? (
              <>
                <li>
                  <Link className="bg-green-400 hover:bg-green-400 text-white">
                    <FaUsers className="text-2xl text-red-600"></FaUsers>
                    <p className="text-xl uppercase font-bold">
                      {user.displayName} <br />
                      <span className="text-base font-semibold">
                        {user.email}
                      </span>
                    </p>
                    <br />
                    {/* <p>{user.email}</p> */}
                  </Link>
                </li>
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
                  <Link className="bg-green-400 hover:bg-green-400 text-white">
                    <FaUsers className="text-2xl text-red-600"></FaUsers>
                    <p className="text-xl uppercase font-bold">
                      {user.displayName} <br />
                      <span className="text-base font-semibold">
                        {user.email}
                      </span>
                    </p>
                    <br />
                    {/* <p>{user.email}</p> */}
                  </Link>
                </li>
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
                <li>
                  <NavLink to="/dashboard/stripe">
                    <FaUsers></FaUsers>
                    Stripe
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
                      {user.displayName} <br />
                      <span className="text-base font-semibold">
                        {user.email}
                      </span>
                    </p>
                    <br />
                    {/* <p>{user.email}</p> */}
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
                <li>
                  <NavLink to="/dashboard/paymentHistory">
                    <MdOutlinePayment />
                    Payment History
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
              <NavLink to="/dashboard/contactUs">
                <FaEnvelope></FaEnvelope>
                Contact
              </NavLink>
            </li>

            <li>
              <Link>
                <button onClick={handleSignOut} className="flex gap-2">
                  <IoIosLogOut className="text-2xl" />
                  Logout
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* for small */}
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen hidden lg:block  bg-orange-400">
        {/*  */}

        {/*  */}
        {/*  */}
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <Link className="bg-green-400 hover:bg-green-400 text-white">
                  <FaUsers className="text-2xl text-red-600"></FaUsers>
                  <p className="text-xl uppercase font-bold">
                    {user.displayName} <br />
                    <span className="text-base font-semibold">
                      {user.email}
                    </span>
                  </p>
                  <br />
                  {/* <p>{user.email}</p> */}
                </Link>
              </li>
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
                <Link className="bg-green-400 hover:bg-green-400 text-white">
                  <FaUsers className="text-2xl text-red-600"></FaUsers>
                  <p className="text-xl uppercase font-bold">
                    {user.displayName} <br />
                    <span className="text-base font-semibold">
                      {user.email}
                    </span>
                  </p>
                  <br />
                  {/* <p>{user.email}</p> */}
                </Link>
              </li>
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
              <li>
                <NavLink to="/dashboard/stripe">
                  <FaUsers></FaUsers>
                  Stripe
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
                    {user.displayName} <br />
                    <span className="text-base font-semibold">
                      {user.email}
                    </span>
                  </p>
                  <br />
                  {/* <p>{user.email}</p> */}
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
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <MdOutlinePayment />
                  Payment History
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
            <NavLink to="/dashboard/contactUs">
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>

          <li>
            <Link>
              <button onClick={handleSignOut} className="flex gap-2">
                <IoIosLogOut className="text-2xl" />
                Logout
              </button>
            </Link>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
      {/* <Outlet></Outlet> */}
    </div>
  );
};

export default DashBoardPage;
