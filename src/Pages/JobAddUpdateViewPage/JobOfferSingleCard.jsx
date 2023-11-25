import moment from "moment";
import React from "react";

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

  // *******************

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
          <button className="btn btn-outline btn-accent p-2  ">Update</button>
          <button className="btn btn-outline btn-accent px-4 ">X</button>
        </div>
      </div>
    </div>
  );
};

export default JobOfferSingleCard;
