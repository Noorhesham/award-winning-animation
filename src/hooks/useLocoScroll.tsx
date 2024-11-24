"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
const useLocoScroll = () => {
  gsap.registerPlugin(ScrollTrigger);
  const [locoScroll, setLocoScroll] = useState<LocomotiveScroll | null>(null);
  const [progress, setProgress] = useState(0);
  useLayoutEffect(() => {
    //importing locomotive scroll
    //getting the scroller element from the dom
    const scrollEl: HTMLElement | null = document.querySelector(".main-container");
    if (!scrollEl) return;
    //initializing the locomotive scroll instance giving it the element and smooth true and other props and options
    const locoScrollInstance = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1.5,
      //@ts-ignore
      mobile: {
        smooth: true,
      },
    });
    setLocoScroll(locoScrollInstance);

    // every time the locomotive scroll updates (scrolls) we want the scrolltrigger from gsap to update
    //this is like sync the positioning of the two
    locoScrollInstance.on("scroll", ScrollTrigger.update);
    locoScrollInstance.on("scroll", (args) => setProgress(args.scroll.y));
    //

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        return arguments.length ? locoScrollInstance.scrollTo(value, 0) : locoScrollInstance.scroll.instance.scroll.y;
      },
      scrollLeft(value) {
        return arguments.length ? locoScrollInstance.scrollTo(value, 0) : locoScrollInstance.scroll.instance.scroll.x;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollEl?.style.transform ? "transform" : "fixed",
    });

    const lsUpdate = () => locoScrollInstance.update();

    ScrollTrigger.addEventListener("refresh", lsUpdate);
    ScrollTrigger.refresh();

    // Cleanup on component unmount
    return () => {
      if (locoScrollInstance) {
        ScrollTrigger.removeEventListener("refresh", lsUpdate);
        locoScrollInstance.destroy(); // Destroy Locomotive Scroll instance
      }
    };
  }, []);

  return { locoScroll, progress };
};

export default useLocoScroll;
