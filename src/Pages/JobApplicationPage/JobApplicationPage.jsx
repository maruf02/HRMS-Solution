import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Authentication/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const JobApplicationPage = () => {
  const jobsDetails = useLoaderData();
  const { _id, jobTitle, jobType, salary } = jobsDetails;
  const { user } = useContext(AuthContext);
  //   console.log(user.email);
  const handleJobApply = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const cover = form.cover.value;
    const resume = form.resume.value;

    const application = {
      jobId: _id,
      name,
      email,
      cover,
      resume,
      user: user.email,
    };
    console.log(application);

    fetch("http://localhost:5000/mongoose/application", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(application),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data._id) {
          Swal.fire({
            title: "Success!",
            text: "Brand Name & Image Insert Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };
  return (
    <div>
      <div className="hero rounded-lg  bg-gradient-to-r from-[#556b69] to-[#496b49]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card   w-full  shadow-2xl bg-transparent">
            <div>
              <p className="text-center text-blue-500 text-lg font-bold">
                job Overview:
              </p>
              <p className="px-2 text-green-400 text-lg font-semibold text-center">
                {jobTitle} <br /> {jobType}
                <br /> {salary} <br />
              </p>
            </div>
            <form
              onSubmit={handleJobApply}
              className="card-body bg-transparent"
            >
              {/*  */}
              <div className="form-control ">
                <label className="label">
                  <span className="label-text text-white ">Full Name:</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  name="name"
                  className="input input-bordered input-success text-white bg-transparent"
                  required
                />
              </div>
              {/*  */}
              {/*  */}
              <div className="form-control ">
                <label className="label">
                  <span className="label-text text-white ">Email:</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="input input-bordered input-success text-white bg-transparent"
                  required
                />
              </div>
              {/*  */}
              {/*  */}
              <div className="form-control ">
                <label className="label">
                  <span className="label-text text-white ">Cover Letter:</span>
                </label>
                {/* <input
                  type="text"
                  placeholder="Enter your Cover Letter"
                  name="cover"
                  className="input input-bordered input-success text-white bg-transparent"
                  required
                /> */}
                <textarea
                  name="cover"
                  className="textarea textarea-accent text-white bg-transparent"
                  placeholder="Enter your Cover Letter"
                ></textarea>
              </div>
              {/*  */}
              {/*  */}
              <div className="form-control ">
                <label className="label">
                  <span className="label-text text-white ">
                    Resume(Only Google Drive link):
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Resume link"
                  name="resume"
                  className="input input-bordered input-success text-white bg-transparent"
                  required
                />
              </div>
              {/*  */}
              <div className="form-control mt-6">
                <button className="btn btn-primary">Apply</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;
