/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import localFont from "next/font/local";
import Skeleton from "@/components/Skeleton";
import useUserEndpoints from "@/hooks/useUserEndpoints";
import useRewardStore from "@/store/rewardStore";
import useUserStore from "@/store/userStore";
import useRewardsEndpoints from "@/hooks/useRewardsEndpoints";
const sfPro = localFont({
  src: "../fonts/SF-Pro-Rounded-Regular.otf",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const { checkUserExists } = useUserEndpoints();
  const { updateRewards } = useRewardsEndpoints();
  const startTime = useRewardStore((state) => state.startTime);
  const setTimeSpent = useRewardStore((state) => state.setTimeSpent);
  const points = useRewardStore((state) => state.points);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchUser = () => {
      const telegramWebApp = window?.Telegram?.WebApp;
      if (telegramWebApp) {
        telegramWebApp.ready();
        const userId = telegramWebApp.initDataUnsafe?.user?.id;
        if (userId) {
          checkUserExists(userId, (status) => {
            if (status) setIsLoading(false);
          });
        }
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!startTime) return;

    const intervalSeconds = setInterval(() => {
      const currentTime = Date.now();
      setTimeSpent(Math.floor((currentTime - startTime) / 1000));
    }, 1000);

    const intervalRewards = setInterval(() => {
      const currentTime = Date.now();
      const totalTimeSpent = Math.floor((currentTime - startTime) / 1000);
      updateRewards(user?.u_id as number, totalTimeSpent);
    }, 30 * 60 * 1000);

    const handleBeforeUnload = async () => {
      const endTime = Date.now();
      const totalTimeSpent = Math.floor((endTime - startTime) / 1000);
      updateRewards(user?.u_id as number, totalTimeSpent + points);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(intervalSeconds);
      clearInterval(intervalRewards);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [startTime, user?.u_id, updateRewards]);

  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://telegram.org/js/telegram-web-app.js"
        ></script>
      </head>
      <body
        className={`${sfPro.className} bg-[#110B00]`}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          margin: 0,
        }}
      >
        <main className="h-full bg-cover bg-center">
          {isLoading ? <Skeleton /> : children}
        </main>
      </body>
    </html>
  );
}
