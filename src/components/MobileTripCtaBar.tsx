"use client";

import React, { useEffect, useState } from "react";
import LocaleLink from "./LocaleLink";
import { useTranslation } from "./I18nProvider";

interface MobileTripCtaBarProps {
    targetId: string;
}

export default function MobileTripCtaBar({ targetId }: MobileTripCtaBarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Show if intersecting OR if we have scrolled past it (top is above viewport)
                const shouldShow = entry.isIntersecting || entry.boundingClientRect.top < 0;
                setIsVisible(shouldShow);
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -40% 0px", // Trigger when element is well into the viewport
            }
        );

        observer.observe(targetElement);

        return () => {
            observer.disconnect();
        };
    }, [targetId]);

    // Handle body padding to prevent content overlap
    useEffect(() => {
        if (isVisible) {
            document.body.classList.add("pb-[84px]");
        } else {
            document.body.classList.remove("pb-[84px]");
        }

        return () => {
            document.body.classList.remove("pb-[84px]");
        };
    }, [isVisible]);

    return (
        <div
            className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F6F1EA] border-t border-neutral-200 px-4 py-3 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out will-change-transform ${isVisible
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "translate-y-full opacity-0 pointer-events-none"
                }`}
        >
            <div className="flex items-center justify-between gap-4">
                {/* Brand Text */}
                <div className="flex flex-col">
                    <span className="font-canto text-xs uppercase tracking-widest text-neutral-900 leading-none mb-1">
                        TogeanVoyages
                    </span>
                    <span className="font-avenir text-sm text-neutral-600 leading-none">
                        {t("cta.tagline")}
                    </span>
                </div>

                {/* CTA Button */}
                <LocaleLink
                    href="/how-to-booking"
                    className="flex-shrink-0 bg-[#CB9275] text-white font-avenir text-sm font-medium px-5 py-2.5 rounded-xl active:bg-[#B97F63] transition-colors shadow-sm"
                >
                    {t("cta.planYourTrip")}
                </LocaleLink>
            </div>
        </div>
    );
}

