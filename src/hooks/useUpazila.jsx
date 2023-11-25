import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import axios from "axios";
const useUpazila = () => {
  const axiosPublic = useAxiosPublic();
  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      // const res = await axiosPublic(`/upazilas?district=${district.id}`);
      const res = await axios(`/upazila.json`);
      return res.data;
    },
  });
  return [upazilas];
};

export default useUpazila;
