// import moment from "moment";
import moment from "moment/moment";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// **************

// **************

const JobOfferSingleCard = ({ job }) => {
  const { _id, jobTitle, jobType, today, date } = job;
  const deadline = date ? moment(date).local().format("D/MM/YY") : null;
  const Today = moment.utc(today).format("D/MM/YY");

  const currentDate = moment();
  const recordDate = moment(date);

  const daysDifference = recordDate.diff(currentDate, "days");

  // *******************

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://b8-a12-hrms-server.vercel.app/mongoose/joboffer/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            // console.log(data);
            if (data && (data.deletedCount > 0 || data._id)) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else {
              Swal.fire("Error", "Failed to delete the file.", "error");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire("Error", "Failed to delete the file.", "error");
          });
      }
    });
  };

  return (
    <div>
      <div className="border p-3 rounded-lg my-5">
        <div className="flex flex-col md:flex-row gap-6  py-2">
          <p className="text-3xl text-green-500 font-bold">{jobTitle}</p>
          <p className="text-2xl text-blue-500 font-semibold pt-1">
            Type: {jobType}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-5 pt-1 text-white">
          <p>posted : {Today}</p>
          <p>Deadline: {deadline}</p>
          <p>
            status:
            {!daysDifference < 1 ? (
              <span className="text-green-500"> open</span>
            ) : (
              <span className="text-red-500"> Close</span>
            )}
          </p>
        </div>
        <div className="flex flex-row gap-6 justify-end ">
          <Link to={`/jobsUpdate/${job._id}`}>
            <button className="btn btn-outline btn-accent p-2  ">Update</button>
          </Link>
          <button
            onClick={() => handleDelete(job._id)}
            className="btn btn-outline btn-accent px-4 "
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobOfferSingleCard;
