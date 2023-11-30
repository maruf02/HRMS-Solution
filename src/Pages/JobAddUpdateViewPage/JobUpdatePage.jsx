import moment from "moment/moment";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const JobUpdatePage = () => {
  const jobOfferData = useLoaderData();
  const { _id, jobTitle, jobType, skills, salary, today, date, description } =
    jobOfferData;
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const dateFormate = date ? moment(date).local().format("D/MM/YY") : null;
  // console.log(dateFormate);

  const handleJobUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const jobTitle = form.jobTitle.value;
    const jobType = form.jobType.value;
    const skills = form.skills.value;
    const salary = form.salary.value;
    // const date = form.date.value;
    const date = selectedDate ? moment(selectedDate).local().format() : null;
    const description = form.description.value;
    const updateJob = {
      jobTitle,
      jobType,
      skills,
      salary,
      today,
      date,
      description,
    };
    // console.log(updateJob);

    fetch(`https://b8-a12-hrms-server.vercel.app/mongoose/joboffer/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateJob),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data._id) {
          Swal.fire({
            title: "Success!",
            text: "Data Updated Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };
  const handleJobTypeChange = (event) => {
    setSelectedJobType(event.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div>
      <div className="text-center text-5xl pt-10 rounded-lg bg-gradient-to-r from-[#556b69] to-[#496b49]">
        <h2 className="text-[#00b359] font-bold ">Add New Job Offer</h2>
        <p className="border-b-4 w-1/4 relative left-[38%] mt-3 border-black"></p>
        <p className="text-center text-base text-red-600 pb-10">
          **This page Operate from MongooseDB**
        </p>
      </div>
      {/* jobb add form */}
      <div className=" w-full lg:w-1/3 ">
        <div className="card shrink-0 w-full  shadow-2xl bg-transparent">
          <form onSubmit={handleJobUpdate} className="card-body ">
            {/*  */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-white ">Job Title:</span>
              </label>
              <input
                type="text"
                placeholder="Job Title"
                defaultValue={jobTitle}
                name="jobTitle"
                className="input input-bordered input-success text-white bg-transparent"
                required
              />
            </div>
            {/*  */}
            {/*  */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-white ">Job Type:</span>
              </label>
              <select
                required
                name="jobType"
                value={selectedJobType}
                onChange={handleJobTypeChange}
                className="select select-bordered w-full text-white bg-slate-700"
              >
                <option defaultValue={jobType} disabled>
                  Job Type
                </option>
                <option>Software Developer</option>
                <option>Web Developer</option>
                <option>UI/UX Designer</option>
                <option>Blockchain Developer</option>
                <option>IoT Developer</option>
                <option>Cybersecurity Developer</option>
                <option>Data Analyst </option>
                <option>DevOps</option>
              </select>
            </div>
            {/*  */}
            {/*  */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-white ">Require Skill's:</span>
              </label>
              <input
                type="text"
                name="skills"
                defaultValue={skills}
                placeholder="Require Skill's"
                className="input input-bordered input-success text-white bg-transparent"
                required
              />
            </div>
            {/*  */}
            {/*  */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-white ">Salary Rage:</span>
              </label>
              <input
                type="text"
                name="salary"
                defaultValue={salary}
                placeholder="Salary Rage"
                className="input input-bordered input-success text-white bg-transparent"
                required
              />
            </div>
            {/*  */}
            {/*  */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-white ">
                  Deadline: {dateFormate}
                </span>
              </label>
              <ReactDatePicker
                name="date"
                placeholderText="Select a date"
                required={!selectedDate}
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
                minDate={moment().toDate()}
              />
            </div>
            {/*  */}
            {/*  */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-white ">job description:</span>
              </label>
              <textarea
                name="description"
                defaultValue={description}
                className="textarea textarea-accent"
                placeholder="Job description"
                required
              ></textarea>
            </div>
            {/*  */}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
      {/* jobb update form */}
    </div>
  );
};

export default JobUpdatePage;
