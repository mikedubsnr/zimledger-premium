"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Set up your shop",
    description:
      "Add your products, your starting stock, and your preferred currency. Takes less than five minutes.",
  },
  {
    number: "02",
    title: "Record as you trade",
    description:
      "Every sale, every debt, every restock — log it the moment it happens. Cash, EcoCash, or bank.",
  },
  {
    number: "03",
    title: "Read the room",
    description:
      "Check the dashboard each morning. Know what sold, who owes you, and what needs restocking.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const steps = sectionRef.current.querySelectorAll(".step-item");
    const lines = sectionRef.current.querySelectorAll(".step-line");

    steps.forEach((step, index) => {
      gsap.fromTo(
        step,
        { x: index % 2 === 0 ? -60 : 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          },
        }
      );
    });

    lines.forEach((line) => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-32 px-8 bg-parchment">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            How It Works
          </span>
          <h2 className="editorial-heading text-5xl md:text-7xl">
            Three steps.
            <br />
            <em className="italic">That is it.</em>
          </h2>
          <p className="mt-6 font-body text-lg text-ink/50 max-w-xl mx-auto">
            No accountant. No setup wizard with forty fields. Open the app, record what you do, get clarity tomorrow morning.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-ink/10 md:-translate-x-px">
            <div className="step-line absolute top-0 left-0 w-full h-full bg-gold origin-top" />
          </div>

          <div className="space-y-24">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`step-item relative flex items-start gap-8 md:gap-16 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Number Circle */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-parchment border-2 border-gold flex items-center justify-center">
                  <span className="font-display text-xl text-gold">{step.number}</span>
                </div>

                {/* Content */}
                <div className={`flex-1 pt-2 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">
                    {step.title}
                  </h3>
                  <p className="font-body text-lg text-ink/50 max-w-md leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
