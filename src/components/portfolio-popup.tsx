
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

const portfolioVideos = [
    {
        title: "Giorgio Armani — Crossroads",
        youtubeId: "2UaJmfm5SR8",
    },
    {
        title: "Trigno — Insuperabile feat. Ermal Meta",
        youtubeId: "lxO2_G58vPs",
    },
    {
        title: "Chimera",
        youtubeId: "DzS7BJ9I6cg",
    },
    {
        title: "Leica — Time",
        youtubeId: "q4zPU5N4WPU",
    },
];

export function PortfolioPopup({
    onClose,
}: {
    onClose: () => void;
}) {
    const { lang, t } = useLang();

    const [closing, setClosing] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [playingIndex, setPlayingIndex] =
        useState<number | null>(null);

    const scrollerRef = useRef<HTMLDivElement>(null);

    const requestClose = useCallback(() => {
        setClosing(true);
    }, []);

    const goTo = useCallback((index: number) => {
        if (index < 0 || index >= portfolioVideos.length) {
            return;
        }

        setPlayingIndex(null);

        const scroller = scrollerRef.current;
        if (!scroller) return;

        scroller.scrollTo({
            left: index * scroller.clientWidth,
            behavior: "smooth",
        });
    }, []);

    const handleScroll = () => {
        const scroller = scrollerRef.current;
        if (!scroller || scroller.clientWidth === 0) return;

        const index = Math.min(
            portfolioVideos.length - 1,
            Math.max(
                0,
                Math.round(
                    scroller.scrollLeft / scroller.clientWidth
                )
            )
        );

        if (index !== activeIndex) {
            setActiveIndex(index);
            setPlayingIndex(null);
        }
    };

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                requestClose();
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [requestClose]);

    useEffect(() => {
        if (!closing) return;

        const timer = window.setTimeout(onClose, 460);
        return () => window.clearTimeout(timer);
    }, [closing, onClose]);

    if (typeof document === "undefined") return null;

    return createPortal(
        <div
            className={`cp-overlay ${closing ? "cp-overlay-out" : ""
                }`}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    requestClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="portfolio-title"
                className={`cp-window ${closing ? "cp-genie-out" : "cp-genie-in"
                    }`}
                style={{
                    width: "min(94vw, 1100px)",
                    maxWidth: "1100px",
                }}
            >
                {/* Mac-style window controls */}
                <div className="flex items-center gap-[18px]">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={requestClose}
                        aria-label={t("popClose")}
                        className="cp-dot cp-dot-close hover:brightness-90"
                    />
                    <span
                        className="cp-dot cp-dot-minimize"
                        aria-hidden
                    />
                    <span
                        className="cp-dot cp-dot-expand"
                        aria-hidden
                    />
                </div>

                {/* Header */}
                <div className="mt-8 text-center">
                    <h2
                        id="portfolio-title"
                        className="text-3xl md:text-5xl font-bold tracking-tight text-black"
                    >
                        Selected Work.
                    </h2>

                    <p className="mt-3 text-neutral-600">
                        {lang === "it"
                            ? "Una selezione dei nostri progetti."
                            : "Explore some of our projects."}
                    </p>
                </div>

                {/* Horizontal video carousel */}
                <div className="mt-8">
                    <div
                        ref={scrollerRef}
                        onScroll={handleScroll}
                        className="
              flex w-full
              overflow-x-auto
              snap-x snap-mandatory
              scroll-smooth
              overscroll-x-contain
              touch-pan-x
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
                    >
                        {portfolioVideos.map((video, index) => (
                            <div
                                key={video.youtubeId}
                                className="w-full shrink-0 snap-center px-1 md:px-3"
                            >
                                <div
                                    className={`
                    mx-auto w-full
                    transition-all duration-700
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    motion-reduce:transition-none
                    ${activeIndex === index
                                            ? "scale-100 opacity-100"
                                            : "scale-[0.88] opacity-40"
                                        }
                  `}
                                >
                                    {playingIndex === index ? (
                                        <iframe
                                            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&playsinline=1&rel=0`}
                                            title={video.title}
                                            className="
                        block aspect-video w-full
                        rounded-2xl border-0 bg-black
                      "
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setPlayingIndex(index)}
                                            aria-label={`Play ${video.title}`}
                                            className="
                        group relative block aspect-video
                        w-full overflow-hidden
                        rounded-2xl bg-black
                        focus-visible:outline-4
                        focus-visible:outline-black
                      "
                                        >
                                            <img
                                                src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                                                alt={video.title}
                                                loading="lazy"
                                                className="
                          h-full w-full object-cover
                          transition-transform duration-700
                          group-hover:scale-[1.04]
                        "
                                            />

                                            <span className="absolute inset-0 bg-black/20" />

                                            <span
                                                className="
                          absolute left-1/2 top-1/2
                          flex h-16 w-16
                          -translate-x-1/2 -translate-y-1/2
                          items-center justify-center
                          rounded-full bg-white/90 text-black
                          shadow-xl
                          transition-transform duration-300
                          group-hover:scale-110
                        "
                                            >
                                                <Play
                                                    size={25}
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Video title and navigation */}
                    <div className="mt-5 flex items-center justify-between gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="rounded-full shrink-0"
                            onClick={() => goTo(activeIndex - 1)}
                            disabled={activeIndex === 0}
                            aria-label={
                                lang === "it"
                                    ? "Video precedente"
                                    : "Previous video"
                            }
                        >
                            <ArrowLeft size={20} />
                        </Button>

                        <div
                            className="min-w-0 text-center"
                            aria-live="polite"
                        >
                            <h3 className="text-base md:text-xl font-semibold text-black">
                                {portfolioVideos[activeIndex].title}
                            </h3>
                            <p className="mt-1 text-sm text-neutral-500">
                                {activeIndex + 1} / {portfolioVideos.length}
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="rounded-full shrink-0"
                            onClick={() => goTo(activeIndex + 1)}
                            disabled={
                                activeIndex === portfolioVideos.length - 1
                            }
                            aria-label={
                                lang === "it"
                                    ? "Video successivo"
                                    : "Next video"
                            }
                        >
                            <ArrowRight size={20} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
