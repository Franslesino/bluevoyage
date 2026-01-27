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
            className="inline-flex items-center gap-2 text-sm md:text-base uppercase tracking-wider font-avenir text-[#088F8F] visited:text-[#088F8F] active:text-[#066e6e] hover:text-[#066e6e] transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#088F8F]/30"
        >
            <span className="relative bg-gradient-to-r from-[#088F8F] to-[#066e6e] bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-[#066e6e] group-hover:to-[#088F8F] font-bold">
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#088F8F] to-[#066e6e] transition-all duration-300 group-hover:w-full"></span>
            </span>
            <svg
                className="w-4 h-4 text-[#088F8F] transition-transform group-hover:translate-x-1"
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
