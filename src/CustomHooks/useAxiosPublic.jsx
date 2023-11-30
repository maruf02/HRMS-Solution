import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://b8-a12-hrms-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
