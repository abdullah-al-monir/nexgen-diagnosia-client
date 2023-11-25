import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const useDistrict = () => {
  const axiosPublic = useAxiosPublic();
  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await axiosPublic(`/districts`);
      return res.data;
    },
  });
  console.log(districts);
  return [districts];
};

export default useDistrict;
