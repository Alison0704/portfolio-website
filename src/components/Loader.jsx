import { motion, AnimatePresence } from "framer-motion";
import { useIsSmallScreen } from "../hooks/useIsSmallScreen";

export default function Loader() {
  const isSmall = useIsSmallScreen();

  return (
    <AnimatePresence>
      <motion.div
        id="loader"
        initial={isSmall ? { opacity: 1 } : { opacity: 0 }}
        animate={isSmall ? {} : { opacity: 1 }}
        exit={isSmall ? {} : { opacity: 0 }}
        transition={isSmall ? {} : { duration: 0.25 }}
      >
        <motion.div
          className="spinner-container"
          initial={isSmall ? { opacity: 1 } : { scale: 0.95, y: 10 }}
          animate={isSmall ? {} : { scale: 1, y: 0 }}
          transition={isSmall ? {} : { duration: 0.35 }}
        >
          <motion.div
            className="spinner-border"
            role="status"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            style={{
              color: "var(--sky-blue)",
              width: "3rem",
              height: "3rem",
            }}
          />

          <motion.p
            className="mt-3"
            initial={isSmall ? { opacity: 1 } : { opacity: 0 }}
            animate={isSmall ? {} : { opacity: 1 }}
            transition={isSmall ? {} : { delay: 0.1, duration: 0.4 }}
            style={{
              color: "var(--sky-blue)",
              fontFamily: "monospace",
            }}
          >
            Initializing_System...
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
