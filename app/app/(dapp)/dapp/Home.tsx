"use client";

/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/Button";
import Clock from "@/components/Clock";
import { RewardButton, RewardField } from "@/components/RewardField";
import useRewardStore from "@/store/rewardStore";

const Home = () => {
  const startTime = useRewardStore((state) => state.startTime);
  const setStartTime = useRewardStore((state) => state.setStartTime);

  return (
    <>
      <section className="animate-fade-in flex flex-col items-center h-[85%] my-auto w-full justify-between">
        <div className="">
          <p className="text-center text-[.875rem] text-white mb-[8px]">
            Your Balance:
          </p>
          <p className="text-center text-white text-[24px] font-normal leading-[24px] border-[rgba(229,152,10,0.35)] border-[2px] rounded-[16px] bg-[rgba(255,255,255,0.10)] backdrop-blur-[8px] p-[16px_32px]">
            <RewardField />
          </p>
        </div>
        <Clock />
        {!startTime ? (
          <Button
            name="Start Calculating"
            onClick={() => {
              setStartTime(Date.now());
            }}
            disabled={false}
          />
        ) : (
          <RewardButton />
        )}
      </section>
    </>
  );
};

export default Home;
