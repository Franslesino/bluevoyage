"use client";

import { useEffect } from "react";

/**
 * useHashScroll
 * 
 * Handles smooth scrolling to hash anchors on page load or hash change.
 * Includes a retry mechanism for elements that might render late.
 */
export function useHashScroll() {
    useEffect(() => {
        // Function to handle scrolling
        const handleScroll = () => {
            const hash = window.location.hash;
            if (hash) {
                // Decode hash to handle encoded characters if any
                const id = decodeURIComponent(hash.replace("#", ""));
                const element = document.getElementById(id);

                if (element) {
                    // Small timeout to ensure layout is stable
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 0);
                } else {
                    // Retry a few times if element is not found immediately
                    let retries = 0;
                    const maxRetries = 20; // Try for ~2 seconds
                    const interval = setInterval(() => {
                        const el = document.getElementById(id);
                        if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                            clearInterval(interval);
                        }
                        retries++;
                        if (retries >= maxRetries) clearInterval(interval);
                    }, 100);
                }
            }
        };

        // Run on mount (handles navigation from another page)
        handleScroll();

        // Listen for hash changes
        window.addEventListener("hashchange", handleScroll);
        return () => window.removeEventListener("hashchange", handleScroll);
    }, []);
}
