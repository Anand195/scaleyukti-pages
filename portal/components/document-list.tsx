"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DocumentCategory } from "@prisma/client";
import { CategoryBadge, categoryLabels } from "@/components/ui/badge";

type DocumentSummary = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: DocumentCategory;
  client: string | null;
  publishedAt: Date;
};

const categoryOrder: DocumentCategory[] = ["CLIENT_FACING", "INTERNAL_STRATEGY", "LEADS_OUTREACH"];

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function DocumentList({ documents }: { documents: DocumentSummary[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return documents;
    return documents.filter((doc) =>
      `${doc.title} ${doc.description} ${doc.client ?? ""}`.toLowerCase().includes(q),
    );
  }, [documents, query]);

  const grouped = useMemo(() => {
    return categoryOrder
      .map((category) => ({
        category,
        docs: filtered.filter((doc) => doc.category === category),
      }))
      .filter((group) => group.docs.length > 0);
  }, [filtered]);

  return (
    <div>
      <div className="mb-8">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search documents…"
          aria-label="Search documents"
          className="w-full rounded-lg border border-brand-border-strong bg-brand-navy-deep px-3.5 py-2.5 text-sm text-brand-ink placeholder:text-brand-muted focus:border-brand-orange"
        />
        <p className="mt-2 text-xs text-brand-muted">
          {query ? `${filtered.length} of ${documents.length} documents` : `${documents.length} documents`}
        </p>
      </div>

      {grouped.length === 0 && (
        <p className="py-12 text-center text-sm text-brand-muted">
          No documents match &ldquo;{query}&rdquo;.
        </p>
      )}

      {grouped.map((group) => (
        <section key={group.category} className="mb-9">
          <h2 className="border-b border-brand-border pb-2.5 text-xs font-bold tracking-wide text-brand-muted uppercase">
            {categoryLabels[group.category]}
          </h2>
          <div>
            {group.docs.map((doc) => (
              <Link
                key={doc.id}
                href={`/documents/${doc.slug}`}
                className="group flex items-center gap-4 border-b border-brand-border py-4 last:border-none"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-brand-ink transition-colors group-hover:text-brand-orange">
                    {doc.title}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-sm leading-relaxed text-brand-muted">
                    {doc.description}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <CategoryBadge category={doc.category} />
                  <span className="text-xs text-brand-muted">
                    {dateFormatter.format(doc.publishedAt)}
                  </span>
                </div>
                <ArrowRight
                  className="size-4 shrink-0 text-brand-orange transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
