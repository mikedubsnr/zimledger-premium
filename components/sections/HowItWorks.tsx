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
      "Add your products, starting stock, and preferred currency. Takes less than five minutes.",
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

    const items = sectionRef.current.querySelectorAll(".step-item");
    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
          delay: index * 0.15,
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section id="how-it-works" ref={sectionRef} className="section-padding bg-parchment">
      <div className="container-editorial">
        <div className="text-center mb-16 md:mb-20">
          <span className="label-upper mb-4 block">How It Works</span>
          <h2 className="editorial-heading text-display-md mb-5">
            Three steps. <em className="italic">That is it.</em>
          </h2>
          <p className="editorial-body max-w-xl mx-auto">
            No accountant. No setup wizard with forty fields. Open the app, record what you do, get clarity tomorrow morning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="step-item relative text-center md:text-left"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold/30 mb-6">
                <span className="font-display text-lg text-gold">{step.number}</span>
              </div>

              <h3 className="font-display text-xl md:text-2xl text-ink mb-3">
                {step.title}
              </h3>

              <p className="font-body text-body-sm text-ink-muted leading-relaxed max-w-sm mx-auto md:mx-0">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-px bg-ink/8 -translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
