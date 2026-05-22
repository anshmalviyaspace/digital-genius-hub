import { useEffect, useRef } from "react";
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

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

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
        gsap.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 90%" },
          }
        );
      });

      gsap.fromTo(
        ".about-skills",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".about-skills", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-16 sm:py-24 md:py-28 noise">
      <MarqueeText text="ABOUT ME ✦ THE STORY ✦" className="mb-10 sm:mb-14" />

      <div className="container mx-auto px-5 sm:px-8 md:px-16">
        {/* Big paragraph with word reveal */}
        <div className="max-w-5xl mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary">
              About
            </span>
          </div>
          <p
            ref={textRef}
            className="font-heading font-medium text-xl sm:text-2xl md:text-4xl lg:text-5xl text-foreground leading-[1.3] tracking-[-0.02em]"
          >
            I blend entrepreneurship, strategy, and technology to create powerful digital ecosystems. At 19, I've founded Kravic — a premium athleisure brand, built Webcom Media — a digital agency, and launched multiple AI-powered tools. Every system I build is designed to scale.
          </p>
        </div>

        {/* Skills + Philosophy grid */}
        <div className="about-skills grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          {/* Skills bars */}
          <div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground mb-8">
              Core Capabilities
            </h3>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-body text-xs sm:text-sm text-foreground">{skill.name}</span>
                    <span className="font-mono text-[10px] text-primary">{skill.level}%</span>
                  </div>
                  <div className="skill-bar h-[2px] bg-border relative overflow-hidden">
                    <div
                      className="skill-fill absolute left-0 top-0 h-full bg-primary origin-left"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground mb-8">
              Philosophy
            </h3>
            <div className="space-y-6">
              {[
                { title: "Systems Over Goals", desc: "I design systems that compound over time rather than chasing isolated wins." },
                { title: "Speed × Quality", desc: "Ship fast, iterate relentlessly, maintain an uncompromising standard." },
                { title: "Build in Public", desc: "Transparency, accountability, and momentum through radical openness." },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-primary/30 pl-5 hover:border-primary transition-colors duration-300">
                  <h4 className="font-heading font-semibold text-sm sm:text-base text-foreground mb-1">{item.title}</h4>
                  <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="mt-10 bg-card rounded-xl p-6 border border-border/50">
              <p className="font-body text-sm italic text-foreground/80 leading-relaxed">
                "Every system is perfectly designed to get the results it gets."
              </p>
              <span className="font-mono text-[10px] text-muted-foreground mt-3 block">— Core Belief</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
