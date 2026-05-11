import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="footer flex-column align-items-center text-center py-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={currentYear}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          © {currentYear} Alison Emilien. All rights reserved.
        </motion.p>
      </AnimatePresence>
    </motion.footer>
  );
}
