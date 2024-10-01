import Footer from "@/components/Layout/Footer";
import { ReactNode } from "react";

const DAppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-col items-center h-full relative overflow-hidden justify-between">
      {children}
      <div className="absolute top-0 left-0 bg-[#F0A727] z-[-1] filter blur-[10000004.2150650024414px] translate-x-[-80%] translate-y-[-20%] w-[171.194px] h-[168.041px]"></div>
      <div className="absolute bottom-0 right-0 bg-[#F0A727] z-[-1] filter blur-[10000004.2150650024414px] translate-x-[90%]   translate-y-[-120%] w-[171.194px] h-[168.041px]"></div>
      <Footer />
    </section>
  );
};

export default DAppLayout;
