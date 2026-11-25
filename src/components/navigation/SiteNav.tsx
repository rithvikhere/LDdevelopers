"use client";

import React, { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { siteContent } from "@/config/site-content";
import { useIntroPhase } from "@/components/intro/IntroProvider";
import { useHydratedReducedMotion } from "@/hooks/useHydrated";

const nav = siteContent.siteNav;
const destinations = siteContent.explore.destinations;
const ease = [0.16, 1, 0.3, 1] as const;

// Phones (< md) get the three-line menu button + side panel; md and up get the floating pill.
const MOBILE_QUERY = "(max-width: 767px)";
const subscribeMobile = (onChange: () => void) => {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const getMobile = () => window.matchMedia(MOBILE_QUERY).matches;
const getMobileServer = () => false;

type Theme = "light" | "dark";

// Reads any computed CSS colour (rgb(), oklab(), color-mix results…) as RGBA via a 1×1 canvas.
let probe: CanvasRenderingContext2D | null = null;
const toRgba = (css: string): [number, number, number, number] | null => {
  const m = css.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
  }
  probe ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!probe) return null;
  probe.clearRect(0, 0, 1, 1);
  probe.fillStyle = "rgba(0,0,0,0)";
  probe.fillStyle = css;
  probe.fillRect(0, 0, 1, 1);
  const d = probe.getImageData(0, 0, 1, 1).data;
  return [d[0], d[1], d[2], d[3] / 255];
};

/** Opacity actually applied to an element, including its ancestors (e.g. hover-only overlays at opacity 0). */
const renderedOpacity = (el: Element) => {
  let o = 1;
  for (let n: Element | null = el; n && n !== document.body && o > 0; n = n.parentElement) {
    o *= parseFloat(getComputedStyle(n).opacity);
  }
  return o;
};

/** Is the first solid background underneath (x, y) dark? Elements inside `ignore` (the nav itself) are skipped. */
const isDarkBehind = (x: number, y: number, ignore: HTMLElement | null) => {
  for (const el of document.elementsFromPoint(x, y)) {
    if (ignore?.contains(el) || el.closest(".site-intro")) continue;
    const rgba = toRgba(getComputedStyle(el).backgroundColor);
    if (!rgba || rgba[3] < 0.5 || rgba[3] * renderedOpacity(el) < 0.5) continue;
    return (0.2126 * rgba[0] + 0.7152 * rgba[1] + 0.0722 * rgba[2]) / 255 < 0.45;
  }
  return false;
};

// No `filter` here on purpose: a filter on an ancestor stops the glass's backdrop blur from seeing the page.
const entrance: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1 },
};

/** Light glass over the sage pages, dark glass over dark panels — shared by the pill and the menu button. */
const glassClass = (dark: boolean, scrolled: boolean) =>
  dark
    ? "bg-[#262626]/65 border-white/10 text-[#E9F5E4] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.65)]"
    : `${scrolled ? "bg-[#F3F8EE]/72" : "bg-[#F3F8EE]/58"} border-white/60 text-[#212121] shadow-[0_12px_40px_-14px_rgba(33,33,33,0.28)]`;

/**
 * SiteNav — floating, semi-transparent navigation for the public site.
 *
 * md and up: a glass pill, top-right — Home · About Us ▾ · Contact. "About Us" opens a glass drop-down
 *   listing all six pages. A soft highlight glides between items on hover.
 * Phones: a floating glass button with three staggered lines, top-right beside the logo. It opens a frosted
 *   panel from the right with Home, About Us (expands to the six pages) and Contact; the lines morph into ✕.
 *
 * Both float free of the edges and adapt to what is underneath (light glass over the sage pages, dark glass
 * over dark panels such as the Explore hub and the footer). The current page is marked with an orange dot.
 * On the homepage the nav appears once the intro's logo has landed. Keyboard accessible (Esc closes and
 * returns focus; the panel keeps focus inside while open), reduced-motion aware.
 */
export const SiteNav: React.FC = () => {
  const pathname = usePathname();
  const reduce = useHydratedReducedMotion(); // false while hydrating, so the first render matches the server
  const phase = useIntroPhase();
  const isMobile = useSyncExternalStore(subscribeMobile, getMobile, getMobileServer);
  const menuId = useId();
  const panelId = useId();
  const subId = useId();

  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isContact = pathname === nav.contactHref;
  const inMenu = destinations.some((d) => d.href === pathname) && !isContact;
  const active = [pathname === "/", inMenu, isContact];

  const [open, setOpen] = useState(false); // desktop drop-down
  const [panelOpen, setPanelOpen] = useState(false); // phone side panel
  const [aboutOpen, setAboutOpen] = useState(inMenu); // "About Us" group inside the panel
  const [hovered, setHovered] = useState<number | null>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [scrolled, setScrolled] = useState(false);
  const visible = phase >= 2;

  // Close menus whenever the route changes (e.g. browser back/forward while one is open).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setPanelOpen(false);
    setAboutOpen(inMenu);
  }
  // The phone panel has no meaning on wider screens — close it if the window grows past the breakpoint.
  if (!isMobile && panelOpen) setPanelOpen(false);

  // Re-check what is underneath the visible control (pill or menu button), once per frame at most.
  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      const target = [pillRef.current, burgerRef.current].find((el) => el && el.getBoundingClientRect().width > 0);
      if (!target) return;
      const r = target.getBoundingClientRect();
      setTheme(isDarkBehind(r.left + r.width / 2, r.top + r.height / 2, navRef.current) ? "dark" : "light");
      setScrolled(window.scrollY > 12);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    schedule();
    // Pages keep settling after a route change (entrance animation, images, fonts) without any scroll,
    // so also re-check on layout size changes and once the page entrance has finished.
    const settle = window.setTimeout(schedule, 700);
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname, isMobile, visible]);

  // Desktop drop-down: outside click / Esc close it.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        aboutRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Phone panel: lock page scroll, move focus inside, keep Tab within the panel, Esc closes.
  useEffect(() => {
    if (!panelOpen) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    const focusFirst = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href], button")?.focus({ preventScroll: true });
    }, 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanelOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [burgerRef.current, ...(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])].filter(
        (el): el is HTMLElement => !!el
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = previous;
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKey);
    };
  }, [panelOpen]);

  const dark = theme === "dark";

  const closeAll = () => {
    setOpen(false);
    setPanelOpen(false);
  };

  const onHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeAll();
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      window.history.replaceState(null, "", "/");
    }
  };

  const highlight = hovered ?? (open ? 1 : null);
  const onEnter = (i: number) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(i);
  };

  const itemClass = `relative z-10 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[15px] font-medium tracking-[-0.01em] whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#E67514] transition-colors duration-300 cursor-pointer`;

  const dot = (on: boolean) =>
    on ? (
      <span
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 bottom-[5px] w-1 h-1 rounded-full bg-[#E67514]"
      />
    ) : null;

  const glide = (i: number) =>
    highlight === i ? (
      <motion.span
        layoutId={`${menuId}-highlight`}
        aria-hidden="true"
        className={`absolute inset-0 rounded-full ${dark ? "bg-white/[0.12]" : "bg-white/75 shadow-[0_2px_10px_rgba(33,33,33,0.08)]"}`}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
      />
    ) : null;

  const entranceTransition = reduce ? { duration: 0 } : { duration: 0.7, ease, delay: 0.15 };

  // Panel rows slide in one after another
  const row: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, x: 28 },
    show: { opacity: 1, x: 0, transition: { duration: reduce ? 0 : 0.45, ease } },
  };
  const panelRowClass =
    "group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#E67514] hover:bg-white/60 focus-visible:bg-white/60 transition-colors duration-200 cursor-pointer";
  const panelDot = (on: boolean) =>
    on ? <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#E67514] shrink-0" /> : null;

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="site-nav fixed inset-x-0 top-[18px] sm:top-[26px] lg:top-[34px] z-40 pointer-events-none"
      onBlur={(e) => {
        if (open && !navRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <div className="relative z-20 max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 flex justify-end">
        {/* ── md and up: the glass pill ─────────────────────────────────────────── */}
        <motion.div
          ref={pillRef}
          variants={entrance}
          data-reveal
          initial="hidden"
          animate={visible ? "show" : "hidden"}
          transition={entranceTransition}
          className={`hidden md:block relative ${visible ? "pointer-events-auto" : ""}`}
        >
          <div
            className={`rounded-full border backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,color,box-shadow] duration-500 ${glassClass(dark, scrolled)}`}
          >
            <ul className="flex items-center gap-2 p-1.5" onPointerLeave={() => setHovered(null)}>
              <li className="relative" onPointerEnter={onEnter(0)}>
                {glide(0)}
                <Link href="/" onClick={onHome} aria-current={active[0] ? "page" : undefined} className={itemClass}>
                  {nav.home}
                </Link>
                {dot(active[0])}
              </li>

              <li className="relative" onPointerEnter={onEnter(1)}>
                {glide(1)}
                <button
                  ref={aboutRef}
                  type="button"
                  aria-expanded={open}
                  aria-controls={menuId}
                  onClick={() => setOpen((v) => !v)}
                  className={itemClass}
                >
                  {nav.about}
                  <ChevronDown
                    aria-hidden="true"
                    className={`w-4 h-4 -mr-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {dot(active[1])}
              </li>

              <li className="relative" onPointerEnter={onEnter(2)}>
                {glide(2)}
                <Link
                  href={nav.contactHref}
                  onClick={closeAll}
                  aria-current={active[2] ? "page" : undefined}
                  className={itemClass}
                >
                  {nav.contact}
                </Link>
                {dot(active[2])}
              </li>
            </ul>
          </div>

          {/* Drop-down: all six pages */}
          <div id={menuId} className="absolute z-10 top-full right-0 mt-3 w-[24rem]">
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.35, ease }}
                  className={`origin-top-right overflow-hidden rounded-[28px] border backdrop-blur-2xl backdrop-saturate-150 p-2 ${
                    dark
                      ? "bg-[#1C1C1C]/90 border-white/10 text-[#E9F5E4] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]"
                      : "bg-[#F3F8EE]/90 border-white/70 text-[#212121] shadow-[0_24px_60px_-22px_rgba(33,33,33,0.35)]"
                  }`}
                >
                  <p className="px-3 pt-2 pb-1.5 text-[11px] uppercase tracking-[0.32em] opacity-70">{nav.menuHeading}</p>
                  <motion.ul
                    initial={reduce ? false : "hidden"}
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } } }}
                  >
                    {destinations.map((d) => {
                      const current = pathname === d.href;
                      return (
                        <motion.li
                          key={d.href}
                          variants={{
                            hidden: { opacity: 0, y: -6 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
                          }}
                        >
                          <Link
                            href={d.href}
                            onClick={closeAll}
                            aria-current={current ? "page" : undefined}
                            className={`group flex items-start gap-4 rounded-2xl px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[#E67514] transition-colors duration-200 ${
                              dark ? "hover:bg-white/[0.08] focus-visible:bg-white/[0.08]" : "hover:bg-white/70 focus-visible:bg-white/70"
                            } ${current ? (dark ? "bg-white/[0.06]" : "bg-white/50") : ""}`}
                          >
                            <span className="font-mono text-[11px] pt-[3px] opacity-60 tabular-nums">{d.number}</span>
                            <span className="flex-1 min-w-0">
                              <span className="flex items-center gap-2 text-[15px] font-medium leading-tight">
                                {d.label}
                                {current && <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#E67514]" />}
                              </span>
                              <span className="mt-0.5 block text-[12.5px] leading-snug opacity-70">{d.description}</span>
                            </span>
                            <ArrowUpRight
                              aria-hidden="true"
                              className="w-4 h-4 mt-0.5 shrink-0 opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0"
                            />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Phones: three-line menu button (morphs into ✕) ────────────────────── */}
        <motion.button
          ref={burgerRef}
          type="button"
          variants={entrance}
          data-reveal
          initial="hidden"
          animate={visible ? "show" : "hidden"}
          transition={entranceTransition}
          aria-expanded={panelOpen}
          aria-controls={panelId}
          aria-label={panelOpen ? nav.closeMenu : nav.openMenu}
          onClick={() => setPanelOpen((v) => !v)}
          className={`md:hidden relative grid place-items-center w-12 h-12 rounded-full border backdrop-blur-xl backdrop-saturate-150 outline-none focus-visible:ring-2 focus-visible:ring-[#E67514] transition-[background-color,border-color,color,box-shadow] duration-500 cursor-pointer ${
            visible ? "pointer-events-auto" : ""
          } ${panelOpen ? "bg-[#212121] border-[#212121] text-[#F3F8EE] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]" : glassClass(dark, scrolled)}`}
        >
          <span aria-hidden="true" className="relative block w-[22px] h-[14px]">
            <motion.span
              className="absolute right-0 top-0 h-[2px] rounded-full bg-current"
              initial={false}
              animate={panelOpen ? { width: 22, y: 6, rotate: 45 } : { width: 22, y: 0, rotate: 0 }}
              transition={{ duration: reduce ? 0 : 0.35, ease }}
            />
            <motion.span
              className="absolute right-0 top-[6px] h-[2px] rounded-full bg-current"
              initial={false}
              animate={panelOpen ? { width: 0, opacity: 0 } : { width: 13, opacity: 1 }}
              transition={{ duration: reduce ? 0 : 0.25, ease }}
            />
            <motion.span
              className="absolute right-0 top-[12px] h-[2px] rounded-full bg-current"
              initial={false}
              animate={panelOpen ? { width: 22, y: -6, rotate: -45 } : { width: 17, y: 0, rotate: 0 }}
              transition={{ duration: reduce ? 0 : 0.35, ease }}
            />
          </span>
        </motion.button>
      </div>

      {/* ── Phones: side panel from the right ─────────────────────────────────── */}
      <AnimatePresence>
        {panelOpen && (
          <div key="panel" className="md:hidden fixed inset-0 z-10 pointer-events-auto">
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-[#212121]/35 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35 }}
              onClick={() => setPanelOpen(false)}
            />
            <motion.div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label={nav.menuLabel}
              initial={reduce ? { opacity: 0 } : { x: "108%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "108%" }}
              transition={{ duration: reduce ? 0 : 0.55, ease }}
              className="absolute top-3 right-3 bottom-3 w-[min(86vw,22rem)] flex flex-col overflow-y-auto overscroll-contain rounded-[28px] border border-white/70 bg-[#F3F8EE]/[0.88] backdrop-blur-2xl backdrop-saturate-150 text-[#212121] shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)]"
            >
              {/* Header row — the ✕ button sits over its right end */}
              <div className="h-[66px] shrink-0 flex items-center px-6">
                <span className="text-[11px] uppercase tracking-[0.32em] opacity-70">{nav.menuLabel}</span>
              </div>

              <motion.ul
                className="px-2 pb-6"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.15 } } }}
              >
                <motion.li variants={row}>
                  <Link href="/" onClick={onHome} aria-current={active[0] ? "page" : undefined} className={panelRowClass}>
                    <span className="font-display text-[2.1rem] leading-none font-medium">{nav.home}</span>
                    {panelDot(active[0])}
                  </Link>
                </motion.li>

                <motion.li variants={row}>
                  <button
                    type="button"
                    aria-expanded={aboutOpen}
                    aria-controls={subId}
                    onClick={() => setAboutOpen((v) => !v)}
                    className={panelRowClass}
                  >
                    <span className="font-display text-[2.1rem] leading-none font-medium">{nav.about}</span>
                    {panelDot(active[1])}
                    <ChevronDown
                      aria-hidden="true"
                      className={`ml-auto w-5 h-5 opacity-70 transition-transform duration-300 ${aboutOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {aboutOpen && (
                      <motion.div
                        id={subId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <ul className="ml-5 mr-1 my-1 pl-3 border-l border-[#212121]/15">
                          {destinations.map((d) => {
                            const current = pathname === d.href;
                            return (
                              <li key={d.href}>
                                <Link
                                  href={d.href}
                                  onClick={closeAll}
                                  aria-current={current ? "page" : undefined}
                                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[16px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-[#E67514] hover:bg-white/60 focus-visible:bg-white/60 transition-colors duration-200 ${
                                    current ? "bg-white/50" : ""
                                  }`}
                                >
                                  <span className="font-mono text-[11px] opacity-60 tabular-nums">{d.number}</span>
                                  {d.label}
                                  {panelDot(current)}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>

                <motion.li variants={row}>
                  <Link
                    href={nav.contactHref}
                    onClick={closeAll}
                    aria-current={active[2] ? "page" : undefined}
                    className={panelRowClass}
                  >
                    <span className="font-display text-[2.1rem] leading-none font-medium">{nav.contact}</span>
                    {panelDot(active[2])}
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};
