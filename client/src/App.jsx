import { useState } from "react";
import Loader from "./components/Loader.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Loader onComplete={() => setReady(true)} />
      <Navbar ready={ready} />
      <main id="top">
        <Hero ready={ready} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
