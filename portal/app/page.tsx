import { SiteHeader } from "@/components/site-header";

const services = [
  {
    title: "AI Agent Development",
    description:
      "WhatsApp-native AI agents for customer support, sales, and internal operations — built on top of the messaging channel businesses already use.",
  },
  {
    title: "Document Intelligence",
    description:
      "OCR and retrieval-augmented AI systems that turn a firm's paper and PDF backlog into something staff can actually query.",
  },
  {
    title: "AI Skills Training",
    description:
      "Hands-on AI-tools curriculum for engineering colleges and working professionals, built around real tools rather than theory.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-5xl px-6 py-24">
          <h1 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
            AI systems that ship, for businesses that don&apos;t have time to wait.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-brand-muted">
            ScaleYukti is an AI automation agency based in Ahmedabad, Gujarat. We build AI
            agents, document-intelligence systems, and AI skills training for Indian
            businesses and institutions.
          </p>
          <a
            href="mailto:hello@scaleyukti.ai"
            className="mt-10 inline-flex items-center justify-center rounded-lg bg-brand-orange px-5 py-3 text-sm font-semibold text-brand-navy-deep transition-[filter] hover:brightness-90"
          >
            Work with us
          </a>
        </section>

        <section className="border-t border-brand-border px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold text-brand-ink">What we build</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-2xl border border-brand-border bg-brand-navy-raised p-6"
                >
                  <h3 className="text-base font-semibold text-brand-ink">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-brand-border px-6 py-8 text-center text-xs text-brand-muted">
        ScaleYukti AI Automation Agency · Ahmedabad, Gujarat, India
      </footer>
    </>
  );
}
