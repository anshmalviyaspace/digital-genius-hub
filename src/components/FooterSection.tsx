const FooterSection = () => {
  return (
    <footer className="relative py-10 sm:py-14 noise">
      <div className="container mx-auto px-5 sm:px-8 md:px-16">
        <div className="h-px bg-border/50 mb-10 sm:mb-14" />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* Left */}
          <div>
            <h3 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-foreground leading-none">
              ANSH<span className="text-primary">.</span>
            </h3>
            <p className="font-body text-xs sm:text-sm text-muted-foreground mt-3 max-w-xs leading-relaxed">
              Building ventures that scale with precision and impact.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-10 sm:gap-16">
            <div>
              <h4 className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Navigate</h4>
              <div className="space-y-2">
                {["Work", "Services", "About", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase() === "work" ? "projects" : item.toLowerCase()}`}
                    className="block font-body text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Ventures</h4>
              <div className="space-y-2">
                {[
                  { label: "Kravic", url: "https://kravic.in" },
                  { label: "Webcom Media", url: "https://webcommedia.in" },
                  { label: "Digit Brain", url: "https://digitbrain.lovable.app" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-body text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Social</h4>
              <div className="space-y-2">
                {[
                  { label: "LinkedIn", url: "https://www.linkedin.com/in/imanshmalviya/" },
                  { label: "Twitter", url: "https://x.com/imanshmalviya/" },
                  { label: "Strava", url: "https://strava.app.link/JbMyf0BVo2b" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-body text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-border/30 mt-10 sm:mt-14 mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span className="font-mono text-[9px] sm:text-[10px] text-muted-foreground/50 tracking-wider">
            © {new Date().getFullYear()} ANSH MALVIYA. ALL RIGHTS RESERVED.
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-[9px] sm:text-[10px] text-muted-foreground/50 hover:text-primary tracking-wider transition-colors"
          >
            ↑ BACK TO TOP
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
