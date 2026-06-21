import { useState, useEffect, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
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
import ChatWidget from "@/components/ChatWidget";
import { isIOS } from "@/lib/utils";

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
    // Skip Lenis on iOS — its rAF loop blocks the main thread on WebKit
    if (isIOS()) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [loaded]);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      {loaded && (
        <main className="bg-background text-foreground min-h-screen overflow-x-hidden">
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
              <ChatWidget />
            </>
          )}
        </main>
      )}
    </>
  );
};

export default Index;
