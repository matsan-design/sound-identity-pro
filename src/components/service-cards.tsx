import { useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

export function ServiceCards() {
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
    <section className="
svc-stage mt-[2.4rem] md:mt-[3.2rem]" aria-label={t("svcLabel")}>

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

  );
}
