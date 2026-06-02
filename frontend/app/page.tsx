export default function Home() {
  const darkButton =
    "btn-on-dark inline-flex items-center justify-center px-6 py-3 text-sm font-semibold";
  const lightButton =
    "btn-on-light inline-flex items-center justify-center px-6 py-3 text-sm font-semibold";
  const textLink =
    "inline-flex items-center text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:opacity-70";

  return (
    <main className="w-full bg-white text-black">
      {/* Section 1: Hero Banner */}
      <section className="w-full border-b border-black">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em]">
            Trusted Home Inspections
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
            Trusted Home Inspections for Buyers, Sellers, and Agents
          </h1>
          <p className="mt-8 max-w-4xl text-lg leading-8 sm:text-xl">
            Peace of mind you can count on - thorough, clearly documented
            inspections with a 24-hour report turnaround and guidance you can
            trust.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/quote" className={lightButton}>
              Book Inspection
            </a>
            <a href="/services" className={lightButton}>
              View Services
            </a>
          </div>

          {/* Placeholder for future slider loop */}
          <div className="mt-12 h-64 w-full border-2 border-black sm:h-80 lg:h-112">
            <div className="flex h-full items-center justify-center text-sm font-medium uppercase tracking-[0.2em]">
              Hero Banner Placeholder
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Schedule CTA (inverted) */}
      <section className="w-full bg-black text-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                Schedule Your Inspection Today
              </p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Fast, clear reports that keep your transaction moving.
              </h2>
            </div>
            <a href="/quote" className={darkButton}>
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Section 3: Why Clients Choose Us */}
      <section className="w-full border-y border-black bg-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em]">
            Why Our Clients Choose Us
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              "Detailed Digital Reports",
              "Mobile-Friendly Booking",
              "Agent-Preferred Speed",
            ].map((title) => (
              <article key={title} className="border-2 border-black p-6">
                <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-base leading-7">
                  Clear findings, responsive communication, and a straightforward
                  inspection experience from start to finish.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Services */}
      <section className="w-full bg-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                Our Services
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                Core inspection services built for confident decisions.
              </h2>
            </div>
            <a href="/services" className={textLink}>
              See All Services
            </a>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Standard Home Inspection",
              "Radon Testing",
              "Mold / Air Quality",
              "Termite / WDO Inspection",
            ].map((service) => (
              <article key={service} className="border-2 border-black p-6">
                <h3 className="text-2xl font-semibold tracking-tight">{service}</h3>
                <p className="mt-3 text-base leading-7">
                  Structured findings and practical recommendations tailored to
                  each property.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Testimonials */}
      <section className="w-full border-t border-black bg-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em]">
            Satisfied Clients
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              {
                quote:
                  "The report was clear, fast, and easy to act on. Exactly what we needed before closing.",
                name: "Buyer Client",
              },
              {
                quote:
                  "Our agent and lender both appreciated the turnaround speed and clean documentation.",
                name: "Seller Client",
              },
            ].map((item) => (
              <blockquote key={item.name} className="border-2 border-black p-6">
                <p className="text-xl leading-8">"{item.quote}"</p>
                <footer className="mt-4 text-sm font-semibold">{item.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
