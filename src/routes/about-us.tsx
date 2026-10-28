import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-header";
import { useLang } from "@/lib/i18n";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContactPopup } from "@/components/contact-popup";
import founderAsset from "@/assets/matej-sancin-new-blue.png.asset.json";
import { useEffect } from "react";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About — Matej Sancin & Our Vision | Sancin Audio" },
      {
        name: "description",
        content:
          "Meet Matej Sancin, founder of Sancin Audio, and the experienced creative team shaping how brands sound, communicate and connect.",
      },
      { property: "og:title", content: "About — Matej Sancin & Our Vision | Sancin Audio" },
      {
        property: "og:description",
        content: "Discover the founder and creative vision behind Sancin Audio, your trusted partner for exceptional sound.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutUs,
});

function AboutUs() {
  const { t } = useLang();
  const popup = useContactPopup();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "[data-about-reveal]"
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("about-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("about-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -7% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <PageShell>
      <section className="about-founder" aria-labelledby="founder-title">
        <div className="about-founder-copy">

          <h1
            id="founder-title"
            data-about-reveal="left"
            className="about-founder-title expertise-heading text-foreground break-words"
            style={{ textTransform: "none" }}
          >
            {t("founderTitle")}
          </h1>

          <p className="about-founder-intro" data-about-reveal="left">
            {t("founderIntro")}
          </p>

          <div className="about-founder-actions" data-about-reveal="left">
            <Button onClick={popup.openBiography}>
              {t("founderMore")}
            </Button>

            <Button variant="outline" onClick={popup.open}>
              {t("founderContact")}
            </Button>

            <Button asChild variant="outline" size="icon" className="about-linkedin">
              <a
                href="https://www.linkedin.com/in/matej-sancin-6a59b8233/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Matej Sancin — LinkedIn"
                title="LinkedIn"
              >
                <Linkedin aria-hidden="true" />
              </a>
            </Button>
          </div>

          <dl className="about-stats">
            <div data-about-reveal="up">
              <dt>200+</dt>
              <dd>{t("founderProjects")}</dd>
            </div>
            <div data-about-reveal="up">
              <dt>10+</dt>
              <dd>{t("founderYears")}</dd>
            </div>
            <div data-about-reveal="up">
              <dt></dt>
              <dd>{t("founderClients")}</dd>
            </div>
          </dl>
        </div>

        <div className="about-founder-portrait">
          <img
            src={founderAsset.url}
            alt="Matej Sancin, founder of Sancin Audio"
            width={1024}
            height={1536}
            fetchPriority="high"
            data-about-reveal="right"
          />
          <div
            className="about-founder-label text-foreground"
            data-about-reveal="right"
          >
            <strong>Matej Sancin</strong>
            <span>{t("founderRole")}</span>
          </div>
        </div>
      </section>

      <section className="about-story">
        <h2
          data-about-reveal="left"
          className="expertise-heading font-bold leading-[1.02] text-foreground break-words"
        >
          {t("aboutIntroA")}<br />
          {t("aboutIntroB")}{" "}
          <strong className="font-semibold">{t("aboutIntroBold")}</strong>
        </h2>

        <p data-about-reveal="up">
          {t("aboutTeamNarrative")}
        </p>
      </section>
    </PageShell>
  );
}


/* ABOUT PAGE — Cinematic scroll reveal */
