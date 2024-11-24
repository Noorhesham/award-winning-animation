import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocation } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const totalVideos = 4;
  const upcomingVideoIndex = (currentIndex + 1) % totalVideos;
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const inactivityTimeoutRef = useRef<any | null>(null);
  const backgroundVideoRef = useRef(null);
  const cursorRef = useRef(null);

  function handleMiniVidoClick() {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
    const animatedVideo = `#video-${upcomingVideoIndex}`;
    const otherVideos = ["#video-0", "#video-1", "#video-2", "#video-3"].filter((video) => video !== animatedVideo);
    gsap.set(animatedVideo, { zIndex: 30, width: "16rem", height: "16rem" });
    const videoElement: HTMLVideoElement | null = document.querySelector(animatedVideo);
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
      videoElement.play();
    }
    gsap.set(otherVideos, {
      zIndex: 20,
    });
    gsap.to(animatedVideo, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transformOrigin: "center center",
      duration: 1,
      width: "100%",
      height: "100%",
    });
  }
  const getVideoSrc = (index: number) => `/videos/hero-${index}.mp4`;
  const handleVideoLoad = () => setLoadedVideos((prev) => prev + 1);
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) setIsLoading(false);
  }, [loadedVideos]);
  useGSAP(
    () => {
      if (hasClicked) gsap.from(backgroundVideoRef.current, { autoAlpha: 0, duration: 2 }).duration(2);
    },
    { dependencies: [currentIndex] }
  );
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("#video-frame", { clipPath: "polygon(14% 0, 72% 0, 90% 97%, 0 96%)", borderRadius: "0 0 40% 10%" });
      gsap.from("#video-frame", {
        clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0 100%)",
        borderRadius: "0 0 0 0",
        ease: "power1.inOut",
        scrollTrigger: {
          scroller: ".main-container",
          trigger: "#video-frame",
          start: "center 40%",
          end: "bottom center",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundVideoRef.current) return;
      if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
      if (isMouseMoving) {
        gsap.to(backgroundVideoRef.current, { autoAlpha: 1, duration: 0.2 });
      }

      // Set new inactivity timeout
      inactivityTimeoutRef.current = setTimeout(() => {
        setIsMouseMoving(false);
        gsap.to(backgroundVideoRef.current, { autoAlpha: 0, duration: 0.5 });
      }, 1000);
      gsap.to(backgroundVideoRef.current, { autoAlpha: 1 });
      const { clientX, clientY } = e;
      const maxOffsetX = 100;
      const maxOffsetY = 200;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const constrainedX = Math.min(Math.max(clientX, centerX - maxOffsetX), centerX + maxOffsetX);
      const constrainedY = Math.min(Math.max(clientY, centerY - maxOffsetY), centerY + maxOffsetY);

      const polygonClipPath = `polygon(
        ${Math.max(constrainedX - 100, 0)}px ${Math.max(constrainedY - 100, 0)}px,
        ${Math.min(constrainedX + 100, window.innerWidth)}px ${Math.max(constrainedY - 100, 0)}px,
        ${Math.min(constrainedX + 100, window.innerWidth)}px ${Math.min(constrainedY + 100, window.innerHeight)}px,
        ${Math.max(constrainedX - 100, 0)}px ${Math.min(constrainedY + 100, window.innerHeight)}px
      )`;
      gsap.to(backgroundVideoRef.current, {
        polygonClipPath,
        WebkitClipPath: polygonClipPath,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    document.querySelector(".hero")?.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div className=" relative  h-dvh   hero w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center  absolute z-[100] h-dvh w-screen overflow-hidden  bg-violet-50 ">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        {" "}
        <div className=" video-container">
          {[...Array(4)].reverse().map((_, index) => (
            <video
              key={index}
              src={getVideoSrc(index)}
              autoPlay
              id={`video-${index}`}
              loop
              muted
              className={`absolute-center  w-full h-full  absolute   object-cover object-center`}
              onLoadedData={handleVideoLoad}
            />
          ))}

          <div
            ref={cursorRef}
            className="absolute  z-50 h-32 w-32 overflow-hidden pointer-events-none"
            style={{ mixBlendMode: "normal" }}
          />
          <video
            onClick={() => {
              handleMiniVidoClick();
            }}
            ref={backgroundVideoRef}
            src={getVideoSrc(upcomingVideoIndex)}
            className="absolute invisible   rounded-2xl border-2 border-blue-200  cursor-pointer  top-0 left-0 z-50 h-full w-full object-cover"
            loop
            muted
          />
        </div>
        <h1 className=" special-font  hero-heading absolute bottom-5 right-5 z-40  text-blue-75">
          G<b>A</b>MING
        </h1>
        <div className=" absolute left-0 top-0 z-40 size-full">
          <div className=" mt-20  px-5 sm:px-10">
            <h2 className=" special-font hero-heading  text-blue-100">
              redifi <b>n</b>
            </h2>
            <p className=" mb-5 max-w-64 font-robert-regular text-blue-100 ">
              ENTER THE METAGAME LAYER <br /> unleash the play economy
            </p>
            <Button
              id="watch-trailer"
              title="WATCH TRAILER"
              leftIcon={<TiLocation />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className=" special-font hero-heading absolute bottom-5 right-5   text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
