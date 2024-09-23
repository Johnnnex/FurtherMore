"use client";

/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/Button";
import { RewardButton, RewardField } from "@/components/RewardField";
import SVGClient from "@/components/SVGClient";
import useRewardStore from "@/store/rewardStore";

const Home = () => {
  const startTime = useRewardStore((state) => state.startTime);
  const setStartTime = useRewardStore((state) => state.setStartTime);

  return (
    <>
      <section className="animate-fade-in flex flex-col items-center h-[80%] my-auto w-full justify-between">
        <div className="">
          <p className="text-center text-[.875rem] text-white mb-[24px]">
            Your Balance:
          </p>
          <div className="flex items-center gap-[12px]">
            <SVGClient src="/svg/coin-2.svg" />
            <p className="text-center text-white text-[40px] font-normal leading-[24px]">
              <RewardField />
            </p>
          </div>
        </div>
        <figure className="w-fit mx-auto">
          <img src="/svg/time.svg" alt="time logo" />
        </figure>
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
