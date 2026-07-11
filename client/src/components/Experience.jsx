import Reveal from "./Reveal.jsx";

const ITEMS = [
  {
    date: "2025",
    title: "Top 30 Finalist — GEHU Spring Hackathon",
    desc: "Ranked in the top 30 teams at the Graphic Era Hill University Spring Hackathon, building and pitching a working prototype under a tight deadline against strong competition.",
    tags: ["Hackathon", "Team project", "Rapid prototyping"],
  },
  {
    date: "Ongoing",
    title: "300+ Problems Solved — LeetCode",
    desc: "Consistently practicing data structures and algorithms, crossing 300+ solved problems across arrays, trees, graphs, DP, and more — building the muscle for interviews and clean problem-solving.",
    tags: ["DSA", "Problem solving", "Consistency"],
  },
  {
    date: "2023 — Present",
    title: "BTech, Computer Science & Engineering",
    desc: "3rd year student focused on full-stack development and core CS fundamentals, alongside competitive programming and building side projects.",
    tags: ["Education"],
  },
];

export default function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="section-head">
        <p className="section-tag">03 · experience</p>
        <h2 className="section-title">Where I've shown up</h2>
      </div>
      <div className="timeline">
        {ITEMS.map((item, i) => (
          <Reveal
            key={item.title}
            className="tl-item"
            as="div"
            y={0}
            x={-30}
            delay={0}
          >
            <div className="tl-marker"></div>
            <div className="tl-card">
              <span className="tl-date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="tl-tags">
                {item.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
