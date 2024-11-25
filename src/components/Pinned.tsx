import { useEffect, useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import PaginationScroll from "./PaginationScroll";

const Pinned = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".pagination");
      const paragraphs = gsap.utils.toArray(".pagination p");
      const lineContainers = gsap.utils.toArray(".lineContainer");
      gsap.set(paragraphs, { opacity: 0.3, scaleY: 0, visibility: "hidden" });
      gsap.set(lineContainers, { opacity: 0, visibility: "hidden", height: 0 });

      ScrollTrigger.create({
        trigger: ".ele",
        start: "top 70%",
        scroller: ".main-container",
        animation: gsap.to(".bg", { backgroundColor: "#edff66" }),
      });

      let cumulativeOffset = 0;
      items.forEach((item: HTMLDivElement | null | any, i: number) => {
        const line = item.querySelector(".line");
        const paragraph = item.querySelector("p");
        const title = item.querySelector("h4");
        const lineContainer = item.querySelector(".lineContainer");
        const lineAnimation = gsap
          .timeline({ paused: true })

          .fromTo(line, { y: -120 }, { y: 80, autoAlpha: 1 });
        const EnteryAnimation = gsap
          .timeline({ paused: true })
          .to(lineContainer, { height: "6rem", autoAlpha: 1, duration: 0.2 })
          .fromTo(title, { opacity: 0.3 }, { opacity: 1, duration: 0.3 })
          .to(paragraph, { scaleY: 1, autoAlpha: 1, duration: 0.3 });

        const start = `top+=${cumulativeOffset} center`;
        const animationDuration = 1000;
        const end = `+=${animationDuration}`;
        ScrollTrigger.create({
          trigger: item,
          start,
          end,
          scroller: ".main-container",
          animation: lineAnimation,
          scrub: 0.8,
          onEnter: () => {
            EnteryAnimation.play();
            if (i > 0) {
              videoRef.current?.setAttribute("src", "/videos/v2.webm");
            } else {
              videoRef.current?.setAttribute("src", "/videos/v1.webm");
            }
          },
          onLeave: () => EnteryAnimation.reverse(),
          onEnterBack: () => EnteryAnimation.play(),
          onLeaveBack: () => EnteryAnimation.reverse(),
        });
        cumulativeOffset += animationDuration;
      });
      ScrollTrigger.create({
        trigger: ".bg",
        start: "8% top",
        end: "+=4000 top",
        scrub: 1.2,
        pin: true,
        scroller: ".main-container",

        pinSpacing: true,
        // animation: tl,
      });
    });

    return () => ctx.revert();
  }, []);
  return (
    <section className="bg  bg-black h-[113vh] w-screen overflow-hidden ">
      <div className="max-w-[1400px]  pinned h-full w-full mx-auto">
        <div className="flex gap-5  py-4   flex-col items-start">
          <AnimatedTitle
            className="ele  lg:mt-32 mt-20 !items-start !p-0 !pl-0  !text-black"
            title="THE UNIVERS<b>E</b><br/>
POWERED BY ZE<b>N</b>T"
          />
          <div className=" lg:mx-0 mx-auto pl-8 ">
            <Button id="vault" title="ENTER VAULT" containerClass="!bg-black !px-8 !text-white" />
          </div>
          <div className=" size-52 md:size-96 lg:absolute mx-auto lg:right-10 bottom-10 z-30">
            <video ref={videoRef} loop muted autoPlay src="/videos/v3.webm" />
          </div>
          <div className="flex  lg:mt-0 mt-40 flex-col pl-8 items-start ">
            <PaginationScroll
              num="01"
              title="Shaping Zentry Collectively"
              description="Participate in governance, influence key decisions in the ever-growing Zentry Universe that is limited only by people's imaginations"
            />
            <PaginationScroll
              title="Unlocking Economic Opportunity"
              num="02"
              description="ZENT, a commodity-based currency that unlocks exclusive benefits, airdrops, quotas, and co-creation within and beyond Zentry ecosystem."
            />
            <PaginationScroll
              title="Sharing Value Accrued"
              num="03"
              description="ZENT holders thrive as Zentry grows, benefiting from the expansive partnerships, treasury investment and economic activities."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pinned;
