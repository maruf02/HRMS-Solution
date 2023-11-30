import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../CustomHooks/useAxiosSecure";
import { FaListOl, FaTable } from "react-icons/fa";
import moment from "moment";

const EmpProgress = () => {
  const [viewMode, setViewMode] = useState("table");
  const [workData, setWorkData] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("default");
  const [selectedMonth, setSelectedMonth] = useState("default");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const work = async () => {
      const response = await axiosSecure.get("/worksheet");
      setWorkData(response.data);
    };

    work();
  }, [axiosSecure]);

  const handleWorkDetails = () => {
    // console.log(workData);
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const uniqueEmails = [...new Set(workData.map((item) => item.email))];
  const allMonths = moment.months();

  const filteredData = workData.filter(
    (item) =>
      (selectedEmail === "default" || item.email === selectedEmail) &&
      (selectedMonth === "default" || item.month === selectedMonth)
  );

  return (
    <div className="container mx-auto">
      <div>
        <h2 className="text-4xl text-center py-5">Employee Work Progress</h2>
        <p className="container mx-auto border-b-4 w-1/2 mb-8"></p>
      </div>

      <div className="flex flex-row gap-5 justify-center mb-10 ">
        <button
          className={`btn btn-primary ${viewMode === "table" && "active"}`}
          onClick={() => toggleViewMode("table")}
        >
          <FaListOl />
          Table View
        </button>
        <button
          className={`btn btn-secondary ${viewMode === "grid" && "active"}`}
          onClick={() => toggleViewMode("grid")}
        >
          <FaTable />
          Grid view
        </button>
      </div>

      <div className="container mx-auto w-1/2 flex flex-row gap-5 justify-center py-8 ">
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text text-white ">Email</span>
          </label>
          <select
            defaultValue="default"
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
            className="select select-bordered w-full text-white bg-green-700 input-accent text-lg"
          >
            <option disabled value="default">
              Select Email
            </option>
            {uniqueEmails.map((email) => (
              <option key={email} value={email}>
                {email}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text text-white">Month</span>
          </label>
          <select
            defaultValue="default"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="select select-bordered w-full text-white bg-green-700 input-accent text-lg"
          >
            <option disabled value="default">
              Select a Month
            </option>
            {allMonths.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* table view */}
      {viewMode === "table" && (
        <div className="container mx-auto">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task Name</th>
                  <th>Email</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((work, index) => (
                  <tr key={work._id}>
                    <th>{index + 1}</th>
                    <td>{work.name}</td>
                    <td>{work.email}</td>
                    <td>{work.category}</td>
                    <td>{work.date}</td>
                    <td>
                      <button
                        onClick={() => handleWorkDetails(work)}
                        className="btn btn-accent btn-outline px-2"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* table view */}
      {/* grid view */}
      {viewMode === "grid" && (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
          {filteredData.map((work, index) => (
            <div
              key={work._id}
              className="card w-96 bg-green-800 hover:bg-blue-600 hover:border-4 hover:border-purple-800 shadow-xl"
            >
              <figure>
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* grid view */}
    </div>
  );
};

export default EmpProgress;
