import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between">
      <Link to="/" className="text-2xl md:text-3xl font-bold tracking-tight text-black">
        SANCIN AUDIO
      </Link>
      <nav className="hidden md:flex items-center gap-1 rounded-full bg-black px-2 py-2 text-sm text-white">
        <Link
          to="/free-identity-analysis"
          className="rounded-full px-5 py-2 hover:bg-white/10 transition"
        >
          FREE Identity Analysis
        </Link>
        <Link to="/about-us" className="rounded-full px-5 py-2 hover:bg-white/10 transition">
          about us
        </Link>
        <Link to="/contact" className="rounded-full px-5 py-2 hover:bg-white/10 transition">
          contact
        </Link>
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
      <div className="mx-auto max-w-[1400px] rounded-3xl bg-white px-6 py-8 md:px-14 md:py-10 shadow-sm">
        <SiteHeader />
        {children}
      </div>
    </div>
  );
}
