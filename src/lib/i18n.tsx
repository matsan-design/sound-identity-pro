import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "it";

type Dict = Record<string, { en: string; it: string }>;

export const T: Dict = {
  navFree: {
    en: "FREE brand analysis",
    it: "Analisi gratuita del brand",
  },
  navAbout: { en: "About", it: "Chi siamo" },
  navContact: { en: "Contact", it: "Contatti" },

  heroTitle: {
    en: "Expand your brand through sound",
    it: "Espandi il tuo brand attraverso il suono",
  },
  heroSubtitle: {
    en: "We craft immersive audio identities that make brands instantly recognizable and create lasting emotional connections with audiences.",
    it: "Creiamo identità sonore immersive che rendono i brand immediatamente riconoscibili e generano connessioni emotive durature con il pubblico.",
  },
  ctaFreeAnalysis: {
    en: "FREE analysis of your Brand",
    it: "Analisi gratuita del tuo Brand",
  },

  letsTalk: { en: "Let's talk", it: "Parliamone" },
  letsTalkSub: {
    en: "Tell us about your brand and we'll be in touch soon.",
    it: "Raccontaci del tuo brand e ti ricontatteremo a breve.",
  },

  aboutTitle: {
    en: "The power of Sonic Branding",
    it: "Il potere del Sonic Branding",
  },
  aboutP1: {
    en: "Every great brand is instantly recognizable through its visual identity. From its logo and website to advertising campaigns and digital content, every visual element is carefully designed to communicate a clear and memorable message.",
    it: "Ogni grande brand è immediatamente riconoscibile grazie alla sua identità visiva. Dal logo al sito, dalle campagne pubblicitarie ai contenuti digitali, ogni elemento visivo è progettato per comunicare un messaggio chiaro e memorabile.",
  },
  aboutP2: {
    en: "We believe that this identity should not stop at what people see—it should extend to what they hear.",
    it: "Crediamo che questa identità non debba fermarsi a ciò che si vede, ma debba estendersi a ciò che si ascolta.",
  },
  aboutP3: {
    en: "Our mission is to transform brands into complete sensory experiences by creating distinctive sonic identities that strengthen recognition, evoke emotion, and build lasting connections with audiences.",
    it: "La nostra missione è trasformare i brand in esperienze sensoriali complete creando identità sonore distintive che rafforzano la riconoscibilità, evocano emozioni e costruiscono connessioni durature con il pubblico.",
  },
  aboutP4: {
    en: "Sound is one of the most powerful forms of communication. A carefully crafted sonic identity can express trust, innovation, elegance, energy, or emotion in just a few seconds. Long after a visual impression fades, sound has the ability to remain in memory and reinforce brand recognition across every touchpoint.",
    it: "Il suono è una delle forme di comunicazione più potenti. Un'identità sonora curata può esprimere fiducia, innovazione, eleganza, energia o emozione in pochi secondi. Molto dopo che un'impressione visiva svanisce, il suono resta nella memoria e rafforza la riconoscibilità del brand in ogni punto di contatto.",
  },
  aboutP5: {
    en: "The world's most iconic brands have understood this for years. From Netflix's unmistakable sonic signature to Apple's carefully designed product sounds and McDonald's globally recognized audio identity, sound has become an essential part of modern branding.",
    it: "I brand più iconici al mondo lo hanno capito da anni. Dalla firma sonora inconfondibile di Netflix ai suoni dei prodotti Apple, fino all'identità audio globale di McDonald's, il suono è diventato parte essenziale del branding moderno.",
  },
  aboutP6: {
    en: "We work with forward-thinking companies to design bespoke audio identity systems that go far beyond a simple sonic logo. Our approach combines strategy, composition, sound design, and storytelling to create a cohesive audio language that can live across commercials, digital campaigns, social media, events, products, corporate films, and every customer interaction.",
    it: "Collaboriamo con aziende visionarie per progettare sistemi di identità audio su misura che vanno ben oltre il semplice logo sonoro. Il nostro approccio unisce strategia, composizione, sound design e storytelling per creare un linguaggio audio coerente, capace di vivere in spot, campagne digitali, social, eventi, prodotti, video corporate e in ogni interazione con il cliente.",
  },
  aboutP7: {
    en: "Because in today's world, the strongest brands are not only seen. They are remembered by the way they sound.",
    it: "Perché nel mondo di oggi, i brand più forti non si vedono soltanto. Si ricordano per come suonano.",
  },

  fiaTitle: {
    en: "WHAT DEFINES YOUR IDENTITY?",
    it: "COSA DEFINISCE LA TUA IDENTITÀ?",
  },
  fiaSubtitle: {
    en: "Each brand should stand out",
    it: "Ogni brand deve distinguersi",
  },
  fiaDesc1: {
    en: "Tell us about your brand using just a few keywords. Describe your industry, your values, your audience, and the personality you want to communicate.",
    it: "Raccontaci del tuo brand con poche parole chiave. Descrivi il tuo settore, i tuoi valori, il tuo pubblico e la personalità che vuoi comunicare.",
  },
  fiaDesc2: {
    en: "We'll invite you to a complimentary video consultation, where we'll get to know your business, discuss your brand strategy, and present tailored examples of how a sonic identity could strengthen your brand across every customer touchpoint.",
    it: "Ti inviteremo a una consulenza video gratuita, in cui conosceremo la tua attività, parleremo della tua strategia di brand e ti presenteremo esempi su misura di come un'identità sonora possa rafforzare il tuo brand in ogni punto di contatto.",
  },
  fiaDesc3: {
    en: "No generic presentations. No obligations. Just practical insights, creative ideas, and the opportunity to explore how sound can become one of your brand's most powerful assets.",
    it: "Niente presentazioni generiche. Nessun obbligo. Solo spunti pratici, idee creative e l'occasione di scoprire come il suono possa diventare uno degli asset più potenti del tuo brand.",
  },
  fiaBrandName: { en: "Name of your brand", it: "Nome del tuo brand" },
  fiaIdentity: {
    en: "Description of your identity, or just keywords",
    it: "Descrizione della tua identità, o solo parole chiave",
  },
  fiaSubmit: {
    en: "Send and receive a free consultation",
    it: "Invia e ricevi una consulenza gratuita",
  },

  formName: { en: "Brand name or Personal name", it: "Nome del brand o personale" },
  formEmail: { en: "Your email", it: "La tua email" },
  formMessage: { en: "Message", it: "Messaggio" },
  formSend: { en: "SEND", it: "INVIA" },
  formSending: { en: "Sending...", it: "Invio..." },
  formThanks: {
    en: "Thank you for reaching out.",
    it: "Grazie per averci scritto.",
  },
  formThanksSub: {
    en: "We'll get back to you as soon as possible — expect to hear from us shortly.",
    it: "Ti risponderemo il prima possibile — a presto.",
  },

  contactTitle: { en: "Contact", it: "Contatti" },

  marqueeTitle: {
    en: "EVERY POWERFUL BRAND HAS ITS OWN SOUND. YOUR BRAND HAS A SOUND. WE HELP YOU FIND IT.",
    it: "OGNI BRAND POTENTE HA IL SUO SUONO. IL TUO BRAND HA UN SUONO. TI AIUTIAMO A TROVARLO.",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof T) => string };
const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => T[k].en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sancin-lang");
      if (saved === "it" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("sancin-lang", l);
    } catch {}
  };

  const t = (k: keyof typeof T) => T[k][lang];
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const label = lang === "en" ? "ITA" : "ENG";
  return (
    <button
      onClick={() => setLang(lang === "en" ? "it" : "en")}
      aria-label="Toggle language"
      className={`rounded-full border border-black/20 px-3 py-1.5 text-xs font-semibold tracking-wider text-black hover:bg-black hover:text-white transition ${className}`}
    >
      {label}
    </button>
  );
}
