import ActivityDetailPage from "@/app/_pages/ActivityDetailPage";
import { programs } from "@/data/programs";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return programs.map((program) => ({
        slug: program.slug,
    }));
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    return <ActivityDetailPage slug={slug} />;
}
