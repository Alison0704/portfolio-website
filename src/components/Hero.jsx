import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  return (
    <AnimatePresence>
      <div className="container hero-content">
        <div className="row align-items-center justify-content-between g-5">
          <motion.div
            className="col-lg-7"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="section-kicker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              My Online Portfolio
            </motion.p>

            <motion.h1
              className="display-3 fw-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Hi, I&apos;m <span className="text-sky">AliEmi</span>
            </motion.h1>

            <motion.p
              className="lead mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              BASc Electrical Engineering and BSc Computing Technology Graduate
              Student focused on ASIC/FPGA verification, RTL design, and
              hardware and software systems.
            </motion.p>

            <motion.div
              className="d-flex flex-wrap gap-3 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.a
                href="/resume/Alison_Emilien_Resume_Hardware.pdf"
                className="btn btn-outline-sky"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fa-solid fa-file-pdf" />
                My Resume
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/alison-emilien/"
                className="btn btn-outline-sky"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fa-brands fa-linkedin" />
                My LinkedIn
              </motion.a>
              <motion.a
                href="mailto:aemil072@uottawa.ca"
                className="btn btn-sky"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fa-solid fa-envelope" />
                Email Me
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="col-lg-5 d-flex align-items-center justify-content-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src="/Logo.png"
              alt="AliEmi logo"
              className="profile-image"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
