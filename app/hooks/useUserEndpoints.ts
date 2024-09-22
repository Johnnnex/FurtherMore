import useUserStore from "@/store/userStore";
import { INextResponse, IUserResponse } from "@/types/api";
import axios from "axios";

const useUserEndpoints = () => {
  const userStore = useUserStore.getState();

  const checkUserExists = async (
    userId: number = 5085480202,
    callback: (status: boolean, isNewUser?: boolean) => void
  ) => {
    try {
      const response = await axios.get("/api/user", { params: { userId } });
      const data = response.data as INextResponse<IUserResponse>;

      userStore.setUser(data.data);

      callback(true, data.data.is_new);
    } catch (err) {
      console.error(err);
      callback(false);
    }
  };

  const updateUser = async (userId: number = 5085480202) => {
    console.log("Updating user:", userId);
    try {
      const response = await axios.patch("/api/user", null, {
        params: { userId },
      });
      const data = response.data as INextResponse<IUserResponse>;

      if (data.code === 200) {
        console.log("User updated successfully:", data.data);
        userStore.setUser(data.data);
        return true;
      } else {
        console.error("Failed to update user:", data.message);
        return false;
      }
    } catch (err) {
      console.error("Error updating user:", err);
      return false;
    }
  };
  return {
    checkUserExists,
    updateUser,
  };
};

export default useUserEndpoints;
