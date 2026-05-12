import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsSmallScreen } from "../hooks/useIsSmallScreen";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSmall = useIsSmallScreen();

  useEffect(() => {
    const sections = ["home", "projects", "experience", "about", "contact"];

    const handleScroll = () => {
      let current = "home";

      sections.forEach((section) => {
        const element = document.getElementById(section);

        if (element) {
          const sectionTop = element.offsetTop - 120;

          if (window.scrollY >= sectionTop) {
            current = section;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "about", label: "About Me" },
    { id: "contact", label: "Contact Me" },
  ];

  return (
    <motion.nav
      id="mainNav"
      className="navbar navbar-expand-lg fixed-top shadow g-4"
      initial={isSmall ? { opacity: 1 } : { y: -24, opacity: 0 }}
      animate={isSmall ? {} : { y: 0, opacity: 1 }}
      transition={isSmall ? {} : { duration: 0.35 }}
    >
      <div className="container">
        <motion.a
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          href="#home"
          whileHover={isSmall ? {} : { x: 2 }}
        >
          <img src="/Logo.png" alt="AliEmi logo" width="32" height="32" />
          <span>AliEmi Portfolio Website</span>
        </motion.a>

        <motion.button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarContent"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
          whileTap={isSmall ? {} : { scale: 0.96 }}
        >
          <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </motion.button>

        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarContent"
        >
          <AnimatePresence>
            <motion.ul
              className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3"
              initial={isSmall ? { opacity: 1 } : { opacity: 0 }}
              animate={isSmall ? {} : { opacity: 1 }}
              transition={
                isSmall ? {} : { staggerChildren: 0.06, delayChildren: 0.08 }
              }
            >
              {navItems.map((item) => (
                <motion.li
                  className="nav-item"
                  key={item.id}
                  initial={isSmall ? { opacity: 1 } : { opacity: 0, y: -8 }}
                  animate={isSmall ? {} : { opacity: 1, y: 0 }}
                  transition={isSmall ? {} : { duration: 0.22 }}
                >
                  <motion.a
                    className={`nav-link ${
                      activeSection === item.id ? "active-section" : ""
                    }`}
                    href={
                      item.id === "contact"
                        ? "mailto:aemil072@uottawa.ca"
                        : `#${item.id}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ y: -1 }}
                  >
                    {item.label}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
