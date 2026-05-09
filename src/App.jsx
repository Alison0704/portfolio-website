import { useEffect, useState } from "react";
import { ScrollSpy } from "bootstrap";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

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
      <video className="background-video" autoPlay muted loop playsInline>
        <source src="/Background.mp4" type="video/mp4" />
      </video>

      <div className="background-overlay"></div>

      <div className="app-content">
        {loading && <Loader />}

        <Navbar />

        <header id="home" className="vh-100 d-flex align-items-center">
          <Hero />
        </header>

        <main className="container">
          <section id="about" className="vh-90 d-flex flex-column">
            <About />
          </section>

          <hr className="my-4" />

          <section id="projects" className="vh-90 d-flex flex-column">
            <Projects />
          </section>

          <hr className="my-4" />

          <section id="experience" className="vh-90 d-flex flex-column">
            <Experience />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
