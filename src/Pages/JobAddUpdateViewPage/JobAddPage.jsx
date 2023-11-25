import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import JobOfferSingleCard from "./JobOfferSingleCard";

const JobAddPage = () => {
  const jobOfferData = useLoaderData();

  const [sortedJobOffers, setSortedJobOffers] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Sort job offers by date (new to old)
    const sortedDate = jobOfferData
      .slice()
      .sort((a, b) => moment(b.today) - moment(a.today));
    setSortedJobOffers(sortedDate);
  }, [jobOfferData]);

  //   const today = moment().format("MMMM d, yyyy");
  //   console.log(today);

  //   const deadline = moment.utc(jobOfferData.date).format("MMMM D, YYYY");
  const today = moment();
  //   console.log(Today, deadline);

  //   const recordDate = moment(jobOfferData.date);
  //   console.log(recordDate);
  //   const daysDifference = deadline.diff
  //   console.log(daysDifference);

  const handleJobAdd = (event) => {
    event.preventDefault();
    const form = event.target;
    const jobTitle = form.jobTitle.value;
    const jobType = form.jobType.value;
    const skills = form.skills.value;
    const salary = form.salary.value;
    // const date = form.date.value;
    const date = selectedDate ? moment(selectedDate).local().format() : null;
    const description = form.description.value;
    const addjob = {
      jobTitle,
      jobType,
      skills,
      salary,
      today,
      date,
      description,
    };
    console.log(addjob);

    // Data Sent to server

    fetch("http://localhost:5000/mongoose/joboffer", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addjob),
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

    // Data Sent to server
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
      <div className="flex flex-col lg:flex-row gap-10 w-full h-full rounded-lg p-4 bg-gradient-to-r from-[#556b69] to-[#496b49]">
        {/* jobb add form */}
        <div className=" w-full lg:w-1/3">
          <div className="card shrink-0 w-full  shadow-2xl bg-transparent">
            <form onSubmit={handleJobAdd} className="card-body ">
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
                  <option value="" disabled>
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
                  <span className="label-text text-white ">
                    Require Skill's:
                  </span>
                </label>
                <input
                  type="text"
                  name="skills"
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
                  placeholder="Salary Rage"
                  className="input input-bordered input-success text-white bg-transparent"
                  required
                />
              </div>
              {/*  */}
              {/*  */}
              <div className="form-control ">
                <label className="label">
                  <span className="label-text text-whitebg-transparent ">
                    Deadline:
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
                  <span className="label-text text-white ">
                    job description:
                  </span>
                </label>
                <textarea
                  name="description"
                  className="textarea textarea-accent text-white bg-transparent"
                  placeholder="Job description"
                  required
                ></textarea>
              </div>
              {/*  */}
              <div className="form-control mt-6">
                <button className="btn btn-primary">Add New Job</button>
              </div>
            </form>
          </div>
        </div>
        {/* jobb add form */}
        {/* ******************* */}
        {/* jobb all view */}
        <div className="w-full  lg:w-2/3">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">All Job Offer:</h1>
            {/* jobOffer single  */}
            {sortedJobOffers.map((job) => (
              <JobOfferSingleCard key={job._id} job={job}></JobOfferSingleCard>
            ))}
            {/* jobOffer single  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAddPage;
