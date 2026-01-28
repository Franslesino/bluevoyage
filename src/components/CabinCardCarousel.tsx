"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { getDirectImageUrl } from "@/lib/cabinApi";

interface CabinCardCarouselProps {
    images: string[];
    altText: string;
    onImageClick?: () => void;
}

export default function CabinCardCarousel({ images, altText, onImageClick }: CabinCardCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        containScroll: "trimSnaps"
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    // If only 1 image, render simple image without carousel overhead
    if (images.length <= 1) {
        return (
            <div className="cabin-card-image relative w-full h-full" onClick={onImageClick}>
                <Image
                    src={getDirectImageUrl(images[0] || "/boat/boat-1.webp")}
                    alt={altText}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                    unoptimized
                />
            </div>
        );
    }

    return (
        <div className="cabin-card-image relative w-full h-full group" onClick={onImageClick}>
            <div className="overflow-hidden h-full absolute inset-0" ref={emblaRef}>
                <div className="flex h-full touch-pan-y">
                    {images.map((src, idx) => (
                        <div key={idx} className="flex-[0_0_100%] min-w-0 relative h-full">
                            <Image
                                src={getDirectImageUrl(src)}
                                alt={`${altText} - Image ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 400px"
                                unoptimized
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons - Show on hover */}
            <button
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                onClick={scrollPrev}
                aria-label="Previous image"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                onClick={scrollNext}
                aria-label="Next image"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1.5 z-10 pointer-events-none">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 shadow-sm pointer-events-auto ${index === selectedIndex ? "bg-white w-3 scale-110" : "bg-white/60 hover:bg-white/80"
                            }`}
                        onClick={(e) => scrollTo(index, e)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
