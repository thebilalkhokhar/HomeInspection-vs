export default function ContactPage() {
  return (
    <main className="w-full py-16 lg:py-24">
      <div className="content-shell px-4 sm:px-6 lg:px-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Request Quote
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Request a simple, professional inspection quote.
          </h1>
          <p className="mt-4 text-base leading-7 text-muted">
            This placeholder page gives the site a real destination for the sticky
            CTA and the home page booking button.
          </p>
        </div>
      </div>

      <section className="mt-10 w-full rounded-3xl border border-border bg-surface shadow-soft">
        <div className="content-shell p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-foreground">
              Name
              <input
                type="text"
                placeholder="Your name"
                className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none ring-0 placeholder:text-muted"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-foreground">
              Email
              <input
                type="email"
                placeholder="you@example.com"
                className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none ring-0 placeholder:text-muted"
              />
            </label>
          </div>

          <label className="mt-6 grid gap-2 text-sm font-medium text-foreground">
            Property details
            <textarea
              rows={5}
              placeholder="Tell us about the property and the service you need."
              className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-0 placeholder:text-muted"
            />
          </label>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="btn-on-light inline-flex items-center px-6 py-3 text-sm font-semibold"
            >
              Send Request
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
