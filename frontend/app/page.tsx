export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Professional Home Inspections
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Clear inspection reports for confident real estate decisions.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Schedule a modern home inspection experience with concise reporting,
            practical guidance, and dependable communication from booking to
            delivery.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/quote"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Book Now
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground"
            >
              View Services
            </a>
          </div>
        </div>

        <aside className="rounded-3xl border border-border bg-surface p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            What to expect
          </p>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-foreground">
            <li className="rounded-2xl bg-background p-4">
              Responsive scheduling and confirmation.
            </li>
            <li className="rounded-2xl bg-background p-4">
              A clear walkthrough of findings and next steps.
            </li>
            <li className="rounded-2xl bg-background p-4">
              Inspection options tailored to the property type.
            </li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
