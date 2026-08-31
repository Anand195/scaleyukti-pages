import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-brand-border bg-brand-navy-deep/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/documents" className="text-base font-extrabold tracking-tight text-brand-orange">
            ScaleYukti
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button type="submit" className="text-sm font-medium text-brand-muted hover:text-brand-ink">
              Sign out
            </button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
