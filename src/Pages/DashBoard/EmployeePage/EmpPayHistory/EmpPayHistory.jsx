import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../../CustomHooks/useAxiosSecure";
import { AuthContext } from "../../../../Authentication/AuthProvider/AuthProvider";
import useUserEmail from "../../../../CustomHooks/useUserEmail";

const EmpPayHistory = () => {
  const [users, refetch] = useUserEmail();
  const [paymentData, setPaymentData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const payment = async () => {
      const response = await axiosSecure.get(`/payment/${users.email}`);
      setPaymentData(response.data);
    };

    payment();
  }, [axiosSecure, users.email]);

  //   console.log(paymentData.length);
  return (
    <div>
      <h2>fd:{users.name}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Month</th>
              <th>Amount</th>
              <th>Transaction</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((pay, index) => (
              <tr key={pay._id}>
                <th>{index + 1}</th>
                <td>
                  {pay.payMonth},{pay.payYear}
                </td>
                <td>${pay.paySalary}</td>
                <td>{pay.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpPayHistory;
