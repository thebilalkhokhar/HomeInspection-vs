const services = [
  {
    title: "Standard Inspection",
    description:
      "A detailed visual assessment of the property’s major systems, structure, and safety concerns.",
  },
  {
    title: "Mold Testing",
    description:
      "Targeted testing to help identify potential moisture-related issues and indoor air quality concerns.",
  },
  {
    title: "Radon Testing",
    description:
      "Professional radon screening with clear reporting for informed next-step decisions.",
  },
];

export default function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Services
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Clear inspection services for confident property decisions.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Choose the inspection package that fits the property and timeline.
          Each service is designed to be easy to understand, efficient to
          schedule, and simple to follow up on.
        </p>
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-3xl border border-border bg-surface p-6 shadow-soft"
          >
            <h2 className="text-xl font-semibold text-foreground">
              {service.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {service.description}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
