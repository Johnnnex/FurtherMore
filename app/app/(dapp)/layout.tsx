import Footer from "@/components/Layout/Footer";
import { ReactNode } from "react";

const DAppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-col items-center h-full relative overflow-hidden justify-between">
      {children}
      <div className="absolute inset-0 bg-[#F0A727] z-[-1] blur-[10000004.2150650024414px] translate-x-[-90%] translate-y-[-20%] w-[171.194px] h-[168.041px]"></div>
      <div className="absolute inset-0 bg-[#F0A727] z-[-1] blur-[10000004.2150650024414px] translate-x-[290%] translate-y-[320%] w-[171.194px] h-[168.041px]"></div>
      <Footer />
    </section>
  );
};

export default DAppLayout;
