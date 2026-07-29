import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-header";
import sonicWave from "@/assets/sonic-wave.png";
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
  return (
    <PageShell>
      <section className="mt-10 md:mt-16 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold uppercase leading-[1.02] tracking-tight text-black">
          {t("aboutTitle")}
        </h1>

        <div className="mt-10 space-y-5 text-base md:text-lg text-neutral-500 leading-relaxed">
          <p>{t("aboutP1")}</p>
          <p>{t("aboutP2")}</p>
          <p>{t("aboutP3")}</p>
          <p>{t("aboutP4")}</p>
          <p>{t("aboutP5")}</p>
          <p>{t("aboutP6")}</p>
          <p className="font-medium text-black">{t("aboutP7")}</p>
        </div>
      </section>

      <section className="mt-16 md:mt-24 relative overflow-hidden">
        <div className="pointer-events-none select-none">
          <img
            src={sonicWave}
            alt="Sonic wave — Sancin Audio"
            width={1600}
            height={900}
            loading="lazy"
            className="w-full h-auto object-contain drop-shadow-2xl animate-drift-x"
          />
        </div>
      </section>
    </PageShell>
  );
}
