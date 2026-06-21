import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoContent?: React.ReactNode;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#1a1a1a', '#111111'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoContent,
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  changeMenuColorOnOpen = true,
  accentColor = '#f97316',
  isFixed = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(['Menu']);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
    const offscreen = position === 'left' ? -100 : 100;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: offscreen }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: panelDuration, ease: 'power4.out' }, panelInsertTime);

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } }, itemsStart);
      if (numberEls.length) {
        tl.to(numberEls, { duration: 0.6, ease: 'power2.out', ['--sm-num-opacity' as any]: 1, stagger: { each: 0.08, from: 'start' } }, itemsStart + 0.1);
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(socialLinks, {
          y: 0, opacity: 1, duration: 0.55, ease: 'power3.out',
          stagger: { each: 0.08, from: 'start' },
          onComplete: () => gsap.set(socialLinks, { clearProps: 'opacity' }),
        }, socialsStart + 0.04);
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => { busyRef.current = false; });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: offscreen, duration: 0.32, ease: 'power3.in', overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[];
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });
        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
        // Reset text to single "Menu" label after panel closes
        setTextLines(['Menu']);
        if (textInnerRef.current) gsap.set(textInnerRef.current, { yPercent: 0 });
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;
    spinTweenRef.current?.kill();
    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback((opening: boolean) => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    colorTweenRef.current?.kill();
    if (changeMenuColorOnOpen) {
      colorTweenRef.current = gsap.to(btn, {
        color: opening ? openMenuButtonColor : menuButtonColor,
        delay: 0.18, duration: 0.3, ease: 'power2.out',
      });
    } else {
      gsap.set(btn, { color: menuButtonColor });
    }
  }, [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]);

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      const targetColor = (changeMenuColorOnOpen && openRef.current) ? openMenuButtonColor : menuButtonColor;
      gsap.set(toggleBtnRef.current, { color: targetColor });
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();
    const currentLabel = opening ? 'Menu' : 'Close';
    const cycles = 3;
    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    const targetLabel = opening ? 'Close' : 'Menu';
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);
    // Wait one frame for React to render the new lines before animating
    requestAnimationFrame(() => {
      if (!textInnerRef.current) return;
      gsap.set(textInnerRef.current, { yPercent: 0 });
      const finalShift = ((seq.length - 1) / seq.length) * 100;
      textCycleAnimRef.current = gsap.to(textInnerRef.current, {
        yPercent: -finalShift,
        duration: 0.5 + seq.length * 0.07,
        ease: 'power4.out',
      });
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    // Lock/unlock body scroll
    document.body.style.overflow = target ? 'hidden' : '';
    if (target) { onMenuOpen?.(); playOpen(); }
    else { onMenuClose?.(); playClose(); }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    document.body.style.overflow = '';
    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  // Close on click-away
  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        toggleBtnRef.current && !toggleBtnRef.current.contains(e.target as Node)
      ) closeMenu();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeOnClickAway, open, closeMenu]);

  // Cleanup body overflow on unmount
  React.useEffect(() => () => { document.body.style.overflow = ''; }, []);

  // Pre-layer colors: strip middle color if 3+ provided (same as original logic)
  const layerColors = (() => {
    const raw = colors && colors.length ? colors.slice(0, 4) : ['#1a1a1a', '#111'];
    const arr = [...raw];
    if (arr.length >= 3) arr.splice(Math.floor(arr.length / 2), 1);
    return arr;
  })();

  return (
    <div className={`sm-scope ${isFixed ? 'fixed top-0 left-0 w-screen h-screen overflow-hidden' : 'w-full h-full'} z-50 pointer-events-none`}>
      <div
        className={(className ? className + ' ' : '') + 'staggered-menu-wrapper relative w-full h-full pointer-events-none'}
        style={accentColor ? ({ ['--sm-accent' as any]: accentColor } as React.CSSProperties) : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        {/* Pre-layers (colour swipe behind panel) */}
        <div ref={preLayersRef} className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]" aria-hidden="true">
          {layerColors.map((c, i) => (
            <div key={i} className="sm-prelayer absolute top-0 right-0 h-full w-full" style={{ background: c }} />
          ))}
        </div>

        {/* Header bar — always visible */}
        <header
          className="absolute top-0 left-0 w-full flex items-center justify-between px-5 sm:px-8 md:px-16 py-5 bg-transparent pointer-events-none z-20"
          aria-label="Main navigation header"
        >
          {/* Logo */}
          <a href="#hero" className="pointer-events-auto font-heading font-bold text-foreground text-lg tracking-tight select-none">
            {logoContent ?? <>ANSH<span style={{ color: accentColor }}>.</span></>}
          </a>

          {/* Toggle button */}
          <button
            ref={toggleBtnRef}
            className="sm-toggle pointer-events-auto relative inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer leading-none touch-manipulation"
            style={{ color: menuButtonColor, fontSize: '12px' }}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            {/* Cycling text label — fixed height clip so only one line shows */}
            <span
              style={{ display: 'inline-block', height: '1em', overflow: 'hidden', lineHeight: 1, whiteSpace: 'nowrap' }}
              aria-hidden="true"
            >
              <span ref={textInnerRef} style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                {textLines.map((l, i) => (
                  <span
                    key={i}
                    style={{ display: 'block', height: '1em', lineHeight: 1, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}
                  >
                    {l}
                  </span>
                ))}
              </span>
            </span>
            {/* +/× icon */}
            <span
              ref={iconRef}
              style={{ position: 'relative', width: 14, height: 14, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', willChange: 'transform' }}
              aria-hidden="true"
            >
              <span ref={plusHRef} style={{ position: 'absolute', left: '50%', top: '50%', width: '100%', height: 2, background: 'currentColor', borderRadius: 2, transform: 'translate(-50%, -50%)', willChange: 'transform' }} />
              <span ref={plusVRef} style={{ position: 'absolute', left: '50%', top: '50%', width: '100%', height: 2, background: 'currentColor', borderRadius: 2, transform: 'translate(-50%, -50%)', willChange: 'transform' }} />
            </span>
          </button>
        </header>

        {/* Slide-in panel */}
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="absolute top-0 right-0 h-full flex flex-col overflow-y-auto z-10 pointer-events-auto"
          style={{
            width: 'clamp(280px, 42vw, 480px)',
            background: 'hsl(0 0% 6%)',
            borderLeft: '1px solid hsl(0 0% 12%)',
            padding: 'clamp(4.5rem, 10vw, 6rem) clamp(1.25rem, 5vw, 2.5rem) clamp(1.25rem, 5vw, 2.5rem)',
          }}
          aria-hidden={!open}
        >
          <div className="flex-1 flex flex-col gap-5">
            {/* Nav items */}
            <ul
              className="list-none m-0 p-0 flex flex-col gap-1 sm-panel-list"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items.length ? items.map((it, idx) => (
                <li className="relative overflow-hidden leading-none sm-panel-itemWrap" key={it.label + idx}>
                  <a
                    className="sm-panel-item relative font-heading font-bold cursor-pointer leading-none uppercase inline-block no-underline pr-[1.4em]"
                    style={{
                      fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                      letterSpacing: '-0.03em',
                      color: 'hsl(40 20% 95%)',
                      transition: 'color 0.2s',
                    }}
                    href={it.link}
                    aria-label={it.ariaLabel}
                    data-index={idx + 1}
                    onClick={closeMenu}
                    onMouseEnter={e => (e.currentTarget.style.color = accentColor ?? '#f97316')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'hsl(40 20% 95%)')}
                  >
                    <span className="sm-panel-itemLabel inline-block" style={{ transformOrigin: '50% 100%', willChange: 'transform' }}>
                      {it.label}
                    </span>
                  </a>
                </li>
              )) : null}
            </ul>

            {/* Socials */}
            {displaySocials && socialItems.length > 0 && (
              <div className="mt-auto pt-8 flex flex-col gap-3" aria-label="Social links">
                <h3 className="sm-socials-title m-0 text-xs font-mono tracking-[0.3em] uppercase" style={{ color: accentColor }}>
                  Socials
                </h3>
                <ul className="list-none m-0 p-0 flex flex-row items-center gap-5 flex-wrap" role="list">
                  {socialItems.map((s, i) => (
                    <li key={s.label + i}>
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link font-mono text-xs tracking-wider uppercase text-muted-foreground no-underline inline-block py-[2px] transition-colors duration-300"
                        style={{ transition: 'color 0.25s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = accentColor ?? '#f97316')}
                        onMouseLeave={e => (e.currentTarget.style.color = '')}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Numbering counter styles */}
      <style>{`
        .sm-panel-list[data-numbering] { counter-reset: smItem; }
        .sm-panel-list[data-numbering] .sm-panel-item::after {
          counter-increment: smItem;
          content: counter(smItem, decimal-leading-zero);
          position: absolute;
          top: 0.15em;
          right: 0.4em;
          font-size: 0.9rem;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 400;
          color: var(--sm-accent, #f97316);
          letter-spacing: 0;
          pointer-events: none;
          user-select: none;
          opacity: var(--sm-num-opacity, 0);
        }
        .sm-prelayers {
          width: clamp(280px, 42vw, 480px);
        }
        @media (max-width: 768px) {
          .sm-prelayers,
          #staggered-menu-panel {
            width: 100% !important;
            border-left: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
