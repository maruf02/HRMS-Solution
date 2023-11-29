import React from "react";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UserReUseTable = ({ users, onMakeHr, onApprove, onFireUser }) => {
  const axiosSecure = useAxiosSecure();

  return (
    <div className="w-full">
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        {/* <h2 className="text-3xl">Total Users: {users.length}</h2> */}
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
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
                      onClick={() => onMakeHr(user)}
                      className="btn btn-md bg-red-500 text-white"
                    >
                      Make HR
                    </button>
                  )}
                </td>
                <td>
                  {user.status === "pending" && (
                    <button
                      onClick={() => onApprove(user)}
                      className="btn bg-red-500 text-white"
                    >
                      Pending
                    </button>
                  )}

                  {user.status === "active" && (
                    <button
                      onClick={() => onApprove(user)}
                      className="btn bg-green-500 text-white"
                    >
                      Working
                    </button>
                  )}

                  {user.status === "fired" && (
                    <button
                      onClick={() => onApprove(user)}
                      className="btn bg-green-500 text-white"
                    >
                      Fired
                    </button>
                  )}
                </td>
                <td>
                  {user.role === "Admin" ? (
                    <button
                      onClick={() => onFireUser(user)}
                      disabled
                      className="btn btn-ghost btn-md bg-green-500 text-white"
                    >
                      Fire
                    </button>
                  ) : (
                    <button
                      onClick={() => onFireUser(user)}
                      className="btn btn-ghost btn-md bg-green-500 text-white"
                    >
                      Fire
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserReUseTable;
