import { createFileRoute } from "@tanstack/react-router";
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

      <section className="mt-14 md:mt-20 text-center mx-auto max-w-3xl">
        <h2 className="text-sm font-semibold text-muted-foreground">{t("teamLabel")}</h2>
        <p className="mt-5 text-xl md:text-2xl leading-relaxed text-foreground">{t("teamLine")}</p>
      </section>
    </PageShell>
  );
}
