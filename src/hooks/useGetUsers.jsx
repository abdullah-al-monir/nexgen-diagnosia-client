import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
const useGetUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log(res);
      return res.data;
    },
  });
  return [users, isPending, refetch];
};

export default useGetUsers;
