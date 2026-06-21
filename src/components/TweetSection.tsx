import { motion } from "framer-motion";
import { TweetCard } from "./ui/tweet-card";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const TweetSection = () => {
  return (
    <section id="tweets" className="relative py-16 sm:py-24 noise">
      <div className="container mx-auto px-5 sm:px-8 md:px-16">
        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-14"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary">
                Recognition
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-foreground">
              Featured<br />Moments
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="font-body text-sm text-muted-foreground max-w-xs leading-relaxed">
            Insights and updates from the journey of building, creating, and innovating.
          </motion.p>
        </motion.div>

        {/* Tweet */}
        <motion.div 
          className="flex justify-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="w-full max-w-md">
            <TweetCard
              id="2044670787467297025"
              className="rounded-xl overflow-hidden shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TweetSection;
