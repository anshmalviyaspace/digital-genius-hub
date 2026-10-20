import { motion } from "framer-motion";
import heroImg from "@/assets/ansh-hero.png";
import { shouldDisableAnimations } from "@/lib/utils";

const HeroSection = () => {
  const reduceMotion = shouldDisableAnimations();

  return (
    <section id="hero" className="kage-hero relative min-h-[100svh] overflow-hidden">
      <div className="kage-hero-grain" aria-hidden="true" />

      <div className="kage-hero-inner relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col justify-between px-5 pb-7 pt-28 sm:px-8 sm:pb-10 sm:pt-32 lg:px-16">
        <div className="kage-hero-main grid flex-1 items-center gap-7 py-9 md:grid-cols-[1fr_0.55fr] lg:gap-16">
          <div className="kage-hero-copy">
            <motion.div
              className="kage-eyebrow"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              <span className="kage-pip" />
              <span>Chapter 00</span><i />
              <span>Founder · Builder · Athlete</span>
            </motion.div>

            <motion.h1
              className="kage-display kage-name"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            >
              ANSH<br /><span>MALVIYA</span>
            </motion.h1>

            <motion.div
              className="kage-hero-intro"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="kage-intro-rule" />
              <p>At the intersection of <em>brand</em>, <em>technology</em>, and <em>scale</em>, I build ventures designed to keep growing.</p>
            </motion.div>

            <motion.div
              className="kage-stats"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div><b>05<span>+</span></b><small>Ventures</small></div>
              <div><b>19</b><small>Years young</small></div>
              <div><b>∞</b><small>In motion</small></div>
            </motion.div>
          </div>

          <motion.div
            className="kage-portrait-wrap"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="kage-portrait-frame">
              <img src={heroImg} alt="Ansh Malviya" width={975} height={1104} fetchPriority="high" />
              <div className="kage-portrait-wash" />
              <span className="kage-portrait-index">IND · 19°N 73°E</span>
              <span className="kage-portrait-caption">The maker behind the work</span>
            </div>
            <span className="kage-orbit orbit-one" aria-hidden="true" />
            <span className="kage-orbit orbit-two" aria-hidden="true" />
            <div className="kage-hero-seal" aria-hidden="true">
              <span>BUILD /</span>
              <strong>05</strong>
              <small>VENTURES<br />IN MOTION</small>
            </div>
          </motion.div>
        </div>

        <div className="kage-hero-foot">
          <a href="#projects" className="kage-scroll-cue">
            <span>Walk through the work</span><i /><span aria-hidden="true">↓</span>
          </a>
          <div className="kage-chapter-nav" aria-label="Portfolio chapters">
            <a href="#projects"><b>01</b><span>Ventures</span><i>Selected work</i></a>
            <a href="#services"><b>02</b><span>Craft</span><i>Capabilities</i></a>
            <a href="#about"><b>03</b><span>Principles</span><i>How I build</i></a>
            <a href="#contact"><b>04</b><span>Next</span><i>Let's talk</i></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
