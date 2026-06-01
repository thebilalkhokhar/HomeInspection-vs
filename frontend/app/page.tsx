export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Trusted Home Inspections
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Trusted Home Inspections for Buyers, Sellers, and Agents
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Peace of mind you can count on — thorough, clearly documented
            inspections with a 24-hour report turnaround and guidance you can
            trust.
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

          {/* Trust banner */}
          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-border bg-background p-4 sm:flex-row sm:items-center">
            <div className="flex-1 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center justify-center rounded-lg border border-gray-100 bg-white p-4 text-center text-sm text-foreground">
                <div>
                  <div className="font-medium">InterNACHI Certified</div>
                  <div className="mt-1 text-xs text-muted">
                    Professional standards
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center rounded-lg border border-gray-100 bg-white p-4 text-center text-sm text-foreground">
                <div>
                  <div className="font-medium">Licensed & Insured</div>
                  <div className="mt-1 text-xs text-muted">
                    Liability & protection
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center rounded-lg border border-gray-100 bg-white p-4 text-center text-sm text-foreground">
                <div>
                  <div className="font-medium">TREC/State Compliant</div>
                  <div className="mt-1 text-xs text-muted">
                    Local regulatory compliance
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why choose us */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <article className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">
                Detailed Digital Reports
              </h3>
              <p className="mt-3 text-sm text-muted">
                High-resolution photos, clear findings, and prioritized repair
                guidance delivered in easy-to-share PDFs.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">
                Mobile-Friendly Booking
              </h3>
              <p className="mt-3 text-sm text-muted">
                Quick scheduling on any device with SMS confirmations and
                flexible appointment windows.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">
                Agent-Preferred Speed
              </h3>
              <p className="mt-3 text-sm text-muted">
                Fast turnaround and clear communication make transactions
                smoother for agents and clients.
              </p>
            </article>
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
