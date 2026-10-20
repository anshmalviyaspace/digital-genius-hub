import { useEffect, useRef } from "react";
import kravicImage from "@/assets/kravic-preview.png";
import webcomImage from "@/assets/webcom-preview.png";
import justbuildImage from "@/assets/justbuild-preview.webp";

const ventures = [
  { name: "Kravic", category: "Athleisure · D2C", image: kravicImage },
  { name: "Webcom Media", category: "AI · Digital systems", image: webcomImage },
  { name: "JustBuild", category: "Learning · Product", image: justbuildImage },
];

export default function VentureConstellation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isMobile = window.innerWidth < 768;
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = document.getElementById("projects");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const height = window.innerHeight;
      const start = height * 0.72;
      const end = -rect.height + height * 0.28;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      const fadeIn = Math.min(1, progress * 4);
      const fadeOut = Math.max(0, Math.min(1, (0.84 - progress) / 0.24));
      const chapterBlend = fadeIn * fadeOut;
      root.style.opacity = String(chapterBlend * (isMobile ? 0.08 : 0.42));
      const scene = document.querySelector<HTMLElement>(".kage-scene");
      if (scene) scene.style.opacity = String(1 - chapterBlend * (isMobile ? 0.14 : 0.32));
      root.style.setProperty("--venture-progress", String(progress));

      if (isMobile) return;
      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;
        const angle = progress * Math.PI * 2 + index * 2.1;
        const x = Math.cos(angle) * 25 + (index - 1) * 13;
        const y = Math.sin(angle * 0.72) * 24 + (progress - 0.5) * 92;
        const z = 12 + Math.sin(angle) * 16;
        const rotateY = -11 + Math.sin(angle) * 7;
        const rotateX = 4 + Math.cos(angle) * 4;
        panel.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(document.documentElement);
    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      observer.disconnect();
      cancelAnimationFrame(frame);
      const scene = document.querySelector<HTMLElement>(".kage-scene");
      if (scene) scene.style.opacity = "";
    };
  }, []);

  return (
    <div className="venture-constellation" ref={rootRef} aria-hidden="true">
      <div className="venture-orbit venture-orbit-a" />
      <div className="venture-orbit venture-orbit-b" />
      <div className="venture-panels">
        {ventures.map((venture, index) => (
          <article
            className={`venture-panel venture-panel-${index + 1}`}
            key={venture.name}
            ref={(element) => { panelRefs.current[index] = element; }}
          >
            <img src={venture.image} alt="" loading="lazy" decoding="async" />
            <div className="venture-panel-shade" />
            <div className="venture-panel-meta">
              <span>0{index + 1} / VENTURE</span>
              <b>{venture.name}</b>
              <small>{venture.category}</small>
            </div>
            <i className="venture-panel-glint" />
          </article>
        ))}
      </div>
    </div>
  );
}
