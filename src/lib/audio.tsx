import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

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
  play: (url: string) => void;
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
  const cache = useRef<Record<string, HTMLAudioElement>>({});

  const activate = useCallback(() => {
    setActivated(true);
    setEnabled(true);
    // Unlock the audio pipeline inside the user gesture without audible output.
    try {
      const a = new Audio();
      a.muted = true;
      void a.play().catch(() => {});
    } catch {}
  }, []);

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  const play = useCallback(
    (url: string) => {
      if (!enabled) return;
      let el = cache.current[url];
      if (!el) {
        el = new Audio(url);
        el.preload = "auto";
        cache.current[url] = el;
      }
      try {
        el.currentTime = 0;
        void el.play().catch(() => {});
      } catch {}
    },
    [enabled],
  );

  return (
    <Ctx.Provider value={{ activated, enabled, toggle, activate, play }}>{children}</Ctx.Provider>
  );
}

export function useAudio() {
  return useContext(Ctx);
}

/** Full-screen white activation screen shown before the site on every load. */
export function AudioGate({ children }: { children: ReactNode }) {
  const { activated, activate } = useAudio();
  const [pressed, setPressed] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!pressed) return;
    const t1 = window.setTimeout(() => setClosing(true), 1000);
    return () => window.clearTimeout(t1);
  }, [pressed]);

  useEffect(() => {
    if (!closing) return;
    const t2 = window.setTimeout(() => activate(), 620);
    return () => window.clearTimeout(t2);
  }, [closing, activate]);

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
            onClick={() => !pressed && setPressed(true)}
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
