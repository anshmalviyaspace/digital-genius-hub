import { motion } from "framer-motion";
import kravicImg from "@/assets/kravic-preview.png";
import webcomImg from "@/assets/webcom-preview.png";
import justbuildImg from "@/assets/justbuild-preview.webp";
import MarqueeText from "./MarqueeText";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

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
    subtitle: "AI Consulting Agency",
    description: "Helping businesses design, build, and scale intelligent systems and AI-powered tools to help businesses scale digitally.",
    link: "https://webcommedia.in/",
    tags: ["Agency", "Marketing", "AI"],
    image: webcomImg,
    num: "02",
  },
  {
    title: "JustBuild",
    subtitle: "Build While You Learn",
    description: "India's first build-first platform for college students — learn AI, design, and tech by shipping real projects, not watching videos. Free forever. Now open for early signups.",
    link: "https://justbuild.org.in/",
    tags: ["EdTech", "AI", "Students"],
    image: justbuildImg,
    num: "03",
  },
  {
    title: "DigitBrain",
    subtitle: "AI Digital Brain Assistant",
    description: "A personal AI assistant that organizes knowledge, automates research, and provides strategic insights for entrepreneurs and creators.",
    link: "https://digitbrain.lovable.app/",
    tags: ["AI", "Productivity", "Knowledge"],
    image: null,
    num: "04",
  },
  {
    title: "AdsCampaignStrategizer",
    subtitle: "AI-Powered Ad Campaign Builder",
    description: "An intelligent tool that generates optimized ad campaigns with AI — targeting, creatives, copy, and budget allocation all handled automatically.",
    link: "https://adscampaign.lovable.app/",
    tags: ["AI Tool", "Ads", "Automation"],
    image: null,
    num: "05",
  },
  {
    title: "ROASCal",
    subtitle: "ROAS & Marketing Calculator",
    description: "A precision calculator for marketers to compute Return on Ad Spend, CPA, and profitability metrics across campaigns and channels.",
    link: "https://roascal.lovable.app/",
    tags: ["SaaS", "Analytics", "Marketing"],
    image: null,
    num: "06",
  },
  {
    title: "Adsanalyser",
    subtitle: "AI-powered Meta Ads analyser",
    description: "Simply drag & drop your Meta Ads screenshot. Our AI reads and extracts all campaign data, then recommends exact actions to improve results.",
    link: "https://adsanalyser.lovable.app/",
    tags: ["SaaS", "Analytics", "Insights"],
    image: null,
    num: "07",
  },
];

const ProjectsSection = () => (
  <section id="projects" className="relative py-16 sm:py-32 md:py-40 noise">
    <MarqueeText text="SELECTED WORK ✦" className="mb-10 sm:mb-20" />

    <div className="container mx-auto px-5 sm:px-8 md:px-16">
      {/* Section header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-20"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary">
              Featured Work
            </span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              variants={fadeUp}
              className="font-heading font-bold text-3xl sm:text-5xl md:text-7xl tracking-[-0.03em] text-foreground"
            >
              Ventures &<br />Products
            </motion.h2>
          </div>
        </div>
        <motion.p variants={fadeUp} className="font-body text-sm text-muted-foreground max-w-xs leading-relaxed">
          From premium brands to AI-powered tools — each built with systems thinking and relentless execution.
        </motion.p>
      </motion.div>

      {/* Featured projects */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {projects.slice(0, 3).map((project) => (
          <motion.a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-card min-h-[280px] sm:min-h-[420px] flex flex-col justify-end cursor-pointer"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="relative z-10 p-5 sm:p-8 md:p-10">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="font-mono text-[10px] tracking-widest text-primary">{project.num}</span>
                <div className="w-6 h-px bg-primary/40" />
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground">{tag}</span>
                ))}
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-3xl md:text-4xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed line-clamp-3 sm:line-clamp-none">
                {project.description}
              </p>
            </div>
            <div className="absolute top-5 right-5 sm:top-8 sm:right-8 w-9 h-9 rounded-full border border-foreground/20 flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
              </svg>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Tool projects */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {projects.slice(3).map((project) => (
          <motion.a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            whileTap={{ scale: 0.97 }}
            className="group relative bg-card rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-border/50 transition-colors duration-300 touch-manipulation overflow-hidden"
          >
            <span className="font-mono text-[10px] tracking-widest text-primary/60">{project.num}</span>
            <h3 className="font-heading font-bold text-[13px] sm:text-xl text-foreground mt-2 sm:mt-3 mb-1 sm:mb-2 leading-tight break-words group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <p className="font-body text-[11px] sm:text-xs text-muted-foreground leading-relaxed mb-3 sm:mb-4 line-clamp-2">
              {project.subtitle}
            </p>
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="font-mono text-[8px] tracking-wider uppercase text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <svg className="absolute top-4 right-4 sm:top-6 sm:right-6 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProjectsSection;
