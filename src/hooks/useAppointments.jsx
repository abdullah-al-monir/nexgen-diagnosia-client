import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const useAppointments = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allAppointments = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allAppointments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appointments`);
      return res.data;
    },
  });
  return [allAppointments, isPending, refetch];
};

export default useAppointments;
