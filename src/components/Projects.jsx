import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useIsSmallScreen } from "../hooks/useIsSmallScreen";

const projects = [
  {
    id: "jime",
    title: "Jim-E Hosting Robot",
    type: "Robotics",
    description:
      "An autonomous indoor hosting robot using ROS 2, Raspberry Pi, ESP32 control, vision, and path planning.",
    stack: ["ROS 2", "Python", "OpenCV", "ESP32"],
    github: "https://github.com/Alison0704/Capstone-JimE",
    live: "https://alison0704.github.io/Capstone-JimE-Interface/",
  },
];

const projectListIcon = "fa-folder-open";

export default function Projects() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(projects[0].id);
  const isSmall = useIsSmallScreen();

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
            Search by project, tool, stack, or domain.
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
                      <a
                        href={activeProject.live}
                        className="btn btn-sky project-live-link"
                        target="_blank"
                        rel="noreferrer"
                      >
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
        </motion.div>
      </div>
    </section>
  );
}
