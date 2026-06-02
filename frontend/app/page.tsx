import { HomeHeroSlider } from "@/components/home-hero-slider";

export default function Home() {
  const darkButton =
    "btn-on-dark inline-flex items-center justify-center px-6 py-3 text-sm font-semibold";
  const sectionFourLink =
    "inline-flex items-center justify-center border-2 border-white px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:opacity-80";

  return (
    <main className="w-full bg-white text-black">
      <HomeHeroSlider />

      {/* Section 2: Schedule CTA (inverted) */}
      <section className="w-full bg-black text-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em]">
              Schedule Your Inspection Today
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Fast, clear reports that keep your transaction moving.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 sm:text-lg">
              Lock in your inspection date in minutes and receive a detailed,
              photo-rich report designed to help you make confident next steps.
            </p>
            <div className="mt-8 flex justify-center">
            <a href="/quote" className={darkButton}>
              Request a Quote
            </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Why Clients Choose Us */}
      <section className="w-full border-y border-black bg-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em]">
            Why Our Clients Choose Us
          </p>
          <h2 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Reliable inspection support designed for clarity, speed, and confidence.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              "Detailed Digital Reports",
              "Mobile-Friendly Booking",
              "Agent-Preferred Speed",
              "Licensed and Certified Expertise",
            ].map((title) => (
              <article
                key={title}
                className="border-2 border-black bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:bg-black hover:text-white"
              >
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
      <section className="w-full border-y-2 border-black bg-black text-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                Our Services
              </p>
              <h2 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Core inspection services built for confident decisions.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 sm:text-lg">
                Choose from focused inspection solutions designed for clear
                reporting, quick turnaround, and dependable support at every
                stage of your property decision.
              </p>
            </div>
            <a href="/services" className={sectionFourLink}>
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
              <article
                key={service}
                className="border-2 border-white bg-black p-6 transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:text-black"
              >
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
