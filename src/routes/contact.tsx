import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-header";
import { ContactForm } from "@/components/contact-form";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sancin Audio" },
      {
        name: "description",
        content: "Get in touch with Sancin Audio to shape your brand's sonic identity.",
      },
      { property: "og:title", content: "Contact — Sancin Audio" },
      {
        property: "og:description",
        content: "Get in touch with Sancin Audio to shape your brand's sonic identity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <section className="mt-10 md:mt-16 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight text-black">
          Contact
        </h1>
        <p className="mt-6 max-w-xl text-base md:text-lg text-neutral-500 leading-relaxed">
          Tell us about your brand and we'll be in touch soon.
        </p>
        <ContactForm />
      </section>
    </PageShell>
  );
}
