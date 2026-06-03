const services = [
  {
    slug: "standard-home-inspection",
    title: "Standard Home Inspection",
    description:
      "A comprehensive top-to-bottom evaluation of the property's major systems and components. From the roof to the foundation, we document every finding with photos and clear recommendations.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    slug: "radon-testing",
    title: "Radon Testing",
    description:
      "Radon is a colorless, odorless gas that can accumulate to dangerous levels inside homes. Our certified testing process provides accurate readings and clear next-step guidance.",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.309 48.309 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    slug: "mold-air-quality",
    title: "Mold / Air Quality",
    description:
      "Poor indoor air quality and hidden mold can impact the health of occupants and the integrity of the structure. We identify moisture issues, visible growth, and air quality concerns before they become costly problems.",
    image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    slug: "termite-wdo-inspection",
    title: "Termite / WDO Inspection",
    description:
      "Wood-destroying organisms can cause serious structural damage that's invisible to the untrained eye. Our WDO inspection identifies active infestations, prior damage, and risk areas across the entire property.",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <main className="w-full bg-white text-black">

      {/* Hero */}
      <section
        className="relative w-full text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62)), url("https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="content-shell mx-auto flex w-full min-h-96 flex-col justify-center px-6 py-12 sm:min-h-112 sm:px-10 lg:min-h-128 lg:px-14"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-80">
            What We Offer
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            Inspection services built for confident decisions.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 opacity-90">
            Each service is designed for clarity, efficiency, and dependable
            results — so you can move forward with confidence at every stage of
            your property decision.
          </p>
          <div className="mt-8">
            <a
              href="/quote"
              className="btn-on-dark inline-flex items-center justify-center px-6 py-3 text-sm font-semibold"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full bg-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <div className="grid gap-8 sm:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.slug}
                className="group flex flex-col border border-black transition-all duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none"
              >
                <div
                  className="h-52 w-full overflow-hidden"
                >
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url("${service.image}")` }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col bg-white p-8">
                  <div className="text-black">{service.icon}</div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-tight">{service.title}</h2>
                  <p className="mt-3 flex-1 text-base leading-7 text-black/60">{service.description}</p>
                  <div className="mt-6">
                    <a
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 border border-black px-5 py-2.5 text-sm font-semibold uppercase tracking-widest transition-all duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none"
                    >
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
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
              Not sure which service you need?
            </p>
            <a
              href="/contact"
              className="btn-on-dark inline-flex items-center justify-center px-6 py-3 text-sm font-semibold whitespace-nowrap"
            >
              Talk to Us
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
