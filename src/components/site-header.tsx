import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/sancin-logo.png";
import swooshSfx from "@/assets/sfx-swoosh.wav.asset.json";
import { LangToggle, useLang } from "@/lib/i18n";
import { AudioToggle, useAudio, introSwoosh } from "@/lib/audio";
import { useContactPopup } from "@/components/contact-popup";

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

let mobileNavRevealed = false;



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

export function SiteHeader({
  onNavigate,
  logoIntro = false,
}: {
  onNavigate?: NavHandler;
  logoIntro?: boolean;
}) {
  const { t } = useLang();
  const glass = useGlassInteractions();
  const { play } = useAudio();
  const [intro, setIntro] = useState(false);

  const [mobileNavVisible, setMobileNavVisible] = useState(mobileNavRevealed);

  useEffect(() => {
    if (mobileNavRevealed) return;

    const handleMobileScroll = () => {
      if (window.innerWidth >= 640 || window.scrollY < 30) return;

      mobileNavRevealed = true;
      setMobileNavVisible(true);
      window.removeEventListener("scroll", handleMobileScroll);
    };

    window.addEventListener("scroll", handleMobileScroll, { passive: true });
    handleMobileScroll();

    return () => window.removeEventListener("scroll", handleMobileScroll);
  }, []);

  const playRef = useRef(play);
  playRef.current = play;

  useEffect(() => {
    if (!logoIntro || logoIntroPlayed) return;
    logoIntroPlayed = true;
    setIntro(true);
    if (!introSwoosh.played) {
      introSwoosh.played = true;
      playRef.current(swooshSfx.url, Math.pow(10, -5 / 20));
    }
  }, [logoIntro]);


  const items = [
    { to: "/our-expertise", label: t("navFree"), mobileLabel: t("navWork") },
    { to: "/about-us", label: t("navAbout") },
    { to: "/contact", label: t("navContact") },
  ];

  const popup = useContactPopup();
  const interactions = (to: string, extra?: (e: React.MouseEvent) => void) => ({
    "data-nav-key": to,
    onMouseMove: glass.onMouseMove,
    onMouseLeave: glass.onMouseLeave,
    onClick: (e: React.MouseEvent) => {
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
          <img
            src={logo}
            alt="Sancin Audio"
            className={`h-[3.5rem] md:h-[4.4rem] w-auto object-contain select-none ${""
              }`}
            draggable={false}
          />
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
        <div className="hidden md:flex flex-col items-end gap-2 text-black">
          <LangToggle />
          <AudioToggle />
        </div>
      </header>

      {/* Mobile nav — two rows, controls enlarged 30% */}

      <div
        className={`md:hidden relative z-20 flex flex-col gap-4 
transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]
 sm:mt-6 sm:max-h-none sm:opacity-100 sm:translate-y-0 sm:visible sm:pointer-events-auto sm:overflow-visible ${mobileNavVisible
            ? "mt-6 max-h-48 opacity-100 translate-y-0 visible"
            : "mt-0 max-h-0 opacity-0 -translate-y-2 invisible pointer-events-none overflow-hidden"
          }`}
      >

        <nav aria-label="Mobile navigation" className="grid grid-cols-3 gap-2">
          {items.map((it) =>
            onNavigate ? (
              <a
                key={it.to}
                href={it.to}
                className="glass-nav justify-center text-center px-2 py-[0.65rem] text-[14px] font-medium tracking-wide whitespace-nowrap"
                {...interactions(it.to, onNavigate(it.to))}
              >
                <MobileLabel to={it.to} label={it.label} mobileLabel={it.mobileLabel} />
              </a>
            ) : (
              <Link
                key={it.to}
                to={it.to}
                className="glass-nav justify-center text-center px-2 py-[0.65rem] text-[14px] font-medium tracking-wide whitespace-nowrap"
                {...interactions(it.to)}
              >
                <MobileLabel to={it.to} label={it.label} mobileLabel={it.mobileLabel} />
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-6 text-black">
          <div className="origin-left scale-[1.3]"><LangToggle /></div>
          <div className="origin-left scale-[1.3] ml-2"><AudioToggle /></div>
        </div>
      </div>
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
