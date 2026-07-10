import { getBlogPost, getPostCategorySlug } from "@/lib/blogs";
import { notFound, permanentRedirect } from "next/navigation";

export const dynamic = "force-dynamic";

type LegacyBlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Legacy flat post URL (/blog/[slug]) from before posts were nested under
 * their category at the site root. Kept as a permanent redirect so any
 * already-indexed or externally shared links keep working and pass their
 * SEO value through to the new /[category]/[slug] URL.
 */
export default async function LegacyBlogPostPage({ params }: LegacyBlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  permanentRedirect(`/${getPostCategorySlug(post)}/${post.slug}`);
}
