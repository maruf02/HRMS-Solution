import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../../CustomHooks/useAxiosSecure";

const EmployeeDetailsPage = () => {
  const userInfo = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const [paymentData, setPaymentData] = useState([]);
  const { _id, name, email, image, designation, status } = userInfo;

  useEffect(() => {
    const payment = async () => {
      const response = await axiosSecure.get(`/paymentChart/${email}`);
      setPaymentData(response.data);
    };

    payment();
  }, [axiosSecure, email]);
  console.log(paymentData);

  const data = paymentData.map((pay) => ({
    name: pay.entry,
    pv: pay.maxPaySalaryFormatted,
  }));

  return (
    <div>
      <div className="text-white bg-slate-500 h-full py-10 text-center">
        <h2 className="text-4xl pb-4 font-bold">Employee Details Info:</h2>
        <p className="container mx-auto border-b-4 w-1/2"></p>
        <div className="flex flex-row justify-center gap-10">
          <div className=" text-2xl ">
            <h2>Name: {name}</h2>
            <h2>Email: {email}</h2>
            <h2>Designation: {designation}</h2>
            <h2>Status: {status}</h2>
          </div>
          <div className="mt-3 rounded-lg">
            <img src={image} alt="" className="w-24 h-20 rounded-lg" />
          </div>
        </div>
      </div>

      {status === "active" ? (
        <>
          <div className="container mx-auto border bg-white  w-full h-screen text-emerald-600">
            <ResponsiveContainer width="100%" height="50%">
              <BarChart width={200} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" values="pv" />
                <YAxis
                  values="pv"
                  label={{
                    value: "Salary",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  tickFormatter={(value) => `${value.toLocaleString()} $ `}
                  tickCount={8}
                />
                <Tooltip />

                {/* <Legend /> */}
                <Bar
                  dataKey="pv"
                  fill="#8884d8"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                  barSize={30}
                >
                  <LabelList dataKey="pv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-red-600 text-4xl text-center py-10">
            {name}:{email} status is {status}. <br />
            No data Found for {status} users!!
          </h2>
        </>
      )}
    </div>
  );
};

export default EmployeeDetailsPage;
