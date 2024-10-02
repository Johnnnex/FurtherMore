import SVGClient from "../SVGClient";

/* eslint-disable @next/next/no-img-element */
const ComingSoon = () => {
  return (
    <section className="h-[85%] animate-fade-in my-auto overflow-auto flex items-center justify-center flex-col">
      <figure className="mb-[2rem] animate-fade-in w-fit mx-auto">
        <SVGClient src="/svg/coming-soon.svg" />
      </figure>
      <p className="text-white animate-fade-in text-center text-[26px] font-medium">
        You caught us 😄 <br />
        We&apos;re working on it
      </p>
    </section>
  );
};

export default ComingSoon;
