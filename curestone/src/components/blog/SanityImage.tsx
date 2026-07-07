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

  if (fill) {
    return (
      <Image
        src={image.asset.url}
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
      src={image.asset.url}
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
