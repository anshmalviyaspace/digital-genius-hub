import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldDisableAnimations } from "@/lib/utils";
import MarqueeText from "./MarqueeText";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Software Engineering", level: 92 },
  { name: "Performance Marketing", level: 88 },
  { name: "Brand Strategy", level: 85 },
  { name: "AI & Automation", level: 82 },
  { name: "Systems Thinking", level: 95 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Word-reveal scrub — desktop only (GSAP ScrollTrigger scrub)
  useEffect(() => {
    if (!textRef.current || shouldDisableAnimations()) return;

    const ctx = gsap.context(() => {
      const text = textRef.current!;
      const words = text.innerText.split(" ");
      text.innerHTML = words
        .map((w) => `<span class="about-word inline-block mr-[0.25em] opacity-[0.12] transition-none">${w}</span>`)
        .join("");

      gsap.to(".about-word", {
        opacity: 1,
        stagger: 0.025,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center 45%",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".skill-bar").forEach((bar) => {
        const fill = bar.querySelector(".skill-fill") as HTMLElement;
        if (!fill) return;
        gsap.fromTo(fill, { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 90%" } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-16 sm:py-24 md:py-28 noise">
      <MarqueeText text="ABOUT ME ✦ THE STORY ✦" className="mb-10 sm:mb-14" />

      <div className="container mx-auto px-5 sm:px-8 md:px-16">
        {/* Big paragraph */}
        <motion.div
          className="max-w-5xl mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary">About</span>
          </div>
          <p
            ref={textRef}
            className="font-heading font-medium text-lg sm:text-2xl md:text-4xl lg:text-5xl text-foreground leading-[1.35] tracking-[-0.02em]"
          >
            I blend entrepreneurship, strategy, and technology to create powerful digital ecosystems. At 19, I've founded Kravic — a premium athleisure brand, built Webcom Media — a digital agency, launched JustBuild — India's first build-first platform for students, and multiple AI-powered tools. Every system I build is designed to scale.
          </p>
        </motion.div>

        {/* Skills + Philosophy */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Skills */}
          <motion.div variants={fadeUp}>
            <h3 className="font-heading font-bold text-lg sm:text-2xl text-foreground mb-6 sm:mb-8">Core Capabilities</h3>
            <div className="space-y-5 sm:space-y-6">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-body text-xs sm:text-sm text-foreground">{skill.name}</span>
                    <span className="font-mono text-[10px] text-primary">{skill.level}%</span>
                  </div>
                  <div className="skill-bar h-[2px] bg-border relative overflow-hidden">
                    <motion.div
                      className="absolute left-0 top-0 h-full bg-primary origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div variants={fadeUp}>
            <h3 className="font-heading font-bold text-lg sm:text-2xl text-foreground mb-6 sm:mb-8">Philosophy</h3>
            <div className="space-y-5 sm:space-y-6">
              {[
                { title: "Systems Over Goals", desc: "I design systems that compound over time rather than chasing isolated wins." },
                { title: "Speed × Quality", desc: "Ship fast, iterate relentlessly, maintain an uncompromising standard." },
                { title: "Build in Public", desc: "Transparency, accountability, and momentum through radical openness." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="border-l-2 border-primary/30 pl-4 sm:pl-5"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h4 className="font-heading font-semibold text-sm sm:text-base text-foreground mb-1">{item.title}</h4>
                  <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="mt-8 sm:mt-10 bg-card rounded-xl p-5 sm:p-6 border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-body text-sm italic text-foreground/80 leading-relaxed">
                "Every system is perfectly designed to get the results it gets."
              </p>
              <span className="font-mono text-[10px] text-muted-foreground mt-3 block">— Core Belief</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
