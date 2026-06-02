"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type HeroSlide = {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
};

const heroSlides: HeroSlide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Trusted Home Inspections",
    title: "Trusted Home Inspections for Buyers, Sellers, and Agents",
    description:
      "Peace of mind you can count on - thorough, clearly documented inspections with a 24-hour report turnaround and guidance you can trust.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Precision You Can Rely On",
    title: "Every Room, System, and Detail Reviewed with Clarity",
    description:
      "From roofing to foundations, we deliver clear inspection findings so you can move forward with confidence and no uncertainty.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Fast and Professional",
    title: "Clear Reports Delivered on Time for Critical Decisions",
    description:
      "Our streamlined process keeps timelines on track with practical recommendations and responsive communication from start to finish.",
  },
];

export function HomeHeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="w-full">
      <div className="relative min-h-128 w-full overflow-hidden sm:min-h-144 lg:min-h-168">

          {/* Sliding track */}
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{
              width: `${heroSlides.length * 100}%`,
              transform: `translateX(-${(activeSlide * 100) / heroSlides.length}%)`,
            }}
          >
            {heroSlides.map((slide) => (
              <article
                key={slide.title}
                className="relative flex-shrink-0"
                style={{
                  width: `${100 / heroSlides.length}%`,
                  minHeight: "inherit",
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.58)), url("${slide.image}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="content-shell mx-auto flex h-full min-h-128 w-full flex-col justify-center px-6 py-12 text-white sm:min-h-144 sm:px-10 lg:min-h-168 lg:px-14">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                    {slide.eyebrow}
                  </p>
                  <h1 className="mt-4 max-w-6xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
                    {slide.title}
                  </h1>
                  <p className="mt-8 max-w-4xl text-lg leading-8 sm:text-xl">
                    {slide.description}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/quote"
                      className="btn-on-dark inline-flex items-center justify-center px-6 py-3 text-sm font-semibold"
                    >
                      Book Inspection
                    </Link>
                    <Link
                      href="/services"
                      className="btn-on-dark inline-flex items-center justify-center px-6 py-3 text-sm font-semibold"
                    >
                      View Services
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeSlide}
                onClick={() => setActiveSlide(index)}
                className={`h-3 w-3 border-2 border-white transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  index === activeSlide ? "bg-white opacity-100" : "bg-transparent opacity-70 hover:opacity-100"
                }`}
              />
            ))}
          </div>

      </div>
    </section>
  );
}
