import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useUpazila = () => {
  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const res = await axios("/upazila.json");
      return res.data;
    },
  });
  return [upazilas];
};

export default useUpazila;
