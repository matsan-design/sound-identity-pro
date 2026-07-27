import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import heroImage from "@/assets/headphones-hero.png";
import thumbImage from "@/assets/headphones-thumb.jpg";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sancin Audio — Expand your brand through sound" },
      {
        name: "description",
        content:
          "A brand's sonic identity communicates and enhances its essence. Free brand sound analysis by Sancin Audio.",
      },
      { property: "og:title", content: "Sancin Audio — Expand your brand through sound" },
      {
        property: "og:description",
        content: "A brand's sonic identity communicates and enhances its essence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  const [entering, setEntering] = useState(true);

  // Play enter animation on mount
  useEffect(() => {
    const t = window.setTimeout(() => setEntering(false), 20);
    return () => window.clearTimeout(t);
  }, []);

  const navigateWithAnimation = useCallback(
    (to: string) => (e: React.MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      if (leaving) return;
      setLeaving(true);
      window.setTimeout(() => {
        router.navigate({ to });
      }, 650);
    },
    [leaving, router],
  );

  // hidden state = either leaving OR still in initial entering phase
  const hidden = leaving || entering;

  return (
    <div className="min-h-screen bg-[#e9e9e9] p-4 md:p-8">
      <div className="mx-auto max-w-[1400px] rounded-3xl bg-white px-6 py-8 md:px-14 md:py-10 shadow-sm">
        {/* Header: scale-in on enter, unaffected on leave */}
        <div
          className={`transition-all duration-500 ease-out ${
            entering ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <SiteHeader onNavigate={navigateWithAnimation} />
        </div>

        {/* Hero */}
        <section className="relative mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div
            className={`relative z-10 transition-all ease-[cubic-bezier(0.65,0,0.35,1)] duration-700 ${
              hidden
                ? `opacity-0 blur-md ${leaving ? "-translate-x-[60%]" : "translate-x-0"}`
                : "opacity-100 blur-0 translate-x-0"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold uppercase leading-[1.02] tracking-tight text-black">
              Expand your brand through sound
            </h1>
            <p className="mt-8 max-w-md text-base md:text-lg text-neutral-500 leading-relaxed">
              A brand's sonic identity communicates and enhances its essence.
            </p>

            {/* decorative squiggle */}
            <svg
              className="mt-6 h-16 w-52 text-black/70"
              viewBox="0 0 240 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            >
              <g transform="translate(20 40)">
                {Array.from({ length: 12 }).map((_, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1="0"
                    x2={Math.cos((i * Math.PI) / 6) * 18}
                    y2={Math.sin((i * Math.PI) / 6) * 18}
                  />
                ))}
              </g>
              <path d="M45 40 C 90 10, 140 70, 220 30" />
            </svg>

            <a
              href="/free-identity-analysis"
              onClick={navigateWithAnimation("/free-identity-analysis")}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-sm font-medium text-white hover:bg-neutral-800 transition"
            >
              FREE analysis of your Brand
            </a>
          </div>

          {/* Headphones image — moved slightly down so it doesn't overlap nav */}
          <div className="pointer-events-none relative md:absolute md:right-0 md:top-[58%] md:-translate-y-1/2 md:w-[62%] z-0">
            <img
              src={heroImage}
              alt="Premium over-ear headphones"
              width={1400}
              height={1400}
              className={`w-full h-auto object-contain drop-shadow-2xl transition-all ease-[cubic-bezier(0.65,0,0.35,1)] duration-700 ${
                hidden
                  ? `opacity-0 blur-md scale-90 ${
                      leaving ? "translate-x-[120%] rotate-[6deg]" : "translate-x-[40%] rotate-[6deg]"
                    }`
                  : "translate-x-0 opacity-100 blur-0 scale-100 rotate-0"
              }`}
            />
          </div>
        </section>

        {/* Bottom thumb + social */}
        <div
          className={`relative mt-8 md:mt-24 flex items-end justify-between transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
            hidden
              ? `opacity-0 blur-md ${leaving ? "-translate-x-[40%]" : "translate-x-0"}`
              : "opacity-100 blur-0 translate-x-0"
          }`}
        >
          <div className="rounded-2xl bg-[#f2f2f2] p-4 w-48 md:w-64">
            <img
              src={thumbImage}
              alt="Black headphones"
              width={800}
              height={800}
              loading="lazy"
              className="w-full h-auto rounded-lg object-cover"
            />
            <div className="mt-3 flex justify-center">
              <div className="h-2 w-14 rounded-full bg-neutral-300" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: XIcon, label: "X" },
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Facebook, label: "Facebook" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f2f2] text-black hover:bg-neutral-200 transition"
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function XIcon({ className, strokeWidth }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}
