import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "it";

type Dict = Record<string, { en: string; it: string }>;

export const T: Dict = {
  navFree: {
    en: "Our work",
    it: "Il nostro lavoro",
  },
  navWork: {
    en: "Our work",
    it: "Il nostro lavoro",
  },
  navAbout: { en: "About", it: "Chi siamo" },
  navContact: { en: "Contact", it: "Contatti" },

  heroTitle: {
    en: "The world's most recognizable brands are heard before they are seen",
    it: "I brand più iconici si fanno sentire prima ancora di farsi vedere",
  },
  heroSubtitle: {
    en: "We craft audio identities that make brands instantly recognizable and create lasting emotional connections with audiences.",
    it: "Creiamo identità sonore che rendono i brand immediatamente riconoscibili e generano connessioni emotive durature con il pubblico.",
  },
  ctaFreeAnalysis: {
    en: "Get your FREE consultation",
    it: "Ricevi la tua consulenza GRATUITA",
  },

  letsTalk: { en: "Let's talk", it: "Parliamone" },
  letsTalkSub: {
    en: "Tell us about your brand and we'll be in touch soon.",
    it: "Raccontaci del tuo brand e ti ricontatteremo a breve.",
  },

  expertiseTitle: {
    en: "THE POWER OF SOUND BRANDING",
    it: "IL POTERE DEL SOUND BRANDING",
  },
  aboutTitle: {
    en: "The power of Sonic Branding",
    it: "Il potere del Sonic Branding",
  },
  founderTitle: { en: "Your personal external audio department", it: "Il tuo reparto audio esterno personale" },
  founderIntro: {
    en: "We provide brands, agencies and production companies with a complete external audio department, covering original music, sound design, mixing and post-production. And we do sonic branding for brands.",
    it: "Offriamo a brand, agenzie e case di produzione un reparto audio esterno completo, occupandoci di musica originale, sound design, mix e post-produzione. E facciamo sonic branding per i brand.",
  },
  founderRole: { en: "Founder", it: "Fondatore" },
  founderMore: { en: "More about Matej", it: "Scopri di più su Matej" },
  founderContact: { en: "Get in touch", it: "Parliamone" },
  founderProjects: { en: "Projects completed", it: "Progetti realizzati" },
  founderYears: { en: "Years of experience", it: "Anni di esperienza" },
  founderClients: { en: "", it: "" },
  founderVisionTitle: { en: "The Vision Behind Sancin Audio", it: "La visione dietro Sancin Audio" },
  founderVision: {
    en: "With over 10 years of experience in music production, composition and sound design, Matej founded Sancin Audio to bring a new perspective to the world of sound. Active in Milan, he worked with internationally recognised brands such as Giorgio Armani, combining artistic vision, technical expertise and a deep understanding of sound. His vision is to make exceptional audio seamless and integral to every creative project, giving production companies and brands one trusted partner for all their audio needs. Sancin Audio brings together creativity and precision to shape how brands sound, communicate and connect with the world.",
    it: "Con oltre 10 anni di esperienza nella produzione musicale, nella composizione e nel sound design, Matej ha fondato Sancin Audio per portare una nuova prospettiva nel mondo del suono. Attivo a Milano, ha lavorato con brand di fama internazionale come Giorgio Armani, unendo visione artistica, competenza tecnica e una profonda conoscenza del suono. La sua visione è rendere un audio d’eccellenza una parte naturale e integrante di ogni progetto creativo, offrendo a case di produzione e brand un unico partner di fiducia per tutte le loro esigenze audio. Sancin Audio unisce creatività e precisione per dare forma al modo in cui i brand suonano, comunicano e si connettono con il mondo.",
  },
  aboutTeamNarrative: {
    en: "Our team of professionals is composed of experienced sound designers, music producers, composers and audio engineers, united by a shared commitment to excellence. Having worked with global icons such as Giorgio Armani and leading international brands, we combine creative vision, technical expertise and state-of-the-art audio equipment to deliver outstanding results. With years of experience across the multimedia industry, we work seamlessly alongside your team to ensure every project meets the highest creative and technical standards.",
    it: "Il nostro team è composto da professionisti del settore: sound designer, produttori musicali, compositori e ingegneri del suono esperti, accomunati dalla ricerca dell’eccellenza. Avendo lavorato per brand come Giorgio Armani e altri brand internazionali, uniamo visione creativa, competenza tecnica e attrezzature audio all’avanguardia per ottenere risultati straordinari. Grazie ad anni di esperienza nel settore multimediale, collaboriamo in perfetta sintonia con il tuo team per garantire che ogni progetto rispetti i più elevati standard creativi e tecnici.",
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

  aboutIntroA: {
    en: "In today's world, the strongest brands are not only seen.",
    it: "Nel mondo di oggi, i brand più forti non si vedono soltanto.",
  },
  aboutIntroB: {
    en: "They are remembered by",
    it: "Si ricordano",
  },
  aboutIntroBold: {
    en: "the way they sound.",
    it: "per come suonano.",
  },
  svcLabel: { en: "Our Services", it: "I nostri servizi" },
  svc1Title: { en: "Your External Audio Department", it: "Il tuo reparto audio esterno" },
  svc1Desc: {
    en: "We manage your entire audio department, from strategy to delivery. One dedicated audio partner, one seamless workflow, every project covered.",
    it: "Gestiamo l'intero reparto audio, dalla strategia alla consegna. Un unico partner audio dedicato, un flusso di lavoro senza interruzioni, ogni progetto coperto.",
  },
  svc2Title: { en: "Sound Branding", it: "Sound Branding" },
  svc2Desc: {
    en: "We create distinctive sonic logos and signature corporate themes that make brands instantly recognizable across campaigns, content, and experiences.",
    it: "Creiamo loghi sonori distintivi e temi corporate che rendono i brand immediatamente riconoscibili in campagne, contenuti ed esperienze.",
  },
  svc3Title: { en: "Music Experience", it: "Music Experience" },
  svc3Desc: {
    en: "Original music and bespoke sound design for films, branded content, events, retail spaces, podcasts, and every environment where sound shapes the experience.",
    it: "Musica originale e sound design su misura per film, contenuti brandizzati, eventi, spazi retail, podcast e ogni ambiente in cui il suono plasma l'esperienza.",
  },
  teamLabel: { en: "OUR TEAM IS MADE OF INDUSTRY EXPERTS", it: "IL NOSTRO TEAM È COMPOSTO DA ESPERTI DEL SETTORE" },
  teamLine: {
    en: "We've worked with global icons like Giorgio Armani, and leading brands worldwide.",
    it: "Abbiamo lavorato con icone globali come Giorgio Armani e con brand leader in tutto il mondo.",
  },
  svcClose: { en: "Close", it: "Chiudi" },

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
    en: "Thank you for reaching out!",
    it: "Grazie!",
  },
  formThanksSub: {
    en: "Expect to hear from us shortly.",
    it: "Ti risponderemo il prima possibile.",
  },

  popTitle: { en: "Let’s enhance your sound experience!", it: "Espandiamo la tua esperienza sonora!" },
  popName: { en: "Full name or company name", it: "Nome completo o nome azienda" },
  popEmail: { en: "Email", it: "Email" },
  popPhone: { en: "Phone number (optional)", it: "Numero di telefono (facoltativo)" },
  popMessage: { en: "Your message", it: "Il tuo messaggio" },
  popSend: { en: "Send Message", it: "Invia messaggio" },
  popClose: { en: "Close", it: "Chiudi" },
  contactTitle: { en: "Contact", it: "Contatti" },

  marqueeHeard: {
    en: "Enchance your brand experience through sound",
    it: "Migliora l'esperienza del tuo brando attraverso il suono",
  },
  marqueeTitle: {
    en: "Every powerful brand has its own sound. Your brand has a sound. We help you find it.",
    it: "Ogni brand potente ha il suo suono. Il tuo brand ha un suono. Ti aiutiamo a trovarlo.",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof T) => string };
const LangContext = createContext<Ctx>({ lang: "en", setLang: () => { }, t: (k) => T[k].en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sancin-lang");
      if (saved === "it" || saved === "en") setLangState(saved);
    } catch { }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("sancin-lang", l);
    } catch { }
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
