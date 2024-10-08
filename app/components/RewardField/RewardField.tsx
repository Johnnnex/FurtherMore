import useRewardStore from "@/store/rewardStore";
import SVGClient from "../SVGClient";

const RewardButton = () => {
  const timeSpent = useRewardStore((state) => state.timeSpent);

  return (
    <section className="p-[20px_16px] text-white animate-fade-in border-2 flex justify-between border-[rgba(229,152,10,0.35)] rounded-[18px] w-[90%] mx-auto bg-[rgba(255,255,255,0.10)] backdrop-blur-[8px]">
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
        <p className="text-[14px] font-normal leading-[24px]">100 per hour</p>
      </div>
    </section>
  );
};

const RewardField = () => {
  const points = useRewardStore((state) => state.points);
  const timeSpent = useRewardStore((state) => state.timeSpent);
  return Number((points + (timeSpent ?? 0)) / 36).toFixed(0);
};

export { RewardButton, RewardField };
