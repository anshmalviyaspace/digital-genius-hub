import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldDisableAnimations } from "@/lib/utils";
import { TweetCard } from "./ui/tweet-card";

gsap.registerPlugin(ScrollTrigger);

const TweetSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (shouldDisableAnimations()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tweet-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".tweet-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".tweet-container",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".tweet-container", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tweets"
      className="relative py-16 sm:py-24 noise"
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-16">
        {/* Header */}
        <div className="tweet-heading flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary">
                Recognition
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-foreground">
              Featured<br />Moments
            </h2>
          </div>
          <p className="font-body text-sm text-muted-foreground max-w-xs leading-relaxed">
            Insights and updates from the journey of building, creating, and innovating.
          </p>
        </div>

        {/* Tweet Container */}
        <motion.div
          className="tweet-container flex justify-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="w-full max-w-md">
            <TweetCard
              id="2044670787467297025"
              className="rounded-lg overflow-hidden shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TweetSection;
