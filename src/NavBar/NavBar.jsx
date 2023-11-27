import React, { useContext } from "react";
import logo from "../assets/Image/logo.png";
import { Link, NavLink } from "react-router-dom";
import { vite_key } from "../Authentication/Firebase/Firebase.config";
import "./Navbar.css";
import { AuthContext } from "../Authentication/AuthProvider/AuthProvider";

const NavBar = () => {
  console.log(vite_key);
  const { user, logOut } = useContext(AuthContext);
  const handleSignOut = () => {
    logOut().then().catch();
  };
  const userName = user?.displayName;
  const menu = (
    <>
      <li>
        <NavLink to="/" className="activeNavLink ">
          <button>Home</button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashBoard" className="activeNavLink ">
          <button>DashBoard</button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/jobs" className="activeNavLink ">
          <button>Career</button>
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menu}
            </ul>
          </div>
          <img src={logo}></img>
          <p className="btn btn-ghost text-xl"> HRMS Solution</p>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 pr-4">{menu}</ul>
          {/* <a className="btn">Button</a> */}
        </div>
        {user ? (
          <>
            <div className="ml-[30%] md:ml-[40%] lg:ml-0">
              {/* propic section */}
              <div className="pr-2 text-lg">
                <p>{user.displayName}</p>
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[10] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/jobsAdd">
                      <button>Add Job Offers</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/application">
                      <button>View All Application</button>
                    </Link>
                  </li>
                  {/* <li>
                    <Link>
                      <button>View Room Category</button>
                    </Link>
                  </li> */}
                  <li>
                    <Link>
                      <button onClick={handleSignOut}>Logout</button>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* propic section */}
            </div>
          </>
        ) : (
          <>
            <div className="ml-[30%] md:ml-[40%] lg:ml-0">
              <Link to="/signIn">
                <button className="btn btn-outline btn-accent text-lg">
                  Login
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
