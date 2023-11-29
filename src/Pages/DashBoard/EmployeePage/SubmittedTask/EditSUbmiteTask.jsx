import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../../CustomHooks/useAxiosSecure";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import useUserEmail from "../../../../CustomHooks/useUserEmail";
import Swal from "sweetalert2";

const EditSUbmiteTask = () => {
  const allData = useLoaderData();
  const { _id, name, date, category, hours, note } = allData;
  const [selectedDate, setSelectedDate] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [users, refetch] = useUserEmail();
  console.log(allData.name);
  const formattedDate = selectedDate
    ? moment(selectedDate).local().format("MMM D,YY")
    : null;
  //   const Date = date ? moment(date).local().format("MMMM D,YY") : null;

  const onSubmit = async (data) => {
    const workHour = data.hours;
    const salary = users.salary;
    const submitHour = parseInt(data.hours);
    const perHour = parseFloat(salary / 160).toFixed(2);
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
    const overtime = overtimeCal(workHour);
    const mainSalary = parseFloat(salary * perHour).toFixed(2);
    const overTimeSalary = parseFloat(overtime * overtimeSalaryPerHour).toFixed(
      2
    );

    const reSubmit = {
      name: data.name,
      email: users.email,
      empId: users._id,
      category: data.category,
      hours: data.hours,
      overtime: overtime,
      note: data.note,
      date: formattedDate,
      mainSalary: mainSalary,
      overtimeSalary: overTimeSalary,
    };
    console.log(reSubmit);

    axiosSecure.put(`/worksheet/${_id}`, reSubmit).then((res) => {
      if (res.data.modifiedCount > 0) {
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
      {/* jobb add form */}
      <div className="container mx-auto w-1/2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-white">Task Name* </span>
            </label>
            <input
              type="text"
              placeholder="Task Name"
              defaultValue={name}
              {...register("name", { required: true })}
              required
              className="input input-bordered  w-full input-accent text-white bg-transparent"
            />
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text text-white bg-transparent ">
                Date: {date}
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
                defaultValue={category}
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
                defaultValue={hours}
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
              defaultValue={note}
              {...register("note")}
              className="textarea textarea-bordered h-24 text-white bg-transparent textarea-accent"
              placeholder="Bio"
            ></textarea>
          </div>

          <button className="btn btn-accent mt-5">Resubmit Task</button>
        </form>
      </div>
      {/* jobb add form */}
    </div>
  );
};

export default EditSUbmiteTask;
