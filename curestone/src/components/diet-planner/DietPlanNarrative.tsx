import React from "react";
import { parseBotText, splitInline } from "@/utils/chatMarkdown";

function renderInline(text: string) {
  return splitInline(text).map((part, i) => {
    if (part.kind === "bold")
      return (
        <strong key={i} className="font-extrabold text-foreground">
          {part.text}
        </strong>
      );
    if (part.kind === "italic")
      return (
        <em key={i} className="italic text-text-light text-[13px]">
          {part.text}
        </em>
      );
    return part.text;
  });
}

export default function DietPlanNarrative({ text }: { text: string }) {
  const blocks = parseBotText(text);

  return (
    <div className="prose-sm max-w-none">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "space":
            return <div key={idx} className="h-2" />;
          case "title":
            return (
              <p key={idx} className="mt-4 mb-1 text-base font-extrabold text-foreground">
                {renderInline(block.text)}
              </p>
            );
          case "heading":
            return (
              <p key={idx} className="mt-4 mb-1.5 pb-1 text-lg font-black text-foreground border-b border-border/50">
                {renderInline(block.text)}
              </p>
            );
          case "bullet":
            return (
              <div key={idx} className="flex items-start gap-2 my-1" style={{ marginLeft: block.level * 16 + 4 }}>
                <span
                  className={`mt-2 shrink-0 rounded-full bg-primary/40 ${block.level ? "w-1 h-1" : "w-1.5 h-1.5"}`}
                />
                <span className="text-text-mid leading-snug">{renderInline(block.text)}</span>
              </div>
            );
          case "number":
            return (
              <div key={idx} className="flex items-start gap-2 my-1" style={{ marginLeft: block.level * 16 + 4 }}>
                <span className="font-extrabold text-primary shrink-0">{block.n}.</span>
                <span className="text-text-mid leading-snug">{renderInline(block.text)}</span>
              </div>
            );
          case "para":
            return (
              <p key={idx} className="my-1 text-text-mid leading-relaxed">
                {renderInline(block.text)}
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
