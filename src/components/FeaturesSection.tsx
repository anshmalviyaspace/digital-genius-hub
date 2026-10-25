import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import TweetSection from "@/components/TweetSection";
import kravicImg from "@/assets/kravic-banner.jpg";
import webcomImg from "@/assets/webcom-banner.jpg";
import justbuildImg from "@/assets/justbuild-banner.jpg";

const projects = [
  { num: "01", title: "Kravic", category: "Premium athleisure", description: "A D2C brand built from the ground up — identity, e-commerce, performance marketing, and a growing community.", image: kravicImg, href: "https://kravic.in/", tags: ["Brand", "E-commerce"] },
  { num: "02", title: "Webcom Media", category: "AI consulting agency", description: "Designing and building intelligent systems and digital tools that help ambitious businesses scale.", image: webcomImg, href: "https://webcommedia.in/", tags: ["Agency", "AI"] },
  { num: "03", title: "JustBuild", category: "Build-first learning", description: "A platform for students to learn AI, design, and technology by shipping real projects — not just watching lessons.", image: justbuildImg, href: "https://justbuild.org.in/", tags: ["EdTech", "Community"] },
  { num: "04", title: "DigitBrain", category: "AI digital brain", description: "A personal assistant for organizing knowledge, automating research, and surfacing useful insights.", image: null, href: "https://digitbrain.lovable.app/", tags: ["AI", "Productivity"] },
];
const tools = [
  { num: "05", title: "AdsCampaignStrategizer", note: "AI-powered ad campaign builder", href: "https://adscampaign.lovable.app/" },
  { num: "06", title: "ROASCal", note: "ROAS & marketing calculator", href: "https://roascal.lovable.app/" },
  { num: "07", title: "Adsanalyser", note: "Meta Ads analysis and recommendations", href: "https://adsanalyser.lovable.app/" },
];
const capabilities = [
  { num: "01", title: "Brand building", items: ["Strategy", "Identity", "Packaging"] },
  { num: "02", title: "Growth systems", items: ["Meta & Google Ads", "Funnel design", "Analytics"] },
  { num: "03", title: "Web & digital", items: ["Websites", "E-commerce", "UI / UX"] },
  { num: "04", title: "AI & automation", items: ["AI tools", "n8n workflows", "Chatbots"] },
];
const ease = [0.22, 1, 0.36, 1] as const;
const cardVariants = { hidden: { opacity: 0, y: 26, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease } } };

export default function FeaturesSection() {
  return (
    <section id="ventures" className="prisma-features-section">
      <div className="prisma-features-inner">
        <div className="prisma-features-heading">
          <div><div className="prisma-eyebrow"><span /> Selected work · 2026</div><h2>Ideas made<br /><em>real.</em></h2></div>
          <p>Ventures, brands, and tools built with curiosity, intent, and a bias toward shipping.</p>
        </div>
        <motion.div className="prisma-project-grid" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}>
          {projects.map((project) => (
            <motion.a key={project.num} href={project.href} target="_blank" rel="noopener noreferrer" className="prisma-project-card group" variants={cardVariants}>
              <div className="prisma-project-art">{project.image ? <img src={project.image} alt={project.title + " logo"} loading="lazy" /> : <div className="prisma-project-placeholder" aria-hidden="true">DB<span>Knowledge, connected.</span></div>}<span className="prisma-project-num">{project.num} / 07</span><span className="prisma-project-open"><ArrowUpRight aria-hidden="true" /></span></div>
              <div className="prisma-project-info">
                <div className="prisma-project-meta"><span>{project.category}</span><span>{project.num}</span></div>
                <h3>{project.title}</h3><p>{project.description}</p>
                <div className="prisma-project-tags">{project.tags.map((tag) => <span key={tag}><Check aria-hidden="true" />{tag}</span>)}</div>
              </div>
            </motion.a>
          ))}
        </motion.div>
        <div className="prisma-tools-row" aria-label="More products">
          {tools.map((tool) => <a href={tool.href} target="_blank" rel="noopener noreferrer" key={tool.num} className="prisma-tool-card group"><span>{tool.num}</span><div><h3>{tool.title}</h3><p>{tool.note}</p></div><ArrowUpRight aria-hidden="true" /></a>)}
        </div>
        <div id="capabilities" className="prisma-capabilities">
          <div className="prisma-capabilities-heading"><div className="prisma-eyebrow"><span /> How I build</div><h2>From first thought<br />to <em>what’s next.</em></h2></div>
          <div className="prisma-capability-grid">
            {capabilities.map((capability) => <motion.div key={capability.num} className="prisma-capability-card" variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }}><span className="prisma-capability-num">{capability.num}</span><h3>{capability.title}</h3><ul>{capability.items.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></motion.div>)}
          </div>
        </div>
        <TweetSection />
        <div id="dispatch" className="prisma-dispatch"><div><span>Build Young · Dispatch</span><p>Notes from the trenches on building companies, systems, and yourself.</p></div><a href="https://buildyoung.beehiiv.com" target="_blank" rel="noopener noreferrer">Read the newsletter <ArrowUpRight aria-hidden="true" /></a></div>
        <div id="contact" className="prisma-contact-band"><div><span>Have something in mind?</span><h2>Let’s build<br /><em>something great.</em></h2></div><a href="mailto:anshmalviya010@gmail.com">Get in touch <ArrowUpRight aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}
