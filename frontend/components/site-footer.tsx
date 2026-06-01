import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            Trusted inspection partner
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            InterNACHI Certified. State License #XXXXXX. Built for clear
            reporting, responsive communication, and a straightforward
            inspection experience.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted">
          <span>InterNACHI Certified</span>
          <span>State License #XXXXXX</span>
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-foreground"
          >
            Terms
          </Link>
        </div>
      </div>

      <div className="border-t border-border/70 px-4 py-4 text-center text-xs text-muted sm:px-6 lg:px-8">
        © 2026 Home Inspection Platform. All rights reserved.
      </div>
    </footer>
  );
}
