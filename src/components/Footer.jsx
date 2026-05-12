import { motion, AnimatePresence } from "framer-motion";
import { useIsSmallScreen } from "../hooks/useIsSmallScreen";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const isSmall = useIsSmallScreen();

  return (
    <motion.footer
      className="footer flex-column align-items-center text-center py-4"
      initial={isSmall ? { opacity: 1 } : { opacity: 0 }}
      whileInView={isSmall ? {} : { opacity: 1 }}
      transition={isSmall ? {} : { duration: 0.45 }}
      viewport={isSmall ? {} : { once: true }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={currentYear}
          initial={isSmall ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={isSmall ? {} : { opacity: 1, y: 0 }}
          exit={isSmall ? {} : { opacity: 0, y: -8 }}
          transition={isSmall ? {} : { duration: 0.25 }}
        >
          © {currentYear} Alison Emilien. All rights reserved.
        </motion.p>
      </AnimatePresence>
    </motion.footer>
  );
}
