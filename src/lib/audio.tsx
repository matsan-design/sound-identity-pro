import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const CLICK_SFX_URL = "/sounds/SFX_Click.wav";
const SWOOSH_SFX_URL = "/sounds/SFX_Swoosh.wav";

const HEADPHONES_IN_URL = "/sounds/SFX_Headphones_In.wav";
const HEADPHONES_OUT_URL = "/sounds/SFX_Headphones_Out.wav";



/** Shared once-per-session flag for the logo intro swoosh. */
export const introSwoosh = { played: false };

type AudioCtx = {
  /** true once the user has passed the activation screen */
  activated: boolean;
  /** global sound on/off state */
  enabled: boolean;
  toggle: () => void;
  /** enable + unlock the audio pipeline (called inside the user gesture) */
  unlock: () => void;
  /** dismiss the activation screen */
  activate: () => void;
  /** play a one-shot sound effect, respecting the global state */
  play: (url: string, volume?: number) => void;
};

const Ctx = createContext<AudioCtx>({
  activated: false,
  enabled: false,
  toggle: () => { },
  unlock: () => { },
  activate: () => { },
  play: () => { },
});


export function SpeakerIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M281 68 141 160H80a40 40 0 0 0-40 40v112a40 40 0 0 0 40 40h61l140 92a34 34 0 0 0 53-28V96a34 34 0 0 0-53-28Z"
        fill="currentColor"
      />
      <path
        d="M372 184a104 104 0 0 1 0 144M415 138a168 168 0 0 1 0 236"
        stroke="currentColor"
        strokeWidth="30"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [activated, setActivated] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);
  enabledRef.current = enabled;
  const ctxRef = useRef<AudioContext | null>(null);
  const buffers = useRef<Record<string, AudioBuffer | Promise<AudioBuffer | null>>>({});

  const getCtx = () => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    return ctxRef.current;
  };

  const load = useCallback((url: string) => {
    const ctx = getCtx();
    if (!ctx) return Promise.resolve(null);
    const existing = buffers.current[url];
    if (existing) return Promise.resolve(existing);
    const p = fetch(url)
      .then((r) => r.arrayBuffer())
      .then(
        (data) =>
          new Promise<AudioBuffer>((res, rej) => ctx.decodeAudioData(data, res, rej)),
      )
      .then((buf) => {
        buffers.current[url] = buf;
        return buf;
      })
      .catch(() => {
        delete buffers.current[url];
        return null;
      });
    buffers.current[url] = p;
    return p;
  }, []);

  const playNow = useCallback(
    (url: string, volume = 1) => {
      const ctx = getCtx();
      if (!ctx) {
        try {
          const a = new Audio(url);
          a.volume = volume;
          void a.play().catch(() => { });
        } catch { }
        return;
      }
      if (ctx.state === "suspended") void ctx.resume().catch(() => { });
      const start = (buf: AudioBuffer | null) => {
        if (!buf) return;
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const gain = ctx.createGain();
        gain.gain.value = volume;
        src.connect(gain).connect(ctx.destination);
        src.start(0);
      };
      const b = buffers.current[url];
      if (b instanceof AudioBuffer) start(b);
      else void load(url).then(start);
    },
    [load],
  );

  const unlock = useCallback(() => {
    enabledRef.current = true;
    setEnabled(true);
    // Create/resume the AudioContext inside the user gesture and preload sounds.
    const ctx = getCtx();
    if (ctx) {
      void ctx.resume().catch(() => { });
      try {
        const s = ctx.createBufferSource();
        s.buffer = ctx.createBuffer(1, 1, 22050);
        s.connect(ctx.destination);
        s.start(0);
      } catch { }
      void load(CLICK_SFX_URL);
      void load(SWOOSH_SFX_URL);
      void load("/sounds/SFX_Contact_Form_Red_Button.wav");

      void load(HEADPHONES_IN_URL);
      void load(HEADPHONES_OUT_URL);

    }
  }, [load]);

  const activate = useCallback(() => setActivated(true), []);

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  const play = useCallback(
    (url: string, volume?: number) => {
      if (!enabledRef.current) return;
      playNow(url, volume);
    },
    [playNow],
  );

  // Global click sound for every interactive element, respecting the audio state.
  useEffect(() => {
    const onPointerUp = (e: Event) => {
      if (!enabledRef.current) return;
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;
      const hit = target.closest(
        'button, a, [role="button"], input[type="submit"], input[type="button"], summary',
      );
      if (!hit) return;
      if (hit.hasAttribute("data-no-click-sound")) return;


      const link = target.closest("a[href]");

      if (link instanceof HTMLAnchorElement && link.origin === window.location.origin) {
        const from = window.location.pathname.replace(/\/+$/, "") || "/";
        const to = link.pathname.replace(/\/+$/, "") || "/";

        const isInnerPage = (path: string) =>
          path === "/about-us" || path === "/our-expertise";

        if (from === "/" && isInnerPage(to)) {
          playNow(HEADPHONES_OUT_URL, 0.2);
          return;
        }

        if (isInnerPage(from) && to === "/") {
          playNow(HEADPHONES_IN_URL, 0.08);
          return;
        }
      }

      if (hit.classList.contains("cp-dot-close")) {
        playNow("/sounds/SFX_Contact_Form_Red_Button.wav", 0.1);
      } else {
        playNow(CLICK_SFX_URL);
      }

    };
    document.addEventListener("click", onPointerUp, true);
    return () => document.removeEventListener("click", onPointerUp, true);
  }, [playNow]);

  return (
    <Ctx.Provider value={{ activated, enabled, toggle, unlock, activate, play }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAudio() {
  return useContext(Ctx);
}

/** Full-screen white activation screen shown before the site on every load. */
export function AudioGate({ children }: { children: ReactNode }) {
  const { activated, activate, unlock, play } = useAudio();
  const [pressed, setPressed] = useState(false);
  const [closing, setClosing] = useState(false);

  const onActivateClick = () => {
    if (pressed) return;
    // 1. unlock audio inside the gesture, 2. play the click sound, 3. turn the icon black
    unlock();
    play(CLICK_SFX_URL);
    setPressed(true);
  };

  useEffect(() => {
    if (!pressed) return;
    const t1 = window.setTimeout(() => setClosing(true), 1000);
    return () => window.clearTimeout(t1);
  }, [pressed]);

  useEffect(() => {
    if (!closing) return;
    // Swoosh starts slightly before the logo is revealed for tighter sync.
    const t0 = window.setTimeout(() => {
      if (window.location.pathname === "/" && !introSwoosh.played) {
        introSwoosh.played = true;
        play(SWOOSH_SFX_URL, Math.pow(10, -5 / 20));
      }
    }, 420);
    const t2 = window.setTimeout(() => activate(), 620);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t2);
    };
  }, [closing, activate, play]);


  return (
    <>
      {children}
      {!activated && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-white px-6 transition-all duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${closing ? "opacity-0 scale-105 blur-md" : "opacity-100 scale-100 blur-0"
            }`}
        >

          <div className="flex flex-col items-center gap-2">
            <p className="text-center max-w-md text-base md:text-lg text-neutral-500 leading-relaxed">
              Click on the sound icon for the full experience
            </p>
            <span className="text-xl text-neutral-500">↓</span>
          </div>

          <button
            type="button"
            onClick={onActivateClick}
            aria-label="Activate audio"
            className="rounded-full p-4 transition-colors duration-500"
          >
            <SpeakerIcon
              className={`h-[54.4px] w-[54.4px] md:h-[68px] md:w-[68px] transition-colors duration-500 ${pressed ? "text-black" : "text-black/10"
                }`}
            />
          </button>
        </div>
      )}
    </>
  );
}

/** Minimal global sound on/off control. */
export function AudioToggle({ className = "" }: { className?: string }) {
  const { enabled, toggle } = useAudio();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={enabled ? "Turn sound off" : "Turn sound on"}
      aria-pressed={enabled}
      className={`inline-flex items-center justify-center rounded-full border border-black/20 p-1.5 transition hover:bg-black/5 ${className}`}
    >
      <SpeakerIcon
        className={`h-3.5 w-3.5 transition-colors duration-300 ${enabled ? "text-black" : "text-black/25"
          }`}
      />
    </button>
  );
}
