import { HTMLAttributes } from "react";
import { DocumentCategory } from "@prisma/client";

const categoryClasses: Record<DocumentCategory, string> = {
  CLIENT_FACING: "text-brand-orange border-brand-orange/35",
  INTERNAL_STRATEGY: "text-emerald-400 border-emerald-400/35",
  LEADS_OUTREACH: "text-sky-300 border-sky-300/35",
};

export const categoryLabels: Record<DocumentCategory, string> = {
  CLIENT_FACING: "Client & Public-Facing",
  INTERNAL_STRATEGY: "Internal & Strategy",
  LEADS_OUTREACH: "Leads & Outreach",
};

export function Badge({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-brand-border-strong px-2 py-0.5 text-xs font-medium tracking-wide text-brand-muted uppercase ${className}`}
      {...props}
    />
  );
}

export function CategoryBadge({ category }: { category: DocumentCategory }) {
  return <Badge className={categoryClasses[category]}>{categoryLabels[category]}</Badge>;
}
