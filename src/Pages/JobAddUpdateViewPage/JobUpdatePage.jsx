import React from "react";
import moment from "moment-timezone";

function convertISTtoUTC(istDate) {
  const utcDate = moment.tz(istDate, "Asia/Kolkata").utc().format();
  return utcDate;
}

const JobUpdatePage = () => {
  return (
    <div>
      <h2>df</h2>
    </div>
  );
};

export default JobUpdatePage;
