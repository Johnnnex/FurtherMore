// interface RewardsData {
//   points: number;
//   achievements: string[];
//   // Add more fields as needed
// }

import axios from "axios";

const useRewardsEndpoints = () => {
  const updateRewards = async (id: number, points: number) => {
    try {
      await axios.patch(
        "/api/reward",
        { id, points },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating rewards:", error);
    }
  };

  return { updateRewards };
};

export default useRewardsEndpoints;
