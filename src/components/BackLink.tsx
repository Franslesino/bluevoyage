import LocaleLink from "./LocaleLink";
import React from "react";

interface BackLinkProps {
    href: string;
    label: string;
    variant?: "dark" | "light";
    className?: string;
}

export default function BackLink({ href, label, variant = "dark", className = "" }: BackLinkProps) {
    const colorClasses = variant === "dark"
        ? "text-[#6b4c3b] visited:text-[#6b4c3b] active:text-[#4a3429] hover:text-[#4a3429]"
        : "text-white hover:text-white/80";

    return (
        <LocaleLink
            href={href}
            className={`inline-flex items-center gap-2 text-sm uppercase tracking-widest font-avenir transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c3b]/30 ${colorClasses} ${className}`}
        >
            <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 19l-7-7 7-7m8 14l-7-7 7-7"
                />
            </svg>
            {label}
        </LocaleLink>
    );
}
