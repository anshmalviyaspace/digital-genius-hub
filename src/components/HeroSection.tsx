import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import heroImg from "@/assets/ansh-hero.png";
import { shouldDisableAnimations, isIOS } from "@/lib/utils";
import Aurora from "@/components/Aurora";

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
      {/* Aurora background — full-bleed WebGL layer, desktop only */}
      {!isIOS() && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <Aurora
            colorStops={["#f97316", "#fb923c", "#7C3AED"]}
            amplitude={0.9}
            blend={0.4}
            speed={0.6}
            className="w-full h-full"
          />
          {/* Fade the aurora out toward the bottom so it blends into the page */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>
      )}

      {/* CSS aurora fallback for iOS/mobile — no WebGL needed */}
      {isIOS() && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="aurora-mobile-blob aurora-blob-1" />
          <div className="aurora-mobile-blob aurora-blob-2" />
          <div className="aurora-mobile-blob aurora-blob-3" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-5 sm:px-8 md:px-16 min-h-[100dvh] flex flex-col">
        {/* Mobile: image on top, text below. Desktop: side by side */}
        <div className="flex-1 flex flex-col lg:flex-row items-stretch lg:items-end gap-0 lg:gap-0 pt-20 sm:pt-24">

          {/* Hero image — shown first on mobile (top), right side on desktop */}
          <div className="hero-image-wrap order-first lg:order-last relative w-full lg:w-[45%] h-[42vh] sm:h-[52vh] lg:h-[75vh] lg:-mb-8 mt-4 sm:mt-0">
            <div className="relative w-full h-full overflow-hidden rounded-2xl sm:rounded-t-[3rem]">
              <img
                src={heroImg}
                alt="Ansh Malviya"
                width={975}
                height={1104}
                className="w-full h-full object-cover object-top"
                decoding="async"
                fetchPriority="high"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
            </div>
          </div>

          {/* Left: Typography */}
          <div className="flex-1 flex flex-col justify-end pb-6 lg:pb-16 pt-6 lg:pt-0">
            {/* Eyebrow */}
            <div className="hero-meta flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground">
                Entrepreneur & Systems Builder
              </span>
            </div>

            {/* Giant name */}
            <div className="space-y-0">
              <div className="overflow-hidden" style={{ perspective: "600px" }}>
                <h1 className="hero-line font-heading font-bold text-[clamp(3.2rem,13vw,10rem)] leading-[0.85] tracking-[-0.04em] text-foreground">
                  ANSH
                </h1>
              </div>
              <div className="overflow-hidden" style={{ perspective: "600px" }}>
                <h1 className="hero-line font-heading font-bold text-[clamp(3.2rem,13vw,10rem)] leading-[0.85] tracking-[-0.04em] text-gradient">
                  MALVIYA
                </h1>
              </div>
            </div>

            {/* Tagline */}
            <div className="hero-meta mt-4 sm:mt-6 max-w-md">
              <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                19-year-old founder building ventures at the intersection of brand, technology, and scale.
              </p>
            </div>

            {/* Stats row */}
            <div className="hero-meta flex gap-6 sm:gap-12 mt-6 sm:mt-10">
              {[
                { value: "5+", label: "Ventures" },
                { value: "19", label: "Years Old" },
                { value: "∞", label: "Systems" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="font-heading font-bold text-xl sm:text-3xl text-primary">{stat.value}</span>
                  <p className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="hero-scroll flex items-center gap-3 pb-6 sm:pb-8"
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
