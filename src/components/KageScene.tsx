import { useEffect, useRef, useState } from "react";
import { isMobileDevice, prefersReducedMotion } from "@/lib/utils";

const frameUrls = Object.entries(
  import.meta.glob<string>("/src/assets/valley-frames/*.jpg", {
    eager: true,
    query: "?url",
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

export default function KageScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!host || !canvas || !context || frameUrls.length === 0) return;
    if (isMobileDevice() || prefersReducedMotion()) return;

    let cancelled = false;
    let rafId = 0;
    let width = 1;
    let height = 1;
    let progress = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let lastIndex = 0;
    let lastRenderedIndex = -1;
    let lastRenderedPointerX = 0.5;
    let lastRenderedPointerY = 0.5;
    let targetIndex = 0;
    const cache = new Map<number, HTMLImageElement>();
    const pending = new Map<number, Promise<HTMLImageElement | null>>();

    const trimCache = () => {
      while (cache.size > 6) {
        const oldest = cache.keys().next().value as number | undefined;
        if (oldest === undefined) break;
        cache.delete(oldest);
      }
    };

    const loadFrame = (index: number): Promise<HTMLImageElement | null> => {
      const boundedIndex = Math.max(0, Math.min(frameUrls.length - 1, index));
      const cached = cache.get(boundedIndex);
      if (cached) {
        cache.delete(boundedIndex);
        cache.set(boundedIndex, cached);
        return Promise.resolve(cached);
      }
      const existing = pending.get(boundedIndex);
      if (existing) return existing;

      const promise = new Promise<HTMLImageElement | null>((resolve) => {
        const image = new Image();
        image.decoding = "async";
        image.onload = () => {
          pending.delete(boundedIndex);
          cache.set(boundedIndex, image);
          trimCache();
          resolve(image);
        };
        image.onerror = () => {
          pending.delete(boundedIndex);
          resolve(null);
        };
        image.src = frameUrls[boundedIndex];
      });
      pending.set(boundedIndex, promise);
      return promise;
    };

    const drawFrame = (image: HTMLImageElement, index: number, force = false) => {
      if (!force && index === lastRenderedIndex && Math.abs(pointerX - lastRenderedPointerX) < 0.012 && Math.abs(pointerY - lastRenderedPointerY) < 0.012) return;
      const imageAspect = image.naturalWidth / image.naturalHeight;
      const canvasAspect = width / height;
      let sx = 0;
      let sy = 0;
      let sw = image.naturalWidth;
      let sh = image.naturalHeight;

      if (imageAspect > canvasAspect) {
        sw = image.naturalHeight * canvasAspect;
        sx = (image.naturalWidth - sw) * (0.5 + (pointerX - 0.5) * 0.12);
      } else {
        sh = image.naturalWidth / canvasAspect;
        sy = (image.naturalHeight - sh) * (0.5 + (pointerY - 0.5) * 0.12);
      }

      context.drawImage(image, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      context.fillStyle = "rgba(5, 10, 23, 0.4)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      const shade = context.createLinearGradient(0, 0, 0, canvas.height);
      shade.addColorStop(0, "rgba(5, 10, 23, 0.35)");
      shade.addColorStop(0.48, "rgba(8, 22, 46, 0.04)");
      shade.addColorStop(1, "rgba(3, 7, 17, 0.58)");
      context.fillStyle = shade;
      context.fillRect(0, 0, canvas.width, canvas.height);

      const vignette = context.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.46,
        canvas.height * 0.12,
        canvas.width * 0.5,
        canvas.height * 0.46,
        Math.max(canvas.width, canvas.height) * 0.72,
      );
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.42)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, canvas.width, canvas.height);
      lastRenderedIndex = index;
      lastRenderedPointerX = pointerX;
      lastRenderedPointerY = pointerY;
      if (!cancelled) setSceneReady(true);
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const scale = Math.min(1, Math.sqrt(720_000 / Math.max(1, rect.width * rect.height)));
      width = Math.max(1, rect.width * scale);
      height = Math.max(1, rect.height * scale);
      canvas.width = Math.round(width);
      canvas.height = Math.round(height);
      const current = cache.get(targetIndex) ?? [...cache.entries()].at(-1);
      if (current) drawFrame(current[1], current[0], true);
    };

    const update = () => {
      rafId = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      targetIndex = Math.round(progress * (frameUrls.length - 1));
      const direction = targetIndex >= lastIndex ? 1 : -1;
      lastIndex = targetIndex;

      const cached = cache.get(targetIndex);
      if (cached) {
        cache.delete(targetIndex);
        cache.set(targetIndex, cached);
        drawFrame(cached, targetIndex);
      } else {
        const nearest = [...cache.entries()].sort((a, b) => Math.abs(a[0] - targetIndex) - Math.abs(b[0] - targetIndex))[0];
        if (nearest) drawFrame(nearest[1], nearest[0]);
      }

      void loadFrame(targetIndex).then((image) => {
        if (image && !cancelled && targetIndex === Math.round(progress * (frameUrls.length - 1))) drawFrame(image, targetIndex);
      });
      void loadFrame(targetIndex + direction);
      void loadFrame(targetIndex + direction * 2);
    };

    const scheduleUpdate = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };
    const move = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointerX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      pointerY = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      scheduleUpdate();
    };

    const observer = new ResizeObserver(() => {
      resize();
      scheduleUpdate();
    });
    observer.observe(host);
    host.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    resize();
    scheduleUpdate();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      host.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scheduleUpdate);
      cache.clear();
      pending.clear();
    };
  }, []);

  return (
    <div className={`kage-scene${sceneReady ? " is-live" : ""}`} ref={hostRef} aria-hidden="true">
      <canvas className="kage-scene-canvas" ref={canvasRef} />
      <div className="kage-scene-fallback">
        <img className="scene-fallback-image" src={frameUrls[0]} alt="" />
      </div>
    </div>
  );
}
