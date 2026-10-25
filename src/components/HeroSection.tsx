import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, Plus, X } from "lucide-react";
import heroImg from "@/assets/ansh-hero.png";
import logoImg from "@/assets/logo.png";

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <section id="hero" className="prisma-hero-shell">
      <div className="prisma-hero-frame">
        <div className="prisma-hero-wash" aria-hidden="true" />
        <div className="prisma-hero-noise noise-overlay" aria-hidden="true" />

        <motion.div
          ref={navRef}
          className={`prisma-nav-pill${menuOpen ? " is-open" : ""}`}
          initial={{ y: -32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          <a className="prisma-wordmark" href="#hero" aria-label="Ansh Malviya — home"><img src={logoImg} alt="Ansh Malviya" /></a>
          <button
            type="button"
            className="prisma-nav-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            {menuOpen ? <X aria-hidden="true" /> : <Plus aria-hidden="true" />}
          </button>
          <nav id="primary-navigation" aria-label="Main navigation">
            <a href="#about" onClick={() => setMenuOpen(false)}>My story</a>
            <a href="#tweets" onClick={() => setMenuOpen(false)}>Moments</a>
            <a href="#ventures" onClick={() => setMenuOpen(false)}>Ventures</a>
            <a href="#capabilities" onClick={() => setMenuOpen(false)}>Capabilities</a>
            <a href="#dispatch" onClick={() => setMenuOpen(false)}>Dispatch</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Inquiries</a>
          </nav>
        </motion.div>

        <div className="prisma-hero-content">
          <div className="prisma-hero-topline">
            <span><i /> Founder · Builder · Athlete</span>
            <span className="prisma-hero-location">India · 19°N 73°E</span>
          </div>

          <div className="prisma-hero-grid">
            <div className="prisma-hero-copy">
              <motion.p className="prisma-kicker" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }}>
                Ideas into ventures.
              </motion.p>
              <h1 className="prisma-hero-title" aria-label="Ansh Malviya">
                <span className="prisma-title-line">
                  {"ANSH".split("").map((letter, index) => (
                    <motion.span key={index} initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.85, delay: 0.35 + index * 0.045, ease }}>{letter}</motion.span>
                  ))}
                </span>
                <span className="prisma-title-line prisma-title-outline">
                  {"MALVIYA".split("").map((letter, index) => (
                    <motion.span key={index} initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.85, delay: 0.5 + index * 0.04, ease }}>{letter}</motion.span>
                  ))}
                </span>
              </h1>
              <motion.div className="prisma-hero-aside" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease }}>
                <p>At the intersection of <em>brand</em>, <em>technology</em>, and <em>scale</em>, I build ventures designed to keep growing.</p>
                <a href="#ventures" className="prisma-cta group">
                  <span>Explore the work</span>
                  <i><ArrowRight aria-hidden="true" /></i>
                </a>
              </motion.div>
            </div>

            <motion.div className="prisma-hero-visual" initial={{ opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.45, ease }}>
              <img className="prisma-hero-portrait" src={heroImg} alt="Ansh Malviya" fetchPriority="high" />
              <span className="prisma-portrait-index">01 <i>FOUNDER · BUILDER</i></span>
              <span className="prisma-portrait-caption">The maker behind the work</span>
            </motion.div>
          </div>

          <div className="prisma-hero-bottomline">
            <a href="#about" aria-label="Scroll to my story"><span className="prisma-scroll-rule" />Scroll to explore <ArrowDownRight aria-hidden="true" /></a>
            <span className="prisma-hero-count">01 <i /> 03</span>
          </div>
        </div>
      </div>
    </section>
  );
}
