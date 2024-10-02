import useRewardStore from "@/store/rewardStore";
import useUserStore from "@/store/userStore";
import { INextResponse, IUserResponse } from "@/types/api";
import axios from "axios";

const useUserEndpoints = () => {
  const userStore = useUserStore.getState();
  const rewardStore = useRewardStore.getState();

  const checkUserExists = async (
    userId: number,
    callback: (status: boolean) => void
  ) => {
    try {
      const response = await axios.get("/api/user", { params: { userId } });
      const data = response.data as INextResponse<IUserResponse>;

      userStore.setUser(data?.data?.user);
      rewardStore.setPoints(parseFloat(data?.data?.rewards?.time_spent));

      callback(true);
    } catch (err) {
      callback(false);
    }
  };

  const updateUser = async (userId: number = 5085480202) => {
    try {
      const response = await axios.patch("/api/user", null, {
        params: { userId },
      });
      const data = response.data as INextResponse<IUserResponse>;

      if (data.code === 200) {
        userStore.setUser(data.data.user);
        rewardStore.setPoints(data.data.rewards.points);

        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  return {
    checkUserExists,
    updateUser,
  };
};

export default useUserEndpoints;
