import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/.test(navigator.userAgent);
}

export function isIOS() {
  if (typeof window === "undefined") return false;
  const win = window as Window & { MSStream?: unknown };
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !win.MSStream;
}

export function shouldDisableAnimations() {
  // Only disable for users who explicitly prefer reduced motion.
  // Do NOT disable on mobile — Framer Motion handles mobile animations fine.
  return prefersReducedMotion();
}
