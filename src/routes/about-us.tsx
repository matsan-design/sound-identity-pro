import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-header";
import { ContactForm } from "@/components/contact-form";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About us — Sancin Audio" },
      {
        name: "description",
        content:
          "Discover a tailored quote for your brand and request a free consultation with Sancin Audio.",
      },
      { property: "og:title", content: "About us — Sancin Audio" },
      {
        property: "og:description",
        content:
          "Discover a tailored quote for your brand and request a free consultation with Sancin Audio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutUs,
});

function AboutUs() {
  return (
    <PageShell>
      <section className="mt-10 md:mt-16 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight text-black">
          About us
        </h1>

        <div className="mt-8 rounded-2xl bg-[#f2f2f2] p-6 md:p-8">
          <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
            Don't hesitate to reach out — get a tailored quote for your brand and unlock
            a <span className="font-semibold text-black">free consultation</span> with our
            sonic identity experts. Let's turn the way your brand sounds into your most
            unforgettable asset.
          </p>
        </div>

        <ContactForm />
      </section>
    </PageShell>
  );
}
