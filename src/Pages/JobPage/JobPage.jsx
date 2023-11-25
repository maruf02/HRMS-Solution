import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { Link, useLoaderData } from "react-router-dom";
import JobPageSingleCard from "./JobPageSingleCard";

const JobPage = () => {
  const allJobs = useLoaderData();
  const [sortedJobOffers, setSortedJobOffers] = useState([]);
  useEffect(() => {
    // Sort job offers by date (new to old)
    const sortedDate = allJobs
      .slice()
      .sort((a, b) => moment(b.today) - moment(a.today));
    setSortedJobOffers(sortedDate);
  }, [allJobs]);
  return (
    <div>
      <div className="text-center text-5xl pt-10">
        <h2 className="text-[#00b359] font-bold ">Our Job Feature</h2>
        <p className="border-b-4 w-1/4 relative left-[38%] mt-3 border-black"></p>
        <p className="text-center text-base text-red-600">
          **This page load data from MongooseDB**
        </p>
      </div>
      <div className=" pl-[15%] md:pl-[10%] lg:pl-[5%] my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center  w-full">
        {sortedJobOffers.map((job) => (
          <JobPageSingleCard key={job._id} job={job}></JobPageSingleCard>
        ))}
      </div>
    </div>
  );
};

export default JobPage;
