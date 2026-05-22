import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldDisableAnimations } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Brand Building",
    desc: "Logo systems, visual identity, color palettes, typography, and complete brand storytelling for startups and D2C brands.",
    details: ["Logo Design", "Brand Strategy", "Visual Identity", "Packaging"],
  },
  {
    num: "02",
    title: "Performance Marketing",
    desc: "Meta Ads, Google Ads, funnel architecture, and data-driven campaigns that deliver measurable ROAS and growth.",
    details: ["Meta Ads", "Google Ads", "Funnel Design", "Analytics"],
  },
  {
    num: "03",
    title: "Web & Digital",
    desc: "Custom websites, landing pages, e-commerce platforms, and digital experiences that convert and captivate.",
    details: ["Web Design", "E-Commerce", "Landing Pages", "UI/UX"],
  },
  {
    num: "04",
    title: "AI & Automation",
    desc: "Custom AI tools, marketing automation, n8n workflows, and intelligent systems that free your time and scale output.",
    details: ["AI Tools", "n8n Workflows", "GoHighLevel", "Chatbots"],
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (shouldDisableAnimations()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-heading",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".svc-heading", start: "top 85%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".svc-row").forEach((row) => {
        gsap.fromTo(
          row,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-16 sm:py-24 md:py-28 noise">
      <div className="container mx-auto px-5 sm:px-8 md:px-16">
        {/* Header */}
        <div className="svc-heading flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary">
                Capabilities
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-foreground">
              What I<br />Bring
            </h2>
          </div>
          <p className="font-body text-sm text-muted-foreground max-w-xs leading-relaxed">
            End-to-end execution across brand, marketing, technology, and automation.
          </p>
        </div>

        {/* Service rows — editorial horizontal layout */}
        <div className="space-y-0">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              className="svc-row group border-t border-border/50 py-8 sm:py-10 md:py-12 cursor-pointer"
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="grid grid-cols-12 gap-4 items-start">
                {/* Number */}
                <div className="col-span-2 sm:col-span-1">
                  <span className="font-mono text-xs text-primary/50 group-hover:text-primary transition-colors duration-300">
                    {service.num}
                  </span>
                </div>

                {/* Title */}
                <div className="col-span-10 sm:col-span-3">
                  <h3 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-12 sm:col-span-4 sm:col-start-5">
                  <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2 sm:mt-0">
                    {service.desc}
                  </p>
                </div>

                {/* Tags */}
                <div className="col-span-12 sm:col-span-3 sm:col-start-10 flex flex-wrap gap-1.5 mt-3 sm:mt-0 sm:justify-end">
                  {service.details.map((d) => (
                    <span key={d} className="font-mono text-[8px] sm:text-[9px] tracking-wider uppercase text-muted-foreground/70 bg-muted/50 px-2 py-0.5 rounded-full group-hover:bg-primary/10 group-hover:text-primary/80 transition-all duration-300">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-border/50" />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
