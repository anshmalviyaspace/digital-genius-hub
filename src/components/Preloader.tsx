import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      setProgress(100);
      setPhase("done");
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("reveal"), 120);
          setTimeout(() => {
            setPhase("done");
            onComplete();
          }, 500);
          return 100;
        }
        return p + Math.random() * 25 + 8;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        >
          {/* Subtle grid lines */}
          <div className="absolute inset-0 opacity-[0.03]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-foreground"
                style={{ left: `${(i + 1) * (100 / 7)}%` }}
              />
            ))}
          </div>

          {/* Name reveal */}
          <div className="relative overflow-hidden">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
              className="font-heading font-bold text-5xl sm:text-7xl md:text-9xl tracking-tighter text-foreground"
            >
              ANSH
            </motion.h1>
          </div>
          <div className="relative overflow-hidden mt-[-0.1em]">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
              className="font-heading font-bold text-5xl sm:text-7xl md:text-9xl tracking-tighter text-gradient"
            >
              MALVIYA
            </motion.h1>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 left-8 right-8 sm:left-16 sm:right-16"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[10px] sm:text-xs text-muted-foreground tracking-widest uppercase">
                Loading experience
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-primary tabular-nums">
                {Math.min(100, Math.round(progress))}%
              </span>
            </div>
            <div className="h-px bg-border relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-primary"
                style={{ width: `${Math.min(100, progress)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>

          {/* Corner details */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute top-8 left-8 sm:top-12 sm:left-16 font-mono text-[10px] text-muted-foreground tracking-widest"
          >
            PORTFOLIO © 2026
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="absolute top-8 right-8 sm:top-12 sm:right-16 font-mono text-[10px] text-muted-foreground tracking-widest"
          >
            FOUNDER · BUILDER · ATHLETE
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
