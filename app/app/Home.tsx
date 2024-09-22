/* eslint-disable @next/next/no-img-element */
"use client";

import Welcome from "@/components/Welcome";
import { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (user) {
      setShowWelcome(user.is_new);
    }
  }, [user]);

  if (!showWelcome) {
    router.push("/dapp");
  }
  return (
    <>
      {showWelcome ? (
        <section className="animate-fade-in">
          <Welcome />
        </section>
      ) : null}
    </>
  );
}
