import { HomeHeroSlider } from "@/components/home-hero-slider";
import { TestimonialSlider } from "@/components/testimonial-slider";

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
                className="group flex flex-col border border-black transition-all duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none"
              >
                {/* Image */}
                <div className="h-44 w-full overflow-hidden">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url("${service.image}")` }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col bg-white p-5">
                  <h3 className="text-lg font-semibold tracking-tight">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-black/60">
                    Structured findings and practical recommendations tailored to each property.
                  </p>
                  <div className="mt-4">
                    <a
                      href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "").replace(/--/g, "-")}`}
                      className="inline-flex items-center gap-1.5 border border-black px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none"
                    >
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Why Clients Choose Us */}
      <section className="w-full overflow-hidden border-b-2 border-black bg-white py-16 lg:py-24">
        {/* Header */}
        <div className="content-shell mx-auto px-4 sm:px-6 lg:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em]">
            Why Our Clients Choose Us
          </p>
          <h2 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Reliable inspection support designed for clarity, speed, and confidence.
          </h2>
        </div>

        {/* Marquee ribbon 1 — right to left, black */}
        <div className="relative mt-12 overflow-hidden border-y-2 border-black bg-black py-5">
          <div className="marquee-track">
            {[...Array(2)].map((_, copy) => (
              <div key={copy} className="flex items-center">
                {[
                  { label: "Detailed Digital Reports", icon: "📄" },
                  { label: "Mobile-Friendly Booking", icon: "📱" },
                  { label: "Agent-Preferred Speed", icon: "⚡" },
                  { label: "Licensed and Certified Expertise", icon: "🏅" },
                  { label: "24-Hour Report Turnaround", icon: "🕐" },
                  { label: "Photo-Rich Findings", icon: "📷" },
                  { label: "Clear Recommendations", icon: "✅" },
                  { label: "Responsive Communication", icon: "💬" },
                ].map((item) => (
                  <div
                    key={`${copy}-${item.label}`}
                    className="flex items-center gap-3 whitespace-nowrap px-10"
                  >
                    <span className="text-xl" aria-hidden="true">{item.icon}</span>
                    <span className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                      {item.label}
                    </span>
                    {/* Divider */}
                    <span className="ml-10 h-1.5 w-1.5 rounded-full bg-white/40" aria-hidden="true" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Marquee ribbon 2 — left to right, white */}
        <div className="relative overflow-hidden border-b-2 border-black bg-white py-5">
          <div className="marquee-track" style={{ animationDirection: "reverse" }}>
            {[...Array(2)].map((_, copy) => (
              <div key={copy} className="flex items-center">
                {[
                  { label: "500+ Inspections Completed", icon: "🏠" },
                  { label: "5-Star Rated", icon: "⭐" },
                  { label: "Certified & Licensed Inspectors", icon: "📋" },
                  { label: "Trusted by Top Agents", icon: "🤝" },
                  { label: "Same-Week Scheduling", icon: "📅" },
                  { label: "Serving the Greater Metro Area", icon: "📍" },
                  { label: "100% Satisfaction Guaranteed", icon: "🎯" },
                  { label: "Report in Hand Within 24 Hours", icon: "⏱️" },
                ].map((item) => (
                  <div
                    key={`${copy}-${item.label}`}
                    className="flex items-center gap-3 whitespace-nowrap px-10"
                  >
                    <span className="text-xl" aria-hidden="true">{item.icon}</span>
                    <span className="text-sm font-semibold uppercase tracking-[0.15em] text-black">
                      {item.label}
                    </span>
                    <span className="ml-10 h-1.5 w-1.5 rounded-full bg-black/30" aria-hidden="true" />
                  </div>
                ))}
              </div>
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

          <TestimonialSlider />

        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="relative w-full text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.72)), url("https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1920&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to experience the same clarity and speed?
            </p>
            <a
              href="/quote"
              className={darkButton}
            >
              Request a Quote
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
