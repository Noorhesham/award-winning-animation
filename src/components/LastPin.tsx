import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect } from "react";

const LastPin = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const headings = gsap.utils.toArray(".headers h2");
      const tl = gsap.timeline().to(".headers", { yPercent: -100, duration: 1 });

      ScrollTrigger.create({
        trigger: ".lastpin",
        start: "top 70%",
        scroller: ".main-container",
        animation: gsap.to(".lastpin", { backgroundColor: "#000" }),
      });
      headings.forEach((heading: HTMLHeadingElement) => {
        ScrollTrigger.create({
          trigger: heading,
          start: "top 70%",
          end: "bottom 70%",
          scroller: ".main-container",
          animation: gsap.set(heading, { color: "#edff66", duration: 0.2, ease: "none" }),
          //enter
          toggleActions: "play none reverse reverse",
        });
      });
      ScrollTrigger.create({
        trigger: ".lastpin",
        start: "20% 20%",
        end: "+=3000",
        scroller: ".main-container",
        pin: true,
        scrub: 1,
        animation: tl,
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section
      className="lastpin py-8    h-dvh w-screen bg-black
     overflow-hidden "
    >
      <div className=" pt-40 w-full grid lg:grid-cols-2 items-start px-32">
        <div className="  hidden lg:flex justify-center  p-5">
          <p className=" font-circular-web text-gray-400 lg:text-base   text-sm max-w-64">
            <b className=" text-blue-50">Our brand partners </b>cover tech, gaming, entertainment, & lifestyle sectors,
            enhancing our reach and player experience.
          </p>
        </div>
        <div className="flex  items-start justify-between ">
          <div className="flex headers flex-col ">
            {" "}
            <h2 className="  uppercase font-zentry text-white  font-[900] text-7xl lg:text-[5rem] ">OUR PARTNERS</h2>
            <h2 className="  uppercase font-zentry text-white  font-[900] text-7xl lg:text-[5rem] ">OUR PARTNERS</h2>
            <h2 className="  uppercase font-zentry text-white  font-[900] text-7xl lg:text-[5rem] ">OUR PARTNERS</h2>
            <h2 className="  uppercase font-zentry text-white  font-[900] text-7xl lg:text-[5rem] ">OUR PARTNERS</h2>
            <h2 className="  uppercase font-zentry text-white  font-[900] text-7xl lg:text-[5rem] ">OUR PARTNERS</h2>
            <h2 className="  uppercase font-zentry text-white  font-[900] text-7xl lg:text-[5rem] ">OUR PARTNERS</h2>
            <h2 className="  uppercase font-zentry text-white  font-[900] text-7xl lg:text-[5rem] ">BINANCE LABS</h2>
            <h2 className="  uppercase font-zentry text-white  font-[900] text-7xl lg:text-[5rem] ">
              COINBASE VENTURES
            </h2>
            <h2 className="  uppercase font-zentry text-white  font-[900] text-7xl lg:text-[5rem] ">PANTERA CAPITAL</h2>
            <h2 className="  uppercase font-zentry text-white  font-[900] text-7xl lg:text-[5rem] ">
              DEFIANCE CAPITAL
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LastPin;
