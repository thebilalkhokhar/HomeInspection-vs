import { QuoteForm } from "@/components/QuoteForm";

export default function QuotePage() {
  return (
    <main className="w-full py-16 lg:py-24">
      <div className="content-shell px-4 sm:px-6 lg:px-12">
        <div>
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
      </div>

      <section className="mt-10 w-full rounded-3xl border border-border bg-white shadow-soft">
        <div className="content-shell p-6 sm:p-8">
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
