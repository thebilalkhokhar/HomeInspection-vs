import { QuoteForm } from "@/components/QuoteForm";

export default function QuotePage() {
  return (
    <main className="w-full bg-white text-black">

      {/* Hero */}
      <section
        className="relative w-full text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="content-shell mx-auto flex w-full min-h-64 flex-col justify-center px-6 py-16 sm:px-10 lg:px-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-70">
            Get Started
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
            Request a Quote
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 opacity-90">
            Fill in your property details and we'll get back to you with a clear,
            accurate quote within 2 hours.
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="w-full border-t-2 border-black">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">

            {/* Form */}
            <div>
              <QuoteForm />
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-8">

              {/* What to expect */}
              <div className="border border-black p-6 transition-all duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none">
                <h2 className="text-lg font-semibold tracking-tight">What to Expect</h2>
                <ul className="mt-4 flex flex-col gap-4">
                  {[
                    { step: "01", text: "Submit your property details using the form." },
                    { step: "02", text: "We review your request and prepare a clear quote." },
                    { step: "03", text: "Receive your quote via email or text within 2 hours." },
                    { step: "04", text: "Confirm and schedule your inspection date." },
                  ].map((item) => (
                    <li key={item.step} className="flex items-start gap-4">
                      <span className="mt-0.5 shrink-0 text-xs font-bold uppercase tracking-widest text-black/30">
                        {item.step}
                      </span>
                      <span className="text-sm leading-6 text-black/70">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="border border-black p-6 transition-all duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none">
                <h2 className="text-lg font-semibold tracking-tight">Prefer to Call?</h2>
                <p className="mt-2 text-sm leading-6 text-black/60">
                  We're available Monday–Saturday, 8am–6pm. Reach us directly and we'll get you scheduled fast.
                </p>
                <a
                  href="tel:+15550000000"
                  className="mt-4 flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  (555) 000-0000
                </a>
              </div>

              {/* Services included */}
              <div className="border border-black p-6 transition-all duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none">
                <h2 className="text-lg font-semibold tracking-tight">Services Available</h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {[
                    "Standard Home Inspection",
                    "Radon Testing",
                    "Mold / Air Quality",
                    "Termite / WDO Inspection",
                  ].map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-black/70">
                      <span className="h-1.5 w-1.5 shrink-0 bg-black" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
                <a
                  href="/services"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-60"
                >
                  View all services
                </a>
              </div>

            </aside>
          </div>
        </div>
      </section>

    </main>
  );
}
