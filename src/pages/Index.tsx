import { useState, useEffect, useCallback } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import FooterSection from "@/components/FooterSection";
import KageScene from "@/components/KageScene";
import { isIOS, prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const [loaded, setLoaded] = useState(false);
  const handlePreloaderComplete = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (!loaded || prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.2, lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(updateLenis); lenis.destroy(); };
  }, [loaded]);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      {loaded && (
        <main className="prisma-page min-h-screen overflow-x-clip">
          <KageScene />
          <div className="prisma-page-shade" aria-hidden="true" />
          {!isIOS() && <div className="grain-overlay" />}
          <CustomCursor />
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <FooterSection />
        </main>
      )}
    </>
  );
}
