"use client";

import Link from "next/link";
import SVGClient from "../SVGClient";
import { usePathname } from "next/navigation";

const footerProps = [
  {
    name: "Home",
    icon: "/svg/home-02.svg",
    href: "/dapp",
  },
  {
    name: "Leaderboard",
    icon: "/svg/ranking.svg",
    // href: "/leaderboard",
    href: "/dapp",
  },
  {
    name: "Frens",
    icon: "/svg/user-group.svg",
    // href: "/referral",
    href: "/dapp",
  },
];

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="flex items-center w-full justify-between animate-fade-in px-[34px] py-[8px] rounded-t-lg border-t border-[#282828] bg-[rgba(36,36,36,0.30)]">
      {footerProps.map((item, index) => {
        const isActive = pathname === item.href;
        return (
          <Link href={item.href} key={item.name + index}>
            <div
              className={`flex text-white flex-col items-center gap-[4px] ${
                isActive ? "" : "opacity-50"
              }`}
            >
              <SVGClient style={{ color: "inherit" }} src={item.icon} />
              <p className="text-current text-[.875rem] leading-[145%]">
                {item.name}
              </p>
            </div>
          </Link>
        );
      })}
    </footer>
  );
};

export default Footer;
