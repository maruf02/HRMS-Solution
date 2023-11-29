import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../../CustomHooks/useAxiosSecure";
import moment from "moment";

const PayEmployee = () => {
  const userInfo = useLoaderData();
  const { _id, name, email, salary, bank } = userInfo;
  const axiosSecure = useAxiosSecure();
  const [pay, setPay] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [allMonths, setAllMonths] = useState([]);
  const [allYears, setAllYears] = useState([]);

  useEffect(() => {
    const fetchPayData = async () => {
      try {
        const response = await axiosSecure.get(
          `/worksheetCal/${email}/${month}/${year}`
        );
        setPay(response.data);
      } catch (error) {
        console.error("Error fetching pay data:", error);
      }
    };

    // Ensure both month and year are selected before making the request
    if (month && year) {
      fetchPayData();
    }

    setAllMonths(moment.months());
    setAllYears(
      Array.from({ length: 10 }, (_, index) => moment().year() + index)
    );
  }, [axiosSecure, email, month, year]);

  // const epmsalary = res.data;
  const totalMainSalary = pay.reduce((total, item) => {
    return total + parseFloat(item.mainSalary);
  }, 0);
  const totaloverTimeSalary = pay.reduce((total, item) => {
    return total + parseFloat(item.overtimeSalary);
  }, 0);
  const totalSalary = totalMainSalary + totaloverTimeSalary;
  // console.log(totalSalary);

  return (
    <div>
      <div>
        <h2>User Info:{_id}</h2>
        <p>Name:{name}</p>
        <p>Email:{email}</p>
        <p>Bank ACC:{bank}</p>
      </div>
      <div>
        <div className="text-center">
          <h2>For Gross Salary select MONTH and YEAR!!</h2>
          <div>
            <label htmlFor="month">Select Month:</label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">Select Month</option>
              {allMonths.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Select Year:</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Select Year</option>
              {allYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div>
        <h3>Total Main Salary: {totalMainSalary}</h3>
        <h3>Total Overtime Salary: {totaloverTimeSalary}</h3>
        <h3>Total Salary: {totalSalary}</h3>
      </div>
    </div>
  );
};

export default PayEmployee;
