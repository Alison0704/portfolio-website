import { motion } from "framer-motion";
import { useIsSmallScreen } from "../hooks/useIsSmallScreen";

export default function Experience() {
  const experiences = [
    {
      role: "Teaching Assistant",
      organization: "University of Ottawa",
      period: "Jan 2024 – Apr 2026",
      icon: "fa-chalkboard-user",
      summary:
        "Supported technical learning in digital systems, FPGA design, logic circuits, and C programming.",
      courses: ["ITI 1500 · Digital Systems", "GNG 1106 · C Programming"],
      bullets: [
        "Supported students in digital systems, circuit behavior, logic design, and FPGA workflows using Quartus II and Altera tools.",
        "Assisted students with debugging lab work, understanding hardware behavior, and connecting theory to practical digital designs.",
        "Created technical guides that explained hardware and programming concepts in a clear, beginner-friendly way.",
        "Helped students strengthen their problem-solving skills in logic design, C programming, and engineering debugging.",
      ],
      skills: [
        "Quartus II",
        "Altera FPGA",
        "Digital Logic",
        "C Programming",
        "Debugging",
        "Technical Communication",
      ],
    },
    {
      role: "Pension and Benefits Assistant",
      organization: "University of Ottawa",
      period: "May 2023 – Apr 2026",
      icon: "fa-table-list",
      summary:
        "Managed structured data, administrative workflows, and confidential pension-related records.",
      courses: [],
      bullets: [
        "Managed specialized administrative projects and data governance tasks for pension analysts.",
        "Used advanced Excel to build, maintain, and organize complex data logs with strong attention to accuracy.",
        "Handled sensitive pension and benefits information while following confidentiality and regulatory standards.",
        "Improved workflow visibility through structured documentation, tracking systems, and data quality checks.",
      ],
      skills: [
        "Advanced Excel",
        "Data Governance",
        "Process Tracking",
        "Documentation",
        "Confidential Records",
        "Administrative Systems",
      ],
    },
  ];

  const isSmall = useIsSmallScreen();

  return (
    <section id="experience" className="experience-section sketchbook">
      <div className="container experience-content">
        <motion.div
          className="experience-header"
          initial={isSmall ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={isSmall ? {} : { opacity: 1, y: 0 }}
          transition={isSmall ? {} : { duration: 0.6 }}
          viewport={isSmall ? {} : { once: true }}
        >
          <h2>My Work Experiences</h2>
        </motion.div>

        <div className="experience-list-wrapper">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.role}
              className="experience-card"
              initial={isSmall ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={isSmall ? {} : { opacity: 1, y: 0 }}
              transition={
                isSmall ? {} : { duration: 0.55, delay: index * 0.12 }
              }
              viewport={isSmall ? {} : { once: true }}
            >
              <div className="experience-card-top">
                <div className="experience-icon">
                  <i className={`fa-solid ${experience.icon}`} />
                </div>

                <div>
                  <p>{experience.organization}</p>
                  <h3>{experience.role}</h3>
                </div>

                <span>{experience.period}</span>
              </div>

              <p className="experience-summary">{experience.summary}</p>

              {experience.courses.length > 0 && (
                <div className="experience-courses">
                  {experience.courses.map((course) => (
                    <span key={course}>{course}</span>
                  ))}
                </div>
              )}

              <ul className="experience-bullets">
                {experience.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              <div className="experience-skills">
                {experience.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
