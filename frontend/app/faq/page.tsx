"use client";

import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "What does a standard home inspection include?",
    answer:
      "A standard home inspection covers all visible and accessible systems and components of the home — including the roof, attic, foundation, HVAC, plumbing, electrical, interior and exterior walls, windows, doors, and more. Every finding is documented with photos and delivered in a clear digital report within 24 hours.",
  },
  {
    question: "How long does a home inspection take?",
    answer:
      "Most standard home inspections take between 2 to 4 hours depending on the size, age, and condition of the property. Larger homes or those with additional services (radon, mold, WDO) may take longer. We recommend being present during the inspection so we can walk you through findings in real time.",
  },
  {
    question: "When will I receive my inspection report?",
    answer:
      "Your detailed, photo-rich digital report is delivered within 24 hours of the inspection. Reports are written in plain language — no technical jargon — so you can quickly understand findings and prioritize next steps.",
  },
  {
    question: "Should I be present during the inspection?",
    answer:
      "Yes, we strongly encourage it. Being present allows our inspector to walk you through every finding in real time, answer your questions on the spot, and explain the condition of the home's systems. There is no need to take notes — everything will be documented in your report.",
  },
  {
    question: "What is radon and why should I test for it?",
    answer:
      "Radon is a naturally occurring radioactive gas that forms from the decay of uranium in soil and rock. It is colorless and odorless, and can accumulate to dangerous levels inside homes. The EPA recommends taking action if radon levels reach 4 pCi/L or higher. Testing is the only way to know your home's radon level — 1 in 15 US homes has elevated radon.",
  },
  {
    question: "How is radon testing performed?",
    answer:
      "We use electronic continuous radon monitors that collect hourly readings over a minimum 48-hour period under closed-house conditions. Results are reported in pCi/L with EPA context clearly explained. If levels exceed the action threshold, we provide mitigation system recommendations.",
  },
  {
    question: "What is a WDO inspection?",
    answer:
      "A WDO (Wood-Destroying Organism) inspection identifies evidence of termites, carpenter ants, wood-boring beetles, and wood-decaying fungi. These organisms can cause serious structural damage that is often invisible to the untrained eye. The WDO report is accepted by most lenders and real estate transactions.",
  },
  {
    question: "Can I bundle multiple services?",
    answer:
      "Yes. We offer bundled inspection packages that combine a standard home inspection with radon testing, mold/air quality testing, or WDO inspection — all scheduled as a single appointment. Bundling saves you time and often reduces the overall cost. Contact us or fill out our quote form to get a custom package.",
  },
  {
    question: "How do I schedule an inspection?",
    answer:
      "You can request an inspection by filling out our online quote form, calling us directly at (555) 000-0000, or sending us a message through our contact page. We typically confirm same-day and can often schedule within the same week.",
  },
  {
    question: "How much does a home inspection cost?",
    answer:
      "Pricing varies based on the size, age, and location of the property, as well as the services selected. A standard home inspection typically starts at $399. Radon testing starts at $150, mold/air quality at $225, and WDO at $180. Contact us for an exact quote for your specific property.",
  },
  {
    question: "Do you offer discounts?",
    answer:
      "Yes. We offer discounts for active duty military, veterans, and first responders. We also offer reduced rates on bundled multi-service inspections. Mention your eligibility when requesting a quote.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve the greater metro area and surrounding counties. If you're unsure whether we cover your property's location, reach out and we'll confirm availability for your address.",
  },
];

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-150 hover:text-black/70"
        aria-expanded={open}
      >
        <div className="flex items-start gap-5">
          <span className="mt-0.5 shrink-0 text-xs font-bold uppercase tracking-widest text-black/25">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-base font-semibold leading-snug sm:text-lg">
            {faq.question}
          </span>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-black transition-all duration-200">
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          )}
        </span>
      </button>

      {/* Answer — smooth expand */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pb-6 pl-10 pr-14 text-base leading-8 text-black/60">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-70">Support</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 opacity-90">
            Everything you need to know about our inspection process, services, scheduling, and pricing.
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="w-full">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-[280px_1fr] lg:gap-24">

            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 flex flex-col gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-black/40">
                    Can&apos;t find an answer?
                  </p>
                  <p className="mt-2 text-sm leading-6 text-black/60">
                    Reach out directly and we&apos;ll get back to you within 1 business day.
                  </p>
                </div>
                <a
                  href="/contact"
                  className="btn-on-light inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold"
                >
                  Contact Us
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <div className="border-t border-black/10 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-black/40">
                    Ready to book?
                  </p>
                  <a
                    href="/quote"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-60"
                  >
                    Request a Quote →
                  </a>
                </div>
              </div>
            </aside>

            {/* Questions */}
            <div>
              <div className="border-t border-black/10">
                {faqs.map((faq, i) => (
                  <FAQItem key={faq.question} faq={faq} index={i} />
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:hidden">
                <a href="/contact" className="btn-on-light inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold">
                  Contact Us
                </a>
                <a href="/quote" className="inline-flex items-center justify-center gap-2 border-2 border-black px-6 py-3 text-sm font-semibold transition-colors hover:bg-black hover:text-white">
                  Request a Quote
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
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
              Still have questions? We&apos;re happy to help.
            </p>
            <a href="/contact" className="btn-on-dark inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-3 text-sm font-semibold">
              Get in Touch
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
