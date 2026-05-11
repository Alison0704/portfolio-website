import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function About() {
  const focusAreas = [
    {
      title: "Chip Design",
      label: "ASICs, RTL, verification, and FPGA systems.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Robotics",
      label: "Physical systems, perception, control, and navigation.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Tools",
      label: "Software that makes engineering workflows smoother.",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "ML From Scratch",
      label: "Learning the math and code behind the magic.",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const focusListIcon = "fa-circle-dot";

  const [activeIndex, setActiveIndex] = useState(0);
  const active = focusAreas[activeIndex];

  return (
    <section id="about" className="about-section">
      <div className="about-bg-glow" />

      <div className="container about-content">
        <motion.div
          className="about-grid"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
        >
          <div className="about-copy">
            <p className="section-kicker">About Me</p>

            <h2>
              Hi, I’m <span>Alison</span>
            </h2>

            <p className="about-text">
              I’m an electrical engineering and computing tech grad who loves
              building things where hardware meets software. I’m into chip
              design, FPGAs, robotics, and clever tools that make engineering
              feel a little less painful.
            </p>

            <p className="about-text">
              I like turning ideas into real systems, debugging weird problems,
              and learning how things work from the circuit level up. Lately,
              I’ve also been exploring how to build ML models from scratch —
              just to understand the magic under the hood.
            </p>
          </div>

          <div className="about-panel">
            <div className="about-panel-top">
              <div className="about-panel-visual" aria-hidden="true">
                <img src={active.image} alt="" />
                <div className="about-panel-visual-overlay" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3>{active.title}</h3>
                  <p>{active.label}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="focus-list">
              {focusAreas.map((item, index) => (
                <motion.button
                  key={item.title}
                  className={`focus-chip ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                  aria-pressed={activeIndex === index}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className={`fa-solid ${focusListIcon}`} />
                  <span>{item.title}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
