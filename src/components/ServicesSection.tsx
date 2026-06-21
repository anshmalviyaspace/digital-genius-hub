import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

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

const ServicesSection = () => (
  <section id="services" className="relative py-16 sm:py-24 md:py-28 noise">
    <div className="container mx-auto px-5 sm:px-8 md:px-16">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary">Capabilities</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-foreground">
            What I<br />Bring
          </motion.h2>
        </div>
        <motion.p variants={fadeUp} className="font-body text-sm text-muted-foreground max-w-xs leading-relaxed">
          End-to-end execution across brand, marketing, technology, and automation.
        </motion.p>
      </motion.div>

      {/* Service rows */}
      <div className="space-y-0">
        {services.map((service, i) => (
          <motion.div
            key={service.num}
            className="group border-t border-border/50 py-6 sm:py-10 md:py-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
          >
            <div className="flex flex-col sm:grid sm:grid-cols-12 sm:gap-4 sm:items-start gap-3">
              <div className="flex items-baseline gap-3 sm:contents">
                <div className="sm:col-span-1">
                  <span className="font-mono text-xs text-primary/50">{service.num}</span>
                </div>
                <div className="sm:col-span-3">
                  <h3 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
              </div>
              <div className="sm:col-span-4 sm:col-start-5">
                <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
              <div className="sm:col-span-3 sm:col-start-10 flex flex-wrap gap-1.5 sm:justify-end">
                {service.details.map((d) => (
                  <span key={d} className="font-mono text-[8px] sm:text-[9px] tracking-wider uppercase text-muted-foreground/70 bg-muted/50 px-2 py-1 rounded-full">
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

export default ServicesSection;
