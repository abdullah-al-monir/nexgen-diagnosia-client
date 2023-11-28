import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const useActiveBanner = () => {
  const axiosPublic = useAxiosPublic();
  const { data: banner = [], isPending } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/active-banner`);
      return res.data;
    },
  });
  return [banner,isPending]
};

export default useActiveBanner;