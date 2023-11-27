import moment from "moment/moment";
import React, { useContext } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Authentication/AuthProvider/AuthProvider";

const JobPageSingleCard = ({ job }) => {
  const { user } = useContext(AuthContext);
  const { _id, jobTitle, jobType, skills, salary, today, date, description } =
    job;
  const todayFormate = today ? moment(today).local().format("D/MM/YY") : null;
  const dateFormate = date ? moment(date).local().format("D/MM/YY") : null;
  const currentDate = moment();
  const recordDate = moment(date);

  const daysDifference = recordDate.diff(currentDate, "days");
  return (
    <div>
      <div
        className="w-10/12 rounded-lg hover:border-2  hover:border-[#00ff00] 
                    h-fit bg-gradient-to-r from-[#556b69] to-[#496b49] hover:bg-gradient-to-r hover:from-[#78aca7] hover:to-[#60aa60]"
      >
        <div className="card w-full   shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-white">{jobTitle}</h2>
            <h2 className="card-title text-white">{jobType}</h2>
            <p className="h-20">Salary: {salary}</p>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <div className="flex">
              <button
                className="  text-lg text-white font-bold"
                onClick={() => document.getElementById("my_modal").showModal()}
              >
                See details
              </button>
              <p>
                <FaArrowCircleRight
                  className="mt-2 ml-2 text-white text-lg "
                  onClick={() =>
                    document.getElementById("my_modal").showModal()
                  }
                ></FaArrowCircleRight>
              </p>
            </div>
            <dialog id="my_modal" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">{jobTitle}</h3>
                <h3 className="font-bold text-lg">{jobType}</h3>
                <h3 className="font-bold text-lg">{salary}</h3>
                <h3 className="font-bold text-lg">post:{todayFormate}</h3>
                <h3 className="font-bold text-lg">Deadline:{dateFormate}</h3>
                <h3 className="font-bold text-lg">Skills:{skills}</h3>
                <p>
                  status:
                  {!daysDifference < 1 ? (
                    <span className="text-green-500"> open</span>
                  ) : (
                    <span className="text-red-500"> Close</span>
                  )}
                </p>
                <p className="py-2 pb-8">
                  <br /> Details:{description} <br />
                </p>
                <p className="flex flex-col">
                  {!daysDifference < 1 ? (
                    <Link to={`/application/${job._id}`}>
                      <button className="btn btn-info">Apply</button>
                    </Link>
                  ) : (
                    <button disabled className="btn btn-info">
                      Apply
                    </button>
                  )}
                  <span className="text-red-600 text-sm pt-4">
                    Press ESC key or click outside to close
                  </span>
                </p>
              </div>

              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPageSingleCard;
