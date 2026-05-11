import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  return (
    <AnimatePresence>
      <motion.div
        id="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="spinner-container"
          initial={{ scale: 0.95, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.35 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
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
