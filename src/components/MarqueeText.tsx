const MarqueeText = ({ text, className = "" }: { text: string; className?: string }) => {
  const items = Array(6).fill(text);
  
  return (
    <div className={`overflow-hidden blur-edge-left ${className}`}>
      <div className="marquee-track">
        {items.map((t, i) => (
          <span key={i} className="font-heading font-bold text-[clamp(3rem,10vw,8rem)] tracking-[-0.03em] text-foreground/[0.04] whitespace-nowrap px-4 sm:px-8 select-none">
            {t}
          </span>
        ))}
        {items.map((t, i) => (
          <span key={`dup-${i}`} className="font-heading font-bold text-[clamp(3rem,10vw,8rem)] tracking-[-0.03em] text-foreground/[0.04] whitespace-nowrap px-4 sm:px-8 select-none">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeText;
