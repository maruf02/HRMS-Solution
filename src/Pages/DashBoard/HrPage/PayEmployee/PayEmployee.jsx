import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../CustomHooks/useAxiosSecure";
import moment from "moment";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const PayEmployee = () => {
  const userInfo = useLoaderData();
  const { _id, name, email, salary, bank } = userInfo;
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [pay, setPay] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [allMonths, setAllMonths] = useState([]);
  const [allYears, setAllYears] = useState([]);
  const [showInputFields, setShowInputFields] = useState(false);

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

  useEffect(() => {
    const payment = async () => {
      const response = await axiosSecure.get(`/payment/${email}`);
      setPaymentData(response.data);
    };

    payment();
  }, [axiosSecure, email, month, year]);

  // const epmsalary = res.data;
  const totalMainSalary = pay.reduce((total, item) => {
    return total + parseFloat(item.mainSalary);
  }, 0);
  const totaloverTimeSalary = pay.reduce((total, item) => {
    return total + parseFloat(item.overtimeSalary);
  }, 0);
  const totalSalary = parseFloat(totalMainSalary + totaloverTimeSalary).toFixed(
    2
  );
  // console.log(totalSalary);

  function generateTransaction(length) {
    const array = new Uint8Array(Math.ceil(length / 2));
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, length);
  }

  const transactionId = generateTransaction(8);
  // console.log(transactionId);
  const handlePayment = () => {
    const emailExists = paymentData.find(
      (item) =>
        item.payEmail === email &&
        item.payMonth === month &&
        item.payYear === year
    );
    console.log(emailExists);
    if (emailExists) {
      // Email exists in paymentData
      Swal.fire("Already exists");
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!",
      }).then((result) => {
        if (result.isConfirmed) {
          setShowInputFields(true);
        }
      });
    }
  };

  const onSubmit = async (data) => {
    const transactionId = generateTransaction(8);
    const payInfo = {
      payEmail: data.email,
      payEmpId: _id,
      payBank: data.bank,
      paySalary: data.salary,
      payMonth: month,
      payYear: year,
      transactionId: transactionId,
    };
    console.log(payInfo);
    axiosSecure.post("/payment", payInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success to Pay",
          text: `{Payment Success to pay into ${name} ${email}}`,
          icon: "success",
        });
        // refetch cart to update the cart items count
        navigate("/dashboard/employeeList");
      }
    });
  };

  return (
    <div className="container mx-auto w-full lg:w-1/2 h-[2000px] rounded-lg  bg-gradient-to-r from-[#556b69] to-[#496b49]  text-center py-10 ">
      <div>
        <h2 className="text-5xl font-bold ">Employee Information:</h2>
        <p className=" container mx-auto border-b-4 w-3/4 py-1"></p>
        <div className="py-5 text-xl">
          <h2>Name: {name}</h2>
          <h2>Email:{email}</h2>
          <h2>Account Number: {bank}</h2>
          <h2>Net salary: ${salary}/monthly</h2>
        </div>
        <div className="py-5">
          <h2 className="text-xl">
            For gross salary verification please select month and year
          </h2>
          {/* month select */}
          <div>
            <div className="flex justify-center">
              <h2 className="px-5">Select Month:</h2>
              <select
                // id="month"
                name="month"
                value={month}
                required
                className="w-1/3 bg-green-700 border-2 border-green-500 rounded-lg"
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
          </div>
          {/* month select */}
          {/* year select */}
          <div>
            <div className="flex justify-center py-2">
              <h2 className="px-5">Select Year:</h2>
              <select
                // id="year"
                name="year"
                value={year}
                required
                className="w-1/3 bg-green-700 border-2 border-green-500 rounded-lg"
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
          {/* year select */}
        </div>
        <div className="text-xl">
          <p className="container mx-auto border-t-2 w-1/2 py-2 "></p>
          <h3>Total Main Salary: ${totalMainSalary}</h3>
          <h3>Total Overtime Salary: ${totaloverTimeSalary}</h3>
          <h3>Total Salary: ${totalSalary}</h3>
        </div>
        <div>
          <button
            onClick={handlePayment}
            disabled={!month || !year || totalSalary == 0}
            className="btn btn-outline btn-accent my-5 text-xl px-10"
          >
            Want to Proceed?
          </button>
        </div>

        <div className="container mx-auto w-1/2">
          {showInputFields && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text text-white">email*</span>
                </label>
                <input
                  type="email"
                  readOnly
                  placeholder="Task Name"
                  defaultValue={email}
                  {...register("email", { required: true })}
                  required
                  className="input input-bordered  w-full input-accent text-white bg-transparent"
                />
              </div>
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text text-white">ACC Number*</span>
                </label>
                <input
                  type="text"
                  placeholder="Task Name"
                  readOnly
                  defaultValue={bank}
                  {...register("bank", { required: true })}
                  required
                  className="input input-bordered  w-full input-accent text-white bg-transparent"
                />
              </div>
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text text-white">Salary*</span>
                </label>
                <input
                  type="text"
                  placeholder="Task Name"
                  readOnly
                  defaultValue={totalSalary}
                  {...register("salary", { required: true })}
                  required
                  className="input input-bordered  w-full input-accent text-white bg-transparent"
                />
              </div>
              <button className="btn btn-outline btn-accent my-5 text-xl px-20">
                Pay
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayEmployee;
