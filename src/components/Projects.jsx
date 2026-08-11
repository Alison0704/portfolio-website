import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useIsSmallScreen } from "../hooks/useIsSmallScreen";

const projects = [
  {
    id: "jime",
    title: "Jim-E Robot",
    description:
      "Jim-E is an autonomous indoor hosting robot that uses computer vision, RRT* path planning, and event-driven control to guide guests to selected destinations.",
    stack: [
      "Python",
      "HTML",
      "ROS 2 Humble (rclpy)",
      "OpenCV",
      "MediaPipe",
      "MATLAB/Simulink",
      "KiCad",
      "Raspberry Pi 4",
      "ESP32",
      "UART",
      "RRT* path planning",
    ],
    github: "https://github.com/Alison0704/Capstone-JimE",
    live: "https://alison0704.github.io/Capstone-JimE-Interface/",
  },
  {
    id: "character-vault",
    title: "Character Concepts",
    description:
      "A collection of character concepts and designs [work in progress]",
    stack: [],
    live: "",
  },
  {
    id: "ai-5g-baseband-pi",
    title: "AI-Driven 5G Baseband Processing",
    description:
      "An NR-inspired OFDM simulator that uses machine learning for adaptive modulation and fault diagnosis across AWGN, Rayleigh fading, and interference conditions, deployed on a Raspberry Pi 4.",
    stack: [
      "Python",
      "NumPy",
      "pandas",
      "scikit-learn",
      "Streamlit",
      "joblib",
      "pytest",
      "OFDM",
      "QPSK",
      "16-QAM",
      "64-QAM",
      "Raspberry Pi 4",
      "GitHub Actions",
      "systemd",
    ],
    github: "https://github.com/Alison0704/ai-5g-baseband-pi",
    live: "",
  },
  {
    id: "rf-dsp-receiver-verification",
    title: "RF/DSP Receiver Modeling and Verification",
    description:
      "A fixed-point QPSK receiver implemented in MATLAB, C++, and SystemVerilog, with shared test vectors, cocotb verification, RTL assertions, automated cross-model comparison, and waveform-based debugging.",
    stack: [
      "MATLAB",
      "C++",
      "Python",
      "SystemVerilog",
      "cocotb",
      "pytest",
      "Icarus Verilog",
      "Make",
      "GitHub Actions",
      "QPSK",
      "FIR Filtering",
      "Fixed-Point Arithmetic",
      "RTL Assertions",
      "VCD/FST",
    ],
    github: "https://github.com/Alison0704/rf-dsp-receiver-verification",
    live: "",
  },
  {
    id: "water-quality-analyzer",
    title: "Automated Water Quality Analyzer",
    description:
      "An Arduino-based water monitoring system that measures temperature, pH, and total dissolved solids, applies filtering and threshold-based quality checks, and streams serial data to a real-time Node.js dashboard.",
    stack: [
      "Arduino",
      "C++",
      "Node.js",
      "JavaScript",
      "HTML",
      "CSS",
      "SerialPort",
      "Socket.IO",
      "UART",
      "OneWire",
      "DallasTemperature",
      "Median Filtering",
      "pH Sensing",
      "TDS Sensing",
      "Temperature Sensing",
    ],
    github: "https://github.com/Alison0704/ELG-4539-Projet-Analyseur-d-eau",
    live: "",
  },
  {
    id: "artfight-randomizer",
    title: "ArtFight Character Randomizer",
    description:
      "A dependency-free web tool that redirects visitors to a randomly selected ArtFight character profile, with a Makefile workflow for creating organized drawing-attack folders from a Clip Studio Paint template.",
    stack: [
      "HTML",
      "JavaScript",
      "Make",
      "Shell",
      "GitHub Pages",
      "Clip Studio Paint",
    ],
    github: "https://github.com/Alison0704/artfight-randomizer",
    live: "",
  },
];

const projectListIcon = "fa-folder-open";

export default function Projects() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(projects[0].id);
  const [openedProject, setOpenedProject] = useState(null);

  const isSmall = useIsSmallScreen();
  const OpenedComponent = openedProject?.liveComponent;

  const filteredProjects = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return projects;

    return projects.filter((project) => {
      const searchableText = [
        project.title,
        project.type,
        project.description,
        project.status,
        project.liveComponent ? "portable interface live component" : "",
        ...project.stack,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(search);
    });
  }, [query]);

  const effectiveActiveId = useMemo(() => {
    const isCurrentIdValid = filteredProjects.some(
      (project) => project.id === activeId,
    );

    return isCurrentIdValid ? activeId : filteredProjects[0]?.id;
  }, [activeId, filteredProjects]);

  const activeProject = filteredProjects.find(
    (project) => project.id === effectiveActiveId,
  );

  return (
    <section id="projects" className="projects-section sketchbook">
      <div className="projects-bg" />

      <div className="container projects-content">
        <div className="projects-header">
          <motion.h2
            initial={isSmall ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={isSmall ? {} : { opacity: 1, y: 0 }}
            transition={isSmall ? {} : { duration: 0.6 }}
            viewport={isSmall ? {} : { once: true }}
          >
            My Projects
          </motion.h2>

          <motion.p
            initial={isSmall ? { opacity: 1 } : { opacity: 0 }}
            whileInView={isSmall ? {} : { opacity: 1 }}
            transition={isSmall ? {} : { delay: 0.1, duration: 0.6 }}
            viewport={isSmall ? {} : { once: true }}
          >
            Use the search bar to filter projects by keywords.
          </motion.p>
        </div>

        <motion.div
          className="project-console"
          initial={isSmall ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={isSmall ? {} : { opacity: 1, y: 0 }}
          transition={isSmall ? {} : { duration: 0.65 }}
          viewport={isSmall ? {} : { once: true }}
        >
          <div className="project-search">
            <label htmlFor="project-search-input">
              <i className="fa-solid fa-magnifying-glass" />
              <input
                id="project-search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects..."
              />
            </label>

            {query && (
              <button type="button" onClick={() => setQuery("")}>
                Clear
              </button>
            )}
          </div>

          <div className="project-selector">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <button
                  key={project.id}
                  className={`project-tab ${
                    effectiveActiveId === project.id ? "active" : ""
                  }`}
                  data-projectid={project.id}
                  onClick={() => setActiveId(project.id)}
                  type="button"
                  disabled={!project.title}
                  aria-disabled={!project.title}
                  title={!project.title ? "No title available" : undefined}
                >
                  <i className={`fa-solid ${projectListIcon}`} />
                  <span>{project.title}</span>
                </button>
              ))
            ) : (
              <div className="project-empty-small">
                No project found. Try “Python”, “ASIC”, “robotics”, or “ML”.
              </div>
            )}
          </div>

          <div className="project-display">
            {activeProject && filteredProjects.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  className="project-card-large"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="project-card-top">
                    <div>
                      <h3>{activeProject.title}</h3>
                    </div>
                  </div>

                  <p className="project-description">
                    {activeProject.description}
                  </p>

                  <div className="project-stack">
                    {activeProject.stack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    {activeProject.liveComponent ? (
                      <button
                        type="button"
                        className="btn btn-sky project-live-link"
                        onClick={() => setOpenedProject(activeProject)}
                      >
                        Open Interface
                      </button>
                    ) : activeProject.live ? (
                      <a
                        href={activeProject.live}
                        className="btn btn-sky project-live-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Launch Interface
                      </a>
                    ) : null}

                    {activeProject.github ? (
                      <a
                        href={activeProject.github}
                        className="btn btn-outline-sky"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View GitHub
                      </a>
                    ) : null}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="project-empty-large">
                <i className="fa-solid fa-satellite-dish" />
                <h3>No signal found</h3>
                <p>Try another keyword or clear the search.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {OpenedComponent && (
          <motion.div
            className="project-interface-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="project-interface-modal"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <div className="project-interface-top">
                <div>
                  <h3>{openedProject.title}</h3>
                </div>

                <button
                  type="button"
                  aria-label="Close interface"
                  onClick={() => setOpenedProject(null)}
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>

              <div className="project-interface-body">
                <OpenedComponent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
