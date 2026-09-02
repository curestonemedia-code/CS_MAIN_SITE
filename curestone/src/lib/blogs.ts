import { cleanText, sanityFetch } from "./sanity";

// This dataset is now shared with drdeepanshugupta.com — one Studio, one
// taxonomy. Categories, tags and authors are common to both; only blogPost
// documents are site-specific, via `siteId`. Every query below scopes to it
// so the two sites' posts never leak into each other's blog index, category
// counts, or related-posts lists.
//
// coalesce() here (unlike the Dr. Deepanshu Gupta side): every post written
// before this field existed has no siteId at all, and those are all Cure
// Stone's own posts, so a missing value must still resolve here.
const SITE_MATCH = `coalesce(siteId, "cure-stone") == "cure-stone"`;

// Draft and Scheduled posts are real, queryable documents (not Sanity
// drafts) so editors can preview them — this is what actually keeps them
// off the live site. A missing publishStatus (every post written before
// this field existed) resolves to Published, so nothing already live
// needs migrating. A daily Scheduled Function flips Scheduled -> Published
// once scheduledAt has passed (see /blueprint).
const PUBLISH_STATUS_MATCH = `coalesce(publishStatus, "published") == "published"`;

export const BLOGS_PER_PAGE = 12;

export type BlogTaxonomy = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  count?: number;
};

export type SanityImageAsset = {
  _id?: string;
  url?: string;
  metadata?: {
    lqip?: string;
    dimensions?: {
      width?: number;
      height?: number;
      aspectRatio?: number;
    };
  };
};

export type SanityImage = {
  alt?: string;
  caption?: string;
  asset?: SanityImageAsset;
};

export type BlogAuthor = {
  name?: string;
  description?: string;
  avatar?: SanityImage;
};

export type BlogCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: number;
  coverImage?: SanityImage;
  author?: BlogAuthor;
  categories?: BlogTaxonomy[];
  tags?: BlogTaxonomy[];
};

export type PortableTextChild = {
  _key: string;
  _type: "span";
  text?: string;
  marks?: string[];
};

export type PortableTextBlock = {
  _key: string;
  _type: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: PortableTextChild[];
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  asset?: SanityImageAsset;
  alt?: string;
  caption?: string;
  language?: string;
  code?: string;
  url?: string;
  uploadDate?: string;
  duration?: string;
  rows?: Array<{
    _key: string;
    _type: string;
    cells: string[];
  }>;
};

export type BlogPost = BlogCard & {
  body?: PortableTextBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImage;
  };
};

export type BlogFilters = {
  page?: number;
  category?: string;
  q?: string;
};

const imageFields = `
  asset->{_id,url,metadata{lqip,dimensions{width,height,aspectRatio}}},
  alt,
  caption
`;

const authorFields = `
  "author": coalesce(authorRef->{name,description,avatar{${imageFields}}}, author)
`;

const cardFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  readingTime,
  coverImage{${imageFields}},
  ${authorFields},
  "categories": categories[]->{_id,title,"slug": slug.current,description},
  "tags": tags[]->{_id,title,"slug": slug.current,description}
`;

const baseFilter = `
  _type == "blogPost" &&
  ${SITE_MATCH} &&
  defined(slug.current) &&
  isPublished != false && ${PUBLISH_STATUS_MATCH} &&
  ($category == null || references(*[_type == "category" && slug.current == $category][0]._id)) &&
  ($search == null || title match $search || excerpt match $search)
`;

export async function getBlogIndex(filters: BlogFilters) {
  const page = Math.max(1, filters.page || 1);
  const start = (page - 1) * BLOGS_PER_PAGE;
  const end = start + BLOGS_PER_PAGE;
  const params = {
    start,
    end,
    category: filters.category || null,
    search: filters.q ? `*${filters.q}*` : null,
  };

  const [posts, total, categories] = await Promise.all([
    sanityFetch<BlogCard[]>({
      query: `*[${baseFilter}] | order(publishedAt desc)[${start}...${end}]{${cardFields}}`,
      params,
    }),
    sanityFetch<number>({
      query: `count(*[${baseFilter}])`,
      params,
    }),
    sanityFetch<BlogTaxonomy[]>({
      query: `*[_type == "category"] | order(title asc){
        _id,
        title,
        "slug": slug.current,
        description,
        "count": count(*[_type == "blogPost" && ${SITE_MATCH} && isPublished != false && ${PUBLISH_STATUS_MATCH} && references(^._id)])
      }`,
    }),
  ]);

  return {
    posts: posts.map(normalizeBlogCard),
    total,
    totalPages: Math.max(1, Math.ceil(total / BLOGS_PER_PAGE)),
    page,
    categories: categories.filter((item) => item.slug),
  };
}

export async function getBlogPost(slug: string) {
  const slugCandidates = getSlugCandidates(slug);
  const post = await sanityFetch<BlogPost | null>({
    query: `*[_type == "blogPost" && ${SITE_MATCH} && slug.current in $slugs && isPublished != false && ${PUBLISH_STATUS_MATCH}][0]{
      ${cardFields},
      body[]{
        ...,
        _type == "image" => {${imageFields}},
        markDefs[]
      },
      seo{
        metaTitle,
        metaDescription,
        ogImage{${imageFields}}
      }
    }`,
    params: { slugs: slugCandidates },
  });

  return post ? normalizeBlogPost(post) : null;
}

export async function getRelatedBlogs(post: BlogPost, limit = 3) {
  const categoryIds = post.categories?.map((category) => category._id).filter(Boolean) || [];

  if (!categoryIds.length) return [];

  const related = await sanityFetch<BlogCard[]>({
    query: `*[
      _type == "blogPost" &&
      ${SITE_MATCH} &&
      _id != $id &&
      isPublished != false && ${PUBLISH_STATUS_MATCH} &&
      count((categories[]._ref)[@ in $categoryIds]) > 0
    ] | order(publishedAt desc)[0...${limit}]{${cardFields}}`,
    params: { id: post._id, categoryIds, limit },
  });

  return related.map(normalizeBlogCard);
}

function normalizeBlogCard(post: BlogCard): BlogCard {
  return {
    ...post,
    excerpt: cleanText(post.excerpt),
    categories: post.categories || [],
    tags: post.tags || [],
  };
}

function normalizeBlogPost(post: BlogPost): BlogPost {
  return {
    ...normalizeBlogCard(post),
    body: post.body || [],
    seo: post.seo,
  };
}

function getSlugCandidates(slug: string) {
  const decoded = safeDecodeURIComponent(slug);

  return Array.from(
    new Set([
      slug,
      decoded,
      slug.normalize("NFC"),
      slug.normalize("NFKC"),
      decoded.normalize("NFC"),
      decoded.normalize("NFKC"),
    ])
  );
}

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function formatDate(value?: string) {
  if (!value) return "Recently updated";

  // en-IN's "short" month renders September as "Sept" (a 4-letter outlier
  // among otherwise-3-letter abbreviations) — normalize it so every month
  // is a consistent 3 letters.
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value)).replace("Sept", "Sep");
}

export function getReadTime(post: Pick<BlogCard, "readingTime">) {
  return post.readingTime ? `${post.readingTime} min read` : "Quick read";
}

export const UNCATEGORIZED_SLUG = "general";

/** The category a post's URL lives under: its first assigned category, or a fallback for uncategorized posts. */
export function getPostCategorySlug(post: Pick<BlogCard, "categories">) {
  return post.categories?.[0]?.slug || UNCATEGORIZED_SLUG;
}
