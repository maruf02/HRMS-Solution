import React, { useContext } from "react";
import { AuthContext } from "../../../../Authentication/AuthProvider/AuthProvider";

const EmployeeHomePage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h2 className="text-4xl">Welcome to Employee: {user.displayName}</h2>
    </div>
  );
};

export default EmployeeHomePage;
