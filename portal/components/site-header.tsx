import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-brand-border bg-brand-navy-deep/95 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="text-base font-extrabold tracking-tight text-brand-orange">
          ScaleYukti
        </Link>
        <Link
          href="/login"
          className="text-sm font-medium text-brand-muted transition-colors hover:text-brand-ink"
        >
          Team login
        </Link>
      </div>
    </header>
  );
}
