import BlurFade from "@/components/magicui/blur-fade";
import { getDsaPosts } from "@/data/dsa";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { ClearMdxRefreshFlags } from "@/components/mdx-refresh";

export const metadata = {
  title: "DSA",
  description: "My thoughts on data structures and algorithms.",
};

const BLUR_FADE_DELAY = 0.04;

const categoryDescriptions: Record<string, string> = {
  "Arrays": "Arrays are the foundation of many data structures. They store data contiguously in memory, making access fast and predictable. This category covers static arrays, dynamic arrays, and stacks, which build on array concepts.",
  "Linked Lists": "Linked lists offer flexibility by connecting nodes through pointers rather than requiring contiguous memory. This category explores singly linked lists, doubly linked lists, and queues, which leverage linked list principles.",
};

const categoryOrder: Record<string, number> = {
  "Arrays": 1,
  "Linked Lists": 2,
};

export default async function DsaPage() {
  const posts = await getDsaPosts();

  // Group posts by topic
  const postsByTopic = posts.reduce((acc, post) => {
    const topic = post.metadata.topic || "Other";
    if (!acc[topic]) {
      acc[topic] = [];
    }
    acc[topic].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  // Sort posts within each topic
  Object.keys(postsByTopic).forEach((topic) => {
    postsByTopic[topic].sort((a, b) => {
      const topicOrderA = a.metadata.topicOrder ?? Infinity;
      const topicOrderB = b.metadata.topicOrder ?? Infinity;

      if (topicOrderA !== topicOrderB) {
        return topicOrderA - topicOrderB;
      }

      if (
        new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
      ) {
        return -1;
      }
      return 1;
    });
  });

  // Get sorted topics
  const sortedTopics = Object.keys(postsByTopic).sort((a, b) => {
    const orderA = categoryOrder[a] ?? Infinity;
    const orderB = categoryOrder[b] ?? Infinity;
    return orderA - orderB;
  });

  let postIndex = 0;

  return (
    <section>
      <ClearMdxRefreshFlags />
      <BlurFade delay={BLUR_FADE_DELAY} className="mb-8">
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">data structures and algorithms</h1>
        <h3 className="font-medium text-xl mb-4 tracking-tighter">What is a data structure?</h3>
        <p>A data structure is basically a way to organise data in a computer, specifically in RAM. RAM is stored in bytes (8 bits) and bits are just 0s and 1s. For example, 8GB of RAM is about 8 billion bytes.</p>
      </BlurFade>
      {sortedTopics.map((topic) => {
        const topicPosts = postsByTopic[topic];
        const categoryDescription = categoryDescriptions[topic];
        const startIndex = postIndex;

        return (
          <div key={topic} className="mb-12">
            <BlurFade delay={BLUR_FADE_DELAY * 2 + startIndex * 0.05} className="mb-6">
              <h2 className="font-medium text-xl mb-2 tracking-tighter">{topic}</h2>
              {categoryDescription && (
                <p className="text-muted-foreground mb-6">{categoryDescription}</p>
              )}
            </BlurFade>
            {topicPosts.map((post, id) => {
              const currentIndex = postIndex++;
              return (
                <BlurFade delay={BLUR_FADE_DELAY * 2 + currentIndex * 0.05} key={post.slug}>
                  <Link
                    className="flex flex-col space-y-1 mb-4 group"
                    href={`/dsa/${post.slug}`}
                  >
                    <div className="w-full flex flex-col">
                      <p
                        className="tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary/60 dark:group-hover:text-primary/60"
                      >
                        {post.metadata.title}
                      </p>
                      <p className="h-6 text-xs text-muted-foreground">
                        {formatDate(post.metadata.publishedAt)}
                      </p>
                    </div>
                  </Link>
                </BlurFade>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}
