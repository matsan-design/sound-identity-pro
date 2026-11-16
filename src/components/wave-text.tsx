
import type { PointerEvent } from "react";

export function WaveText({ text }: { text: string }) {
    const handleMove = (event: PointerEvent<HTMLSpanElement>) => {
        if (event.pointerType !== "mouse") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        event.currentTarget
            .querySelectorAll<HTMLElement>("[data-wave-letter]")
            .forEach((letter) => {
                const rect = letter.getBoundingClientRect();

                const dx = rect.left + rect.width / 2 - mouseX;
                const dy = rect.top + rect.height / 2 - mouseY;

                const influence = Math.exp(
                    -((dx * dx) / (80 * 80) + (dy * dy) / (48 * 48))
                );

                letter.style.transform = `translateY(${-18 * influence}px)`;
            });
    };

    const handleLeave = (event: PointerEvent<HTMLSpanElement>) => {
        event.currentTarget
            .querySelectorAll<HTMLElement>("[data-wave-letter]")
            .forEach((letter) => {
                letter.style.transform = "";
            });
    };

    return (
        <span onPointerMove={handleMove} onPointerLeave={handleLeave}>
            {text.split(/(\s+)/).map((part, index) =>
                /^\s+$/.test(part) ? (
                    <span key={index}>{part}</span>
                ) : (
                    <span key={index} className="inline-block whitespace-nowrap">
                        {Array.from(part).map((letter, letterIndex) => (
                            <span
                                key={letterIndex}
                                data-wave-letter
                                className="inline-block transition-transform duration-150 ease-out"
                            >
                                {letter}
                            </span>
                        ))}
                    </span>
                )
            )}
        </span>
    );
}
