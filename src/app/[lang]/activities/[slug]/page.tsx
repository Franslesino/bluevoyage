import ActivityDetailPage from "@/app/_pages/ActivityDetailPage";
import { programs } from "@/data/programs";
import { SUPPORTED_LOCALES } from "@/lib/i18n";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return SUPPORTED_LOCALES.flatMap((lang) =>
        programs.map((program) => ({
            lang,
            slug: program.slug,
        }))
    );
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    return <ActivityDetailPage slug={slug} />;
}
