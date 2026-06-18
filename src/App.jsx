import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollSpy } from "bootstrap";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import PencilBoilDefs from "./components/PencilBoilDefs";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [boil, setBoil] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("pencil-boil") !== "off";
  });

  useEffect(() => {
    localStorage.setItem("pencil-boil", boil ? "on" : "off");
  }, [boil]);

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setLoading(false);
    }, 700);

    document.body.setAttribute("data-bs-spy", "scroll");
    document.body.setAttribute("data-bs-target", "#mainNav");

    ScrollSpy.getOrCreateInstance(document.body, {
      target: "#mainNav",
      offset: 80,
    });

    return () => clearTimeout(loaderTimer);
  }, []);

  return (
    <>
      <PencilBoilDefs />

      <video className="background-video" autoPlay muted loop playsInline>
        <source src="/Background.mp4" type="video/mp4" />
      </video>

      <div className="background-overlay"></div>

      <motion.div
        className={`app-content ${boil ? "boil-on" : "boil-off"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <AnimatePresence mode="wait">
          {loading && <Loader key="loader" />}
        </AnimatePresence>

        <button
          type="button"
          className="boil-toggle"
          onClick={() => setBoil((value) => !value)}
          aria-pressed={boil}
          title={
            boil
              ? "Turn off the sketchbook boil effect"
              : "Turn on the sketchbook boil effect"
          }
        >
          <i
            className={`fa-solid ${boil ? "fa-pen-nib" : "fa-pen"}`}
            aria-hidden="true"
          />
          <span>Boil: {boil ? "On" : "Off"}</span>
        </button>

        <Navbar />

        <header id="home" className="vh-100 d-flex align-items-center">
          <Hero />
        </header>

        <main className="container">
          <hr className="my-4" />

          <section id="projects" className="vh-90 d-flex flex-column">
            <Projects />
          </section>

          <hr className="my-4" />

          <section id="experience" className="vh-90 d-flex flex-column">
            <Experience />
          </section>

          <section id="about" className="vh-90 d-flex flex-column">
            <About />
          </section>
        </main>

        <Footer />
      </motion.div>
    </>
  );
}
