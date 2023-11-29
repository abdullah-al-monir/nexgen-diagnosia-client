import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
const useCurrentUser = () => {
  const axiosSecure = useAxiosPublic();
  const { user} = useAuth();
  const {
    data: userData = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user?.email}`);
      return res.data;
    },
  });
  return [userData, refetch, isPending];
};

export default useCurrentUser;
