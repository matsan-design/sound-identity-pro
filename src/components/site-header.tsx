import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User } from "lucide-react";
import logo from "@/assets/sancin-logo.png";

type NavHandler = (to: string) => (e: React.MouseEvent) => void;

export function SiteHeader({ onNavigate }: { onNavigate?: NavHandler }) {
  const linkProps = (to: string) =>
    onNavigate ? { href: to, onClick: onNavigate(to) } : null;

  return (
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
        {onNavigate ? (
          <>
            <a {...linkProps("/free-identity-analysis")!} className="rounded-full px-5 py-2 hover:bg-white/10 transition">
              FREE brand analysis
            </a>
            <a {...linkProps("/about-us")!} className="rounded-full px-5 py-2 hover:bg-white/10 transition">
              About
            </a>
            <a {...linkProps("/contact")!} className="rounded-full px-5 py-2 hover:bg-white/10 transition">
              Contacts
            </a>
          </>
        ) : (
          <>
            <Link to="/free-identity-analysis" className="rounded-full px-5 py-2 hover:bg-white/10 transition">
              FREE brand analysis
            </Link>
            <Link to="/about-us" className="rounded-full px-5 py-2 hover:bg-white/10 transition">
              About
            </Link>
            <Link to="/contact" className="rounded-full px-5 py-2 hover:bg-white/10 transition">
              Contacts
            </Link>
          </>
        )}
      </nav>
      <div className="flex items-center gap-4 text-black">
        <button aria-label="Search" className="hover:opacity-60 transition">
          <Search className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <button aria-label="Cart" className="hover:opacity-60 transition">
          <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <button aria-label="Account" className="hover:opacity-60 transition">
          <User className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>
    </header>
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
