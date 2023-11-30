import React from "react";
import { useLoaderData } from "react-router-dom";

const ViewContactUsMssge = () => {
  const mssge = useLoaderData();

  return (
    <div className="container mx-auto ">
      <div className="container mx-auto rounded-lg border w-full lg:w-2/3 h-full px-5">
        <div className=" border-b-4 py-5 text-center text-4xl text-green-600 font-bold">
          All User's Contact Us Message
        </div>
        <div className="container mx-auto ">
          {mssge.map((m) => (
            <div key={m._id}>
              <div className="border p-3 rounded-lg my-5 hover:bg-lime-800">
                <div className="flex flex-col md:flex-row gap-6  py-2">
                  <p className="text-3xl text-green-500 font-bold">
                    Name: {m.name}
                  </p>
                  <p className="text-2xl text-blue-500 font-semibold pt-1">
                    email: {m.email}
                  </p>
                  <p className="text-2xl text-blue-500 font-semibold pt-1">
                    Phone: {m.phone}
                  </p>
                  <p className="text-2xl text-blue-500 font-semibold pt-1">
                    Message: {m.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewContactUsMssge;
