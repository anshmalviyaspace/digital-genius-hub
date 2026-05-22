import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isIOS } from "@/lib/utils";

const navItems = [
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Newsletter", href: "#newsletter" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setHidden(y > 100 && y > lastY);
      setScrolled(y > 50);
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden && !menuOpen ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 md:px-16 py-5 flex justify-between items-center transition-colors duration-300 ${
          scrolled
            ? isIOS()
              ? "bg-background/95"
              : "bg-background/80 backdrop-blur-xl"
            : ""
        }`}
      >
        <a href="#hero" className="font-heading font-bold text-foreground text-lg tracking-tight">
          ANSH<span className="text-primary">.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 border border-border hover:border-primary/50 px-5 py-2 rounded-full font-body text-[13px] text-foreground hover:text-primary transition-all duration-300"
        >
          Let's talk
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center z-50"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-foreground"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-px bg-foreground"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-foreground"
          />
        </button>
      </motion.nav>

      {/* Mobile menu — full screen editorial */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col justify-between px-8 py-24"
          >
            <div className="space-y-2">
              {navItems.map((item, i) => (
                <div key={item.label} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    initial={{ y: 80 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    exit={{ y: 80 }}
                    onClick={() => setMenuOpen(false)}
                    className="block font-heading font-bold text-5xl sm:text-6xl text-foreground hover:text-primary transition-colors py-2"
                  >
                    {item.label}
                  </motion.a>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-3"
            >
              <a href="mailto:ansh@webcommedia.in" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
                ansh@webcommedia.in
              </a>
              <div className="flex gap-6">
                <a href="https://www.linkedin.com/in/imanshmalviya/" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
                  LinkedIn
                </a>
                <a href="https://x.com/imanshmalviya/" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
                  Twitter
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
