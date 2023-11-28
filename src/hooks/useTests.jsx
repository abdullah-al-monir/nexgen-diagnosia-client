import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const useTests = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: tests = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tests`);
      return res.data;
    },
  });
  return [tests, refetch, isPending];
};

export default useTests;
