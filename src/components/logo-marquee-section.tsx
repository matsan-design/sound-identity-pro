import { useEffect, useRef, useState } from "react";

import logo1 from "@/assets/logo-1.jpg.asset.json";
import logo2 from "@/assets/logo-2.jpg.asset.json";
import logo3 from "@/assets/logo-3.jpg.asset.json";
import logo4 from "@/assets/logo-4.jpg.asset.json";
import logo5 from "@/assets/logo-5.jpg.asset.json";
import logo6 from "@/assets/logo-6.png.asset.json";
import logo7 from "@/assets/logo-7.jpg.asset.json";
import logo8 from "@/assets/logo-8.jpg.asset.json";

const LOGOS = [
  { url: logo1.url, alt: "Disney" },
  { url: logo2.url, alt: "PlayStation" },
  { url: logo3.url, alt: "Apple" },
  { url: logo4.url, alt: "McDonald's" },
  { url: logo5.url, alt: "Nike" },
  { url: logo6.url, alt: "Netflix" },
  { url: logo7.url, alt: "Mastercard" },
  { url: logo8.url, alt: "Nintendo" },
];

const TITLE_WORDS = ["SOUND", "THAT", "MAKES", "BRANDS", "UNFORGETTABLE"];

// Vertical offsets recreate the gentle wave the reference row has.
const WAVE = [-18, 6, -30, 10, -8, 22, -24, 4];

function Card({
  logo,
  offset,
  delay,
}: {
  logo: { url: string; alt: string };
  offset: number;
  delay: number;
}) {
  return (
    <div
      className="shrink-0"
      style={{ transform: `translateY(${offset}px)` }}
      aria-hidden={false}
    >
      <div
        className="h-[76px] w-[76px] md:h-[100px] md:w-[100px] overflow-hidden rounded-[22px] bg-white shadow-[0_10px_24px_-14px_rgba(0,0,0,0.35)] animate-logo-bob"
        style={{ animationDelay: `${delay}s` }}
      >
        <img
          src={logo.url}
          alt={logo.alt}
          width={200}
          height={200}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

function Row({ reverse }: { reverse: boolean }) {
  const items = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <div className="relative overflow-hidden py-6">
      <div
        className={`flex w-max items-center gap-6 md:gap-10 ${
          reverse ? "animate-logo-track-reverse" : "animate-logo-track"
        }`}
      >
        {items.map((logo, i) => (
          <Card
            key={`${logo.alt}-${i}`}
            logo={logo}
            offset={WAVE[(i + (reverse ? 3 : 0)) % WAVE.length]}
            delay={(i % 8) * 0.45}
          />
        ))}
      </div>
    </div>
  );
}

export function LogoMarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the section enters from the bottom, 1 once it is centered.
      const raw = (vh - rect.top) / (vh * 0.85);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const revealed = progress * (TITLE_WORDS.length + 1);

  return (
    <section ref={sectionRef} className="mt-32 md:mt-48 -mx-6 md:-mx-14 overflow-hidden">
      <Row reverse={false} />

      <div className="px-6 md:px-14 py-6 md:py-10 text-center">
        <h2 className="mx-auto max-w-4xl text-4xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight text-black">
          {TITLE_WORDS.map((word, i) => {
            const local = Math.min(1, Math.max(0, revealed - i));
            return (
              <span
                key={word}
                className="transition-colors duration-300"
                style={{ color: `rgba(0,0,0,${0.14 + local * 0.86})` }}
              >
                {word}
                {i < TITLE_WORDS.length - 1 ? " " : ""}
              </span>
            );
          })}
        </h2>
        <p
          className="mx-auto mt-6 max-w-xl text-base md:text-lg text-neutral-500 leading-relaxed transition-all duration-500"
          style={{
            opacity: progress > 0.82 ? 1 : 0,
            transform: progress > 0.82 ? "translateY(0)" : "translateY(10px)",
          }}
        >
          The world's most recognizable brands are heard before they are seen.
        </p>
      </div>

      <Row reverse />
    </section>
  );
}
