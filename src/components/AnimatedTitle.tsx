import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({
  title,
  className,
  noAnimation = false,
  sectionId,
}: {
  title: string;
  className?: string;
  noAnimation?: boolean;
  sectionId?: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (noAnimation || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: ".main-container",
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(Array.from(containerRef.current?.querySelectorAll("span") || []), {
        opacity: 1,
        transform: `translate3d(0,0,0) rotateY(0deg) rotateX(0deg)`,
        ease: "power2.inOut",
        stagger: 0.05,
      });
    });
    return () => ctx.revert();
  }, [noAnimation]);

  return (
    <div id={sectionId || ""} ref={containerRef}>
      <h2 className={`animated-title ${className}`}>
        {title.split("<br/>").map((line, index) => (
          <div key={index} className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3">
            {line.split(" ").map((word, i) => (
              <span className="animated-word" dangerouslySetInnerHTML={{ __html: word }} key={i} />
            ))}
          </div>
        ))}
      </h2>
    </div>
  );
};

export default AnimatedTitle;
