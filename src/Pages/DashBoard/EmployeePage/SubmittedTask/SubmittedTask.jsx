import moment from "moment";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../CustomHooks/useAxiosSecure";
import ReactDatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useUserEmail from "../../../../CustomHooks/useUserEmail";

import ViewSubmitWork from "./ViewSubmitWork";

const SubmittedTask = () => {
  const [workSheet, setWorksheet] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [users, refetch] = useUserEmail();

  // date formate
  const formattedDate = selectedDate
    ? moment(selectedDate).local().format("MMMM D,YYYY")
    : null;
  const month = selectedDate ? moment(selectedDate).format("MMMM") : null;
  const year = selectedDate ? moment(selectedDate).format("YYYY") : null;

  // console.log("formate", formattedDate, month, year);
  // console.log("ghj", users.email);
  // console.log("formattedDate", formattedDate);

  useEffect(() => {
    const res = axiosSecure
      .get(`/worksheet/${users.email}`)
      .then((response) => {
        setWorksheet(response.data);
      });
  });

  // user email
  // const email = user.email;
  // console.log(user.email);
  const onSubmit = async (data) => {
    const workHour = data.hours;
    console.log("task hours", data.hours);

    // const res = await axiosSecure.get(`/users/${user.email}`);
    const salary = users.salary;
    // time, hour, overtime, monthly salary calculation
    const submitHour = parseInt(data.hours);
    console.log("submitHour", submitHour);
    const perHour = parseFloat(salary / 160).toFixed(2);
    console.log("perHour", perHour);
    const overtimeCal = (workHour) => {
      let overtimeCalculation;
      // console.log("object", workHour);
      if (workHour >= 8) {
        let overtimeCalculation = workHour - 8;
        return overtimeCalculation;
      } else {
        let overtimeCalculation = 0;
        return overtimeCalculation;
      }
    };

    const overtimeSalaryPerHour = 0.5;

    console.log(overtimeCal(workHour));
    const overtime = overtimeCal(workHour);
    console.log("overtime", overtime);

    const mainSalary = parseFloat(8 * perHour).toFixed(2);
    const overTimeSalary = parseFloat(overtime * overtimeSalaryPerHour).toFixed(
      2
    );

    console.log("mainsalary,oversalary", mainSalary, overTimeSalary);

    // assume monthly total hour =160hrs;

    // time, hour, overtime, monthly salary calculation

    const task = {
      name: data.name,
      email: users.email,
      empId: users._id,
      category: data.category,
      hours: data.hours,
      overtime: overtime,
      note: data.note,
      date: formattedDate,
      month: month,
      year: year,
      mainSalary: mainSalary,
      overtimeSalary: overTimeSalary,
    };
    console.log(task);

    axiosSecure.post("/worksheet", task).then((res) => {
      if (res.data.insertedId) {
        reset();
        setSelectedDate(null);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} added to your Worksheet`,
          showConfirmButton: false,
          timer: 2500,
        });
        // refetch cart to update the cart items count
        refetch();
      }
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-5 border h-screen w-full rounded-lg bg-gradient-to-r from-[#556b69] to-[#496b49]">
        {/* add submit task  */}
        <div className="border w-full lg:w-1/3 h-full flex flex-col gap-5">
          <div className=" border-b-4 py-5 text-center text-4xl text-green-600 font-bold">
            Submit Your Task
          </div>
          <div className=" border  py-5 text-center text-4xl text-green-600 font-bold">
            <div className="flex flex-col lg:flex-row gap-10 w-full h-full rounded-lg p-4 bg-gradient-to-r from-[#556b69] to-[#496b49]">
              {/* jobb add form */}
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control w-full my-6">
                    <label className="label">
                      <span className="label-text text-white">Task Name*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Task Name"
                      {...register("name", { required: true })}
                      required
                      className="input input-bordered  w-full input-accent text-white bg-transparent"
                    />
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-white bg-transparent ">
                        Date:
                      </span>
                    </label>
                    <ReactDatePicker
                      name="date"
                      className="w-full text-2xl border rounded-lg text-white bg-transparent input-accent"
                      placeholderText="Select a date"
                      required={!selectedDate}
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="MMMM d, yyyy"
                      minDate={moment().toDate()}
                    />
                  </div>
                  <div className="flex gap-6">
                    {/* category */}
                    <div className="form-control w-full my-6">
                      <label className="label">
                        <span className="label-text text-white">Category*</span>
                      </label>
                      <select
                        defaultValue="default"
                        {...register("category", { required: true })}
                        className="select select-bordered w-full text-white bg-transparent input-accent"
                      >
                        <option disabled value="default">
                          Select a Task category
                        </option>
                        <option value="Sales">Sales</option>
                        <option value="Support">Support</option>
                        <option value="Content">Content</option>
                        <option value="Paper"> Paper-work</option>
                        <option value="Design">Design</option>
                      </select>
                    </div>

                    {/* price */}
                    <div className="form-control w-full my-6">
                      <label className="label">
                        <span className="label-text text-white">Hours*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Hours"
                        {...register("hours", { required: true })}
                        className="input input-bordered w-full text-white bg-transparent input-accent"
                      />
                    </div>
                  </div>
                  {/* recipe details */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Note:</span>
                    </label>
                    <textarea
                      {...register("note")}
                      className="textarea textarea-bordered h-24 text-white bg-transparent textarea-accent"
                      placeholder="Bio"
                    ></textarea>
                  </div>

                  <button className="btn btn-accent mt-5">Add Item</button>
                </form>
              </div>
              {/* jobb add form */}
            </div>
          </div>
        </div>
        {/* add submit task  */}
        {/* show submitted task task */}
        <div className="border w-full lg:w-2/3 h-full px-5">
          <div className=" border-b-4 py-5 text-center text-4xl text-green-600 font-bold">
            All Submitted Task
          </div>
          {workSheet.map((work) => (
            <ViewSubmitWork key={work._id} work={work}></ViewSubmitWork>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmittedTask;
