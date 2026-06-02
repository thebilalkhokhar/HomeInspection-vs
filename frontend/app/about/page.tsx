export default function AboutPage() {
  return (
    <main className="w-full py-16 lg:py-24">
      <div className="content-shell grid w-full gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start lg:px-12">
        <section className="w-full space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              About
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Local Expertise, Trusted Inspections
            </h1>
            <p className="mt-4 text-base leading-7 text-muted">
              With 10+ years of hands-on building and inspection experience
              across the region, our inspector brings practical construction
              knowledge, clear reporting, and respectful communication to every
              appointment.
            </p>
          </div>

            <div className="flex items-center gap-6">
            <div className="h-36 w-36 shrink-0 overflow-hidden rounded-lg border border-border bg-gray-50">
              {/* Placeholder portrait frame */}
              <div className="flex h-full w-full items-center justify-center text-sm text-muted">
                Inspector Portrait
              </div>
            </div>
            <div>
              <p className="text-sm text-foreground font-medium">
                John Doe, Certified Inspector
              </p>
              <p className="mt-2 text-sm text-muted">
                Licensed home inspector with a background in residential
                construction, remodeling, and building code compliance.
              </p>
            </div>
          </div>
        </section>

        <aside className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            Service Area Coverage
          </h2>
          <p className="mt-3 text-sm text-muted">
            We proudly serve the following cities and counties:
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-foreground">
            <li className="flex items-start gap-3">
              <span className="text-emerald-600">✓</span> Austin
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600">✓</span> Round Rock
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600">✓</span> Pflugerville
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600">✓</span> Williamson County
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600">✓</span> Travis County
            </li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
