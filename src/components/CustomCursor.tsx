import { useEffect, useRef } from "react";
import { isIOS, isMobileDevice } from "@/lib/utils";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't attach cursor on touch devices — it's invisible and mix-blend-mode
    // forces an expensive compositing layer on iOS/Android.
    if (isIOS() || isMobileDevice()) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-magnetic]")) {
        cursor.classList.add("expanded");
      }
    };

    const handleMouseOut = () => {
      cursor.classList.remove("expanded");
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden md:block" />;
};

export default CustomCursor;
