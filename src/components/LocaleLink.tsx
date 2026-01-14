"use client";

import Link, { LinkProps } from "next/link";
import { useTranslation } from "./I18nProvider";
import { localizePath } from "@/lib/i18n";
import { ReactNode, forwardRef, AnchorHTMLAttributes } from "react";

interface LocaleLinkProps extends Omit<LinkProps, "href"> {
    href: string;
    children: ReactNode;
    className?: string;
    "aria-label"?: string;
    target?: string;
    rel?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * LocaleLink - A locale-aware wrapper around next/link
 * 
 * Automatically prefixes href with the current locale for de/fr,
 * and keeps English paths at root (no prefix).
 * 
 * Usage:
 * ```tsx
 * <LocaleLink href="/destinations">Destinations</LocaleLink>
 * // If locale is "de", this renders as "/de/destinations"
 * // If locale is "en", this renders as "/destinations"
 * ```
 */
const LocaleLink = forwardRef<HTMLAnchorElement, LocaleLinkProps>(
    function LocaleLink({ href, children, className, onClick, ...props }, ref) {
        const { locale } = useTranslation();
        
        // Handle external links (http://, https://, mailto:, tel:, etc.)
        const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
        
        // Handle hash-only links (e.g., #section)
        const isHashOnly = href.startsWith("#");
        
        // Handle hash links with path (e.g., /#section or /page#section)
        const hasHash = href.includes("#") && !isHashOnly;
        
        let localizedHref = href;
        
        if (!isExternal && !isHashOnly) {
            if (hasHash) {
                // Split path and hash, localize path, then rejoin
                const [path, hash] = href.split("#");
                localizedHref = `${localizePath(path, locale)}#${hash}`;
            } else {
                localizedHref = localizePath(href, locale);
            }
        }
        
        return (
            <Link
                href={localizedHref}
                className={className}
                onClick={onClick}
                ref={ref}
                {...props}
            >
                {children}
            </Link>
        );
    }
);

export default LocaleLink;

/**
 * Hook to get a localized href without rendering a Link
 * Useful for programmatic navigation or dynamic href generation
 */
export function useLocalizedHref(href: string): string {
    const { locale } = useTranslation();
    
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    const isHashOnly = href.startsWith("#");
    
    if (isExternal || isHashOnly) {
        return href;
    }
    
    const hasHash = href.includes("#");
    
    if (hasHash) {
        const [path, hash] = href.split("#");
        return `${localizePath(path, locale)}#${hash}`;
    }
    
    return localizePath(href, locale);
}
