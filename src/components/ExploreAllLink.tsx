import React from "react";
import LocaleLink from "./LocaleLink";

interface ExploreAllLinkProps {
    href: string;
    label: string;
}

export default function ExploreAllLink({ href, label }: ExploreAllLinkProps) {
    return (
        <LocaleLink
            href={href}
            className="inline-flex items-center gap-2 text-sm md:text-base uppercase tracking-wider font-avenir text-[#6b4c3b] visited:text-[#6b4c3b] active:text-[#4a3429] hover:text-[#4a3429] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c3b]/30"
        >
            <span className="group-hover:underline underline-offset-4">
                {label}
            </span>
            <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </LocaleLink>
    );
}
