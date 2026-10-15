import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-header";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/free-identity-analysis")({
  head: () => ({
    meta: [
      { title: "What Defines Your Identity? — Sancin Audio" },
      {
        name: "description",
        content:
          "Request a complimentary sonic identity consultation and discover how sound can strengthen your brand.",
      },
      { property: "og:title", content: "What Defines Your Identity? — Sancin Audio" },
      {
        property: "og:description",
        content:
          "Request a complimentary sonic identity consultation and discover how sound can strengthen your brand.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FreeIdentityAnalysis,
});

function FreeIdentityAnalysis() {
  const { t } = useLang();

  return (
    <PageShell>
      <section className="mt-10 md:mt-16 relative pb-6">
        <h1 className="text-4xl md:text-7xl font-bold uppercase leading-[1.02] tracking-tight text-black">
          {t("fiaTitle")}
        </h1>

        <p className="mt-6 text-xl md:text-3xl font-semibold uppercase tracking-tight text-black">
          {t("fiaSubtitle")}
        </p>

        <div className="mt-6 space-y-4 text-base md:text-lg text-neutral-500 leading-relaxed max-w-2xl">
          <p>{t("fiaDesc1")}</p>
          <p>{t("fiaDesc2")}</p>
          <p>{t("fiaDesc3")}</p>
        </div>
      </section>
    </PageShell>
  );
}
