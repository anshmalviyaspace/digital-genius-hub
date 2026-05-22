import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import heroImg from "@/assets/ansh-hero.png";
import { shouldDisableAnimations, isIOS } from "@/lib/utils";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (shouldDisableAnimations()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        ".hero-line",
        { y: "110%", rotateX: -40 },
        { y: "0%", rotateX: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" }
      )
        .fromTo(
          ".hero-meta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-image-wrap",
          { clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.9, ease: "power4.inOut" },
          "-=0.7"
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden noise"
    >
      {/* Ambient glow — skipped on iOS (blur filters are expensive on WebKit) */}
      {!isIOS() && (
        <>
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
        </>
      )}

      <div className="relative z-10 container mx-auto px-5 sm:px-8 md:px-16 min-h-screen flex flex-col">
        {/* Main content area */}
        <div className="flex-1 flex flex-col lg:flex-row items-end lg:items-end gap-8 lg:gap-0 pt-24 pb-8">
          {/* Left: Typography */}
          <div className="flex-1 flex flex-col justify-end pb-8 lg:pb-16">
            {/* Eyebrow */}
            <div className="hero-meta flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground">
                Entrepreneur & Systems Builder
              </span>
            </div>

            {/* Giant name */}
            <div className="space-y-0">
              <div className="overflow-hidden" style={{ perspective: "600px" }}>
                <h1 className="hero-line font-heading font-bold text-[clamp(3rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em] text-foreground">
                  ANSH
                </h1>
              </div>
              <div className="overflow-hidden" style={{ perspective: "600px" }}>
                <h1 className="hero-line font-heading font-bold text-[clamp(3rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em] text-gradient">
                  MALVIYA
                </h1>
              </div>
            </div>

            {/* Tagline */}
            <div className="hero-meta mt-6 sm:mt-8 max-w-md">
              <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                19-year-old founder building ventures at the intersection of brand, technology, and scale. From premium athleisure to AI-powered tools.
              </p>
            </div>

            {/* Stats row */}
            <div className="hero-meta flex gap-8 sm:gap-12 mt-8 sm:mt-10">
              {[
                { value: "5+", label: "Ventures Built" },
                { value: "19", label: "Years Old" },
                { value: "∞", label: "Systems Thinking" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="font-heading font-bold text-2xl sm:text-3xl text-primary">{stat.value}</span>
                  <p className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hero image with broken-grid offset */}
          <div className="hero-image-wrap relative w-full lg:w-[45%] h-[50vh] sm:h-[60vh] lg:h-[75vh] lg:-mb-8">
            <div className="relative w-full h-full overflow-hidden rounded-t-[2rem] sm:rounded-t-[3rem]">
              <img
                src={heroImg}
                alt="Ansh Malviya"
                width={975}
                height={1104}
                className="w-full h-full object-cover object-top"
                decoding="async"
                fetchPriority="high"
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
            </div>
            {/* Floating label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.2, duration: 0.8 }}
              className="absolute -left-4 sm:-left-8 bottom-24 bg-card/80 border border-border px-4 py-3 rounded-lg"
            >
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="hero-scroll flex items-center gap-3 pb-8"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </div>
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
