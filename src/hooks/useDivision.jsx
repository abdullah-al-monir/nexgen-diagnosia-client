import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const useDivision = () => {
  const axiosPublic = useAxiosPublic();
  const { data: divisions = [] } = useQuery({
    queryKey: ["divisions"],
    queryFn: async () => {
      const res = await axiosPublic("/divisions");
      return res.data;
    },
  });
  console.log(divisions);
  return [divisions];
};

export default useDivision;
