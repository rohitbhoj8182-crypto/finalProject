import Reveal from "./Reveal.jsx";

const CARDS = [
  { num: "300+", label: "DSA problems solved on LeetCode" },
  { num: "Top 30", label: "GEHU Spring Hackathon, out of 100s of teams" },
  { num: "Full-stack", label: "Comfortable across client + server + DB" },
];

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="section-head">
        <p className="section-tag">01 · about</p>
        <h2 className="section-title">Who's Rohit?</h2>
      </div>
      <div className="about-grid">
        <Reveal as="p" className="about-text">
          I'm <strong>Rohit Bhoj</strong>, a 3rd-year BTech CSE student who spends
          equal time between DSA sheets, side projects, and figuring out why
          the deploy failed at 1 AM. I like building fast, functional
          interfaces and backends that don't fall over — and I genuinely
          enjoy the grind of solving hard problems, whether that's on
          LeetCode or in a 24-hour hackathon.
        </Reveal>
        <div className="about-cards">
          {CARDS.map((c, i) => (
            <Reveal key={c.num} className="a-card" delay={i * 0.08}>
              <span className="a-card-num">{c.num}</span>
              <span className="a-card-label">{c.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
