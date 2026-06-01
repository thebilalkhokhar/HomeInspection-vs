import { QuoteForm } from "@/components/QuoteForm";

export default function QuotePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Quote Request
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Request a clear, professional inspection quote.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Complete the property details first, then share your contact
          information so we can respond quickly.
        </p>
      </div>

      <section className="mt-10 rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-8">
        <QuoteForm />
      </section>
    </main>
  );
}
