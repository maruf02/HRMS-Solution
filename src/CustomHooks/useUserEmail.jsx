import React, { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Authentication/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useUserEmail = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  return [users, refetch];
};

export default useUserEmail;
