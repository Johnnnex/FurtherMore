/* eslint-disable react-hooks/exhaustive-deps */
"use client";

/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/Button";
import SVGClient from "@/components/SVGClient";
import useFrensEndpoints from "@/hooks/useFrensEndpoints";
import useFrensStore from "@/store/frensStore";
import useUserStore from "@/store/userStore";
import React, { useEffect } from "react";

const Referral = () => {
  const { getFrens } = useFrensEndpoints();
  const user = useUserStore((state) => state.user?.u_id);
  const frens = useFrensStore((state) => state.frens);

  useEffect(() => {
    if (!user) return;
    getFrens(user!);
  }, [user]);

  useEffect(() => {
    if (!frens) return;
    console.log(frens[0]);
  }, [frens]);
  return (
    <>
      <section className="animate-fade-in relative flex flex-col h-[85%] my-auto justify-between overflow-auto w-full">
        <div className="flex-grow animate-fade-in">
          <figure className="mb-[1rem]">
            <img
              src="/images/frens.png"
              className="w-[50%] mx-auto"
              alt=""
              loading="lazy"
            />
          </figure>
          <p className="text-center animate-fade-in text-[#D0D5DD] text-[1rem] w-[90%] mx-auto mb-[40px] font-500 leading-145">
            Earn 50% from frens and 10% from their referrals
          </p>
          <div className="w-[90%] animate-fade-in mx-auto">
            <p className="text-[1rem] animate-fade-in font-500 text-[#FFFFFF] leading-[145%] mb-[1rem]">
              {frens?.length || 0} frens
            </p>
            {frens?.map((fren, i) => (
              <div
                key={i}
                className={`flex animate-fade-in justify-between items-center py-[8px] ${
                  i === frens.length - 1
                    ? "mb-[1rem]"
                    : "border-b border-[#344054]"
                }`}
              >
                <div className="flex animate-fade-in gap-[12px] items-start">
                  <figure>
                    <SVGClient
                      style={{
                        height: "48px",
                        width: "48px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        background: "#00000090",
                      }}
                      src={`/svg/avatar-${(i + 1) % 10}.svg`}
                    />
                  </figure>
                  <div className="flex flex-col">
                    <span className="text-[1rem] text-white font-[500]">
                      {fren?.users?.firstname}
                    </span>
                    <div className="flex gap-[6px]">
                      <SVGClient
                        className="text-[#D0D5DD]"
                        src="/svg/user-group2.svg"
                      />
                      <span className="text-[1rem] text-white">
                        {fren?.ref_count}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Button at the bottom */}
        <div className="w-full flex sticky bottom-0 pb-[1px] justify-center mt-auto">
          <Button onClick={() => console.log("hi")} name="Invite Frens" />
        </div>
      </section>
    </>
  );
};

export default Referral;
