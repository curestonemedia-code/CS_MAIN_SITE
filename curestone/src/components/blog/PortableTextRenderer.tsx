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

  if (block._type === "table") {
    const rows = block.rows || [];
    if (!rows.length) return null;
    const [headerRow, ...bodyRows] = rows;

    return (
      <div
        key={block._key}
        className="my-10 overflow-x-auto rounded-3xl border border-slate-100 shadow-xl"
      >
        <table className="w-full border-collapse text-left text-base">
          <thead>
            <tr className="bg-slate-50">
              {headerRow.cells.map((cell, i) => (
                <th
                  key={i}
                  className="border-b border-slate-200 px-5 py-3 font-bold text-slate-900"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row) => (
              <tr key={row._key} className="odd:bg-white even:bg-slate-50/60">
                {row.cells.map((cell, i) => (
                  <td
                    key={i}
                    className="border-b border-slate-100 px-5 py-3 align-top text-slate-600"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (block._type === "youtube") {
    const videoId = getYouTubeId(block.url);
    if (!videoId) return null;

    return (
      <figure key={block._key} className="my-10">
        <div className="relative aspect-video overflow-hidden rounded-3xl border border-slate-100 shadow-xl">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={block.caption || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
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

// Accepts a plain YouTube link, a bare video ID, or a full <iframe> embed
// snippet pasted from YouTube's Share → Embed option — only the video ID
// is ever extracted, the pasted markup itself is never rendered.
function getYouTubeId(input?: string) {
  if (!input) return null;
  const srcMatch = input.match(/src=["']([^"']+)["']/);
  const source = srcMatch ? srcMatch[1] : input;
  const idMatch = source.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  if (idMatch) return idMatch[1];
  const trimmed = input.trim();
  return /^[\w-]{11}$/.test(trimmed) ? trimmed : null;
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
