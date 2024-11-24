import gsap from "gsap";
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";
import { useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";

const AboutUs = () => {
  useEffect(() => {
    const context = gsap.context(() => {
      gsap.set(".mask-clip-path2", { clipPath: " polygon(14% 0, 82% 16%, 80% 92%, 6% 89%)" });
      gsap
        .timeline({
          scrollTrigger: {
            scroller: ".main-container",
            trigger: "#clip",
            start: "51% center",
            end: "+=800 center",
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
            onLeaveBack: () => {
              gsap.to(".mask-clip-path2", { clipPath: " polygon(14% 0, 82% 16%, 80% 92%, 6% 89%)" });
            },
            onUpdate: (self) => {
              const progress = self.progress;
              console.log(progress);
              const clipPathValue = `
              polygon(
                ${gsap.utils.interpolate(14, 0, progress)}% 0%, 
                ${gsap.utils.interpolate(82, 100, progress)}% 0%, 
                ${gsap.utils.interpolate(80, 100, progress)}% 100%, 
                ${gsap.utils.interpolate(6, 0, progress)}% 100%
              )
            `;
              gsap.to(".mask-clip-path2", { clipPath: clipPathValue });
            },
          },
        })
        .to(".mask-clip-path2", {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
        });
    });
    return () => context.revert();
  }, []);

  return (
    <div id="about" className=" min-h-screen w-screen flex flex-col  overflow-hidden bg-blue-50">
      <div className="flex relative mb-8 mt-36 flex-col items-center gap-5">
        {" "}
        <p className="font-general  text-sm uppercase md:text-[10px]">WELCOME TO ZENTRY</p>
        <AnimatedTitle
          title=" DISC<b>O</b>VER THE WORLD'S LARGEST SHARED <b>A</b>DVENTURE"
          className=" mt-5 w-full !text-black text-center"
        />
      </div>

      <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
        <MouseParallaxChild factorX={0.3} factorY={0.5}>
          <div id="clip" className=" relative h-dvh ">
            <div
              className=" absolute rounded-3xl overflow-hidden left-1/2 top-0 z-20 border border-black mask-clip-path2 origin-center
         -translate-x-1/2  w-[30vw] h-96"
            >
              <img src="/img/about.webp" className=" absolute inset-0 size-full object-cover" alt="" />
            </div>{" "}
            <div className=" about-subtext">
              <p className=" capitalize">The Game of Games begins—your life, now an epic MMORPG</p>
              <p className=" text-gray-500">
                Zentry unites the every players from countless games and platforms, both digital and physical, into a
                unified Play Economy
              </p>
            </div>
          </div>
        </MouseParallaxChild>
      </MouseParallaxContainer>
    </div>
  );
};

export default AboutUs;
