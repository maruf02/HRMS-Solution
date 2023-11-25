import React from "react";
import { useLoaderData } from "react-router-dom";

const JobApplicationPage = () => {
  const jobsDetails = useLoaderData();
  const { _id, jobTitle, jobType, salary } = jobsDetails;

  const handleJobApply = (event = {});
  return (
    <div>
      <div className="hero rounded-lg bg-gradient-to-r from-[#556b69] to-[#496b49]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-transparent">
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
                  <span className="label-text text-white ">Job Title:</span>
                </label>
                <input
                  type="text"
                  placeholder="Job Title"
                  name="jobTitle"
                  className="input input-bordered input-success text-white bg-transparent"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Add New Job</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;
