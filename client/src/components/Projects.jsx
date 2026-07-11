import Reveal from "./Reveal.jsx";

const PROJECTS = [
  {
    index: "01",
    title: "DSA Visualizer",
    desc: "An interactive tool that animates sorting and pathfinding algorithms step-by-step, built to make DSA concepts click faster than a textbook.",
    tags: ["React", "JavaScript", "Canvas"],
    live: "#",
    code: "#",
  },
  {
    index: "02",
    title: "Campus Connect",
    desc: "A full-stack platform for students to share notes, events, and lost & found posts, with auth, a REST API, and a MongoDB backend.",
    tags: ["Node.js", "Express", "MongoDB"],
    live: "#",
    code: "#",
  },
  {
    index: "03",
    title: "This Portfolio",
    desc: "A GSAP-driven, black & yellow personal site with a custom loading sequence and a Node/Brevo backend for the contact form — the one you're looking at right now.",
    tags: ["React", "GSAP", "Brevo API"],
    live: "#",
    code: "#",
  },
];

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="section-head">
        <p className="section-tag">04 · work</p>
        <h2 className="section-title">Selected projects</h2>
        <p className="section-note">
          Swap these with your real repos &amp; live links — see PROJECTS array in Projects.jsx.
        </p>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} className="p-card" delay={i * 0.1} y={50}>
            <div className="p-card-top">
              <span className="p-index">{p.index}</span>
              <div className="p-links">
                <a href={p.live} aria-label="Live demo">
                  Live ↗
                </a>
                <a href={p.code} aria-label="Source code">
                  Code ↗
                </a>
              </div>
            </div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="p-tags">
              {p.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
