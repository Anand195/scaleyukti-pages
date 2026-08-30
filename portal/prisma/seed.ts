import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

// Source docs live in marketing/, one level up from the portal app.
const MARKETING_DIR = path.resolve(process.cwd(), "..", "marketing");

const documents = [
  {
    file: "dishant_client_roadmap_phase1_phase2.html",
    slug: "dishant-client-roadmap-phase1-phase2",
    title: "Dishant — Client Roadmap (Phase 1 & 2)",
    description:
      "Business-level product roadmap for Dishant's corporate AI agent. Covers Phase 1 (WhatsApp + Genspark + Employeewise) and proposed Phase 2 (persistent memory). Shareable with client.",
    category: "CLIENT_FACING" as const,
    client: "Dishant",
    publishedAt: "2026-04-27",
  },
  {
    file: "dishant_pricing_client.html",
    slug: "dishant-pricing-client",
    title: "Dishant — Investment Summary (Client Pricing)",
    description:
      "Client-facing pricing page for the Corporate AI Agent. Value justification, ROI comparison vs HR hire, full deliverables, ₹55,000 one-time + ₹8,000/month.",
    category: "CLIENT_FACING" as const,
    client: "Dishant",
    publishedAt: "2026-04-27",
  },
  {
    file: "ca-smartdoc-landing-page-2026.html",
    slug: "ca-smartdoc-landing-page-2026",
    title: "CA SmartDoc — Early Access Landing Page",
    description:
      "Finance-grade one-page waitlist site for CA SmartDoc. Early access CTA, trust signals, pain-point framing, lead capture form. No pricing shown.",
    category: "CLIENT_FACING" as const,
    client: null,
    publishedAt: "2026-04-24",
  },
  {
    file: "social-nvidia-ising-quantum-ai-models-april-2026-2026-04-21.html",
    slug: "nvidia-ising-quantum-ai-models-2026",
    title: "NVIDIA Ising Quantum AI Models — April 2026",
    description:
      "Social media content piece covering NVIDIA's Ising quantum AI model developments. Research-backed breakdown for ScaleYukti's audience.",
    category: "CLIENT_FACING" as const,
    client: null,
    publishedAt: "2026-04-21",
  },
  {
    file: "indus-university-ai-tools-engineers-5day-course-2026.html",
    slug: "indus-university-ai-tools-engineers-5day-course-2026",
    title: "AI Tools for Engineers — 5-Day Certificate Course",
    description:
      "Curriculum blueprint for Indus University Ahmedabad. Day-by-day schedule, branch-specific applications (EC/CSE/Mechanical/Civil/IT), hackathon brief, ethics module, certificate criteria.",
    category: "CLIENT_FACING" as const,
    client: "Indus University",
    publishedAt: "2026-04-24",
  },
  {
    file: "dishant_technical_roadmap_internal.html",
    slug: "dishant-technical-roadmap-internal",
    title: "Dishant — Technical Roadmap (Dev Team)",
    description:
      "CTO-level technical blueprint: Genspark API deep-dive, WhatsApp Cloud API spec, RAG architecture, risk register, dev task backlog, env vars, JSON payloads.",
    category: "INTERNAL_STRATEGY" as const,
    client: "Dishant",
    publishedAt: "2026-04-27",
  },
  {
    file: "dishant_pricing_internal.html",
    slug: "dishant-pricing-internal",
    title: "Dishant — Internal Pricing & Margin Analysis",
    description:
      "Internal-only breakdown: original vs discounted pricing per line item, margin analysis, monthly retainer costing, pricing risk flags. Do not share with client.",
    category: "INTERNAL_STRATEGY" as const,
    client: "Dishant",
    publishedAt: "2026-04-27",
  },
  {
    file: "scaleyukti_production_strategy.html",
    slug: "scaleyukti-production-strategy",
    title: "ScaleYukti Production Strategy",
    description:
      "Production rollout and growth strategy document. Go-to-market, operational scaling, and service delivery framework.",
    category: "INTERNAL_STRATEGY" as const,
    client: null,
    publishedAt: "2026-04-23",
  },
  {
    file: "scaleyukti_series_a_pitch.html",
    slug: "scaleyukti-series-a-pitch",
    title: "Series A Pitch Deck",
    description:
      "Investor pitch deck for ScaleYukti's Series A fundraise. Unit economics, product vision, market opportunity, traction highlights.",
    category: "INTERNAL_STRATEGY" as const,
    client: null,
    publishedAt: "2026-04-23",
  },
  {
    file: "ca-smartdoc-roadmap-2026.html",
    slug: "ca-smartdoc-roadmap-2026",
    title: "CA SmartDoc — Complete Roadmap 2026",
    description:
      "Product + GTM roadmap for an OCR + RAG + AI Agent system for Indian CA firms. Pain validation, solution architecture, VPS pricing, subscription model, margin analysis.",
    category: "INTERNAL_STRATEGY" as const,
    client: null,
    publishedAt: "2026-04-24",
  },
  {
    file: "ca-vps-comparison-2026.html",
    slug: "ca-vps-comparison-2026",
    title: "VPS Selection Guide — CA SmartDoc Infrastructure",
    description:
      "Server selection and hosting cost comparison for the CA SmartDoc launch. Provider shortlist, spec sizing, and pricing tradeoffs.",
    category: "INTERNAL_STRATEGY" as const,
    client: null,
    publishedAt: "2026-04-25",
  },
  {
    file: "ai-ready-portfolio-guide.html",
    slug: "ai-ready-portfolio-guide",
    title: "AEO / GEO / SEO Master Strategy",
    description:
      "Growth strategy for AI-answer-engine and search visibility across the personal brand and ScaleYukti's public content.",
    category: "INTERNAL_STRATEGY" as const,
    client: null,
    publishedAt: "2026-05-04",
  },
  {
    file: "wacrm-vs-aisensy-audit.html",
    slug: "wacrm-vs-aisensy-audit",
    title: "WACRM vs AISensy — Competitive Audit",
    description:
      "Feature-by-feature competitive audit of two WhatsApp CRM platforms, with pricing and positioning gaps.",
    category: "INTERNAL_STRATEGY" as const,
    client: null,
    publishedAt: "2026-05-21",
  },
  {
    file: "wacrm-vs-aisensy-vs-easysocial-audit.html",
    slug: "wacrm-vs-aisensy-vs-easysocial-audit",
    title: "WACRM vs AISensy vs EasySocial — 3-Platform Audit",
    description:
      "Extended competitive audit adding a third WhatsApp CRM platform to the comparison, with pricing and positioning gaps.",
    category: "INTERNAL_STRATEGY" as const,
    client: null,
    publishedAt: "2026-05-21",
  },
  {
    file: "microgreens-business-blueprint-ahmedabad-2026.html",
    slug: "microgreens-business-blueprint-ahmedabad-2026",
    title: "Microgreens Business Blueprint — Ahmedabad",
    description:
      "Go-to-market plan for a microgreens startup: market research, competitor gaps, brand naming, unit economics, equipment list, B2B target list.",
    category: "INTERNAL_STRATEGY" as const,
    client: null,
    publishedAt: "2026-04-24",
  },
  {
    file: "ca-leads-pitch-deck-ahmedabad-2026.html",
    slug: "ca-leads-pitch-deck-ahmedabad-2026",
    title: "CA SmartDoc — Leads & Pitch Decks (Ahmedabad)",
    description:
      "Research on Ahmedabad CA leads with full contact profiles. Per-lead pitch variants for email, phone, and LinkedIn. Ready to send.",
    category: "LEADS_OUTREACH" as const,
    client: null,
    publishedAt: "2026-04-24",
  },
  {
    file: "scalesync/tech-college-leads-2026.html",
    slug: "tech-college-leads-2026",
    title: "ScaleSync — Tech College Leads",
    description: "60 verified engineering-college contacts across 6 cities, sourced for ScaleSync outreach.",
    category: "LEADS_OUTREACH" as const,
    client: "ScaleSync",
    publishedAt: "2026-04-28",
  },
];

async function main() {
  const adminPasswordHash = await bcrypt.hash("changeme123", 10);
  await prisma.user.upsert({
    where: { email: "admin@scaleyukti.ai" },
    create: {
      email: "admin@scaleyukti.ai",
      name: "Admin",
      role: "ADMIN",
      passwordHash: adminPasswordHash,
    },
    update: { name: "Admin" },
  });

  for (const doc of documents) {
    const filePath = path.join(MARKETING_DIR, doc.file);
    const bodyHtml = fs.readFileSync(filePath, "utf-8");

    await prisma.document.upsert({
      where: { slug: doc.slug },
      create: {
        slug: doc.slug,
        title: doc.title,
        description: doc.description,
        category: doc.category,
        client: doc.client,
        sourceFile: `marketing/${doc.file}`,
        bodyHtml,
        publishedAt: new Date(doc.publishedAt),
      },
      update: {
        title: doc.title,
        description: doc.description,
        category: doc.category,
        client: doc.client,
        bodyHtml,
        publishedAt: new Date(doc.publishedAt),
      },
    });
  }

  console.log(`Seeded ${documents.length} documents.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
