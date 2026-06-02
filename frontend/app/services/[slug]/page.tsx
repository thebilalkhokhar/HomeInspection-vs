import { notFound } from "next/navigation";
import { services } from "./data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services[slug];
  if (!service) notFound();

  return (
    <main className="w-full bg-white text-black">

      {/* ── 1. HERO ────────────────────────────────────────────────── */}
      <section
        className="relative w-full text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62)), url("${service.heroImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="content-shell relative mx-auto flex w-full min-h-128 flex-col justify-center px-6 py-12 sm:min-h-144 sm:px-10 lg:min-h-168 lg:px-14">
          {/* Back link — absolute so it doesn't affect vertical centering */}
          <a
            href="/services"
            className="group absolute top-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            All Services
          </a>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-70">
            Our Services
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 opacity-90">
            {service.tagline}
          </p>
          <div className="mt-8">
            <a
              href="/quote"
              className="btn-on-dark inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold"
            >
              Request a Quote
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. OVERVIEW ────────────────────────────────────────────── */}
      <section className="w-full">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text */}
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/40">
                Overview
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                {service.overviewHeading}
              </h2>
              <div className="mt-6 flex flex-col gap-4">
                {service.overviewBody.map((para, i) => (
                  <p key={i} className="text-base leading-8 text-black/70">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-8">
                <a
                  href="/quote"
                  className="btn-on-light inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold"
                >
                  Book This Inspection
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Image */}
            <div
              className="min-h-80 border-2 border-black bg-cover bg-center lg:min-h-0"
              style={{ backgroundImage: `url("${service.overviewImage}")` }}
              role="img"
              aria-label={`${service.title} photo`}
            />
          </div>
        </div>
      </section>

      {/* ── 3. WHAT'S COVERED ──────────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/40">
            What&apos;s Covered
          </p>
          <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Every area we inspect and assess.
          </h2>

          <div className="mt-12 flex flex-col gap-12">
            {service.categories.map((cat) => (
              <div key={cat.title}>
                <h3 className="mb-6 border-b-2 border-black pb-3 text-xs font-bold uppercase tracking-[0.25em] text-black/40">
                  {cat.title}
                </h3>
                <div className="grid gap-px border-2 border-black bg-black sm:grid-cols-2 lg:grid-cols-4">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex flex-col gap-2 bg-white p-6">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 bg-black" aria-hidden="true" />
                        <h4 className="text-base font-semibold">{item.name}</h4>
                      </div>
                      <p className="text-sm leading-6 text-black/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PROCESS ─────────────────────────────────────────────── */}
      <section className="w-full border-b-2 border-black bg-black text-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
            How It Works
          </p>
          <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Simple process. Clear results.
          </h2>

          <div className="mt-12 grid gap-px border-2 border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, i) => (
              <div key={step.title} className="flex flex-col gap-4 bg-black p-8">
                <span className="text-5xl font-bold leading-none text-white/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-7 text-white/60">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. STAT / WHY IT MATTERS ───────────────────────────────── */}
      <section className="w-full border-b-2 border-black bg-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/40">
                Why It Matters
              </p>
              <div className="mt-4 text-8xl font-bold leading-none tracking-tight sm:text-9xl">
                {service.statValue}
              </div>
              <p className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
                {service.statLabel}
              </p>
            </div>
            <div className="border-l-0 lg:border-l-2 lg:border-black lg:pl-16">
              <p className="text-lg leading-8 text-black/70">
                {service.statNote}
              </p>
              <a
                href="/quote"
                className="btn-on-light mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold"
              >
                Book Your Inspection
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. RELATED SERVICES ────────────────────────────────────── */}
      <section className="w-full border-b-2 border-black bg-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/40">
            Related Services
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Bundle and save.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {service.related.map((rel) => (
              <a
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="group relative overflow-hidden border-2 border-black"
                style={{ minHeight: "220px" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url("${rel.image}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6 text-white">
                  <h3 className="text-lg font-semibold">{rel.title}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-white/60 transition-colors group-hover:text-white">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3 w-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA ─────────────────────────────────────────────────── */}
      <section
        className="relative w-full text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.72)), url("https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1920&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to book your {service.title}?
            </p>
            <a
              href="/quote"
              className="btn-on-dark inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-3 text-sm font-semibold"
            >
              Request a Quote
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
