import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import heroImage from "@/assets/headphones-hero.png";
import { SiteHeader } from "@/components/site-header";
import { ContactForm } from "@/components/contact-form";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

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

  const hidden = leaving || entering;

  return (
    <div className="min-h-screen bg-[#e9e9e9] p-4 md:p-8">
      <div className="mx-auto max-w-[1400px] rounded-3xl bg-white px-6 py-8 md:px-14 md:py-10 shadow-sm">
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

          {/* Headphones — subtle floating animation */}
          <div className="pointer-events-none relative md:absolute md:right-0 md:top-[58%] md:-translate-y-1/2 md:w-[62%] z-0">
            <div
              className={`transition-all ease-[cubic-bezier(0.65,0,0.35,1)] duration-700 ${
                hidden
                  ? `opacity-0 blur-md scale-90 ${
                      leaving ? "translate-x-[120%] rotate-[6deg]" : "translate-x-[40%] rotate-[6deg]"
                    }`
                  : "translate-x-0 opacity-100 blur-0 scale-100 rotate-0"
              }`}
            >
              <img
                src={heroImage}
                alt="Premium over-ear headphones"
                width={1400}
                height={1400}
                className={`w-full h-auto object-contain drop-shadow-2xl ${!hidden ? "animate-float-y" : ""}`}
              />
            </div>
          </div>
        </section>

        {/* Scroll-triggered contact form */}
        <RevealOnScroll className="mt-32 md:mt-48">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight text-black">
              Let's talk
            </h2>
            <p className="mt-6 max-w-xl text-base md:text-lg text-neutral-500 leading-relaxed">
              Tell us about your brand and we'll be in touch soon.
            </p>
            <ContactForm />
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
