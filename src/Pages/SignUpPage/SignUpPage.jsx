import React, { useContext, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";

const imgbb = import.meta.env.VITE_imgbb_api;
// console.log(imgbb);
const imageApi = `https://api.imgbb.com/1/upload?key=${imgbb}`;

const SignUpPage = () => {
  const [googleUser, setGoogleUser] = useState(null);
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const { createUser, signInGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleSignUp = async (e) => {
    // console.log(e);
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    // const image = form.get("ImageURL");
    const email = form.get("email");
    const password = form.get("password");
    const role = form.get("Role");
    const designation = form.get("designation");
    const salary = form.get("salary");
    const bank = form.get("bank");
    const status = "pending";
    // const image = e.image[0];
    // const image = e.target.files[0];
    const imagef = form.get("image");
    // console.log("img", imagef);

    const res = await axiosPublic.post(
      imageApi,
      { image: imagef },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    const image = res.data.data.display_url;
    const userInfo = {
      name,
      image,
      email,
      designation,
      salary,
      bank,
      role,
      status,
    };
    // console.log("user", userInfo);

    // console.log("user", userInfo);
    // console.log(name, image, email, password);
    // console.log("role", role);
    //   create user
    setSignUpError("");
    setSignUpSuccess("");

    if (password.length < 6) {
      setSignUpError("Password must be minimum 6 character or more");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setSignUpError("Password must include one Capital letter");
      return;
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      setSignUpError("password have must include one special character");
      return;
    }
    createUser(email, password)
      .then((res) => {
        // console.log(res.user);
        updateProfile(res.user, {
          displayName: name,
          photoURL: image,
        })
          .then(() => {
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                // console.log("user added db", userInfo);
                setGoogleUser(res.user);
                setSignUpSuccess("User Created Successfully");
                Swal.fire("User Created Successfully");
                navigate(location?.state ? location.state : "/");
              }
            });
            // console.log(name, image);
            // window.location.reload();
          })
          .catch((error) => {
            // console.error("Error updating profile:", error);
          });
        // setGoogleUser(res.user);
        // setSignUpSuccess("User Created Successfully");
        // Swal.fire("User Created Successfully");
        // navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        // console.error(error);
        setSignUpError(error.message);
        Swal.fire(error.code);
        // console.log("abc", error.message);
      });
  };
  const handleSignInGoogle = () => {
    signInGoogle()
      .then((res) => {
        // console.log(res.user);
        Swal.fire("Login Successfully via Google");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        // console.error(err);
      });
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className="py-20">
      <div className="hero ">
        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-orange-400 ">
          <p className="py-5 text-center text-4xl text-blue-600 font-semibold">
            Please Sign UP
          </p>
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl text-blue-600 font-semibold">
                  Name:
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="input input-bordered bg-white text-black text-xl"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl text-blue-600 font-semibold">
                  Image :
                </span>
              </label>
              <input
                type="file"
                name="image"
                className="file-input file-input-bordered w-full max-w-md bg-white"
              />
              {/* <input
                type="text"
                name="ImageURL"
                placeholder="Enter Your Image URL/Link"
                className="input input-bordered bg-white text-black text-xl"
                required
              /> */}
            </div>
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
              <label className="label">
                <span className="label-text text-2xl text-blue-600">
                  SignUp AS:
                </span>
              </label>
              {/* <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                className="input input-bordered bg-white text-black text-xl"
                required
              /> */}
              <select
                required
                name="Role"
                value={selectedRole}
                onChange={handleRoleChange}
                className="select select-bordered w-full text-white bg-slate-700 "
              >
                <option value="" disabled className="text-green-600">
                  Select Role
                </option>
                <option disabled className="text-lg py-10">
                  Admin
                </option>
                <option className="text-lg py-10">HR</option>
                <option className="text-lg py-10">Employee</option>
              </select>

              {selectedRole === "Employee" || selectedRole === "HR" ? (
                <>
                  <label className="label">
                    <span className="label-text text-2xl text-blue-600 font-semibold">
                      Designation:
                    </span>
                  </label>
                  <input
                    type="text"
                    name="designation"
                    placeholder="Enter Your Name"
                    className="input input-bordered bg-white text-black text-xl"
                    required
                  />
                  <label className="label">
                    <span className="label-text text-2xl text-blue-600 font-semibold">
                      Salary:($)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="salary"
                    placeholder="Enter Your Name"
                    className="input input-bordered bg-white text-black text-xl"
                    required
                  />
                  <label className="label">
                    <span className="label-text text-2xl text-blue-600 font-semibold">
                      Bank ACC Number:
                    </span>
                  </label>
                  <input
                    type="text"
                    name="bank"
                    placeholder="Enter Your Name"
                    className="input input-bordered bg-white text-black text-xl"
                    required
                  />
                </>
              ) : (
                ""
              )}

              {/*  */}

              <label className="pt-2">
                <p className="text-xl text-blue-600">
                  Already SignUP? Please
                  <Link
                    to="/signIn"
                    className="text-purple-700 underline hover:text-green-700"
                  >
                    SignIn
                  </Link>
                </p>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-2xl">SIGNUP</button>
            </div>
          </form>

          {signUpSuccess && (
            <p className="text-green-700 text-lg">{signUpSuccess}</p>
          )}
          {signUpError && <p className="text-red-700 text-lg">{signUpError}</p>}
          {/* <p className="text-2xl text-blue-600 text-center">SignUp Via:</p> */}
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

export default SignUpPage;
