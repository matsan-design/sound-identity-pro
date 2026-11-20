import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/sancin-logo.png";
import { LangToggle, useLang } from "@/lib/i18n";
import { AudioToggle, useAudio, introSwoosh } from "@/lib/audio";
import { useContactPopup } from "@/components/contact-popup";
import { LiquidGlassLogo } from "@/components/liquid-glass-logo";
import { Menu, X } from "lucide-react";

type NavHandler = (to: string) => (e: React.MouseEvent) => void;

function MobileLabel({
  to: _to,
  label,
  mobileLabel,
}: {
  to: string;
  label: string;
  mobileLabel?: string;
}) {
  return <span>{mobileLabel ?? label}</span>;
}

/** Session-scoped guard: the logo reveal only plays on the first landing-page entry. */
let logoIntroPlayed = false;




/** Tracks the cursor for the glass illumination and spins the pill on click. */
function useGlassInteractions() {
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  };

  const spin = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const key = el.getAttribute("data-nav-key") ?? "x";
    el.classList.remove("glass-nav-spinning");
    // force reflow so the animation can restart
    void el.offsetWidth;
    el.classList.add("glass-nav-spinning");
    clearTimeout(timers.current[key]);
    timers.current[key] = setTimeout(
      () => el.classList.remove("glass-nav-spinning"),
      500,
    );
  };

  return { onMouseMove, onMouseLeave, spin };
}


function LandingLogo({
  enabled,
  isLanding,
}: {
  enabled: boolean;
  isLanding: boolean;
}) {
  const logoRef = useRef<HTMLImageElement>(null);

  const [showGlass, setShowGlass] = useState(enabled);
  const [settled, setSettled] = useState(false);
  const [finalScale, setFinalScale] = useState(1);

  // Calcola la dimensione finale in base al vero logo
  useEffect(() => {
    const img = logoRef.current;
    if (!img) return;

    const updateScale = () => {
      const desktop = window.innerWidth >= 768;
      const canvasWidth = desktop ? 300 : 230;
      const canvasHeight = desktop ? 230 : 190;

      const logoSize = 256;
      const logoScale = 0.9;

      const fit = Math.min(
        1,
        canvasWidth / (logoSize * 1.9),
        canvasHeight / (logoSize * 1.5)
      );

      const originalSize = Math.max(
        img.offsetWidth,
        img.offsetHeight
      );

      if (!originalSize) return;

      const scale = originalSize / (logoSize * fit * logoScale);

      setFinalScale(Math.max(0.1, Math.min(3, scale)));
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(img);
    window.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  // Avvia l'effetto quando entriamo nella Landing
  useEffect(() => {
    if (
      !enabled ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShowGlass(false);
      setSettled(false);
      return;
    }

    setShowGlass(true);
    setSettled(false);

    // Riporta dolcemente il logo nella sua posizione definitiva
    const timer = window.setTimeout(() => {
      setSettled(true);
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [enabled]);

  return (
    <div className="relative inline-flex shrink-0 items-center">

      {/* Logo originale: usato per dimensioni e fallback */}
      <img
        ref={logoRef}
        src={logo}
        alt="Sancin Audio"
        className={`h-[3.5rem] md:h-[4.4rem] w-auto object-contain select-none ${isLanding ? "opacity-0 motion-reduce:opacity-100" : "opacity-100"
          }`}
        draggable={false}
        onLoad={() => {
          window.dispatchEvent(new Event("resize"));
        }}
      />

      {/* L'effetto rimane montato anche dopo la fine */}
      {showGlass && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 top-1/2 z-10
            h-[190px] w-[230px] md:h-[230px] md:w-[300px]
            -translate-x-1/2
            transition-transform duration-[1100ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${settled
              ? "-translate-y-1/2"
              : "translate-y-[calc(-50%+12px)]"
            }
          `}
        >
          <LiquidGlassLogo
            logo={logo}
            ending="logo"
            theme="light"
            logoSize={256}
            logoScale={0.9}
            finalLogoScale={finalScale}
            logoColor="original"
            tile={false}
            background="#ffffff"
            depth={2.3}
            dispersion={0.25}
            relief={0.55}
            caustics={2.3}
            highlights={2.6}
            bloom={1.9}
            dropStrength={1.6}
            decay={2.4}
            echoTint={0.2}
            speed={0.65}
            loop={false}
            style={{
              width: "100%",
              height: "100%",
              minHeight: 0,
              background: "transparent",
            }}
          />
        </div>
      )}
    </div>
  );
}



export function SiteHeader({
  onNavigate,
  logoIntro = false,
}: {
  onNavigate?: NavHandler;
  logoIntro?: boolean;
}) {

  const { t, lang } = useLang();

  const isLanding = useLocation({
    select: (location) => location.pathname === "/",
  });
  const glass = useGlassInteractions();
  const { play } = useAudio();
  const [intro, setIntro] = useState(false);


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Chiude il menu premendo ESC o cliccando fuori.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleOutsideClick = (event: PointerEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);



  const playRef = useRef(play);
  playRef.current = play;

  useEffect(() => {
    if (!logoIntro || logoIntroPlayed) return;
    logoIntroPlayed = true;
    setIntro(true);
    if (!introSwoosh.played) {
      introSwoosh.played = true;
      playRef.current("/sounds/SFX_Landing_Page_Initial_Magic.wav", Math.pow(10, -8 / 20));
    }
  }, [logoIntro]);



  const items = [
    { to: "/our-expertise", label: t("navFree"), mobileLabel: t("navWork") },

    { to: "/selected-work", label: lang === "it" ? "In evidenza" : "Selected work" },

    { to: "/about-us", label: t("navAbout") },
    { to: "/contact", label: t("navContact") },
  ];


  const popup = useContactPopup();
  const interactions = (to: string, extra?: (e: React.MouseEvent) => void) => ({
    "data-nav-key": to,
    onMouseMove: glass.onMouseMove,
    onMouseLeave: glass.onMouseLeave,
    onClick: (e: React.MouseEvent) => {
      if (window.innerWidth < 768) setMobileMenuOpen(false);
      glass.spin(e as React.MouseEvent<HTMLElement>);
      if (to === "/contact") {
        e.preventDefault();
        popup.open();
        return;
      }
      extra?.(e);
    },
  });

  return (
    <>
      <header className="relative z-20 flex items-center justify-between">

        <Link to="/" className="flex items-center" aria-label="Sancin Audio">
          <LandingLogo enabled={logoIntro} isLanding={isLanding} />
        </Link>

        <nav className="hidden md:flex items-center gap-2 px-2 py-2 text-sm">
          {items.map((it) =>
            onNavigate ? (
              <a
                key={it.to}
                href={it.to}
                className="glass-nav px-7 py-[0.7rem]"
                {...interactions(it.to, onNavigate(it.to))}
              >
                <span>{it.label}</span>
              </a>
            ) : (
              <Link
                key={it.to}
                to={it.to}
                className="glass-nav px-7 py-[0.7rem]"
                {...interactions(it.to)}
              >
                <span>{it.label}</span>
              </Link>
            ),
          )}
        </nav>

        {/* Desktop — invariato */}
        <div className="hidden md:flex flex-col items-end gap-2 text-black">
          <LangToggle />
          <AudioToggle />
        </div>

        {/* Mobile — Audio, Language, Hamburger */}
        <div
          ref={mobileMenuRef}
          className="relative z-30 flex items-center gap-4 text-black md:hidden"
        >
          <div className="shrink-0 origin-center scale-[1.15]">
            <AudioToggle />
          </div>

          <div className="shrink-0 origin-center scale-[1.15]">
            <LangToggle />
          </div>

          <button
            type="button"
            aria-label={
              mobileMenuOpen
                ? lang === "it" ? "Chiudi menu" : "Close menu"
                : lang === "it" ? "Apri menu" : "Open menu"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="sancin-mobile-menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/75 shadow-sm backdrop-blur-xl transition-all duration-300 hover:bg-white active:scale-95"
          >
            {mobileMenuOpen ? (
              <X size={22} strokeWidth={1.6} />
            ) : (
              <Menu size={22} strokeWidth={1.6} />
            )}
          </button>

          {/* Liquid Glass dropdown */}
          <nav
            id="sancin-mobile-menu"
            aria-label="Mobile navigation"
            className={`absolute right-0 top-full mt-4 w-64 max-w-[calc(100vw-3rem)]
              origin-top-right rounded-[24px] border border-white/70
              bg-white/85 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.13)]
              backdrop-blur-2xl backdrop-saturate-150
              transition-all duration-[450ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${mobileMenuOpen
                ? "visible translate-y-0 scale-100 opacity-100 pointer-events-auto"
                : "invisible -translate-y-3 scale-95 opacity-0 pointer-events-none"
              }`}
          >
            {items.map((it) =>
              onNavigate ? (
                <a
                  key={it.to}
                  href={it.to}
                  className="glass-nav flex w-full justify-start rounded-2xl px-5 py-3.5 text-[14px] font-medium"
                  {...interactions(it.to, onNavigate(it.to))}
                >
                  <MobileLabel
                    to={it.to}
                    label={it.label}
                    mobileLabel={it.mobileLabel}
                  />
                </a>
              ) : (
                <Link
                  key={it.to}
                  to={it.to}
                  className="glass-nav flex w-full justify-start rounded-2xl px-5 py-3.5 text-[14px] font-medium"
                  {...interactions(it.to)}
                >
                  <MobileLabel
                    to={it.to}
                    label={it.label}
                    mobileLabel={it.mobileLabel}
                  />
                </Link>
              )
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 md:mt-24 pt-6 border-t border-black/10 text-center">
      <p className="text-xs tracking-wide text-neutral-400">© Sancin Audio 2026</p>
    </footer>
  );
}

export function PageShell({ children, expertise = false }: { children: React.ReactNode; expertise?: boolean }) {
  return (
    <div className={expertise ? "expertise-page min-h-screen p-4 md:p-8" : "min-h-screen bg-[#e9e9e9] p-4 md:p-8"}>
      <div className={expertise ? "mx-auto max-w-none px-6 py-8 md:px-14 md:py-10 animate-page-morph" : "mx-auto max-w-none rounded-3xl bg-white px-6 py-8 md:px-14 md:py-10 shadow-sm animate-page-morph"}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}
