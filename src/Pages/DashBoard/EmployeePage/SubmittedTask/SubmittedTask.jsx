import moment from "moment";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../CustomHooks/useAxiosSecure";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";

const SubmittedTask = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const formattedDate = selectedDate
    ? moment(selectedDate).format("MMM d, yy")
    : "";
  const onSubmit = async (data) => {
    const task = {
      name: data.name,
      category: data.category,
      price: data.hours,
      note: data.note,
      date: formattedDate,
    };
    console.log(task);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div>
      <div className="flex flex-row gap-5 border h-screen w-full rounded-lg bg-gradient-to-r from-[#556b69] to-[#496b49]">
        {/* add submit task  */}
        <div className="border w-1/2 h-full flex flex-col gap-5">
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
        <div className="border w-1/2 h-full"></div>
      </div>
    </div>
  );
};

export default SubmittedTask;
