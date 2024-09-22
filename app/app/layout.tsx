/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import localFont from "next/font/local";
import Skeleton from "@/components/Skeleton";
import useUserEndpoints from "@/hooks/useUserEndpoints";
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
