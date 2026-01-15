import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'fr', 'es', 'ru', 'id', 'ja', 'ko', 'zh', 'ar', 'de', 'it', 'tr'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        let locale = defaultLocale;

        // Check googtrans cookie to persist language preference
        // Cookie format: /en/fr, /en/es, /en/en
        const googtrans = request.cookies.get('googtrans')?.value;
        if (googtrans) {
            const parts = googtrans.split('/');
            // parts[0] is empty, parts[1] is source, parts[2] is target
            const targetLang = parts[2];
            if (locales.includes(targetLang)) {
                locale = targetLang;
            }
        }

        // e.g. incoming request is /products
        // The new URL is now /fr/products (if cookie said fr)
        return NextResponse.redirect(
            new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
        );
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - robots.txt, sitemap.xml, manifest.webmanifest (SEO files)
         * - assets (if you have an assets folder)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.webp$|.*\\.gif$|.*\\.mp4$|.*\\.webm$|.*\\.woff$|.*\\.woff2$|.*\\.ttf$|.*\\.otf$).*)',
    ],
};
