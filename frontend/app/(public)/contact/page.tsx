"use client";

import { FormEvent, useRef, useState } from "react";

const inputClass =
  "h-12 w-full border-2 border-black bg-white px-4 text-sm outline-none placeholder:text-black/30 focus:ring-0 transition-colors duration-150";
const labelClass =
  "flex flex-col gap-2 text-sm font-semibold uppercase tracking-widest";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim() || null,
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value || null,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
      const response = await fetch(`${apiBase}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.detail || result?.message || "Failed to send message.");
      }

      setSubmitted(true);
      formRef.current?.reset();
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Submission failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="w-full bg-white text-black">

      {/* Hero */}
      <section
        className="relative w-full text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="content-shell mx-auto flex w-full min-h-64 flex-col justify-center px-6 py-16 sm:px-10 lg:px-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-70">Get in Touch</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
            Let&apos;s talk about your inspection.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 opacity-90">
            Have a question, need a custom quote, or want to schedule directly? Reach out and we&apos;ll get back to you fast.
          </p>
        </div>
      </section>

      {/* Contact form + sidebar */}
      <section className="w-full">
        <div className="content-shell mx-auto w-full px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">

            {/* Form */}
            <div>
              {submitted ? (
                <div className="flex flex-col items-start gap-6 border-2 border-black p-10">
                  <div className="flex h-14 w-14 items-center justify-center border-2 border-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-7 w-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Message Sent</h2>
                    <p className="mt-3 text-base leading-7 text-black/60">
                      Thanks for reaching out. We&apos;ll get back to you within 1 business day.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-on-light inline-flex items-center justify-center px-6 py-3 text-sm font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/40">Contact Form</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Send us a message</h2>
                  </div>

                  {errorMessage && (
                    <div role="alert" className="border-2 border-red-500 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}>
                      Your Name
                      <input name="name" type="text" required placeholder="Jane Smith" className={inputClass} />
                    </label>
                    <label className={labelClass}>
                      Email Address
                      <input name="email" type="email" required placeholder="jane@example.com" className={inputClass} />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}>
                      Phone Number
                      <input name="phone" type="tel" placeholder="(555) 000-0000" className={inputClass} />
                    </label>
                    <label className={labelClass}>
                      Subject
                      <select name="subject" className={inputClass} defaultValue="">
                        <option value="" disabled>Select a subject</option>
                        <option>General Inquiry</option>
                        <option>Request a Quote</option>
                        <option>Schedule an Inspection</option>
                        <option>Report Question</option>
                        <option>Other</option>
                      </select>
                    </label>
                  </div>

                  <label className={labelClass}>
                    Message
                    <textarea
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us about the property and what you need..."
                      className="w-full border-2 border-black bg-white px-4 py-3 text-sm outline-none placeholder:text-black/30 focus:ring-0 transition-colors duration-150 resize-none"
                    />
                  </label>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-on-light inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6">

              {/* Contact info */}
              <div className="border border-black p-6 transition-all duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none">
                <h2 className="text-lg font-semibold tracking-tight">Contact Info</h2>
                <ul className="mt-4 flex flex-col gap-4">
                  <li>
                    <a href="tel:+15550000000" className="flex items-start gap-3 text-sm text-black/70 transition-colors hover:text-black">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-0.5 h-4 w-4 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      (555) 000-0000
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@homeinspection.com" className="flex items-start gap-3 text-sm text-black/70 transition-colors hover:text-black">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-0.5 h-4 w-4 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      info@homeinspection.com
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-black/70">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-0.5 h-4 w-4 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    Serving the Greater Metro Area
                  </li>
                </ul>
              </div>

              {/* Hours */}
              <div className="border border-black p-6 transition-all duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none">
                <h2 className="text-lg font-semibold tracking-tight">Office Hours</h2>
                <ul className="mt-4 flex flex-col gap-2 text-sm">
                  {[
                    { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
                    { day: "Saturday", hours: "9:00 AM – 4:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((row) => (
                    <li key={row.day} className="flex items-center justify-between border-b border-black/10 pb-2">
                      <span className="text-black/50">{row.day}</span>
                      <span className="font-medium">{row.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick quote CTA */}
              <div className="border border-black bg-black p-6 text-white transition-all duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none">
                <h2 className="text-lg font-semibold tracking-tight">Need a Quote Fast?</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Skip the back-and-forth — fill out our quote form and get a response within 2 hours.
                </p>
                <a
                  href="/quote"
                  className="btn-on-dark mt-4 inline-flex w-full items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold"
                >
                  Request a Quote
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>

            </aside>
          </div>
        </div>
      </section>

      {/* CTA strip */}
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
              Ready to book your inspection?
            </p>
            <a
              href="/quote"
              className="btn-on-dark inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-3 text-sm font-semibold"
            >
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
