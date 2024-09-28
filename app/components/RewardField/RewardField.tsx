import useRewardStore from "@/store/rewardStore";
import SVGClient from "../SVGClient";

const RewardButton = () => {
  const timeSpent = useRewardStore((state) => state.timeSpent);

  return (
    <section className="p-[20px_16px] text-white animate-fade-in border justify-between flex items-center rounded-[18px] w-[90%] mx-auto">
      <div className="flex items-center gap-[4px]">
        <SVGClient
          style={{ color: "currentColor" }}
          src="/svg/stop-watch.svg"
        />
        <p className="text-[14px] font-normal leading-[24px]">
          {timeSpent
            ? `${Math.floor(timeSpent / 3600)}h ${Math.floor(
                (timeSpent % 3600) / 60
              )}m ${timeSpent % 60}s`
            : "0h 0m 0s"}
        </p>
      </div>
      <div className="flex items-center gap-[4px]">
        <SVGClient style={{ color: "currentColor" }} src="/svg/coin-3.svg" />
        <p className="text-[14px] font-normal leading-[24px]">100 per hour</p>
      </div>
    </section>
  );
};

const RewardField = () => {
  const points = useRewardStore((state) => state.points);
  const timeSpent = useRewardStore((state) => state.timeSpent);
  return Math.round((points + ((timeSpent as number) ?? 0)) / 36);
};

export { RewardButton, RewardField };
