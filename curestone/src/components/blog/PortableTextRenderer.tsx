import type { PortableTextBlock, PortableTextChild } from "@/lib/blogs";
import type React from "react";
import SanityImage from "./SanityImage";

type PortableTextRendererProps = {
  value?: PortableTextBlock[];
};

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value?.length) return null;

  const nodes: React.ReactNode[] = [];
  let index = 0;

  while (index < value.length) {
    const block = value[index];

    if (block.listItem) {
      const listType = block.listItem;
      const items: PortableTextBlock[] = [];

      while (value[index]?.listItem === listType) {
        items.push(value[index]);
        index += 1;
      }

      const ListTag = listType === "number" ? "ol" : "ul";
      nodes.push(
        <ListTag
          key={block._key}
          className={
            listType === "number"
              ? "my-6 list-decimal space-y-2 pl-6 text-slate-600"
              : "my-6 list-disc space-y-2 pl-6 text-slate-600"
          }
        >
          {items.map((item) => (
            <li key={item._key}>{renderSpans(item)}</li>
          ))}
        </ListTag>
      );
      continue;
    }

    nodes.push(renderBlock(block));
    index += 1;
  }

  return <div className="blog-main-content">{nodes}</div>;
}

function renderBlock(block: PortableTextBlock) {
  if (block._type === "image") {
    return (
      <figure key={block._key} className="my-10">
        <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-xl">
          <SanityImage
            image={block}
            alt={block.alt}
            width={1100}
            height={640}
            className="h-auto w-full object-cover"
            sizes="(min-width: 1024px) 900px, 100vw"
          />
        </div>
        {block.caption && (
          <figcaption className="mt-3 text-center text-sm font-medium text-slate-500">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (block._type === "horizontalRule") {
    return <hr key={block._key} className="my-10 border-slate-200" />;
  }

  if (block._type === "codeBlock") {
    return (
      <pre
        key={block._key}
        className="my-8 overflow-x-auto rounded-2xl bg-slate-950 p-6 text-sm text-slate-100"
      >
        <code>{block.code}</code>
      </pre>
    );
  }

  switch (block.style) {
    case "h2":
      return (
        <h2 key={block._key} className="mb-4 mt-12 text-3xl font-black text-slate-900">
          {renderSpans(block)}
        </h2>
      );
    case "h3":
      return (
        <h3 key={block._key} className="mb-3 mt-9 text-2xl font-extrabold text-slate-900">
          {renderSpans(block)}
        </h3>
      );
    case "blockquote":
      return (
        <blockquote
          key={block._key}
          className="my-8 rounded-r-3xl border-l-4 border-primary bg-primary/5 py-5 pl-6 pr-5 text-xl font-semibold italic text-slate-700"
        >
          {renderSpans(block)}
        </blockquote>
      );
    default:
      return (
        <p key={block._key} className="mb-6 text-lg leading-8 text-slate-600">
          {renderSpans(block)}
        </p>
      );
  }
}

function renderSpans(block: PortableTextBlock) {
  return block.children?.map((child) => renderChild(child, block)) || null;
}

function renderChild(child: PortableTextChild, block: PortableTextBlock) {
  let node: React.ReactNode = child.text || "";

  child.marks?.forEach((mark) => {
    const annotation = block.markDefs?.find((def) => def._key === mark);

    if (annotation?._type === "link" && annotation.href) {
      const isExternal = !annotation.href.startsWith("/");
      node = (
        <a
          key={`${child._key}-${mark}`}
          href={annotation.href}
          className="font-bold text-primary underline decoration-primary/30 underline-offset-4"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {node}
        </a>
      );
      return;
    }

    if (mark === "strong") {
      node = (
        <strong key={`${child._key}-${mark}`} className="font-black text-slate-900">
          {node}
        </strong>
      );
    }

    if (mark === "em") {
      node = <em key={`${child._key}-${mark}`}>{node}</em>;
    }

    if (mark === "underline") {
      node = <span key={`${child._key}-${mark}`} className="underline">{node}</span>;
    }

    if (mark === "code") {
      node = (
        <code key={`${child._key}-${mark}`} className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
          {node}
        </code>
      );
    }
  });

  return <span key={child._key}>{node}</span>;
}
