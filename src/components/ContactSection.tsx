import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldDisableAnimations, isIOS } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/imanshmalviya/" },
  { label: "Twitter / X", url: "https://x.com/imanshmalviya/" },
  { label: "Strava", url: "https://strava.app.link/JbMyf0BVo2b" },
];

function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (shouldDisableAnimations()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-line", { y: "100%" },
        { y: "0%", duration: 1, stagger: 0.12, ease: "power4.out",
          scrollTrigger: { trigger: ".contact-heading", start: "top 80%" } }
      );
      gsap.fromTo(".contact-meta", { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-meta", start: "top 90%" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-16 sm:py-24 md:py-32 noise">
      {!isIOS() && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      )}

      <div className="container mx-auto px-5 sm:px-8 md:px-16 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <div className="w-8 h-px bg-primary" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary">
            Get in Touch
          </span>
          <div className="w-8 h-px bg-primary" />
        </div>

        <div className="contact-heading">
          <div className="overflow-hidden">
            <h2 className="contact-line font-heading font-bold text-[clamp(2rem,8vw,8rem)] tracking-[-0.03em] text-foreground leading-[0.9]">
              Let's Build
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="contact-line font-heading font-bold text-[clamp(2rem,8vw,8rem)] tracking-[-0.03em] text-gradient leading-[0.9]">
              Something Great
            </h2>
          </div>
        </div>

        <p className="contact-meta font-body text-sm sm:text-base text-muted-foreground max-w-sm mx-auto mt-5 sm:mt-8 leading-relaxed px-2">
          Got a project in mind? Want to collaborate? I'm always open to interesting conversations and new ventures.
        </p>

        {/* CTA button — wraps gracefully on small screens */}
        <motion.a
          href="mailto:ansh@webcommedia.in"
          whileTap={{ scale: 0.97 }}
          className="contact-meta inline-flex items-center gap-2 sm:gap-3 bg-primary text-primary-foreground px-6 sm:px-10 py-4 sm:py-5 rounded-full font-heading font-semibold text-sm sm:text-base mt-7 sm:mt-12 transition-shadow duration-500 touch-manipulation max-w-full"
        >
          <span className="truncate">anshmalviya010@gmail.com</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>

        {/* Social links — larger tap targets */}
        <div className="contact-meta flex items-center justify-center gap-5 sm:gap-8 mt-8 sm:mt-14 flex-wrap">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] sm:text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300 py-2 px-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
