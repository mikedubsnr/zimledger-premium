"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Sparkles, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    price: "0",
    period: "Free forever",
    description: "Perfect for trying things out",
    features: [
      "Up to 100 transactions/month",
      "Single currency (USD)",
      "Basic inventory (20 items)",
      "Email support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Professional",
    price: "5",
    period: "/ month",
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
    name: "Annual",
    price: "49.99",
    period: "/ year",
    description: "Best value — save 17%",
    badge: "Save $10",
    features: [
      "Everything in Professional",
      "All features unlocked",
      "Annual commitment discount",
      "Priority onboarding",
      "Dedicated support channel",
    ],
    cta: "Choose Annual Plan",
    popular: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [annualHighlight, setAnnualHighlight] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".pricing-card");
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
          delay: index * 0.12,
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section id="pricing" ref={sectionRef} className="section-padding bg-parchment-dark">
      <div className="container-editorial">
        <div className="text-center mb-16 md:mb-20">
          <span className="label-upper mb-4 block">Pricing</span>
          <h2 className="editorial-heading text-display-md mb-5">
            Simple, transparent{" "}
            <em className="italic">pricing</em>
          </h2>
          <p className="editorial-body max-w-xl mx-auto">
            No hidden fees. No setup costs. Start free and scale as your business grows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card relative p-7 md:p-8 transition-all duration-500 ${
                plan.popular
                  ? "bg-ink text-parchment shadow-xl scale-[1.02] md:scale-[1.03]"
                  : "bg-parchment text-ink border border-ink/[0.06] hover:border-gold/20"
              }`}
              onMouseEnter={() => plan.name === "Annual" && setAnnualHighlight(true)}
              onMouseLeave={() => setAnnualHighlight(false)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold text-ink font-sans text-[10px] tracking-wider uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              {plan.badge && (
                <div className="absolute -top-3 right-4 px-3 py-1 bg-zim-green text-white font-sans text-[10px] tracking-wider uppercase">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-display text-xl mb-1 ${plan.popular ? "text-parchment" : "text-ink"}`}>
                  {plan.name}
                </h3>
                <p className={`font-sans text-xs ${plan.popular ? "text-parchment/50" : "text-ink/35"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-7 pb-6 border-b border-current/10">
                <span className={`font-display text-4xl md:text-5xl ${plan.popular ? "text-gold" : "text-ink"}`}>
                  ${plan.price}
                </span>
                <span className={`font-sans text-sm ml-1 ${plan.popular ? "text-parchment/40" : "text-ink/30"}`}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-gold" : "text-zim-green"}`} strokeWidth={2} />
                    <span className={`font-sans text-[13px] ${plan.popular ? "text-parchment/60" : "text-ink/50"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`group flex items-center justify-center gap-2 w-full py-3 font-sans text-[13px] tracking-wide transition-all duration-300 ${
                  plan.popular
                    ? "bg-gold text-ink hover:bg-gold-light"
                    : "bg-ink text-parchment hover:bg-gold hover:text-ink"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-sans text-xs text-ink/25">
            All plans include a 7-day free trial. No credit card required to start.
          </p>
        </div>
      </div>
    </section>
  );
}
