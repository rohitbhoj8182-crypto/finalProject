import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const LOG_LINES = [
  "mounting /rohit ...",
  "loading fonts ...",
  "compiling components ...",
  "waking up the ninja ...",
  "ready.",
];

export default function Loader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const loaderRef = useRef(null);
  const percentRef = useRef(null);
  const barRef = useRef(null);
  const logRef = useRef(null);

  useLayoutEffect(() => {
    const counter = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => {
            setVisible(false);
            onComplete?.();
          },
        });
      },
    });

    tl.to(
      counter,
      {
        val: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.floor(counter.val);
          if (percentRef.current) percentRef.current.textContent = v;
          if (barRef.current) barRef.current.style.width = v + "%";
        },
      },
      0
    );

    LOG_LINES.forEach((line, i) => {
      tl.call(
        () => {
          if (logRef.current) logRef.current.textContent = line;
        },
        null,
        i * 0.32
      );
    });

    tl.to({}, { duration: 0.25 }); // tiny hold at 100%

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div id="loader" ref={loaderRef}>
      <div className="loader-inner">
        <div className="loader-tag">$ booting_portfolio.exe</div>
        <div className="loader-count">
          <span ref={percentRef}>0</span>
          <span className="pct">%</span>
        </div>
        <div className="loader-bar-track">
          <div className="loader-bar-fill" ref={barRef}></div>
        </div>
        <div className="loader-log" ref={logRef}>
          mounting /rohit ...
        </div>
      </div>
    </div>
  );
}
