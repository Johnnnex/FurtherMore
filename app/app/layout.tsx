/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import localFont from "next/font/local";
import Skeleton from "@/components/Skeleton";
import useUserEndpoints from "@/hooks/useUserEndpoints";
import useRewardStore from "@/store/rewardStore";
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
  const startTime = useRewardStore((state) => state.startTime);
  const setTimeSpent = useRewardStore((state) => state.setTimeSpent);

  useEffect(() => {
    const fetchUser = () => {
      if (
        typeof window !== "undefined" &&
        "Telegram" in window &&
        window.Telegram &&
        "WebApp" in window?.Telegram
      ) {
        window.Telegram.WebApp?.ready();
        const userData = window.Telegram.WebApp?.initDataUnsafe?.user;
        checkUserExists(userData?.id as number, (status) => {
          if (status) {
            setIsLoading(false);
          }
        });
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!startTime) return;

    // Update the time spent every second
    const interval = setInterval(() => {
      const currentTime = Date.now();
      setTimeSpent(Math.floor((currentTime - startTime) / 1000));
    }, 1000);

    const handleBeforeUnload = async () => {
      const endTime = Date.now();
      const totalTimeSpent = Math.floor((endTime - startTime) / 1000);
      console.log(totalTimeSpent);

      // Send the total time spent to the backend via API route
      // await axios.post("/api/save-time-spent", { timeSpent: totalTimeSpent });
    };

    // Listen for the beforeunload event to save time when the user leaves the app or refreshes the page
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the interval and event listener when the component unmounts
    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [startTime]);

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
        {/* <div>
          <h1>Welcome to the App!</h1>
          {user ? (
            <div>
              <p>User ID: {user.id}</p>
              <p>First Name: {user.first_name}</p>
              <p>Last Name: {user.last_name}</p>
              <p>Username: {user.username}</p>
              <p>Language Code: {user.language_code}</p>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </div> */}
        <main className="h-full bg-[url('/svg/texture.svg')] bg-cover bg-center">
          {isLoading ? <Skeleton /> : children}
        </main>
      </body>
    </html>
  );
}
