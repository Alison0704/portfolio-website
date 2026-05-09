import { useState } from "react";

const projects = [
  {
    title: "Jim-E Autonomous Hosting Robot",
    icon: "fa-solid fa-robot",
    tag: "Robotics + ROS 2",
    description:
      "A vision-centered indoor hosting robot using ROS 2, Raspberry Pi, ESP32 motor control, and event-driven navigation.",
  },
  {
    title: "Custom D Flip-Flop in Sky130A",
    icon: "fa-solid fa-microchip",
    tag: "ASIC + EDA",
    description:
      "Transistor-level DFF design using Xschem, Ngspice, Magic VLSI, Netgen, and open-source Sky130A tools.",
  },
  {
    title: "AI-Assisted RTL Analysis Tool",
    icon: "fa-solid fa-wave-square",
    tag: "AI + RTL",
    description:
      "A browser-based Verilog assistant with simulation support, waveform viewing, and AI-driven RTL feedback.",
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section id="projects" className="section-block">
      <p className="section-kicker">Projects</p>
      <h2>Selected Engineering Projects</h2>

      <div className="project-list mt-4">
        {projects.map((project, index) => (
          <article
            className={`project-row ${
              activeProject === index ? "active-project-row" : ""
            }`}
            key={project.title}
            onMouseEnter={() => setActiveProject(index)}
            onClick={() => setActiveProject(index)}
          >
            <div className="project-row-left">
              <div className="project-row-icon">
                <i className={project.icon}></i>
              </div>

              <div>
                <span className="project-row-tag">{project.tag}</span>
                <h3>{project.title}</h3>
              </div>
            </div>

            <p>{project.description}</p>

            <div className="project-row-action">
              <span>View details</span>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
