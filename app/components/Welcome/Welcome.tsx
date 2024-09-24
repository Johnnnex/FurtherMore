/* eslint-disable @next/next/no-img-element */
"use client";

import useUserStore from "@/store/userStore";
import { Button } from "@/components/Button";
import useUserEndpoints from "@/hooks/useUserEndpoints";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const { replace } = useRouter();
  const { updateUser } = useUserEndpoints();
  const user = useUserStore((state) => state.user);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClick = async () => {
    setIsButtonDisabled(true);
    await updateUser(user?.u_id);
    replace("/dapp");
    setIsButtonDisabled(false);
  };

  return (
    <section className="flex flex-col items-center justify-between h-[calc(100vh-1.5rem)]">
      <img src="/gif/clock.gif" alt="Furthermore" />
      <div className="text-center w-[90%]">
        <h1 className="text-[1.125rem] font-normal text-white leading-[145%] mb-[0.75rem]">
          How&apos;dy Champ👋
        </h1>
        <p className="text-[#F9FAFB] text-center text-[1rem] font-normal w-[90%] mx-auto leading-[145%] tracking-[0.32px]">
          Get rewarded for time spent on telegram. Earn points, unlock
          achievements, and enjoy exclusive rewards!
        </p>
      </div>
      <Button
        onClick={handleClick}
        name="Get Started"
        disabled={isButtonDisabled}
      />
    </section>
  );
};

export default Welcome;
