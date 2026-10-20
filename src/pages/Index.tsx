import { useState, useEffect, useCallback } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TweetSection from "@/components/TweetSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import KageScene from "@/components/KageScene";
import VentureConstellation from "@/components/VentureConstellation";
import { isIOS, prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  // Defer below-fold sections on iOS to avoid a render avalanche on mount
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    // Give the hero section a frame to paint before mounting the rest
    const t = setTimeout(() => setBelowFoldReady(true), isIOS() ? 400 : 0);
    return () => clearTimeout(t);
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [loaded]);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      {loaded && (
        <main className="kage-page bg-background text-foreground min-h-screen overflow-x-hidden">
          <KageScene />
          <VentureConstellation />
          {/* Grain overlay — hidden on iOS to avoid fixed SVG filter compositing cost */}
          {!isIOS() && <div className="grain-overlay" />}
          <CustomCursor />
          <Navbar />
          <HeroSection />
          {belowFoldReady && (
            <>
              <ProjectsSection />
              <ServicesSection />
              <AboutSection />
              <TweetSection />
              <NewsletterSection />
              <ContactSection />
              <FooterSection />
            </>
          )}
        </main>
      )}
    </>
  );
};

export default Index;
