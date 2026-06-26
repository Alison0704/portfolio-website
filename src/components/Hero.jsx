import { motion, AnimatePresence } from "framer-motion";
import { useIsSmallScreen } from "../hooks/useIsSmallScreen";

export default function Hero() {
  const isSmall = useIsSmallScreen();

  const containerAnimation = isSmall
    ? { initial: { opacity: 1 } }
    : {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
        transition: { duration: 0.8 },
      };

  const kickerAnimation = isSmall
    ? { initial: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.2, duration: 0.6 },
      };

  const titleAnimation = isSmall
    ? { initial: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3, duration: 0.8 },
      };

  const leadAnimation = isSmall
    ? { initial: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.4, duration: 0.6 },
      };

  const buttonsAnimation = isSmall
    ? { initial: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.5, duration: 0.6 },
      };

  const logoContainerAnimation = isSmall
    ? { initial: { opacity: 1 } }
    : {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50 },
        transition: { duration: 0.8 },
      };

  const hoverScale = isSmall
    ? {}
    : { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } };
  const logoAnimation = isSmall
    ? {}
    : {
        animate: { y: [0, -10, 0] },
        transition: { repeat: Infinity, duration: 3 },
      };
  return (
    <AnimatePresence>
      <div className="container hero-content">
        <div className="row align-items-center justify-content-between g-5">
          <motion.div className="col-lg-7" {...containerAnimation}>
            <motion.h1 className="display-3 fw-semibold" {...titleAnimation}>
              Hi, I&apos;m <span className="text-sky">AliEmi</span>
            </motion.h1>

            <motion.p className="lead mt-3" {...leadAnimation}>
              <a
                href="https://catalogue.uottawa.ca/en/undergrad/basc-electrical-engineering-bsc-computing-technology/#programrequirementstext"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                BASc Electrical Engineering and BSc Computing Technology
              </a>{" "}
              graduate student from University of Ottawa, focused on ASIC
              design, FPGA verification, robotic systems, and machine learning.
            </motion.p>

            <motion.div
              className="d-flex flex-wrap gap-3 mt-4"
              {...buttonsAnimation}
            >
              <motion.a
                href="/resume/Alison_Emilien_Resume_Hardware.pdf"
                className="btn btn-outline-sky"
                target="_blank"
                rel="noreferrer"
                {...hoverScale}
              >
                <i className="fa-solid fa-file-pdf" />
                Resume
              </motion.a>
              <motion.a
                href="mailto:aemil072@uottawa.ca"
                className="btn btn-sky"
                target="_blank"
                rel="noreferrer"
                {...hoverScale}
              >
                <i className="fa-solid fa-envelope" />
                Email Me
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="col-lg-5 d-flex align-items-center justify-content-center"
            {...logoContainerAnimation}
          >
            <motion.img
              src="/Logo.png"
              alt="AliEmi logo"
              className="profile-image"
              {...logoAnimation}
            />
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
