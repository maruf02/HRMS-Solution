import React, { useEffect, useState } from "react";

const ViewAppSingleCard = ({ app }) => {
  const [jobOffer, setJobOffer] = useState();
  const { jobId, name, email, cover, resume, user } = app;

  useEffect(() => {
    fetch(`http://localhost:5000/mongoose/joboffer/${jobId}`)
      .then((res) => res.json())
      .then((data) => setJobOffer(data));
  });

  return (
    <div>
      <div className="border p-3 rounded-lg my-5">
        <div className="flex flex-col md:flex-row gap-6  py-2">
          <p className="text-3xl text-green-500 font-bold">
            jobTitle:{jobOffer?.jobTitle}
          </p>
          <p className="text-2xl text-blue-500 font-semibold pt-1">
            Type: {jobOffer?.jobType}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-5 pt-1 text-white">
          <p>Email:{email}</p>
          <p>name:{name}</p>
          <p>UserName:{user}</p>
        </div>
        <div className="flex justify-end">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            See Details
          </button>
          <dialog id="my_modal_2" className="modal ">
            <div className="modal-box bg-green-700 text-white">
              <h3 className="font-bold text-lg">name:{name}</h3>
              <p className="py-4">Email: {email}</p>
              <p className="py-4">Cover: {cover}</p>
              <p className="py-4">Resume: {resume}</p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default ViewAppSingleCard;
