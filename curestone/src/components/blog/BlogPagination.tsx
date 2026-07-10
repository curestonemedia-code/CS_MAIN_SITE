import Link from "next/link";
import type React from "react";

export default function BlogPagination({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (item) => item === 1 || item === totalPages || Math.abs(item - page) <= 2
  );

  return (
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <PageLink disabled={page <= 1} href={buildHref(page - 1)}>
        Previous
      </PageLink>
      {pages.map((item, index) => {
        const previous = pages[index - 1];
        const showGap = previous && item - previous > 1;

        return (
          <span key={item} className="flex items-center gap-2">
            {showGap && <span className="px-2 text-slate-400">...</span>}
            <PageLink active={item === page} href={buildHref(item)}>
              {item}
            </PageLink>
          </span>
        );
      })}
      <PageLink disabled={page >= totalPages} href={buildHref(page + 1)}>
        Next
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  active,
  disabled,
  children,
}: {
  href: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-black text-slate-300">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`rounded-xl border px-4 py-2 text-sm font-black transition-colors ${
        active
          ? "border-primary bg-primary text-white"
          : "border-slate-200 text-slate-600 hover:border-primary hover:text-primary"
      }`}
    >
      {children}
    </Link>
  );
}
