import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-header";
import { ContactForm } from "@/components/contact-form";

export const Route = createFileRoute("/free-identity-analysis")({
  head: () => ({
    meta: [
      { title: "FREE Identity Analysis — Sancin Audio" },
      {
        name: "description",
        content:
          "Request a free sonic identity analysis for your brand and discover its untapped potential.",
      },
      { property: "og:title", content: "FREE Identity Analysis — Sancin Audio" },
      {
        property: "og:description",
        content:
          "Request a free sonic identity analysis for your brand and discover its untapped potential.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FreeIdentityAnalysis,
});

function FreeIdentityAnalysis() {
  return (
    <PageShell>
      <section className="mt-10 md:mt-16 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight text-black">
          FREE Identity Analysis
        </h1>
        <p className="mt-6 max-w-xl text-base md:text-lg text-neutral-500 leading-relaxed">
          Share a few details about your brand and we'll send you a personalized sonic
          identity analysis — completely free.
        </p>
        <ContactForm />
      </section>
    </PageShell>
  );
}
