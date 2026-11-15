
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { PageShell } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/selected-work")({
    head: () => ({
        meta: [
            {
                title: "Selected Work | Sancin Audio",
            },
            {
                name: "description",
                content:
                    "Explore selected projects by Sancin Audio, including music production, sound design and audio for film, fashion and branded content.",
            },
        ],
    }),
    component: SelectedWork,
});

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

function SelectedWork() {
    const { lang } = useLang();

    const scrollerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [playingIndex, setPlayingIndex] =
        useState<number | null>(null);

    const goTo = (index: number) => {
        if (index < 0 || index >= portfolioVideos.length) return;

        const scroller = scrollerRef.current;
        if (!scroller) return;

        setPlayingIndex(null);
        setActiveIndex(index);

        scroller.scrollTo({
            left: index * scroller.clientWidth,
            behavior: "smooth",
        });
    };

    const handleScroll = () => {
        const scroller = scrollerRef.current;
        if (!scroller || !scroller.clientWidth) return;

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

    return (
        <PageShell>
            <main className="mx-auto w-full max-w-[1200px] pt-12 pb-12 md:pt-20 md:pb-20">

                {/* Page heading */}
                <div className="mb-9 md:mb-14 text-center">
                    <h1 className="expertise-heading font-bold leading-[1.02] tracking-tight text-black">
                        {lang === "it"
                            ? "In evidenza"
                            : "Selected Work"}
                    </h1>

                    <p className="mt-5 text-base md:text-lg text-neutral-500">
                        {lang === "it"
                            ? "Una selezione dei nostri progetti."
                            : "Explore some of our projects."}
                    </p>
                </div>

                {/* Portfolio glass container */}
                <section
                    aria-label={
                        lang === "it"
                            ? "Portfolio video"
                            : "Video portfolio"
                    }
                    className="
            mx-auto max-w-[1100px]
            rounded-[28px] md:rounded-[36px]
            border border-white/80
            bg-gradient-to-br
            from-white/95 to-neutral-200/75
            p-4 md:p-10
            shadow-[0_30px_60px_-30px_rgba(0,0,0,0.22)]
            backdrop-blur-2xl
          "
                >

                    {/* Horizontal carousel */}
                    <div
                        ref={scrollerRef}
                        onScroll={handleScroll}
                        className="
              flex w-full overflow-x-auto
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
                                className="w-full shrink-0 snap-center px-1 md:px-4"
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
                        group relative block
                        aspect-video w-full
                        overflow-hidden rounded-2xl
                        bg-black
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
                          rounded-full bg-white/90
                          text-black shadow-xl
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

                    {/* Navigation */}
                    <div className="mt-7 flex items-center justify-between gap-3">

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
                            <h2 className="text-base md:text-xl font-semibold text-black">
                                {portfolioVideos[activeIndex].title}
                            </h2>

                            <p className="mt-1 text-sm text-neutral-500">
                                {String(activeIndex + 1).padStart(2, "0")}
                                {" / "}
                                {String(portfolioVideos.length).padStart(2, "0")}
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
                </section>
            </main>
        </PageShell>
    );
}
