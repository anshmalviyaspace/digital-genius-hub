import logoImg from "@/assets/logo.svg";

const FooterSection = () => {
  return (
    <footer className="relative py-10 sm:py-14 noise">
      <div className="container mx-auto px-5 sm:px-8 md:px-16">
        <div className="h-px bg-border/50 mb-8 sm:mb-14" />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 sm:gap-10">
          {/* Brand */}
          <div>
            <a href="#hero">
              <img
                src={logoImg}
                alt="Ansh Malviya"
                className="h-12 sm:h-14 w-auto object-contain"
                draggable={false}
              />
            </a>
            <p className="font-body text-xs sm:text-sm text-muted-foreground mt-3 max-w-xs leading-relaxed">
              Building ventures that scale with precision and impact.
            </p>
          </div>

          {/* Links — wraps to 2-col on mobile instead of overflowing */}
          <div className="grid grid-cols-3 gap-6 sm:flex sm:gap-16">
            <div>
              <h4 className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-primary mb-3 sm:mb-4">
                Navigate
              </h4>
              <div className="space-y-2 sm:space-y-2">
                {[
                  { label: "Work", href: "#projects" },
                  { label: "Services", href: "#services" },
                  { label: "About", href: "#about" },
                  { label: "Contact", href: "#contact" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block font-body text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-0.5"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-primary mb-3 sm:mb-4">
                Ventures
              </h4>
              <div className="space-y-2">
                {[
                  { label: "Kravic", url: "https://kravic.in" },
                  { label: "Webcom Media", url: "https://webcommedia.in" },
                  { label: "JustBuild", url: "https://justbuild.org.in" },
                  { label: "Digit Brain", url: "https://digitbrain.lovable.app" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-body text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-0.5"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-primary mb-3 sm:mb-4">
                Social
              </h4>
              <div className="space-y-2">
                {[
                  { label: "LinkedIn",  url: "https://www.linkedin.com/in/imanshmalviya/" },
                  { label: "Twitter",   url: "https://x.com/imanshmalviya/"               },
                  { label: "Instagram", url: "https://www.instagram.com/imanshmalviya/"   },
                  { label: "Strava",    url: "https://strava.app.link/JbMyf0BVo2b"        },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-body text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-0.5"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-border/30 mt-8 sm:mt-14 mb-5 sm:mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span className="font-mono text-[9px] sm:text-[10px] text-muted-foreground/50 tracking-wider">
            © {new Date().getFullYear()} ANSH MALVIYA. ALL RIGHTS RESERVED.
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-[9px] sm:text-[10px] text-muted-foreground/50 hover:text-primary tracking-wider transition-colors py-1 touch-manipulation"
          >
            ↑ BACK TO TOP
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
