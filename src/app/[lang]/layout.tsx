"use client";

import { I18nProvider } from "@/components/I18nProvider";
import { SUPPORTED_LOCALES, Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { useEffect, use } from "react";

/**
 * Non-English Layout (de, fr)
 * 
 * This layout wraps all pages under /de and /fr prefixes.
 * English is NOT included here (it's handled by the (en) route group at root).
 */
export default function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = use(params);
    
    // Validate locale - only de and fr are valid here
    if (!SUPPORTED_LOCALES.includes(lang as typeof SUPPORTED_LOCALES[number])) {
        notFound();
    }
    
    const locale = lang as Locale;
    
    // Set lang attribute on html element
    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);
    
    return (
        <I18nProvider locale={locale}>
            {children}
        </I18nProvider>
    );
}
