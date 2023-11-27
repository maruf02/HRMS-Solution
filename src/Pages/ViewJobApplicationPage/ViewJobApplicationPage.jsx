import React from "react";
import { useLoaderData } from "react-router-dom";
import ViewAppSingleCard from "./ViewAppSingleCard";

const ViewJobApplicationPage = () => {
  const apllication = useLoaderData();

  return (
    <div>
      <div className="rounded-lg bg-gradient-to-r from-[#556b69] to-[#496b49]">
        <div className="text-center text-5xl pt-10 rounded-lg bg-gradient-to-r from-[#556b69] to-[#496b49]">
          <h2 className="text-[#00b359] font-bold ">Add New Application</h2>
          <p className="border-b-4 w-1/4 relative left-[38%] mt-3 border-black"></p>
          <p className="text-center text-base text-red-600 pb-10">
            **This page Operate from MongooseDB**
          </p>
        </div>
        {apllication.map((app) => (
          <ViewAppSingleCard key={app._id} app={app}></ViewAppSingleCard>
        ))}
      </div>
    </div>
  );
};

export default ViewJobApplicationPage;
