import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import heroImage from "@/assets/headphones-hero.png";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

type Ctx = { open: () => void; openBiography: () => void; close: () => void };
const PopupContext = createContext<Ctx>({ open: () => { }, openBiography: () => { }, close: () => { } });
export const useContactPopup = () => useContext(PopupContext);

type Phase = "closed" | "opening" | "open" | "closing";

export function ContactPopupProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [biography, setBiography] = useState(false);

  const open = useCallback(() => { setBiography(false); setPhase("opening"); }, []);
  const openBiography = useCallback(() => { setBiography(true); setPhase("opening"); }, []);
  const close = useCallback(() => setPhase((p) => (p === "closed" ? p : "closing")), []);

  useEffect(() => {
    if (phase === "opening") {
      const t = window.setTimeout(() => setPhase("open"), 520);
      return () => window.clearTimeout(t);
    }
    if (phase === "closing") {
      const t = window.setTimeout(() => setPhase("closed"), 460);
      return () => window.clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "closed") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [phase, close]);

  return (
    <PopupContext.Provider value={{ open, openBiography, close }}>
      <div
        className="cp-page"
        style={phase === "open" || phase === "opening" ? { filter: "blur(14px)", pointerEvents: "none" } : undefined}
        aria-hidden={phase !== "closed" ? true : undefined}
      >
        {children}
      </div>
      {phase !== "closed" && typeof document !== "undefined" &&
        createPortal(<ContactPopup biography={biography} closing={phase === "closing"} onClose={close} />, document.body)}
    </PopupContext.Provider>
  );
}

function ContactPopup({ biography, closing, onClose }: { biography: boolean; closing: boolean; onClose: () => void }) {
  const { t } = useLang();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });


  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;

    setState("sending");
    setError(null);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("message", form.message);

      if (form.phone.trim()) {
        data.append("phone", form.phone);
      }

      const res = await fetch(
        "https://formspree.io/f/xoeeewlb",
        {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        const result = (await res.json().catch(() => ({}))) as {
          errors?: { message?: string }[];
          error?: string;
        };

        const message =
          result.errors
            ?.map((item) => item.message)
            .filter(Boolean)
            .join(", ") ||
          result.error ||
          "Unable to send the message. Please try again.";

        throw new Error(message);
      }

      setState("sent");
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setState("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    }
  }


  const field = "cp-input";

  return (
    <div className={`cp-overlay ${closing ? "cp-overlay-out" : ""}`} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="cp-title" className={`cp-window ${closing ? "cp-genie-out" : "cp-genie-in"}`}>
        <div className="flex items-center gap-[18px]">
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label={t("popClose")} className="cp-dot cp-dot-close hover:brightness-90" />
          <span className="cp-dot cp-dot-minimize" aria-hidden />
          <span className="cp-dot cp-dot-expand" aria-hidden />
        </div>

        {biography ? (
          <div className="mt-7 md:mt-9">
            <h2 id="cp-title" className="text-xl md:text-2xl font-semibold leading-snug text-foreground">{t("founderVisionTitle")}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t("founderVision")}</p>
          </div>
        ) : <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          <div className="min-w-0">
            <h2 id="cp-title" className="text-3xl md:text-4xl font-bold leading-[1.05] tracking-tight text-black">
              {t("popTitle")}
            </h2>
            <img src={heroImage} alt="Sancin Audio headphones" className="mt-4 mx-auto w-full max-w-[220px] lg:max-w-[340px] h-auto object-contain drop-shadow-xl select-none" draggable={false} />
          </div>

          <div className="min-w-0">
            {state === "sent" ? (
              <div className="py-10 text-center">
                <h3 className="text-2xl font-bold uppercase tracking-tight text-black">{t("formThanks")}</h3>
                <p className="mt-3 text-neutral-600">{t("formThanksSub")}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4">
                <label className="block">
                  <span className="cp-label">{t("popName")} <span className="text-red-500">*</span></span>
                  <input required maxLength={200} value={form.name} placeholder={t("popName")} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} />
                </label>
                <label className="block">
                  <span className="cp-label">{t("popEmail")} <span className="text-red-500">*</span></span>
                  <input required type="email" maxLength={320} value={form.email} placeholder="name@email.com" onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} />
                </label>
                <label className="block">
                  <span className="cp-label">{t("popPhone")}</span>
                  <input type="tel" maxLength={50} value={form.phone} placeholder="+39 ..." onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} />
                </label>
                <label className="block">
                  <span className="cp-label">{t("popMessage")} <span className="text-red-500">*</span></span>
                  <textarea required rows={5} maxLength={5000} value={form.message} placeholder={t("popMessage")} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${field} resize-none rounded-2xl`} />
                </label>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex justify-end">
                  <button type="submit" disabled={state === "sending"} className="rounded-full bg-black px-7 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition disabled:opacity-60">
                    {state === "sending" ? t("formSending") : t("popSend")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>}
      </div>
    </div>
  );
}
