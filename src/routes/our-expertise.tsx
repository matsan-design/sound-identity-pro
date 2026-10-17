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

function OurExpertise() {
  const { t } = useLang();
  return (
    <PageShell expertise>
      <section className="mt-10 md:mt-16 max-w-4xl">
        <h1 className="expertise-heading font-bold uppercase leading-[1.02] text-foreground break-words">
          {t("expertiseTitle")}
        </h1>
        <p className="mt-10 text-xl md:text-2xl text-muted-foreground leading-relaxed">
          {t("aboutIntroA")}<br />
          {t("aboutIntroB")} {" "}<strong className="font-semibold text-foreground">{t("aboutIntroBold")}</strong>
        </p>
      </section>
      <ServiceCards />
    </PageShell>
  );
}
