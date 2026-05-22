import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import kravicImg from "@/assets/kravic-preview.png";
import webcomImg from "@/assets/webcom-preview.png";
import { shouldDisableAnimations } from "@/lib/utils";
import MarqueeText from "./MarqueeText";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Kravic",
    subtitle: "Premium Athleisure & Lifestyle Brand",
    description: "A D2C brand redefining premium athleisure wear in India. Built from ground zero — brand identity, e-commerce, performance marketing, and a loyal customer base.",
    link: "https://kravic.in/",
    tags: ["D2C", "Brand", "E-Commerce"],
    image: kravicImg,
    num: "01",
  },
  {
    title: "Webcom Media",
    subtitle: "Full-Service Digital Agency",
    description: "A performance-driven digital agency offering branding, web development, marketing automation, and AI-powered tools to help businesses scale digitally.",
    link: "https://webcommedia.in/",
    tags: ["Agency", "Marketing", "AI"],
    image: webcomImg,
    num: "02",
  },
  {
    title: "DigitBrain",
    subtitle: "AI Digital Brain Assistant",
    description: "A personal AI assistant that organizes knowledge, automates research, and provides strategic insights for entrepreneurs and creators.",
    link: "https://digitbrain.lovable.app/",
    tags: ["AI", "Productivity", "Knowledge"],
    image: null,
    num: "03",
  },
  {
    title: "AdsCampaignStrategizer",
    subtitle: "AI-Powered Ad Campaign Builder",
    description: "An intelligent tool that generates optimized ad campaigns with AI — targeting, creatives, copy, and budget allocation all handled automatically.",
    link: "https://adscampaign.lovable.app/",
    tags: ["AI Tool", "Ads", "Automation"],
    image: null,
    num: "04",
  },
  {
    title: "ROASCal",
    subtitle: "ROAS & Marketing Calculator",
    description: "A precision calculator for marketers to compute Return on Ad Spend, CPA, and profitability metrics across campaigns and channels.",
    link: "https://roascal.lovable.app/",
    tags: ["SaaS", "Analytics", "Marketing"],
    image: null,
    num: "05",
  },
  {
    title: "Adsanalyser",
    subtitle: "Get clear insights, actionable recommendations with confidence scores — no more guessing.",
    description: "Simply drag & drop your Meta Ads screenshot. Our AI reads and extracts all campaign data. Then recommends exact actions to improve results.",
    link: "https://adsanalyser.lovable.app/",
    tags: ["SaaS", "Analytics", "Insights"],
    image: null,
    num: "06",
  },

];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (shouldDisableAnimations()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-label",
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".proj-label", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".proj-title-main",
        { y: 80 },
        {
          y: 0, duration: 1, ease: "power4.out",
          scrollTrigger: { trigger: ".proj-title-main", start: "top 85%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".proj-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-20 sm:py-32 md:py-40 noise">
      <MarqueeText text="SELECTED WORK ✦" className="mb-12 sm:mb-20" />

      <div className="container mx-auto px-5 sm:px-8 md:px-16">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-20">
          <div>
            <div className="proj-label flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary">
                Featured Work
              </span>
            </div>
            <div className="overflow-hidden">
              <h2 className="proj-title-main font-heading font-bold text-3xl sm:text-5xl md:text-7xl tracking-[-0.03em] text-foreground">
                Ventures &<br />Products
              </h2>
            </div>
          </div>
          <p className="proj-label font-body text-sm text-muted-foreground max-w-xs leading-relaxed">
            From premium brands to AI-powered tools — each built with systems thinking and relentless execution.
          </p>
        </div>

        {/* Featured projects — large cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {projects.slice(0, 2).map((project) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-item group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-card min-h-[320px] sm:min-h-[420px] flex flex-col justify-end cursor-pointer"
              whileHover={{ scale: 0.985 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              
              <div className="relative z-10 p-6 sm:p-8 md:p-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] tracking-widest text-primary">{project.num}</span>
                  <div className="w-6 h-px bg-primary/40" />
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-primary/50">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Tool projects — horizontal list */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {projects.slice(2).map((project) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-item group relative bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-border/50 hover:border-primary/30 transition-all duration-500"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-mono text-[10px] tracking-widest text-primary/60">{project.num}</span>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground mt-3 mb-2 group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                {project.subtitle}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[8px] tracking-wider uppercase text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <svg className="absolute top-6 right-6 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
