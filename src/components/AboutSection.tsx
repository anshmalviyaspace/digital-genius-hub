import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const story = "I build at the intersection of brand, technology, and scale. From Kravic and Webcom Media to JustBuild and a growing set of AI tools, my work is about turning ambitious ideas into systems that keep moving.";
const skills = ["Venture building", "Brand systems", "Digital products", "AI & automation", "Performance marketing"];

function RevealLetter({ character, index, total, progress }: { character: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const opacity = useTransform(progress, [Math.max(0, start - 0.12), Math.min(1, start + 0.055)], [0.18, 1]);
  return <motion.span aria-hidden="true" style={{ opacity }}>{character}</motion.span>;
}

function ScrollReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.2"] });
  return <p ref={ref} className="prisma-about-copy" aria-label={text}>{text.split("").map((character, index) => <RevealLetter key={index} character={character} index={index} total={text.length} progress={scrollYProgress} />)}</p>;
}

export default function AboutSection() {
  const headline = [
    { text: "I’m Ansh Malviya,", className: "" },
    { text: " a founder & builder.", className: "prisma-about-italic" },
    { text: " I turn ideas into ventures that compound.", className: "" },
  ];
  return (
    <section id="about" className="prisma-about-section">
      <div className="prisma-about-card">
        <motion.div className="prisma-about-label" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}><span /> Founder · Systems builder</motion.div>
        <motion.h2 className="prisma-about-heading" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
          {headline.map((segment, segmentIndex) => <span className={segment.className} key={segmentIndex}>{segment.text.split(" ").filter(Boolean).map((word, wordIndex) => <motion.span className="prisma-pull-word" key={segmentIndex + "-" + wordIndex} variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } } }}>{word}&nbsp;</motion.span>)}</span>)}
        </motion.h2>
        <ScrollReveal text={story} />
        <div className="prisma-about-bottom">
          <div className="prisma-about-skills" aria-label="Areas of work">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          <div className="prisma-about-stats"><div><strong>05<span>+</span></strong><small>Ventures</small></div><div><strong>07</strong><small>Products shipped</small></div><div><strong>∞</strong><small>Still building</small></div></div>
        </div>
      </div>
    </section>
  );
}
