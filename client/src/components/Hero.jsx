import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Mascot from "./Mascot.jsx";

const STATS = [
  { count: 300, suffix: "+", label: "LeetCode solved" },
  { count: 30, suffix: "", label: "Top rank · GEHU hackathon" },
];

export default function Hero({ ready }) {
  const eyebrowRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const mascotWrapRef = useRef(null);
  const statNumRefs = useRef([]);

  useLayoutEffect(() => {
    if (!ready) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.6 })
      .from(line1Ref.current, { yPercent: 120, duration: 0.8 }, "-=0.35")
      .from(line2Ref.current, { yPercent: 120, duration: 0.8 }, "-=0.6")
      .from(subRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.35")
      .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(statsRef.current.children, { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.35")
      .from(mascotWrapRef.current, { opacity: 0, x: 40, duration: 0.9, ease: "power3.out" }, "-=0.9")
      .add(() => {
        statNumRefs.current.forEach((el) => {
          if (!el) return;
          const target = parseInt(el.dataset.count, 10);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.floor(obj.val);
            },
          });
        });
      }, "-=0.3");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <section className="hero" id="hero">
      <div className="hero-grid"></div>
      <div className="hero-content">
        <p className="hero-eyebrow" ref={eyebrowRef}>
          // btech cse · 3rd year
        </p>
        <h1 className="hero-title">
          <span className="line" ref={line1Ref}>
            ROHIT
          </span>
          <span className="line hero-title-outline" ref={line2Ref}>
            BHOJ
          </span>
        </h1>
        <p className="hero-sub" ref={subRef}>
          I build things for the web and grind data structures for fun.
          Currently hunting bugs, hackathons, and clean commits.
        </p>
        <div className="hero-cta" ref={ctaRef}>
          <a href="#projects" className="btn btn-primary">
            See my work
          </a>
          <a href="#contact" className="btn btn-ghost">
            Say hello →
          </a>
        </div>
        <div className="hero-stats" ref={statsRef}>
          {STATS.map((s, i) => (
            <div className="stat" key={s.label}>
              <span
                className="stat-num"
                data-count={s.count}
                ref={(el) => (statNumRefs.current[i] = el)}
              >
                0
              </span>
              {s.suffix && <span className="stat-plus">{s.suffix}</span>}
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
          <div className="stat">
            <span className="stat-num">
              3<span className="stat-sup">rd</span>
            </span>
            <span className="stat-label">Year, CSE</span>
          </div>
        </div>
      </div>

      <div ref={mascotWrapRef}>
       
      </div>

      <div className="scroll-cue">
        <span>scroll</span>
        <div className="scroll-line">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </section>
  );
}
