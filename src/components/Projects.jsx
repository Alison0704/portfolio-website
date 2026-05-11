import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";

const projects = [
  {
    id: "ai-rtl",
    title: "AI RTL Assistant",
    type: "Web Tool",
    icon: "fa-wave-square",
    status: "Portable",
    description:
      "A browser-based RTL assistant for Verilog analysis, simulation flow support, and waveform-focused debugging.",
    stack: ["React", "Python", "Icarus Verilog", "cocotb"],
    github: "https://github.com/yourusername/ai-rtl-assistant",
    live: "/projects/rtl-assistant",
  },
  {
    id: "jime",
    title: "Jim-E Hosting Robot",
    type: "Robotics",
    icon: "fa-robot",
    status: "Repo",
    description:
      "An autonomous indoor hosting robot using ROS 2, Raspberry Pi, ESP32 control, vision, and path planning.",
    stack: ["ROS 2", "Python", "OpenCV", "ESP32"],
    github: "https://github.com/yourusername/jime-robot",
    live: "",
  },
  {
    id: "dff",
    title: "Custom D Flip-Flop",
    type: "ASIC / EDA",
    icon: "fa-microchip",
    status: "Repo",
    description:
      "A transistor-level DFF designed in Sky130A with schematic simulation, layout, DRC, LVS, and extraction.",
    stack: ["Xschem", "Ngspice", "Magic", "Sky130A"],
    github: "https://github.com/yourusername/sky130-dff",
    live: "",
  },
  {
    id: "ml-lab",
    title: "ML From Scratch Lab",
    type: "Learning Lab",
    icon: "fa-brain",
    status: "Portable",
    description:
      "Small experiments building neural networks, optimizers, and training loops from scratch to understand the math.",
    stack: ["Python", "NumPy", "ML"],
    github: "https://github.com/yourusername/ml-from-scratch",
    live: "/projects/ml-lab",
  },
  {
    id: "fpga-pong",
    title: "FPGA Pong Console",
    type: "Digital Design",
    icon: "fa-gamepad",
    status: "Repo",
    description:
      "A VGA-based Pong implementation in Verilog with input debouncing, timing control, and score tracking.",
    stack: ["Verilog", "FPGA", "VGA", "SystemVerilog"],
    github: "https://github.com/yourusername/fpga-pong-console",
    live: "",
  },
  {
    id: "sensor-dashboard",
    title: "Sensor Telemetry Dashboard",
    type: "Web App",
    icon: "fa-chart-line",
    status: "Portable",
    description:
      "A live dashboard for plotting environmental sensor data with filters, alerts, and time-series trends.",
    stack: ["React", "TypeScript", "Charts", "REST API"],
    github: "https://github.com/yourusername/sensor-dashboard",
    live: "/projects/sensor-dashboard",
  },
  {
    id: "uart-console",
    title: "UART Debug Console",
    type: "Embedded Tool",
    icon: "fa-terminal",
    status: "Repo",
    description:
      "A lightweight serial console for embedded bring-up, framing analysis, and command-driven board testing.",
    stack: ["Python", "PySerial", "Tkinter", "UART"],
    github: "https://github.com/yourusername/uart-debug-console",
    live: "",
  },
  {
    id: "robot-docking",
    title: "Autonomous Docking Stack",
    type: "Robotics",
    icon: "fa-location-crosshairs",
    status: "Repo",
    description:
      "A docking pipeline for a mobile robot using fiducial markers, pose estimation, and final approach control.",
    stack: ["ROS 2", "OpenCV", "SLAM", "Python"],
    github: "https://github.com/yourusername/autonomous-docking-stack",
    live: "",
  },
  {
    id: "signal-lab",
    title: "Signal Integrity Lab",
    type: "Simulation",
    icon: "fa-wave-square",
    status: "Portable",
    description:
      "A collection of experiments exploring rise time, ringing, impedance matching, and interconnect behavior.",
    stack: ["Python", "SPICE", "NumPy", "EDA"],
    github: "https://github.com/yourusername/signal-integrity-lab",
    live: "/projects/signal-lab",
  },
];

const projectListIcon = "fa-folder-open";

export default function Projects() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(projects[0].id);

  const filteredProjects = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return projects;

    return projects.filter((project) => {
      const searchableText = [
        project.title,
        project.type,
        project.description,
        project.status,
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
    <section id="projects" className="projects-section">
      <div className="projects-bg" />

      <div className="container projects-content">
        <div className="projects-header">
          <motion.p
            className="section-kicker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Projects
          </motion.p>{" "}
          <h2>My Projects List</h2>
          <p>Search by project, tool, stack, or domain.</p>
        </div>

        <div className="project-console">
          <div className="project-search">
            <label htmlFor="project-search-input">
              <i className="fa-solid fa-magnifying-glass" />
              <input
                id="project-search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects: FPGA, ROS 2, Python, ASIC..."
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
                  onClick={() => setActiveId(project.id)}
                  type="button"
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
                      <p>{activeProject.type}</p>
                      <h3>{activeProject.title}</h3>
                    </div>

                    <span className="project-status">
                      {activeProject.status}
                    </span>
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
                    {activeProject.live && (
                      <a href={activeProject.live} className="btn btn-sky">
                        Launch Interface
                      </a>
                    )}

                    <a
                      href={activeProject.github}
                      className="btn btn-outline-sky"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View GitHub
                    </a>
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
        </div>
      </div>
    </section>
  );
}
