import { TestimonialSlider } from "@/components/testimonial-slider";

export default function AboutPage() {
  return (
    <main className="w-full bg-white text-black">

      {/* ── 1. HERO ────────────────────────────────────────────────── */}
      <section
        className="relative w-full text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="content-shell mx-auto flex w-full min-h-128 flex-col justify-center px-6 py-12 sm:min-h-144 sm:px-10 lg:min-h-168 lg:px-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-70">About Us</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
            Thorough inspections. Clear reports. Real peace of mind.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 opacity-90">
            We&apos;ve completed thousands of inspections across the region — and every
            one is treated with the same care, detail, and communication our clients expect.
          </p>
          <div className="mt-8">
            <a href="/quote" className="btn-on-dark inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold">
              Request a Quote
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. WHO WE ARE ──────────────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/40">Who We Are</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                We include you in the inspection process.
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-base leading-8 text-black/70">
                <p>When you&apos;re investing in property, nothing is more important than the home inspection. Our inspections are careful, thorough, and complete — and we&apos;ve been delivering that standard for over a decade.</p>
                <p>We don&apos;t just hand you a report and walk away. During the inspection, our licensed inspectors provide a verbal walkthrough of every finding — explaining what we see, why it matters, and what you should do about it.</p>
                <p>Our detailed, photo-rich reports are delivered within 24 hours so your transaction timeline stays on track. Written in plain language — no jargon, just clear findings and practical next steps.</p>
              </div>
              <div className="mt-8">
                <a href="/services" className="btn-on-light inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold">
                  View Our Services
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
            <div
              className="min-h-80 bg-cover bg-center lg:min-h-0"
              style={{ backgroundImage: `url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80")` }}
              role="img"
              aria-label="Inspector at work"
            />
          </div>
        </div>
      </section>

      {/* ── 3. STATS RIBBON ────────────────────────────────────────── */}
      <section className="w-full overflow-hidden bg-black text-white">
        <div className="border-y-2 border-white/10 py-5">
          <div className="marquee-track">
            {[...Array(2)].map((_, copy) => (
              <div key={copy} className="flex items-center">
                {[
                  { value: "10,000+", label: "Inspections Completed" },
                  { value: "10+", label: "Years in Business" },
                  { value: "24hr", label: "Report Turnaround" },
                  { value: "5★", label: "Average Rating" },
                  { value: "100%", label: "Satisfaction Guaranteed" },
                  { value: "InterNACHI", label: "Certified" },
                  { value: "ASHI", label: "Member" },
                  { value: "Licensed", label: "State Certified" },
                ].map((stat) => (
                  <div key={`${copy}-${stat.label}`} className="flex items-center gap-3 whitespace-nowrap px-10">
                    <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">{stat.label}</span>
                    <span className="ml-8 h-1.5 w-1.5 rounded-full bg-white/20" aria-hidden="true" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY CHOOSE US — image cards ─────────────────────────── */}
      <section className="w-full bg-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/40">Why Choose Us</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            What sets our inspections apart.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
                title: "We Include You in the Process",
                body: "Our inspectors walk you through every finding in real time — explaining issues, answering questions, making sure you leave fully informed.",
              },
              {
                image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=800&q=80",
                title: "Clear Reports in 24 Hours",
                body: "Photo-rich digital reports delivered within 24 hours. Plain language, no jargon — just clear findings and actionable next steps.",
              },
              {
                image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
                title: "Certified & Licensed Expertise",
                body: "State licensed and nationally certified inspectors. Rigorous continuing education ensures our knowledge stays current.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden border-2 border-black"
                style={{ minHeight: "380px" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url("${item.image}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 transition-all duration-300 group-hover:from-black/95 group-hover:via-black/70 group-hover:to-black/30" />
                <div className="relative flex h-full flex-col justify-end p-8 text-white">
                  <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/80">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CERTIFICATIONS ──────────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/40">Certifications</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Highly trained. Fully certified.</h2>
              <ul className="mt-8 flex flex-col gap-3">
                {[
                  "State Licensed Home Inspector",
                  "InterNACHI Certified Professional Inspector (CPI)",
                  "ASHI — American Society of Home Inspectors",
                  "NRSB Certified for Radon Testing",
                  "ESA Trained for Mold Testing",
                  "NADRA — North American Deck & Railing Association",
                ].map((cert) => (
                  <li key={cert} className="flex items-center gap-3 border-b border-black/10 pb-3 text-sm font-medium">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center border-2 border-black">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/40">Affiliations</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Connected to the community.</h2>
              <ul className="mt-8 flex flex-col gap-3">
                {[
                  "Local Association of Realtors — Member",
                  "Greater Metro Board of Realtors",
                  "Chamber of Commerce — Member",
                  "Habitat for Humanity Partner",
                  "Active Duty Military & First Responder Discounts",
                  "Veteran Owned Business",
                ].map((aff) => (
                  <li key={aff} className="flex items-center gap-3 border-b border-black/10 pb-3 text-sm font-medium">
                    <span className="h-1.5 w-1.5 shrink-0 bg-black" aria-hidden="true" />
                    {aff}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. TEAM ────────────────────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/40">Our Team</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            The team behind the inspection.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "John Doe",
                role: "Lead Inspector",
                certs: "InterNACHI CPI · ASHI · Radon Certified",
                bio: "10+ years of residential and commercial inspection experience with a background in structural engineering.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Jane Smith",
                role: "Senior Inspector",
                certs: "InterNACHI CPI · Mold Certified · WDO Licensed",
                bio: "Specializes in older construction and historic properties, with deep expertise in plumbing and electrical systems.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Mike Johnson",
                role: "Inspector",
                certs: "State Licensed · InterNACHI · Radon Certified",
                bio: "Former contractor with 8 years of hands-on construction experience, bringing practical knowledge to every inspection.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
              },
            ].map((member) => (
              <div key={member.name} className="group overflow-hidden border-2 border-black">
                <div
                  className="h-96 w-full bg-cover bg-top transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url("${member.image}")` }}
                  role="img"
                  aria-label={`Photo of ${member.name}`}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold tracking-tight">{member.name}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-black/40">{member.role}</p>
                  <p className="mt-2 text-xs font-medium text-black/50">{member.certs}</p>
                  <p className="mt-3 text-sm leading-6 text-black/60">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS ────────────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/40">What Clients Say</p>
              <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Our customers come back.
              </h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-black/50 md:text-right">
              Real feedback from clients who made confident decisions with our inspection reports.
            </p>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* ── 8. CTA ─────────────────────────────────────────────────── */}
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
              Ready to book with a team you can trust?
            </p>
            <a href="/quote" className="btn-on-dark inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-3 text-sm font-semibold">
              Request a Quote
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
