import React, { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useHr = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isHR, isPending: isHRLoading } = useQuery({
    queryKey: [user?.email, "isHR"],
    enabled: !loading,
    queryFn: async () => {
      //   console.log("asking or checking is admin", user);
      const res = await axiosSecure.get(`/users/hr/${user.email}`);
      console.log(res.data);
      return res.data?.hr;
    },
  });
  return [isHR, isHRLoading];
};

export default useHr;
