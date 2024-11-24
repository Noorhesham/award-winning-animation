import gsap from "gsap";
import { useEffect, useRef } from "react";

const AnimatedTitle = ({
  title,
  className,
  noAnimation,
}: {
  title: string;
  className: string;
  noAnimation?: boolean;
}) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (noAnimation) return;

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
      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: `translate3d(0,0,0) rotateY(0deg) rotateX(0deg)`,
        ease: "power2.inOut",
        stagger: 0.05,
      });
    });
    return () => ctx.revert();
  }, [noAnimation]);
  // inserting the <b></b> as dangerous html to style special characters
  // deal with each line as a flex

  return (
    <div ref={containerRef}>
      <h2 className={` animated-title     ${className}   `}>
        {title.split("<br/>").map((line, index) => (
          <div key={index} className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3 ">
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
