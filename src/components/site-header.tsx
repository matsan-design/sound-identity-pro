import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import logo from "@/assets/sancin-logo.png";
import { LangToggle, useLang } from "@/lib/i18n";

type NavHandler = (to: string) => (e: React.MouseEvent) => void;

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
      800,
    );
  };

  return { onMouseMove, onMouseLeave, spin };
}

export function SiteHeader({ onNavigate }: { onNavigate?: NavHandler }) {
  const { t } = useLang();
  const glass = useGlassInteractions();

  const items = [
    { to: "/free-identity-analysis", label: t("navFree") },
    { to: "/about-us", label: t("navAbout") },
    { to: "/contact", label: t("navContact") },
  ];

  const interactions = (to: string, extra?: (e: React.MouseEvent) => void) => ({
    "data-nav-key": to,
    onMouseMove: glass.onMouseMove,
    onMouseLeave: glass.onMouseLeave,
    onClick: (e: React.MouseEvent) => {
      glass.spin(e as React.MouseEvent<HTMLElement>);
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
            className="h-[2.6rem] md:h-[3.25rem] w-auto object-contain select-none"
            draggable={false}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-2 rounded-full bg-black px-2 py-2 text-sm text-white">
          {items.map((it) =>
            onNavigate ? (
              <a
                key={it.to}
                href={it.to}
                className="glass-nav px-5 py-2"
                {...interactions(it.to, onNavigate(it.to))}
              >
                <span>{it.label}</span>
              </a>
            ) : (
              <Link
                key={it.to}
                to={it.to}
                className="glass-nav px-5 py-2"
                {...interactions(it.to)}
              >
                <span>{it.label}</span>
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3 text-black">
          <LangToggle />
        </div>
      </header>

      {/* Mobile vertical nav — visible only on smartphone */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col items-end gap-3"
      >
        {items.map((it) =>
          onNavigate ? (
            <a
              key={it.to}
              href={it.to}
              className="glass-nav bg-black/70 px-4 py-2 text-[11px] font-medium tracking-wide"
              {...interactions(it.to, onNavigate(it.to))}
            >
              <span>{it.label}</span>
            </a>
          ) : (
            <Link
              key={it.to}
              to={it.to}
              className="glass-nav bg-black/70 px-4 py-2 text-[11px] font-medium tracking-wide"
              {...interactions(it.to)}
            >
              <span>{it.label}</span>
            </Link>
          ),
        )}
      </nav>
    </>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#e9e9e9] p-4 md:p-8">
      <div className="mx-auto max-w-[1400px] rounded-3xl bg-white px-6 py-8 md:px-14 md:py-10 shadow-sm animate-page-morph">
        <SiteHeader />
        {children}
      </div>
    </div>
  );
}
