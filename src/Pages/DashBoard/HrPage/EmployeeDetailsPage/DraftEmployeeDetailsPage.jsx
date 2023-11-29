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

const EmployeeDetailsPage = () => {
  const userInfo = useLoaderData();
  const { _id, name, email, image, designation, status } = userInfo;

  //   const abc = "January";
  //   const abc2 = "2024";
  //   console.log(abc.substring(0, 3));
  //   console.log(abc2.substring(2, 4));

  // ********************************
  // ********************************
  // ********************************
  // ********************************
  //   const abc = "January";
  //   const abc2 = "2024";
  //   console.log(abc.substring(0, 3));
  //   console.log(abc2.substring(2, 4));

  const PaymentData = [
    {
      _id: "656760fb695c73ac3129960f",
      payEmail: "emp6@emp.com",
      payEmpId: "6564e7e97c7745dba7efb667",
      payBank: "12345678",
      paySalary: "35.24",
      payMonth: "November",
      payYear: "2023",
      transactionId: "8459b37a",
    },
    {
      _id: "65676106695c73ac31299610",
      payEmail: "emp6@emp.com",
      payEmpId: "6564e7e97c7745dba7efb667",
      payBank: "12345678",
      paySalary: "42.32",
      payMonth: "December",
      payYear: "2023",
      transactionId: "f37d0311",
    },
    {
      _id: "6567611c695c73ac31299612",
      payEmail: "emp6@emp.com",
      payEmpId: "6564e7e97c7745dba7efb667",
      payBank: "12345678",
      paySalary: "41.28",
      payMonth: "February",
      payYear: "2024",
      transactionId: "b5f0ab44",
    },
    {
      _id: "65676129695c73ac31299613",
      payEmail: "emp6@emp.com",
      payEmpId: "6564e7e97c7745dba7efb667",
      payBank: "12345678",
      paySalary: "45.82",
      payMonth: "March",
      payYear: "2024",
      transactionId: "1db0dd85",
    },
    {
      _id: "6567618d695c73ac31299614",
      payEmail: "emp6@emp.com",
      payEmpId: "6564e7e97c7745dba7efb667",
      payBank: "12345678",
      paySalary: "38.78",
      payMonth: "January",
      payYear: "2024",
      transactionId: "3319b4ed",
    },
  ];

  const [uniqueMonths, setUniqueMonths] = useState([]);

  useEffect(() => {
    const uniqueMonthsMap = {};

    const extractMonthYear = (payMonth, payYear) => {
      const month = payMonth.substring(0, 3);
      const year = payYear.substring(2, 4);
      return `${month},${year}`;
    };

    PaymentData.forEach((payment) => {
      const key = extractMonthYear(payment.payMonth, payment.payYear);

      if (uniqueMonthsMap[key]) {
        uniqueMonthsMap[key].totalSalary += parseFloat(payment.paySalary);
      } else {
        uniqueMonthsMap[key] = {
          monthYear: key,
          totalSalary: parseFloat(payment.paySalary),
        };
      }
    });

    const uniqueMonthsArray = Object.values(uniqueMonthsMap);

    setUniqueMonths(uniqueMonthsArray);
  }, []);

  // ****************************
  // ****************************
  // ****************************
  // ****************************
  // ****************************

  const data = [
    {
      name: "Page A",

      pv: 110,
    },
    {
      name: "Page B",

      pv: 100,
    },
    {
      name: "Page C",

      pv: 105,
    },
    {
      name: "Page D",

      pv: 150,
    },
    {
      name: "Page E",

      pv: 140,
    },
  ];
  return (
    <div>
      <div className="text-white bg-slate-500 h-48 border">
        <h2>
          EmployeeDetailsPage:{email}:{status}
        </h2>
        <ul>
          {uniqueMonths.map((item) => (
            <li key={item.monthYear}>
              {item.monthYear}: ${item.totalSalary.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      {/* ************************** */}
      {/* ************************** */}
      {/* ************************** */}
      {/* ************************** */}
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

            <Legend />
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
    </div>
  );
};

export default EmployeeDetailsPage;
