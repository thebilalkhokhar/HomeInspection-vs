const services = [
  {
    key: "standard",
    title: "Standard Home Inspection",
    price: "$399",
    checks: [
      "Roof",
      "Foundation",
      "HVAC",
      "Plumbing",
      "Electrical",
      "Interior/Exterior",
    ],
  },
  {
    key: "radon",
    title: "Radon Testing",
    price: "$150",
    checks: [
      "Short-term/Continuous Monitoring",
      "Clear reporting",
      "Mitigation recommendations",
    ],
  },
  {
    key: "mold",
    title: "Mold / Air Quality",
    price: "$225",
    checks: ["Moisture inspection", "Targeted sampling", "IAQ observations"],
  },
  {
    key: "wdo",
    title: "Wood-Destroying Organism / Termite",
    price: "$180",
    checks: [
      "Visible evidence of infestation",
      "Structural wood inspection",
      "Report with recommendations",
    ],
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

      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <article
            key={service.key}
            className="rounded-2xl border border-border bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                {service.title}
              </h2>
              <div className="text-right">
                <div className="text-sm text-muted">Starting at</div>
                <div className="mt-1 text-xl font-bold text-foreground">
                  {service.price}
                </div>
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground">
              {service.checks.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    ✓
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-end">
              <a
                href="/quote"
                className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Book
              </a>
            </div>
          </article>
        ))}
      </section>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 text-sm text-muted">
        <strong className="text-foreground">
          Custom Multi-Service Bundles Available:
        </strong>{" "}
        Combine inspections and testing for a streamlined rate and single
        appointment. Contact us to tailor a package for your property.
      </div>
    </main>
  );
}
