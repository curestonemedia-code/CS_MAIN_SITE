import Image from "next/image";
import type { SanityImage as SanityImageValue } from "@/lib/blogs";

type SanityImageProps = {
  image?: SanityImageValue;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
};

function sanityCdnUrl(assetUrl: string, width: number) {
  const url = new URL(assetUrl);
  if (url.hostname !== "cdn.sanity.io" || !url.pathname.startsWith("/images/")) {
    return assetUrl;
  }

  url.searchParams.set("w", String(width));
  url.searchParams.set("fit", "max");
  url.searchParams.set("auto", "format");
  url.searchParams.set("q", "80");
  return url.toString();
}

export default function SanityImage({
  image,
  alt,
  className,
  width = 900,
  height = 520,
  fill,
  priority,
  sizes,
}: SanityImageProps) {
  if (!image?.asset?.url) return null;

  const imageAlt = alt || image.alt || "";
  const blurDataURL = image.asset.metadata?.lqip;
  const fixedSize = fill && sizes?.match(/^(\d+)px$/);
  const deliveryWidth = fixedSize ? Math.min(Number(fixedSize[1]) * 2, 1400) : Math.min(width, 1400);
  const src = sanityCdnUrl(image.asset.url, deliveryWidth);

  if (fill) {
    return (
      <Image
        src={src}
        alt={imageAlt}
        fill
        className={className}
        priority={priority}
        sizes={sizes || "100vw"}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={imageAlt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
    />
  );
}
