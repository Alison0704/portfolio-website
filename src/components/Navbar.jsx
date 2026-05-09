import { useEffect, useState } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ["home", "about", "projects", "experience", "contact"];

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
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav id="mainNav" className="navbar navbar-expand-lg fixed-top shadow g-4">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#home">
          AliEmi Portfolio Website
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3">
            {navItems.map((item) => (
              <li className="nav-item" key={item.id}>
                <a
                  className={`nav-link ${
                    activeSection === item.id ? "active-section" : ""
                  }`}
                  href={
                    item.id === "contact"
                      ? "mailto:aemil072@uottawa.ca"
                      : `#${item.id}`
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
