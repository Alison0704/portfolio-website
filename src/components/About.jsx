import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useIsSmallScreen } from "../hooks/useIsSmallScreen";

export default function About() {
  const isSmall = useIsSmallScreen();

  const focusAreas = [
    {
      title: "My Origins",
      icon: "fa-earth-africa",
      label:
        "I'm a bilinguist (French/English) from Sainte-Croix, Mauritius. Graduated from GMD Atchia State College, Port-Louis. I moved to Canada in 2020 for university and have been loving the tech scene here ever since.",
      image:
        "https://images.unsplash.com/photo-1721673052069-5929b352d74b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "My Interest in Chip Design",
      icon: "fa-microchip",
      label:
        "Ever since I sinked my teeth into digital design in high school, I’ve been hooked on the idea of building hardware from the ground up. I love the challenge of designing efficient, elegant circuits and seeing them come to life. It’s like solving a giant puzzle where you get to create the rules as you go.",
      image:
        "https://images.unsplash.com/photo-1675602488512-bdd631490fcb?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "My Interest in Systems and Robotics",
      icon: "fa-robot",
      label:
        "After dabbling in a bit of everything, I found myself drawn to projects where hardware and software come together. Building robots and complex systems lets me flex both my hardware and software muscles, and I love the feeling of creating something that can interact with the real world in a meaningful way.",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "My Journey into Character Concept Art",
      icon: "fa-wand-magic-sparkles",
      label:
        "There was a time when I was very into game development, especially what Riot is building with Runeterra. I loved creating character concepts and world-building, and it became a creative outlet where I could explore storytelling, visual design, and mood.",
      image:
        "https://images.unsplash.com/photo-1775345172712-4aafd7bf5203?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "My Journey into Music",
      icon: "fa-music",
      label:
        "I was lucky to grow up in a choir. Our band often created new songs for church, and I soloed often. I loved the creative process of making music, expressing emotion, and even imagining theme songs for characters. I’m currently learning music theory basics and hope to explore production and composition more deeply.",
      image:
        "https://images.unsplash.com/photo-1692552951786-612f14ff1909?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const active = focusAreas[activeIndex];

  return (
    <section id="about" className="about-section sketchbook">
      <div className="about-bg" />
      <div className="about-bg-glow" />
      <div className="container about-content">
        <motion.div
          className="about-grid"
          initial={isSmall ? {} : { opacity: 0, y: 24 }}
          whileInView={isSmall ? {} : { opacity: 1, y: 0 }}
          transition={isSmall ? {} : { duration: 0.65 }}
          viewport={isSmall ? {} : { once: true }}
        >
          <div className="about-copy">
            <motion.h2
              initial={isSmall ? {} : { opacity: 0, y: 12 }}
              whileInView={isSmall ? {} : { opacity: 1, y: 0 }}
              transition={isSmall ? {} : { duration: 0.45, delay: 0.08 }}
              viewport={isSmall ? {} : { once: true }}
            >
              About Me
            </motion.h2>
            <motion.h3
              initial={isSmall ? {} : { opacity: 0, y: 16 }}
              whileInView={isSmall ? {} : { opacity: 1, y: 0 }}
              transition={isSmall ? {} : { duration: 0.5, delay: 0.14 }}
              viewport={isSmall ? {} : { once: true }}
            >
              Hi, I’m <span>Marie Annaëlle Alison Emilien</span>
            </motion.h3>

            <p className="about-text">
              I'm usually referred to as <strong>Alison</strong>. I’m an
              electrical engineering and computing tech graduate from the{" "}
              <strong>University of Ottawa</strong> who loves building projects
              where hardware meets software. I’m into chip design, FPGAs,
              robotics, and clever tools that make engineering feel a little
              less painful.
            </p>

            <p className="about-text">
              I like turning ideas into real systems, debugging weird problems,
              and learning how things work from the circuit level up. Lately,
              I’ve also been exploring how to build ML models from scratch, just
              to understand the magic under the hood.
            </p>
          </div>

          <div
            className="about-panel"
            style={{ ["--about-bg-url"]: `url(${active.image})` }}
            aria-label="Selected about me topic"
          >
            <div className="about-panel-overlay" />

            <div
              className="about-panel-main"
              id="about-focus-panel"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.title}
                  className="about-panel-card"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="about-panel-heading">
                    <div>
                      <p className="about-panel-kicker">
                        {activeIndex + 1} / {focusAreas.length}
                      </p>
                      <h3>{active.title}</h3>
                    </div>
                  </div>

                  <p>{active.label}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              className="focus-list"
              role="tablist"
              aria-label="Choose an about section"
            >
              {focusAreas.map((item, index) => (
                <motion.button
                  key={item.title}
                  className={`focus-chip ${activeIndex === index ? "active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === index}
                  aria-controls="about-focus-panel"
                  whileHover={isSmall ? {} : { y: -2 }}
                  whileTap={isSmall ? {} : { scale: 0.98 }}
                >
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
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
