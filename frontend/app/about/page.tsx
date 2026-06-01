export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            About
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A professional inspector focused on clarity, trust, and practical
            guidance.
          </h1>
          <p className="mt-4 text-base leading-7 text-muted">
            This section is a placeholder for the inspector’s biography, local
            experience, and service philosophy. Keep the copy concise, factual,
            and centered on how clients benefit from reliable reporting and
            responsive communication.
          </p>
        </section>

        <aside className="rounded-3xl border border-border bg-surface p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-foreground">Credentials</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
            <li>InterNACHI Certified Inspector</li>
            <li>State License #XXXXXX</li>
            <li>Specialized reporting for buyers, sellers, and agents</li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
