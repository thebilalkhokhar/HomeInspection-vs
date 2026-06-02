import { HomeHeroSlider } from "@/components/home-hero-slider";

export default function Home() {
  const darkButton =
    "btn-on-dark inline-flex items-center justify-center px-6 py-3 text-sm font-semibold";
  const sectionFourLink =
    "inline-flex items-center justify-center border-2 border-black px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] !text-black transition-all duration-150 hover:bg-black hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:opacity-80";

  return (
    <main className="w-full bg-white text-black">
      <HomeHeroSlider />

      {/* Section 4: Services */}
      <section className="w-full bg-white text-black">
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
              {
                title: "Standard Home Inspection",
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Radon Testing",
                image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Mold / Air Quality",
                image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Termite / WDO Inspection",
                image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80",
              },
            ].map((service) => (
              <article
                key={service.title}
                className="group relative overflow-hidden border-2 border-black bg-black transition-all duration-300 hover:-translate-y-1"
                style={{ minHeight: "280px" }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url("${service.image}")`,
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/20" />
                
                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-semibold tracking-tight">{service.title}</h3>
                  <p className="mt-3 text-base leading-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Structured findings and practical recommendations tailored to
                    each property.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Why Clients Choose Us */}
      <section className="w-full bg-white">
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

      {/* Section 2: Schedule CTA (inverted) */}
      <section
        className="relative w-full text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1920&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em]">
              Schedule Your Inspection Today
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Fast, clear reports that keep your transaction moving.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 sm:text-lg opacity-90">
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

      {/* Section 5: Testimonials */}
      <section className="w-full bg-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">

          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                Satisfied Clients
              </p>
              <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Trusted by buyers, sellers, and agents alike.
              </h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-gray-600 md:text-right">
              Real feedback from real clients who made confident decisions with our inspection reports.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "The report was clear, fast, and easy to act on. Exactly what we needed before closing.",
                name: "Sarah M.",
                role: "Home Buyer",
                initials: "SM",
              },
              {
                quote:
                  "Our agent and lender both appreciated the turnaround speed and clean documentation. Made the whole process smoother.",
                name: "James R.",
                role: "Home Seller",
                initials: "JR",
              },
              {
                quote:
                  "I've worked with many inspectors — the detail and clarity in their reports set them apart every time.",
                name: "Linda K.",
                role: "Real Estate Agent",
                initials: "LK",
              },
            ].map((item) => (
              <blockquote
                key={item.name}
                className="flex flex-col justify-between border-2 border-black p-6 transition-all duration-200 hover:-translate-y-1 hover:bg-black hover:text-white"
              >
                {/* Stars */}
                <div>
                  <div className="flex gap-1" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="mt-4 text-lg leading-8">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author */}
                <footer className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-current text-xs font-bold uppercase tracking-wider">
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs font-medium uppercase tracking-[0.1em] opacity-60">
                      {item.role}
                    </p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 flex flex-col items-center gap-4 border-t-2 border-black pt-12 sm:flex-row sm:justify-between">
            <p className="text-base font-semibold sm:text-lg">
              Ready to experience the same clarity and speed?
            </p>
            <a
              href="/quote"
              className="btn-on-light inline-flex items-center justify-center px-6 py-3 text-sm font-semibold"
            >
              Request a Quote
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}
