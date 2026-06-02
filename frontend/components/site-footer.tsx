import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="w-full">

      {/* Trust / Stats Section */}
      <section className="w-full overflow-hidden bg-white text-black">
        <div className="content-shell mx-auto w-full px-4 pt-16 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50">
              Why Trust Us
            </p>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Certified. Licensed. Trusted.
            </h2>
          </div>
        </div>

        {/* Scrolling ribbon */}
        <div className="mt-12 overflow-hidden border-y-2 border-black bg-white py-6">
          <div className="marquee-track">
            {[...Array(2)].map((_, copy) => (
              <div key={copy} className="flex items-center">
                {[
                  { value: "500+", label: "Inspections Completed" },
                  { value: "5★", label: "Average Client Rating" },
                  { value: "24hr", label: "Report Turnaround" },
                  { value: "10+", label: "Years of Experience" },
                  { value: "100%", label: "Satisfaction Guaranteed" },
                  { value: "InterNACHI", label: "Certified Inspector" },
                  { value: "ASHI", label: "Certified Member" },
                  { value: "Licensed", label: "State Certified" },
                ].map((stat) => (
                  <div
                    key={`${copy}-${stat.label}`}
                    className="flex items-center gap-3 whitespace-nowrap px-10"
                  >
                    <span className="text-2xl font-bold tracking-tight text-black">
                      {stat.value}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/40">
                      {stat.label}
                    </span>
                    <span className="ml-8 h-1.5 w-1.5 rounded-full bg-black/20" aria-hidden="true" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Footer bar */}
      <div className="w-full bg-black text-white">

        {/* Main footer grid */}
        <div className="content-shell grid w-full gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-8 lg:px-12">

          {/* Brand column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Home</span>
                <span className="text-sm font-bold uppercase tracking-[0.22em] text-white">Inspection</span>
              </div>
            </Link>
            <p className="max-w-xs text-sm leading-7 text-white/60">
              InterNACHI Certified. State Licensed. Delivering clear,
              photo-rich inspection reports with a 24-hour turnaround so your
              transaction keeps moving.
            </p>
            {/* Contact info */}
            <div className="flex flex-col gap-2 text-sm text-white/60">
              <a href="tel:+15550000000" className="flex items-center gap-2 transition-colors hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                (555) 000-0000
              </a>
              <a href="mailto:info@homeinspection.com" className="flex items-center gap-2 transition-colors hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                info@homeinspection.com
              </a>
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Serving the Greater Metro Area
              </span>
            </div>
          </div>

          {/* Services column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Services</p>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                { label: "Standard Home Inspection", href: "/services/standard-home-inspection" },
                { label: "Radon Testing", href: "/services/radon-testing" },
                { label: "Mold / Air Quality", href: "/services/mold-air-quality" },
                { label: "Termite / WDO", href: "/services/termite-wdo-inspection" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Company</p>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Request a Quote", href: "/quote" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + CTA column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Legal</p>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="text-sm font-semibold text-white">Ready to book?</p>
              <Link
                href="/quote"
                className="btn-on-dark mt-3 inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold"
              >
                Request a Quote
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="w-full border-t border-white/10">
          <div className="content-shell flex flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/40 sm:flex-row sm:px-6 lg:px-12">
            <span>© 2026 Home Inspection Platform. All rights reserved.</span>
            <span>InterNACHI Certified · State License #XXXXXX</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
