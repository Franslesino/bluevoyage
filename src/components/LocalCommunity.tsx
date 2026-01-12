"use client";

/**
 * Local Community Section
 * 
 * Displays 3 alternating zig-zag blocks with images and text describing
 * local Togean Island community encounters and cultural experiences.
 * 
 * Section naming convention:
 * - Destination (SpotlightCarousel)
 * - Kapal Safety & Experience (BoatsHospitalityIntro)
 * - Local Community (this component)
 */

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import { truncateWords, mergeParagraphs } from "@/utils/textUtils";
import ExploreAllLink from "./ExploreAllLink";

// Data for 3 Local Community blocks
const localCommunityData = [
    {
        imageSrc: "/local-communityy-1.jpg",
        title: "Engage with locals and embrace the warmth of Togean people",
        description: [
            "The Togean Islands are more than a tropical escape—they're a gateway to heartfelt connections and timeless traditions. Meet the Bajau 'Sea Gypsies,' who live in harmony with the ocean, and the Pamona and Saluan communities, whose warmth and hospitality make every visitor feel at home. From stilted sea villages to vibrant cultural traditions, the Togean people embody the serenity and authenticity of these remote islands.",
            "Let their stories, smiles, and traditions transform your trip into an unforgettable journey where nature and culture unite in perfect harmony.",
        ],
    },
    {
        imageSrc: "/local-communityy-2.jpg",
        title: "Discover the traditional ways of island life",
        description: [
            "The Togean Islands are more than a tropical escape—they're a gateway to heartfelt connections and timeless traditions. Meet the Bajau 'Sea Gypsies,' who live in harmony with the ocean, and the Pamona and Saluan communities, whose warmth and hospitality make every visitor feel at home. From stilted sea villages to vibrant cultural traditions, the Togean people embody the serenity and authenticity of these remote islands.",
            "Let their stories, smiles, and traditions transform your trip into an unforgettable journey where nature and culture unite in perfect harmony.",
        ],
    },
    {
        imageSrc: "/local-communityy-3.jpg",
        title: "Create lasting memories with the island community",
        description: [
            "The Togean Islands are more than a tropical escape—they're a gateway to heartfelt connections and timeless traditions. Meet the Bajau 'Sea Gypsies,' who live in harmony with the ocean, and the Pamona and Saluan communities, whose warmth and hospitality make every visitor feel at home. From stilted sea villages to vibrant cultural traditions, the Togean people embody the serenity and authenticity of these remote islands.",
            "Let their stories, smiles, and traditions transform your trip into an unforgettable journey where nature and culture unite in perfect harmony.",
        ],
    },
];

// Parallax ranges in pixels per breakpoint
const PARALLAX_RANGE = {
    desktop: 110,  // >=1024px
    tablet: 80,    // 768-1023px
    mobile: 30,    // <768px (subtle)
};

// LERP damping factor (0-1, higher = faster convergence)
const LERP_FACTOR = 0.12;

// Debounce delay for resize in ms
const RESIZE_DEBOUNCE_MS = 150;

interface BlockMeasurements {
    top: number;
    height: number;
}

function LocalCommunityBlock({
    imageSrc,
    title,
    description,
    isReversed,
    index,
    setImageRef,
    setSectionRef,
}: {
    imageSrc: string;
    title: string;
    description: string[];
    isReversed: boolean;
    index: number;
    setImageRef: (el: HTMLDivElement | null) => void;
    setSectionRef: (el: HTMLDivElement | null) => void;
}) {
    // Merge paragraphs for mobile truncation
    const mergedDescription = mergeParagraphs(description);
    const truncatedDescription = truncateWords(mergedDescription, 23);

    return (
        <div
            ref={setSectionRef}
            className={`flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12 lg:gap-16 ${isReversed ? "md:flex-row-reverse" : ""
                }`}
        >
            {/* Image Column with Frame Container */}
            <div className="w-full md:w-1/2 flex justify-center">
                {/* 
                    Frame Container (visible window with overflow-hidden)
                    - Mobile: full width, h-[520px]
                    - Tablet (md): responsive clamp to fit 50/50 layout
                    - Desktop (lg+): exact 538x807
                */}
                <div
                    className="relative overflow-hidden 
                               w-full h-[520px] 
                               md:w-[min(538px,44vw)] md:h-[min(807px,70vh)]
                               lg:w-[538px] lg:h-[807px]"
                >
                    {/* Parallax Image Container (larger than frame, moves within) */}
                    <div
                        ref={setImageRef}
                        className="absolute inset-0 will-change-transform"
                        style={{ transform: "translate3d(0, 0, 0) scale(1.15)" }}
                    >
                        <Image
                            src={imageSrc}
                            alt={`Togean local community experience ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 44vw, 538px"
                            priority={index === 0}
                        />
                    </div>
                </div>
            </div>

            {/* Text Column */}
            <div className="w-full md:w-1/2 md:max-w-[640px] px-4 md:px-12 lg:px-[100px] py-8 md:py-0">
                <h3 className="font-canto text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-tight text-neutral-900">
                    {title}
                </h3>

                {/* Mobile: Single truncated paragraph (23 words + "...") */}
                <div className="mt-6 md:mt-8 block md:hidden">
                    <p className="font-avenir text-sm leading-relaxed text-neutral-600">
                        {truncatedDescription}
                    </p>
                </div>

                {/* Desktop/Tablet: Full paragraphs with spacing */}
                <div className="hidden md:block mt-6 md:mt-8 space-y-6">
                    {description.map((paragraph, pIndex) => (
                        <p
                            key={pIndex}
                            className="font-avenir text-sm sm:text-base leading-relaxed text-neutral-600"
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function LocalCommunity() {
    // Per-block refs for parallax
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Parallax state (stored in refs to avoid React re-renders)
    const currentYValues = useRef<number[]>([0, 0, 0]);
    const targetYValues = useRef<number[]>([0, 0, 0]);
    const needsUpdate = useRef(false);
    const rafId = useRef<number | null>(null);

    // Cached measurements (updated on resize)
    const measurements = useRef<BlockMeasurements[]>([]);
    const windowHeight = useRef(0);
    const parallaxRange = useRef(PARALLAX_RANGE.desktop);

    // Reduced motion preference
    const prefersReducedMotion = useRef(false);

    // Update parallax range based on viewport width
    const updateParallaxRange = useCallback(() => {
        const width = window.innerWidth;
        if (width >= 1024) {
            parallaxRange.current = PARALLAX_RANGE.desktop;
        } else if (width >= 768) {
            parallaxRange.current = PARALLAX_RANGE.tablet;
        } else {
            parallaxRange.current = PARALLAX_RANGE.mobile;
        }
    }, []);

    // Cache section measurements (called on mount and resize)
    const cacheMeasurements = useCallback(() => {
        windowHeight.current = window.innerHeight;
        updateParallaxRange();

        measurements.current = sectionRefs.current.map((ref) => {
            if (!ref) return { top: 0, height: 0 };
            const rect = ref.getBoundingClientRect();
            return {
                top: rect.top + window.scrollY,
                height: rect.height,
            };
        });
    }, [updateParallaxRange]);

    // Compute target parallax offset for a block based on scroll position
    const computeTargetY = useCallback((blockIndex: number, scrollY: number): number => {
        if (prefersReducedMotion.current) return 0;

        const m = measurements.current[blockIndex];
        if (!m || m.height === 0) return 0;

        const wh = windowHeight.current;
        const sectionCenter = m.top + m.height / 2;
        const viewportCenter = scrollY + wh / 2;

        // Progress: -1 when section is fully below, +1 when fully above
        const progress = (viewportCenter - sectionCenter) / (wh + m.height);
        const clampedProgress = Math.max(-0.5, Math.min(0.5, progress)) * 2;

        return clampedProgress * parallaxRange.current;
    }, []);

    // Animation loop using requestAnimationFrame with LERP
    const animate = useCallback(() => {
        if (prefersReducedMotion.current) {
            // Apply zero offset when reduced motion is preferred
            imageRefs.current.forEach((ref) => {
                if (ref) {
                    ref.style.transform = "translate3d(0, 0, 0) scale(1.15)";
                }
            });
            rafId.current = requestAnimationFrame(animate);
            return;
        }

        let stillMoving = false;

        for (let i = 0; i < localCommunityData.length; i++) {
            const target = targetYValues.current[i];
            const current = currentYValues.current[i];

            // LERP interpolation
            const newY = current + (target - current) * LERP_FACTOR;
            currentYValues.current[i] = newY;

            // Apply transform if we have a ref
            const imageRef = imageRefs.current[i];
            if (imageRef) {
                imageRef.style.transform = `translate3d(0, ${newY}px, 0) scale(1.15)`;
            }

            // Check if still converging (threshold 0.1px)
            if (Math.abs(target - newY) > 0.1) {
                stillMoving = true;
            }
        }

        // Keep updating if still moving or needs update
        if (stillMoving || needsUpdate.current) {
            needsUpdate.current = false;
        }

        rafId.current = requestAnimationFrame(animate);
    }, []);

    // Scroll handler - only updates refs, no direct style manipulation
    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;

        // Compute target values for all blocks
        for (let i = 0; i < localCommunityData.length; i++) {
            targetYValues.current[i] = computeTargetY(i, scrollY);
        }

        needsUpdate.current = true;
    }, [computeTargetY]);

    useEffect(() => {
        // Check reduced motion preference
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        prefersReducedMotion.current = motionQuery.matches;

        const handleMotionChange = (e: MediaQueryListEvent) => {
            prefersReducedMotion.current = e.matches;
            if (e.matches) {
                // Reset to zero offset
                currentYValues.current = [0, 0, 0];
                targetYValues.current = [0, 0, 0];
            }
        };
        motionQuery.addEventListener("change", handleMotionChange);

        // Initial measurements
        cacheMeasurements();

        // Debounced resize handler
        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                cacheMeasurements();
                handleScroll(); // Recompute targets after resize
            }, RESIZE_DEBOUNCE_MS);
        };
        window.addEventListener("resize", handleResize);

        // Scroll listener (passive for performance)
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Initial scroll computation
        handleScroll();

        // Start animation loop
        rafId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            motionQuery.removeEventListener("change", handleMotionChange);
            clearTimeout(resizeTimeout);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, [cacheMeasurements, handleScroll, animate]);

    // Ref setters for the block components
    const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
        sectionRefs.current[index] = el;
    };
    const setImageRef = (index: number) => (el: HTMLDivElement | null) => {
        imageRefs.current[index] = el;
    };

    return (
        <section className="bg-white py-16 md:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <div className="text-center mb-12 md:mb-20 lg:mb-24">
                    <h2 className="font-canto text-3xl md:text-4xl lg:text-5xl text-neutral-900 leading-tight">
                        In the community: Local Encounters
                    </h2>
                    <ExploreAllLink href="/local-community" label="Curated Connections: Explore All" />
                </div>

                {/* Zig-Zag Blocks */}
                <div className="space-y-16 md:space-y-24 lg:space-y-32">
                    {localCommunityData.map((block, index) => (
                        <LocalCommunityBlock
                            key={index}
                            imageSrc={block.imageSrc}
                            title={block.title}
                            description={block.description}
                            isReversed={index % 2 === 1}
                            index={index}
                            setSectionRef={(el) => { sectionRefs.current[index] = el; }}
                            setImageRef={(el) => { imageRefs.current[index] = el; }}
                        />
                    ))}
                </div>
            </div>
        </section >
    );
}
