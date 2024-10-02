import useFrensStore from "@/store/frensStore";
import { IFrensResponseTypes, INextResponse } from "@/types/api";
import axios from "axios";

const useFrensEndpoints = () => {
  const setFrens = useFrensStore.getState().setFrens;
  const getFrens = async (user: number) => {
    try {
      const response = await axios.get("/api/frens", { params: { user } });

      const data = response.data as INextResponse<IFrensResponseTypes[]>;

      setFrens(data.data);
    } catch (error) {
      console.error("Error getting frens:", error);
    }
  };

  return { getFrens };
};

export default useFrensEndpoints;
