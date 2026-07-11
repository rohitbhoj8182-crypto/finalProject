import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Reveal from "./Reveal.jsx";

const MARQUEE_ITEMS = [
  "JavaScript", "React", "Node.js", "Express",
  "MongoDB", "C++", "Python", "Git",
  "SQL", "DSA", "REST APIs", "Tailwind",
];

const SKILL_CARDS = [
  { title: "Frontend", desc: "HTML, CSS, JavaScript, React, GSAP, Tailwind CSS" },
  { title: "Backend", desc: "Node.js, Express, REST APIs, Brevo / email services" },
  { title: "Database", desc: "MongoDB, MySQL, basic schema design" },
  { title: "CS Fundamentals", desc: "DSA, OOP, DBMS, Operating Systems, Git/GitHub" },
];

export default function Skills() {
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ctx = gsap.context(() => {
      const width = track.scrollWidth / 2;
      gsap.to(track, {
        x: -width,
        duration: 22,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section skills" id="skills">
      <div className="section-head">
        <p className="section-tag">02 · stack</p>
        <h2 className="section-title">Tools I reach for</h2>
      </div>

      <div className="skills-marquee">
        <div className="marquee-track" ref={trackRef}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      <div className="skills-grid">
        {SKILL_CARDS.map((c, i) => (
          <Reveal key={c.title} className="skill-card" delay={i * 0.06} y={30}>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
