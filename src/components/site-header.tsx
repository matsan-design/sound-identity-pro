import { Link } from "@tanstack/react-router";
import logo from "@/assets/sancin-logo.png";
import { LangToggle, useLang } from "@/lib/i18n";

type NavHandler = (to: string) => (e: React.MouseEvent) => void;

export function SiteHeader({ onNavigate }: { onNavigate?: NavHandler }) {
  const { t } = useLang();
  const linkProps = (to: string) =>
    onNavigate ? { href: to, onClick: onNavigate(to) } : null;

  const items = [
    { to: "/free-identity-analysis", label: t("navFree") },
    { to: "/about-us", label: t("navAbout") },
    { to: "/contact", label: t("navContact") },
  ];

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
        <nav className="hidden md:flex items-center gap-1 rounded-full bg-black px-2 py-2 text-sm text-white">
          {items.map((it) =>
            onNavigate ? (
              <a
                key={it.to}
                {...linkProps(it.to)!}
                className="rounded-full px-5 py-2 hover:bg-white/10 transition"
              >
                {it.label}
              </a>
            ) : (
              <Link
                key={it.to}
                to={it.to}
                className="rounded-full px-5 py-2 hover:bg-white/10 transition"
              >
                {it.label}
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
              {...linkProps(it.to)!}
              className="rounded-full bg-black/90 px-4 py-2 text-[11px] font-medium tracking-wide text-white shadow-sm backdrop-blur"
            >
              {it.label}
            </a>
          ) : (
            <Link
              key={it.to}
              to={it.to}
              className="rounded-full bg-black/90 px-4 py-2 text-[11px] font-medium tracking-wide text-white shadow-sm backdrop-blur"
            >
              {it.label}
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
