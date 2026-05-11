import { motion, AnimatePresence } from "framer-motion";

export default function Experience() {
  const timelineItems = [
    {
      number: "01",
      title: "ASIC / EDA Exploration",
      description:
        "OpenLane, OpenROAD, Magic VLSI, Xschem, Ngspice, KLayout, Netgen, and Sky130A-based design flows.",
    },
    {
      number: "02",
      title: "Robotics Systems",
      description:
        "ROS 2 architecture, perception, state machines, path planning, motor control, and embedded integration.",
    },
    {
      number: "03",
      title: "Software Tooling",
      description:
        "Python and web-based tools for simulation, automation, design assistance, and engineering workflows.",
    },
  ];

  return (
    <motion.section
      id="experience"
      className="section-block"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      viewport={{ once: true }}
    >
      <motion.p
        className="section-kicker"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.45 }}
        viewport={{ once: true }}
      >
        Experience
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.55 }}
        viewport={{ once: true }}
      >
        Experience & Focus Areas
      </motion.h2>

      <AnimatePresence>
        <div className="timeline mt-4">
          {timelineItems.map((item, index) => (
            <motion.div
              className="timeline-item"
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <span>{item.number}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </motion.section>
  );
}
