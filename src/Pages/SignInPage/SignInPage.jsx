import React, { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthProvider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";

const SignInPage = () => {
  const axiosSecure = useAxiosSecure();
  const { signIn, signInGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    // console.log(email, password);

    const response = await axiosSecure.get(`/users/${email}`);
    const userStatus = response.data?.status;
    // console.log(userStatus);

    if (userStatus === "pending" || userStatus === "fired") {
      Swal.fire(`your Status is ${userStatus}. Please contact HR For login!!`);
    } else {
      signIn(email, password)
        .then((res) => {
          // console.log(res.user);
          // console.log("object", email, password);
          // alert("Login successful!");
          Swal.fire("Login Successfully!");
          navigate(location?.state ? location.state : "/");
        })
        .catch((err) => {
          // console.error(err);
          // console.error("error code:", err.code);
          // toast.error(err.code);
          Swal.fire(err.code);
        });
    }
  };

  const handleSignInGoogle = () => {
    signInGoogle()
      .then((res) => {
        // console.log(res.user);
        Swal.fire("Login Successfully via Google!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        // console.error(err);
      });
  };

  return (
    <div className="py-20">
      <div className="hero ">
        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-orange-400 ">
          <p className="py-5 text-center text-4xl text-blue-600 font-semibold">
            Please Sign In
          </p>
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl text-blue-600 font-semibold">
                  Email:
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="input input-bordered bg-white text-black text-xl"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl text-blue-600">
                  Password:
                </span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                className="input input-bordered bg-white text-black text-xl"
                required
              />
              <label className="pt-2">
                <p className="text-xl text-blue-600">
                  New Here? Please
                  <Link
                    to="/signUp"
                    className="text-purple-700 underline hover:text-green-700"
                  >
                    SignUP
                  </Link>
                </p>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-2xl">Login</button>
            </div>
          </form>
          {/* <p className="text-2xl text-blue-600 text-center">SignIn Via:</p> */}
          {/* google and github */}
          <div className="pb-10 mx-auto flex gap-5  ">
            {/* <div className=" mt-6 flex ">
              <button
                onClick={handleSignInGoogle}
                className="btn btn-primary text-xl"
              >
                <FaGoogle></FaGoogle> Google
              </button>
            </div> */}
            {/* <div className=" mt-6 flex ">
              <button className="btn btn-primary text-xl">
                <FaGithub></FaGithub> Github
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
