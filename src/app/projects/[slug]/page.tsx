import { getProjectPosts, getPost } from "@/data/projects";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import RaycastingEngine from "@/components/raycasting-engine";
import MdxRefresh from "@/components/mdx-refresh";

export async function generateStaticParams() {
    const posts = await getProjectPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: {
        slug: string;
    };
}): Promise<Metadata | undefined> {
    let post = await getPost(params.slug);

    let {
        title,
        publishedAt: publishedTime,
        summary: description,
        image,
    } = post.metadata;
    let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime,
            url: `${DATA.url}/projects/${post.slug}`,
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    };
}

export default async function Project({
    params,
}: {
    params: {
        slug: string;
    };
}) {
    let post = await getPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <MdxRefresh />
            <Link
                href="/projects"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                aria-label="Back"
            >
                <span aria-hidden="true">←</span>
                Back
            </Link>
            <section id="project">
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "CreativeWork",
                            headline: post.metadata.title,
                            datePublished: post.metadata.publishedAt,
                            dateModified: post.metadata.publishedAt,
                            description: post.metadata.summary,
                            image: post.metadata.image
                                ? `${DATA.url}${post.metadata.image}`
                                : `${DATA.url}/og?title=${post.metadata.title}`,
                            url: `${DATA.url}/projects/${post.slug}`,
                            author: {
                                "@type": "Person",
                                name: DATA.name,
                            },
                        }),
                    }}
                />
                <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
                    {post.metadata.title}
                </h1>
                <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
                    <Suspense fallback={<p className="h-5" />}>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {formatDate(post.metadata.publishedAt)}
                        </p>
                    </Suspense>
                </div>
                {post.slug === "raycasting" && <RaycastingEngine />}
                <article
                    className="prose dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: post.source }}
                ></article>
            </section>
        </>
    );
}
