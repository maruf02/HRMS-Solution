import React from "react";
import { useLoaderData } from "react-router-dom";

const EmployeeDetailsPage = () => {
  const userInfo = useLoaderData();
  const { _id, name, email, image, designation, status } = userInfo;
  return (
    <div>
      <h2>
        EmployeeDetailsPage:{email}:{status}
      </h2>
    </div>
  );
};

export default EmployeeDetailsPage;
