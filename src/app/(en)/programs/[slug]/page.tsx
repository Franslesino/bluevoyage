import ProgramDetailPage from "@/app/_pages/ProgramDetailPage";
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
    return <ProgramDetailPage slug={slug} />;
}
