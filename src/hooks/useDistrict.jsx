import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const useDistrict = () => {
  const axiosPublic = useAxiosPublic();
  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/districts`);
      return res.data;
    },
  });
  return [districts];
};

export default useDistrict;
