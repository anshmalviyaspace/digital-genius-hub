import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { isIOS } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const BEEHIIV_URL = "https://buildyoung.beehiiv.com";

interface Post {
  title: string;
  excerpt: string;
  date: string;
  url: string;
}

const FALLBACK: Post[] = [
  {
    title: "Everyone's using AI. Almost nobody is using it right.",
    excerpt: "It's not about which tool. It's about how you think.",
    date: "May 6, 2026",
    url: "https://buildyoung.beehiiv.com/p/everyone-s-using-ai-almost-nobody-is-using-it-right",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const titleLine = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};

const NewsletterSection = () => {
  const [posts, setPosts] = useState<Post[]>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("fetch-newsletter-posts");
        if (!error && mounted && data?.posts?.length) {
          setPosts(data.posts);
        }
      } catch (e) {
        console.error("Newsletter fetch failed:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const [latest, ...rest] = posts;

  return (
    <section
      id="newsletter"
      className="relative py-16 sm:py-24 md:py-28 noise overflow-hidden"
    >
      {/* Ambient glow — skipped on iOS */}
      {!isIOS() && (
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[140px] pointer-events-none" />
      )}

      <div className="container mx-auto px-5 sm:px-8 md:px-16 relative z-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary">
              Newsletter
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            {loading ? "Syncing…" : `${posts.length} ${posts.length === 1 ? "Issue" : "Issues"}`}
          </span>
        </div>

        <motion.div 
          className="mb-10 sm:mb-14"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="overflow-hidden">
            <motion.h2 variants={titleLine} className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.04em] text-foreground leading-[0.9]">
              Build
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2 variants={titleLine} className="font-heading font-bold italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.04em] text-gradient leading-[0.9]">
              Young.
            </motion.h2>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Left — description + posts */}
          <div className="lg:col-span-8 space-y-8">
            <motion.p variants={fadeUp} className="font-body text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              The real-time playbook for Gen Z building companies, systems, and
              themselves. Raw lessons from the trenches — every week.
            </motion.p>

            {/* Latest issue — featured */}
            {latest && (
              <motion.a
                variants={fadeUp}
                href={latest.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-border hover:border-primary/50 rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:bg-primary/[0.02]"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary">
                    Latest Issue
                  </span>
                  {latest.date && (
                    <span className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
                      {latest.date}
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl tracking-[-0.02em] text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                  {latest.title}
                </h3>
                {latest.excerpt && (
                  <p className="font-body text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed">
                    {latest.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-6 font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-foreground group-hover:text-primary transition-colors">
                  Read on Beehiiv
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </motion.a>
            )}

            {/* Archive — auto-populated */}
            {rest.length > 0 && (
              <motion.div variants={fadeUp} className="border-t border-border/60 pt-6 space-y-1">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-3">
                  Archive
                </span>
                {rest.map((p) => (
                  <a
                    key={p.url}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-4 py-3 border-b border-border/30 hover:border-primary/40 transition-colors"
                  >
                    <span className="font-heading text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
                      {p.title}
                    </span>
                    {p.date && (
                      <span className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground shrink-0">
                        {p.date}
                      </span>
                    )}
                  </a>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right — Subscribe CTA */}
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <div className="border border-border rounded-2xl p-6 sm:p-8 bg-card/40">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary">
                Subscribe
              </span>
              <h4 className="font-heading font-bold text-2xl sm:text-3xl tracking-[-0.02em] text-foreground mt-3 leading-tight">
                Get it in your inbox.
              </h4>
              <p className="font-body text-sm text-muted-foreground mt-2 mb-6">
                Free. No spam. Unsubscribe anytime.
              </p>

              <motion.a
                href={BEEHIIV_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-full font-heading font-semibold text-sm hover:shadow-[0_0_40px_8px_hsl(32_100%_55%/0.2)] transition-shadow duration-500"
              >
                Subscribe on Beehiiv
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>

              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground/60 mt-5 text-center">
                Updates auto-sync from Beehiiv
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
