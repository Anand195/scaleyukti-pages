import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CategoryBadge } from "@/components/ui/badge";

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await prisma.document.findUnique({ where: { slug } });
  if (!doc) notFound();

  return (
    <main className="mx-auto flex h-[calc(100vh-65px)] max-w-4xl flex-col px-6">
      <div className="shrink-0 py-6">
        <Link
          href="/documents"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-muted hover:text-brand-ink"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to documents
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-bold">{doc.title}</h1>
          <CategoryBadge category={doc.category} />
        </div>
        <p className="mt-1 text-sm text-brand-muted">
          {doc.description} &middot; Published {dateFormatter.format(doc.publishedAt)}
        </p>
      </div>
      <iframe
        title={doc.title}
        srcDoc={doc.bodyHtml}
        sandbox="allow-scripts allow-popups"
        className="mb-6 w-full flex-1 rounded-2xl border border-brand-border bg-white"
      />
    </main>
  );
}
