import React from "react";
import useAxiosSecure from "../../../../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeHr = (user) => {
    const updatedStatusActive = "active";
    const updatedStatusHR = "HR";
    if (user.status === "pending") {
      Swal.fire("First need to Active user");
    } else {
      Swal.fire({
        title: "Are you sure to Make HR?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Make HR!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/users/admin/${user._id}`, {
              status: updatedStatusActive,
              role: updatedStatusHR,
            })
            .then((res) => {
              console.log(res.data);
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

  const handleApprove = (user) => {
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
            })
            .then((res) => {
              console.log(res.data);
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

  const handleFireUser = (user) => {
    const updatedStatusHR = "HR";
    const updatedStatusFire = "fired";
    Swal.fire({
      title: "Are you sure to Fire?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Fire!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/${user._id}`, {
            status: updatedStatusFire,
            role: updatedStatusHR,
          })
          .then((res) => {
            console.log(res.data);
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
  };

  return (
    <div>
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
              <th>Designation</th>
              <th>Role</th>
              <th>Make HR</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.designation}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "Admin" ? (
                    "Admin"
                  ) : user.role === "HR" && user.status === "active" ? (
                    "HR"
                  ) : (
                    <button
                      onClick={() => handleMakeHr(user)}
                      className="btn btn-md bg-red-500 text-white"
                    >
                      Make HR
                    </button>
                  )}
                </td>
                <td>
                  {user.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleApprove(user)}
                        className="btn bg-red-500 text-white"
                      >
                        Pending
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                  {user.status === "active" ? (
                    <>
                      <button
                        onClick={() => handleApprove(user)}
                        className="btn bg-green-500 text-white"
                      >
                        Working
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                  {user.status === "fired" ? (
                    <>
                      <button
                        onClick={() => handleApprove(user)}
                        className="btn bg-green-500 text-white"
                      >
                        Fired
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleFireUser(user)}
                    className="btn btn-ghost btn-md bg-green-500 text-white"
                  >
                    Fire
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
