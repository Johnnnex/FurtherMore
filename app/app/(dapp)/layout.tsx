import Footer from "@/components/Layout/Footer";
import { ReactNode } from "react";

const DAppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-col items-center h-full relative overflow-hidden justify-between">
      {children}
      <div className="absolute top-0 left-0 bg-[#F0A727] z-[-1]  w-[171.194px] h-[168.041px]"></div>
      <div className="absolute bottom-0 right-0 bg-[#F0A727] z-[-1]   w-[171.194px] h-[168.041px]"></div>
      <Footer />
    </section>
  );
};

export default DAppLayout;
