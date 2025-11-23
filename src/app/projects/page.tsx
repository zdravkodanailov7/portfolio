import BlurFade from "@/components/magicui/blur-fade";
import { getProjectPosts } from "@/data/projects";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { ClearMdxRefreshFlags } from "@/components/mdx-refresh";

export const metadata = {
    title: "Projects",
    description: "My projects and things I've built.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function ProjectsPage() {
    const posts = await getProjectPosts();

    return (
        <section>
            <ClearMdxRefreshFlags />
            <BlurFade delay={BLUR_FADE_DELAY}>
                <h1 className="font-medium text-2xl mb-8 tracking-tighter">projects</h1>
            </BlurFade>
            {posts
                .sort((a, b) => {
                    if (
                        new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
                    ) {
                        return -1;
                    }
                    return 1;
                })
                .map((post, id) => (
                    <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
                        <Link
                            className="flex flex-col space-y-1 mb-4"
                            href={`/projects/${post.slug}`}
                        >
                            <div className="w-full flex flex-col">
                                <p className="tracking-tight">{post.metadata.title}</p>
                                <p className="h-6 text-xs text-muted-foreground">
                                    {formatDate(post.metadata.publishedAt)}
                                </p>
                            </div>
                        </Link>
                    </BlurFade>
                ))}
        </section>
    );
}
