import BlurFade from "@/components/magicui/blur-fade";
import { getDsaPosts } from "@/data/dsa";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "DSA",
  description: "My thoughts on data structures and algorithms.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function DsaPage() {
  const posts = await getDsaPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY} className="mb-8">
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">data structures and algorithms</h1>
        <h3 className="font-medium text-xl mb-4 tracking-tighter">What is a data structure?</h3>
        <p>A data structure is basically a way to organise data in a computer, specifically in RAM. RAM is stored in bytes (8 bits) and bits are just 0s and 1s. For example, 8GB of RAM is about 8 billion bytes.</p>
      </BlurFade>
      {posts
        .sort((a, b) => {
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
        })
        .map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
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
        ))}
    </section>
  );
}
