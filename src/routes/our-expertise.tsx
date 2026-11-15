import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-header";
import { ServiceCards } from "@/components/service-cards";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/our-expertise")({
  head: () => ({
    meta: [
      { title: "Our Expertise — Sound Branding | Sancin Audio" },
      { name: "description", content: "Explore Sancin Audio’s external audio department, sound branding and bespoke music experiences." },
      { property: "og:title", content: "Our Expertise — Sound Branding | Sancin Audio" },
      { property: "og:description", content: "Discover the power of sound branding with Sancin Audio’s three audio services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OurExpertise,
});

function WaveLetters({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\s+)/).map((part, index) =>
        /^\s+$/.test(part) ? (
          <span key={index}>{part}</span>
        ) : (
          <span
            key={index}
            className="inline-block whitespace-nowrap"
          >
            {Array.from(part).map((letter, letterIndex) => (
              <span
                key={letterIndex}
                data-wave-letter
                className="inline-block transition-transform duration-150 ease-out"
              >
                {letter}
              </span>
            ))}
          </span>
        )
      )}
    </>
  );
}


function OurExpertise() {

  const { t, lang } = useLang();

  return (
    <PageShell expertise>

      <section className="mt-10 md:mt-16 max-w-4xl mx-auto text-center">

        <h1 className="expertise-heading font-bold leading-[1.02] text-foreground break-words">
          {lang === "it" ? "I nostri servizi" : "Our services"}
        </h1>

      </section>

      <ServiceCards />

      <section className="max-w-4xl mx-auto text-center">
        <p
          className="relative mt-10 text-xl md:text-2xl text-muted-foreground leading-relaxed"
          onPointerMove={(event) => {
            if (
              event.pointerType !== "mouse" &&
              event.pointerType !== "pen"
            ) return;

            if (
              window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches
            ) return;

            const paragraph = event.currentTarget;
            const rect = paragraph.getBoundingClientRect();

            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const letters =
              paragraph.querySelectorAll<HTMLSpanElement>(
                "[data-wave-letter]"
              );

            letters.forEach((letter) => {
              const letterX =
                letter.offsetLeft + letter.offsetWidth / 2;

              const letterY =
                letter.offsetTop + letter.offsetHeight / 2;

              const dx = letterX - mouseX;
              const dy = letterY - mouseY;

              const influence = Math.exp(
                -(
                  (dx * dx) / (80 * 80) +
                  (dy * dy) / (48 * 48)
                )
              );

              const lift = 18 * influence;

              letter.style.transform =
                `translateY(${-lift}px)`;
            });
          }}
          onPointerLeave={(event) => {
            const letters =
              event.currentTarget.querySelectorAll<HTMLSpanElement>(
                "[data-wave-letter]"
              );

            letters.forEach((letter) => {
              letter.style.transform = "";
            });
          }}
        >
          <WaveLetters text={t("aboutIntroA")} />
          <br />

          <WaveLetters text={t("aboutIntroB")} />{" "}

          <strong className="font-semibold text-foreground">
            <WaveLetters text={t("aboutIntroBold")} />
          </strong>
        </p>
      </section>


    </PageShell>
  );
}
