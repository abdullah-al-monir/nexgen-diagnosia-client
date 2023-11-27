import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const useTests = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: tests = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tests`);
      return res.data;
    },
  });
  return [tests, isPending, refetch];
};

export default useTests;
