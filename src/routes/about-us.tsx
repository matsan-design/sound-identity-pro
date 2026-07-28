import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-header";
import sonicWave from "@/assets/sonic-wave.png";

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
        content:
          "Sancin Audio designs bespoke sonic identities that make brands unforgettable.",
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
      <section className="mt-10 md:mt-16 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold uppercase leading-[1.02] tracking-tight text-black">
          The power of Sonic Branding
        </h1>

        <div className="mt-10 rounded-2xl bg-[#f2f2f2] p-6 md:p-10 space-y-5 text-base md:text-lg text-neutral-700 leading-relaxed">
          <p>
            Every great brand is instantly recognizable through its visual identity. From its
            logo and website to advertising campaigns and digital content, every visual element
            is carefully designed to communicate a clear and memorable message.
          </p>
          <p>
            We believe that this identity should not stop at what people see—it should extend to
            what they hear.
          </p>
          <p>
            Our mission is to transform brands into complete sensory experiences by creating
            distinctive sonic identities that strengthen recognition, evoke emotion, and build
            lasting connections with audiences.
          </p>
          <p>
            Sound is one of the most powerful forms of communication. A carefully crafted sonic
            identity can express trust, innovation, elegance, energy, or emotion in just a few
            seconds. Long after a visual impression fades, sound has the ability to remain in
            memory and reinforce brand recognition across every touchpoint.
          </p>
          <p>
            The world's most iconic brands have understood this for years. From Netflix's
            unmistakable sonic signature to Apple's carefully designed product sounds and
            McDonald's globally recognized audio identity, sound has become an essential part of
            modern branding.
          </p>
          <p>
            We work with forward-thinking companies to design bespoke audio identity systems
            that go far beyond a simple sonic logo. Our approach combines strategy, composition,
            sound design, and storytelling to create a cohesive audio language that can live
            across commercials, digital campaigns, social media, events, products, corporate
            films, and every customer interaction.
          </p>
          <p className="font-medium text-black">
            Because in today's world, the strongest brands are not only seen.
            <br />
            They are remembered by the way they sound.
          </p>
        </div>
      </section>

      {/* Sonic wave visual */}
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
