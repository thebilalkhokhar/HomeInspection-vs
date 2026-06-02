"use client";

import { useEffect, useState, useCallback } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "The report was clear, fast, and easy to act on. Exactly what we needed before closing.",
    name: "Sarah M.",
    role: "Home Buyer",
    initials: "SM",
  },
  {
    quote:
      "Our agent and lender both appreciated the turnaround speed and clean documentation. Made the whole process smoother.",
    name: "James R.",
    role: "Home Seller",
    initials: "JR",
  },
  {
    quote:
      "I've worked with many inspectors — the detail and clarity in their reports set them apart every time.",
    name: "Linda K.",
    role: "Real Estate Agent",
    initials: "LK",
  },
  {
    quote:
      "Booked online in minutes, got the report the next day. Professional, thorough, and stress-free.",
    name: "Marcus T.",
    role: "Home Buyer",
    initials: "MT",
  },
  {
    quote:
      "The radon test results were explained clearly and the follow-up recommendations were spot on.",
    name: "Diane W.",
    role: "Homeowner",
    initials: "DW",
  },
];

function StarRating() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setActive((index + testimonials.length) % testimonials.length);
        setAnimating(false);
      }, 300);
    },
    [animating]
  );

  const prev = () => goTo(active - 1);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  useEffect(() => {
    const id = window.setInterval(next, 5000);
    return () => window.clearInterval(id);
  }, [next]);

  const item = testimonials[active];

  return (
    <div className="mt-10">
      {/* Slider card */}
      <div className="relative overflow-hidden border-2 border-black">
        <div
          className={`px-8 py-10 transition-opacity duration-300 sm:px-12 sm:py-14 ${
            animating ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Large quote mark */}
          <span className="select-none text-8xl font-bold leading-none text-black/10" aria-hidden="true">
            &ldquo;
          </span>

          <StarRating />

          <blockquote className="mt-4 text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl lg:text-4xl">
            {item.quote}
          </blockquote>

          <footer className="mt-8 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black text-sm font-bold uppercase tracking-wider">
              {item.initials}
            </div>
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-xs font-medium uppercase tracking-widest opacity-50">
                {item.role}
              </p>
            </div>
          </footer>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        {/* Dot indicators */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to review ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2.5 w-2.5 border-2 border-black transition-all duration-200 ${
                i === active ? "bg-black" : "bg-transparent hover:bg-black/30"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous review"
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center border-2 border-black transition-all duration-200 hover:bg-black hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={next}
            className="flex h-10 w-10 items-center justify-center border-2 border-black transition-all duration-200 hover:bg-black hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
