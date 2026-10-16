import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import clickSfx from "@/assets/sfx-click-v2.wav.asset.json";
import swooshSfx from "@/assets/sfx-swoosh.wav.asset.json";

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
  toggle: () => {},
  unlock: () => {},
  activate: () => {},
  play: () => {},
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
          void a.play().catch(() => {});
        } catch {}
        return;
      }
      if (ctx.state === "suspended") void ctx.resume().catch(() => {});
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
      void ctx.resume().catch(() => {});
      try {
        const s = ctx.createBufferSource();
        s.buffer = ctx.createBuffer(1, 1, 22050);
        s.connect(ctx.destination);
        s.start(0);
      } catch {}
      void load(clickSfx.url);
      void load(swooshSfx.url);
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
      playNow(clickSfx.url);
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
    play(clickSfx.url);
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
        play(swooshSfx.url, Math.pow(10, -5 / 20));
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
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-white px-6 transition-all duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
            closing ? "opacity-0 scale-105 blur-md" : "opacity-100 scale-100 blur-0"
          }`}
        >
          <p className="text-center max-w-md text-base md:text-lg text-neutral-500 leading-relaxed">
            Activate audio for a better experience
          </p>
          <button
            type="button"
            onClick={onActivateClick}
            aria-label="Activate audio"
            className="rounded-full p-4 transition-colors duration-500"
          >
            <SpeakerIcon
              className={`h-16 w-16 md:h-20 md:w-20 transition-colors duration-500 ${
                pressed ? "text-black" : "text-black/10"
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
        className={`h-3.5 w-3.5 transition-colors duration-300 ${
          enabled ? "text-black" : "text-black/25"
        }`}
      />
    </button>
  );
}
