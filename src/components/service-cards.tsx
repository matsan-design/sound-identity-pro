import { useLayoutEffect, useRef, useState } from "react"; import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import externalAudioPortrait from "@/assets/Round-image-8.png";
import soundBrandingPortrait from "@/assets/Round-image-11.png";
import multimediaPortrait from "@/assets/Round-image-13.png";
import { useNavigate } from "@tanstack/react-router";



export function ServiceCards({
  homePreview = false,
}: {
  homePreview?: boolean;
}) {
  const { t } = useLang();
  const navigate = useNavigate();

  const [selected, setSelected] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [hoveredHomeCard, setHoveredHomeCard] = useState<number | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useLayoutEffect(() => {
    if (!homePreview) return;

    // Applica il centramento solo sugli smartphone
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const row = rowRef.current;
    const middleCard = cardRefs.current[1];

    if (!row || !middleCard) return;

    const rowBounds = row.getBoundingClientRect();
    const cardBounds = middleCard.getBoundingClientRect();

    // Centra la seconda card immediatamente, senza animazione
    row.scrollLeft +=
      cardBounds.left -
      rowBounds.left -
      (row.clientWidth - cardBounds.width) / 2;

    setActive(1);
  }, [homePreview]);

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
    <section
      className={`svc-stage mt-[2.4rem] md:mt-[3.2rem] ${homePreview ? "svc-stage--home" : ""
        }`}
      aria-label={t("svcLabel")}
    >



      <div
        ref={rowRef}
        className="svc-row"
        data-selected={selected === null ? undefined : selected}
        onScroll={updateActiveCard}
        onKeyDown={(event) => {
          if (event.key === "Escape") setSelected(null);
        }}

        onPointerMove={(event) => {
          if (
            event.pointerType !== "mouse" &&
            event.pointerType !== "pen"
          ) return;

          const card = event.currentTarget;
          const rect = card.getBoundingClientRect();

          // Coordinate corrette anche quando la card
          // viene ingrandita con l'effetto hover.
          const x =
            ((event.clientX - rect.left) / rect.width) *
            card.offsetWidth;

          const y =
            ((event.clientY - rect.top) / rect.height) *
            card.offsetHeight;

          // Al primo ingresso posiziona immediatamente
          // l'alone sotto il mouse, prima di farlo apparire.
          if (card.dataset.haloActive !== "true") {
            card.dataset.haloActive = "true";

            card.style.setProperty("--svc-halo-travel", "0ms");
            card.style.setProperty("--svc-halo-x", `${x}px`);
            card.style.setProperty("--svc-halo-y", `${y}px`);
            card.style.setProperty("--svc-halo-opacity", "1");

            requestAnimationFrame(() => {
              if (card.dataset.haloActive === "true") {
                card.style.setProperty(
                  "--svc-halo-travel",
                  "110ms"
                );
              }
            });

            return;
          }

          card.style.setProperty("--svc-halo-x", `${x}px`);
          card.style.setProperty("--svc-halo-y", `${y}px`);
        }}
        onPointerLeave={(event) => {
          const card = event.currentTarget;

          card.dataset.haloActive = "false";
          card.style.setProperty("--svc-halo-opacity", "0");
        }}

      >

        {services.map((service, index) => (
          <Button key={index} ref={(node) => { cardRefs.current[index] = node; }}


            className={`svc-card svc-float-${index} block h-auto whitespace-normal
  ${index < 3 ? "svc-card--branding" : ""}
  ${homePreview && hoveredHomeCard === index ? "svc-card--home-hovered" : ""}


`}
            aria-label={service.title} aria-pressed={selected === index}


            onClick={() => {
              if (homePreview) {
                void navigate({ to: "/our-expertise" });
                return;
              }

              setSelected(selected === index ? null : index);
              goToCard(index);
            }}

            onPointerMove={(event) => {
              if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;

              const rect = event.currentTarget.getBoundingClientRect();

              event.currentTarget.style.setProperty(
                "--svc-halo-x",
                `${event.clientX - rect.left}px`
              );

              event.currentTarget.style.setProperty(
                "--svc-halo-y",
                `${event.clientY - rect.top}px`
              );

              event.currentTarget.style.setProperty("--svc-halo-opacity", "1");
            }}
            onPointerLeave={(event) => {
              event.currentTarget.style.setProperty("--svc-halo-opacity", "0");
            }}
          >


            {index < 2 ? (
              <>

                <span
                  className="svc-branding-blur"
                  style={{

                    backgroundImage: `url(${index === 0 ? externalAudioPortrait : soundBrandingPortrait})`,
                  }}
                  aria-hidden="true"
                />

                <img

                  src={index === 0 ? externalAudioPortrait : soundBrandingPortrait}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="svc-branding-portrait"
                />
              </>


            ) : (
              <>
                <span
                  className="svc-branding-blur"
                  style={{
                    backgroundImage: `url(${multimediaPortrait})`,
                  }}
                  aria-hidden="true"
                />

                <img
                  src={multimediaPortrait}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="svc-branding-portrait"
                />
              </>
            )}


            {selected === index && <span className="svc-close" title={t("svcClose")}><X aria-label={t("svcClose")} /></span>}

            <span
              className="svc-content"
              style={
                homePreview
                  ? {
                    transform: index === 1
                      ? "translateY(0)"
                      : "translateY(-15px)",
                    justifyContent: index === 1
                      ? "flex-start"
                      : "flex-end",
                  }
                  : undefined
              }
            >


              <span
                className="svc-label"
                style={homePreview ? { visibility: "hidden" } : undefined}
              >
                {t("svcLabel")}
              </span>

              <span className="svc-title" role="heading" aria-level={3}>{service.title}</span>


              {!homePreview && (
                <span className="svc-desc">
                  {service.description}
                </span>
              )}


            </span>
          </Button>
        ))
        }
      </div >
      <div className="svc-dots">
        {services.map((service, index) => (
          <Button key={index} variant="ghost" className="h-8 w-8 p-0 rounded-full"
            aria-label={service.title} aria-current={active === index ? "true" : undefined}
            onClick={() => goToCard(index)}>
            <span className="svc-dot" data-active={active === index} aria-hidden="true" />
          </Button>
        ))}
      </div>
    </section >

  );
}
