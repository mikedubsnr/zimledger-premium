"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    price: "0",
    period: "forever free",
    description: "Perfect for trying things out",
    features: [
      "Up to 100 transactions/month",
      "Single currency (USD)",
      "Basic inventory (20 items)",
      "Email support",
      "Mobile app access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "5",
    period: "/month",
    description: "For growing businesses",
    features: [
      "Unlimited transactions",
      "Dual currency (USD & ZiG)",
      "Unlimited inventory",
      "WhatsApp reminders",
      "Invoice generation",
      "Debt tracking",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "49",
    period: "/year",
    description: "Best value for committed businesses",
    features: [
      "Everything in Professional",
      "Annual savings (18% off)",
      "Multi-user access (5 seats)",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated account manager",
      "API access",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".pricing-card");

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          delay: index * 0.15,
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section id="pricing" ref={sectionRef} className="py-32 px-8 bg-parchment-dark">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            Pricing
          </span>
          <h2 className="editorial-heading text-5xl md:text-7xl mb-6">
            Simple, transparent
            <br />
            <em className="italic">pricing</em>
          </h2>
          <p className="font-body text-lg text-ink/50 max-w-2xl mx-auto">
            No hidden fees. No setup costs. Start free and scale as your business grows.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card relative p-8 md:p-10 rounded-lg transition-all duration-500 ${
                plan.popular
                  ? "bg-ink text-parchment scale-105 shadow-2xl"
                  : "bg-parchment text-ink border border-ink/10 hover:border-gold/30"
              }`}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-ink font-sans text-xs tracking-wider uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className={`font-display text-2xl mb-2 ${plan.popular ? "text-parchment" : "text-ink"}`}>
                  {plan.name}
                </h3>
                <p className={`font-sans text-sm ${plan.popular ? "text-parchment/60" : "text-ink/40"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <span className={`font-display text-5xl ${plan.popular ? "text-gold" : "text-ink"}`}>
                  ${plan.price}
                </span>
                <span className={`font-sans text-sm ml-1 ${plan.popular ? "text-parchment/60" : "text-ink/40"}`}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? "text-gold" : "text-zim-green"}`} />
                    <span className={`font-sans text-sm ${plan.popular ? "text-parchment/70" : "text-ink/60"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block w-full py-4 text-center font-sans text-sm tracking-wider uppercase transition-all duration-300 ${
                  plan.popular
                    ? "bg-gold text-ink hover:bg-gold-light"
                    : "bg-ink text-parchment hover:bg-gold hover:text-ink"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <p className="font-sans text-sm text-ink/30">
            Trusted by 12,000+ businesses across Zimbabwe · 7-day free trial on all paid plans
          </p>
        </div>
      </div>
    </section>
  );
}
