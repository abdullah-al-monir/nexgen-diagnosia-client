import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useDistrict = () => {
  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await axios("/district.json");
      return res.data;
    },
  });
  return [districts];
};

export default useDistrict;
