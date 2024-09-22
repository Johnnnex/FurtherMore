"use client";

/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/Button";
import SVGClient from "@/components/SVGClient";

const Home = () => {
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
              {/* {user?.points} */} 1000
            </p>
          </div>
        </div>
        <figure className="w-fit mx-auto">
          <img src="/svg/time.svg" alt="time logo" />
        </figure>
        <Button name="Start Calculating" onClick={() => {}} disabled={false} />
      </section>
    </>
  );
};

export default Home;
