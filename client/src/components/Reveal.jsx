import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

/**
 * Wraps children in a div that fades/slides in once it scrolls into view.
 * Pure presentational wrapper — pass `as` to change the rendered tag.
 */
export default function Reveal({
  children,
  className = "",
  y = 40,
  x = 0,
  delay = 0,
  as: Tag = "div",
  ...rest
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        x,
        opacity: 0,
        duration: 0.8,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    });
    return () => ctx.revert();
  }, [y, x, delay]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
