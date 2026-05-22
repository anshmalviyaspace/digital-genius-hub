import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldDisableAnimations, isIOS } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/imanshmalviya/" },
  { label: "Twitter / X", url: "https://x.com/imanshmalviya/" },
  { label: "Strava" , url: "https://strava.app.link/JbMyf0BVo2b" },
];

function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (shouldDisableAnimations()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-line",
        { y: "100%" },
        {
          y: "0%", duration: 1, stagger: 0.12, ease: "power4.out",
          scrollTrigger: { trigger: ".contact-heading", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".contact-meta",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-meta", start: "top 90%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-16 sm:py-24 md:py-32 noise">
      {/* Ambient glow — skipped on iOS */}
      {!isIOS() && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      )}

      <div className="container mx-auto px-5 sm:px-8 md:px-16 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-px bg-primary" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary">
            Get in Touch
          </span>
          <div className="w-8 h-px bg-primary" />
        </div>

        <div className="contact-heading">
          <div className="overflow-hidden">
            <h2 className="contact-line font-heading font-bold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[-0.03em] text-foreground">
              Let's Build
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="contact-line font-heading font-bold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[-0.03em] text-gradient">
              Something Great
            </h2>
          </div>
        </div>

        <p className="contact-meta font-body text-sm sm:text-base text-muted-foreground max-w-md mx-auto mt-6 sm:mt-8 leading-relaxed">
          Got a project in mind? Want to collaborate? I'm always open to interesting conversations and new ventures.
        </p>

        <motion.a
          href="mailto:ansh@webcommedia.in"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="contact-meta inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 sm:px-10 py-4 sm:py-5 rounded-full font-heading font-semibold text-sm sm:text-base mt-8 sm:mt-12 hover:shadow-[0_0_40px_8px_hsl(32_100%_55%/0.2)] transition-shadow duration-500"
        >
          anshmalviya010@gmail.com
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>

        {/* Social links */}
        <div className="contact-meta flex items-center justify-center gap-6 sm:gap-8 mt-10 sm:mt-14">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] sm:text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
