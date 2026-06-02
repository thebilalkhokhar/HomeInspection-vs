import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-white/20 bg-black text-white">
      <div className="content-shell grid w-full gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Trusted inspection partner
          </p>
          <p className="mt-3 text-sm leading-6 text-white">
            InterNACHI Certified. State License #XXXXXX. Built for clear
            reporting, responsive communication, and a straightforward
            inspection experience.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white">
          <span>InterNACHI Certified</span>
          <span>State License #XXXXXX</span>
          <Link
            href="/privacy"
            className="underline-offset-4 transition-opacity hover:opacity-80 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:opacity-70"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="underline-offset-4 transition-opacity hover:opacity-80 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:opacity-70"
          >
            Terms
          </Link>
        </div>
      </div>

      <div className="w-full border-t border-white/20">
        <div className="content-shell px-4 py-4 text-center text-xs text-white sm:px-6 lg:px-12">
          © 2026 Home Inspection Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
