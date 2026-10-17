import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/site-header";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — The Power of Sonic Branding | Sancin Audio" },
      {
        name: "description",
        content:
          "Sancin Audio designs bespoke sonic identities that make brands unforgettable — where sound becomes the most powerful part of your brand.",
      },
      { property: "og:title", content: "About Us — The Power of Sonic Branding | Sancin Audio" },
      {
        property: "og:description",
        content: "Sancin Audio designs bespoke sonic identities that make brands unforgettable.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutUs,
});

function AboutUs() {
  const { t } = useLang();
  const [selected, setSelected] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const services = [
    { title: t("svc1Title"), description: t("svc1Desc") },
    { title: t("svc2Title"), description: t("svc2Desc") },
    { title: t("svc3Title"), description: t("svc3Desc") },
  ];

  const goToCard = (index: number) => {
    const row = rowRef.current;
    const card = cardRefs.current[index];
    if (!row || !card) return;
    const rowBounds = row.getBoundingClientRect();
    const cardBounds = card.getBoundingClientRect();
    row.scrollTo({
      left: row.scrollLeft + cardBounds.left - rowBounds.left - (row.clientWidth - cardBounds.width) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
    setActive(index);
  };

  const updateActiveCard = () => {
    const row = rowRef.current;
    if (!row) return;
    const bounds = row.getBoundingClientRect();
    const center = bounds.left + bounds.width / 2;
    let closest = 0;
    let distance = Infinity;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const nextDistance = Math.abs(rect.left + rect.width / 2 - center);
      if (nextDistance < distance) { closest = index; distance = nextDistance; }
    });
    setActive(closest);
  };

  return (
    <PageShell>
      <section className="mt-10 md:mt-16 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold uppercase leading-[1.02] text-foreground break-words">
          {t("aboutTitle")}
        </h1>
        <p className="mt-10 text-xl md:text-2xl text-muted-foreground leading-relaxed">
          {t("aboutIntroA")}<br />
          {t("aboutIntroB")} {" "}<strong className="font-semibold text-foreground">{t("aboutIntroBold")}</strong>
        </p>
      </section>

      <section className="svc-stage mt-12 md:mt-16" aria-label={t("svcLabel")}>
        <h2 className="text-center text-sm font-medium text-muted-foreground">{t("svcLabel")}</h2>
        <div ref={rowRef} className="svc-row" data-selected={selected === null ? undefined : selected}
          onScroll={updateActiveCard} onKeyDown={(event) => { if (event.key === "Escape") setSelected(null); }}>
          {services.map((service, index) => (
            <Button key={index} ref={(node) => { cardRefs.current[index] = node; }}
              variant="ghost" className={`svc-card svc-float-${index} block h-auto whitespace-normal`}
              aria-label={service.title} aria-pressed={selected === index}
              onClick={() => { setSelected(selected === index ? null : index); goToCard(index); }}>
              <span className={`svc-visual svc-v${index + 1}`} aria-hidden="true" />
              {selected === index && <span className="svc-close" title={t("svcClose")}><X aria-label={t("svcClose")} /></span>}
              <span className="svc-content">
                <span className="svc-label">{t("svcLabel")}</span>
                <span className="svc-title" role="heading" aria-level={3}>{service.title}</span>
                <span className="svc-desc">{service.description}</span>
              </span>
            </Button>
          ))}
        </div>
        <div className="svc-dots">
          {services.map((service, index) => (
            <Button key={index} variant="ghost" className="h-8 w-8 p-0 rounded-full"
              aria-label={service.title} aria-current={active === index ? "true" : undefined}
              onClick={() => goToCard(index)}>
              <span className="svc-dot" data-active={active === index} aria-hidden="true" />
            </Button>
          ))}
        </div>
      </section>

      <section className="mt-14 md:mt-20 text-center mx-auto max-w-3xl">
        <h2 className="text-sm font-semibold text-muted-foreground">{t("teamLabel")}</h2>
        <p className="mt-5 text-xl md:text-2xl leading-relaxed text-foreground">{t("teamLine")}</p>
      </section>
    </PageShell>
  );
}
