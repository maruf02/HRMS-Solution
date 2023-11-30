import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaBan } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/employee");
      return res.data;
    },
  });

  const handleApprove = (user) => {
    // console.log(user.role);
    const updatedStatusHR = user.role;
    const updatedStatusActive = "active";
    if (user.status === "active") {
      Swal.fire("Already Active");
    } else {
      Swal.fire({
        title: "Are you sure to Approve?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/users/admin/${user._id}`, {
              status: updatedStatusActive,
              role: updatedStatusHR,
            })
            .then((res) => {
              // console.log(res.data);
              if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `${user.name} is an Approved Now!`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
    }
  };

  function generateOptions(options) {
    return options
      .map((option) => `<option value="${option}">${option}</option>`)
      .join("");
  }

  const handlePay = (user) => {
    Swal.fire({
      title: `Want to pay?${user.name}, Salary:${user.salary}  `,
      html:
        '<div style="display: flex; width:50%">' +
        `<select id="selectMonth" class="swal2-select">${generateOptions(
          moment.months()
        )}</select>` +
        `<select id="selectYear" class="swal2-select">${generateOptions(
          Array.from({ length: 10 }, (_, index) => moment().year() + index)
        )}</select>` +
        "</div>" +
        "<div>" +
        `<p>Payment Validation on next Steps</p>` +
        "</div>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Pay!",
    }).then((result) => {
      if (result.isConfirmed) {
        const month = document.getElementById("selectMonth").value;
        const year = document.getElementById("selectYear").value;
        navigate(`/dashboard/payment/${user.email}`);
      }
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto  ">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th> Bank Account</th>
              <th>Salary</th>
              <th>Pay</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleApprove(user)}
                        className="btn bg-red-500 text-white"
                      >
                        <ImCross className="text-2xl font-bold" />
                      </button>
                    </>
                  ) : (
                    <></>
                  )}

                  {user.status === "active" ? (
                    <>
                      <button
                        title="Working"
                        onClick={() => handleApprove(user)}
                        className="btn bg-green-500 text-white "
                      >
                        <FaCheck className="text-2xl" />
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                  {user.status === "fired" ? (
                    <>
                      <button
                        // disabled
                        // onClick={() => handleApprove(user)}
                        onClick={() =>
                          Swal.fire(
                            "No Permission For Action!! Please contact Admin"
                          )
                        }
                        title="Fired"
                        className="btn bg-red-500 text-white"
                      >
                        <FaBan className="text-2xl  " />
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </td>
                <td>{user.bank}</td>
                <td>${user.salary}</td>
                <td>
                  {user.status === "pending" || user.status === "fired" ? (
                    <>
                      <button disabled className="btn bg-green-500 text-white">
                        PAY
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handlePay(user)}
                        className="btn bg-green-500 text-white"
                      >
                        PAY
                      </button>
                    </>
                  )}
                  {/* <Link to={`/dashboard/payment/${user.email}`}>
                    <button className="btn bg-green-500 text-white">PAY</button>
                  </Link> */}
                </td>
                <td>
                  <Link to={`/dashboard/employeeDetails/${user.email}`}>
                    <button className="btn bg-green-500 text-white">
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
