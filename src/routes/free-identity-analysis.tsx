import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-header";
import { useLang } from "@/lib/i18n";
import figure from "@/assets/identity-figure.png";

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
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", message: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: "no-reply@sancinaudio.com",
          message: `[Free Identity Analysis]\nBrand: ${form.name}\nIdentity/keywords: ${form.message}`,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong");
      }
      setState("sent");
      setForm({ name: "", message: "" });
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <PageShell>
      <section className="mt-10 md:mt-16 relative">
        {/* Right-side figure — floats so text naturally wraps around silhouette on desktop */}
        <img
          src={figure}
          alt=""
          aria-hidden
          className="hidden md:block float-right w-[38%] max-w-[520px] ml-8 mb-4 -mt-6 select-none pointer-events-none [shape-outside:url('/src/assets/identity-figure.png')] [shape-image-threshold:0.5] [shape-margin:16px]"
          draggable={false}
        />

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

        {/* Mobile figure */}
        <img
          src={figure}
          alt=""
          aria-hidden
          className="md:hidden mt-8 w-2/3 mx-auto select-none pointer-events-none"
          draggable={false}
        />

        {/* Form */}
        <div className="clear-both pt-6 md:pt-10 max-w-2xl">
          {state === "sent" ? (
            <div className="rounded-2xl border border-black/10 p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-black">
                {t("formThanks")}
              </h3>
              <p className="mt-4 text-neutral-600">{t("formThanksSub")}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5">
              <label className="block">
                <span className="text-sm font-medium text-black">{t("fiaBrandName")}</span>
                <input
                  required
                  maxLength={200}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 w-full rounded-none border-0 border-b border-black/30 bg-transparent px-0 py-3 text-black outline-none focus:border-black transition"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-black">{t("fiaIdentity")}</span>
                <textarea
                  required
                  rows={5}
                  maxLength={5000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 w-full rounded-none border-0 border-b border-black/30 bg-transparent px-0 py-3 text-black outline-none focus:border-black transition resize-none"
                />
              </label>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="tilt-btn text-2xl md:text-4xl font-black italic uppercase tracking-tight text-black disabled:opacity-60 text-left leading-tight"
                >
                  {state === "sending" ? t("formSending") : t("fiaSubmit")}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}
