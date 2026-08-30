import { prisma } from "@/lib/prisma";
import { DocumentList } from "@/components/document-list";

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      category: true,
      client: true,
      publishedAt: true,
    },
  });

  return (
    <main className="mx-auto max-w-3xl px-6 pb-24">
      <div className="py-12">
        <h1 className="text-2xl font-bold">Documents &amp; Reports</h1>
        <p className="mt-2 text-sm text-brand-muted">
          Client deliverables, internal strategy, and leads &mdash; {documents.length} documents.
        </p>
      </div>
      <DocumentList documents={documents} />
    </main>
  );
}
