"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "./I18nProvider";

const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
};

export default function WildlifeIntroScroll() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const text = textRef.current;
        const image = imageRef.current;

        if (!section || !text || !image) return;

        let currentY = 0;
        let targetY = 0;
        let animationFrameId: number;

        // Check for reduced motion
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        const updateScroll = () => {
            const isMobile = window.innerWidth < 768; // Tailwind md breakpoint
            if (mediaQuery.matches || isMobile) {
                // No animation if reduced motion or mobile
                if (text.style.transform !== '') {
                    text.style.transform = '';
                }
                return;
            }

            const sectionRect = section.getBoundingClientRect();
            const sectionTop = sectionRect.top;
            const sectionHeight = sectionRect.height;
            const viewportHeight = window.innerHeight;

            // Simple parallax logic:
            // When section is in view, we want to map scroll position to translation.
            // We want the text to translate from 0 to (imageHeight - textHeight).

            const imageHeight = image.offsetHeight;
            const textHeight = text.offsetHeight;
            const maxTranslate = Math.max(0, imageHeight - textHeight);

            // Calculate progress. 
            // 0 means section top is at viewport bottom (entering).
            // 1 means section bottom is at viewport top (leaving).
            // But we specifically want the motion to happen while the section is "active".
            // Let's align it such that:
            // Start (0) when section top is somewhere in viewport?
            // End (maxTranslate) when section leaves?

            // Let's trust the user spec: "Text moves with scroll relative to image"
            // "Translate the LEFT text within the height range of the RIGHT square image"

            // Let's look at how much we have scrolled PAST the top of the section relative to the viewport.
            // A common pattern is: progress = -sectionTop / (scrollableDistance)

            // Let's simply clamp the progress based on the section position relative to the viewport middle or top.
            // If we assume the section is taller than the viewport, we can just use the scroll offset.

            // Let's try: Translate based on percentage of section scrolled.
            // We want to reach maxTranslate when we have scrolled past the section content duration.

            // Let's use a simpler approach: 
            // TargetY maps relative to how far the section is from the top of the screen.
            // If sectionTop is > viewportHeight (below screen), progress is 0.
            // If sectionBottom < 0 (above screen), progress is 1.

            const startOffset = viewportHeight * 0.8; // Start slightly before it hits top
            const endOffset = -sectionHeight * 0.2;

            // This is a bit arbitrary. Let's stick to the user's pseudo-code suggestion logic if possible.
            // "progress = clamp((scrollY - sectionTop) / sectionScrollableRange, 0..1)"

            // Wait, we can't get absolute scrollY easily without window.scrollY, which causes re-renders or requires the loop.
            // inside rAF, we use sectionRect.top which is relative to viewport.
            // absolute scrollY approx = (cumulative, but we don't need it).
            // scrollY - absoluteSectionTop = -sectionRect.top

            // So: ScrolledAmount = -sectionRect.top (plus some offset if we want it to start earlier)

            // Let's assume we want the specific effect:
            // Text sticks/moves slower.
            // Let's use `maxTranslate` as the total distance to cover.
            // We want to cover that distance over the duration of the section scroll.

            const scrollDist = -sectionRect.top + (viewportHeight * 0.3); // Start when section is 30% up the screen
            const scrollRange = sectionHeight + viewportHeight; // Total distance the section is visible

            // Normalize 0 to 1
            let progress = scrollDist / (sectionHeight * 0.5); // Tune this denominator to control speed
            progress = Math.max(0, Math.min(1, progress));

            targetY = progress * maxTranslate;

            // Lerp for smoothness
            currentY = lerp(currentY, targetY, 0.1);

            // Apply transform
            if (Math.abs(currentY - targetY) > 0.1 || Math.abs(currentY) > 0.1) {
                text.style.transform = `translate3d(0, ${currentY}px, 0)`;
            } else {
                // Snap if close
                // text.style.transform = `translate3d(0, ${targetY}px, 0)`;
            }

            animationFrameId = requestAnimationFrame(updateScroll);
        };

        // Initialize loop
        animationFrameId = requestAnimationFrame(updateScroll);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full max-w-[1280px] mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row gap-12 lg:gap-24 items-start relative mb-24"
        >
            {/* Left: Sticky-like Moving Text */}
            <div
                ref={textRef}
                className="w-full md:w-1/2 md:will-change-transform"
            >
                <h2 className="font-canto text-4xl md:text-5xl lg:text-6xl text-neutral-900 leading-tight mb-8">
                    {t("wildlifeIntro.title")}
                </h2>
                <p className="font-avenir text-lg md:text-xl text-neutral-600 leading-relaxed max-w-lg">
                    {t("wildlifeIntro.description")}
                </p>
            </div>

            {/* Right: Fixed Square Image */}
            <div
                ref={imageRef}
                className="w-full md:w-1/2 aspect-square relative rounded-sm overflow-hidden"
            >
                <Image
                    src="/wildlife_real/intro-card.png"
                    alt="Green sea turtle gliding over coral reef"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-[1.08]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </section>
    );
}
