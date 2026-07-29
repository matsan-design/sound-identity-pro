import { useState } from "react";
import { useLang } from "@/lib/i18n";

export function ContactForm() {
  const { t } = useLang();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong");
      }
      setState("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (state === "sent") {
    return (
      <div className="mt-8 rounded-2xl border border-black/10 p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-black">
          {t("formThanks")}
        </h3>
        <p className="mt-4 text-neutral-600">{t("formThanksSub")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 gap-5 max-w-2xl">
      <label className="block">
        <span className="text-sm font-medium text-black">{t("formName")}</span>
        <input
          required
          maxLength={200}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-2 w-full rounded-none border-0 border-b border-black/30 bg-transparent px-0 py-3 text-black outline-none focus:border-black transition"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-black">{t("formEmail")}</span>
        <input
          required
          type="email"
          maxLength={320}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-2 w-full rounded-none border-0 border-b border-black/30 bg-transparent px-0 py-3 text-black outline-none focus:border-black transition"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-black">{t("formMessage")}</span>
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
          className="tilt-btn text-3xl md:text-5xl font-black italic uppercase tracking-tight text-black disabled:opacity-60"
        >
          {state === "sending" ? t("formSending") : t("formSend")}
        </button>
      </div>
    </form>
  );
}
