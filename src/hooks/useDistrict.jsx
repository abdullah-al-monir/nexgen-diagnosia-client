import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import axios  from "axios";
const useDistrict = () => {
  const axiosPublic = useAxiosPublic();
 
  const { data: districts= [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      // const res = await axiosPublic(`/districts?division=${division.id}`);
      const res = await axios(`/district.json`);
      return res.data;
    },
  });
  return [districts];
};

export default useDistrict;
