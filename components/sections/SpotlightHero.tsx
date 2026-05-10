"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Check } from "lucide-react";

const trustPoints = [
  "No credit card required",
  "7-day free trial",
  "Cancel anytime",
];

export default function SpotlightHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(".hero-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
      .fromTo(".hero-headline", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, "-=0.4")
      .fromTo(".hero-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(".hero-ctas", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .fromTo(".hero-trust", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.3");
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-parchment overflow-hidden"
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] flex">
        <div className="flex-1 bg-zim-green" />
        <div className="flex-1 bg-zim-yellow" />
        <div className="flex-1 bg-zim-red" />
        <div className="flex-1 bg-zim-black" />
      </div>

      {/* Background decorative element */}
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] rounded-full bg-zim-green/[0.02] blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="max-w-xl">
            <p className="hero-label label-upper mb-6">
              Built in Zimbabwe · For Zimbabwe
            </p>

            <h1 className="hero-headline font-display text-display-lg text-ink mb-6">
              Run your business
              <br />
              from <em className="italic text-gold">one place</em>
            </h1>

            <p className="hero-sub font-body text-body-lg text-ink-muted mb-8 max-w-md">
              Track income in USD and ZiG. Manage stock, send invoices,
              chase debts via WhatsApp, and know your numbers —
              all from a single dashboard built for Zimbabwean SMEs.
            </p>

            <div className="hero-ctas flex flex-col sm:flex-row items-start gap-4 mb-8">
              <a
                href="#pricing"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-parchment font-sans text-sm tracking-wide hover:bg-gold transition-colors duration-300"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center px-7 py-3.5 border border-ink/15 text-ink font-sans text-sm tracking-wide hover:border-gold hover:text-gold transition-all duration-300"
              >
                View Features
              </a>
            </div>

            <div className="hero-trust flex flex-wrap items-center gap-x-5 gap-y-2">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-zim-green" />
                  <span className="font-sans text-xs text-ink/40">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats / Social Proof */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Stats card */}
              <div className="bg-white/60 backdrop-blur-sm border border-ink/5 rounded-lg p-8 shadow-sm">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="font-display text-3xl text-ink mb-1">17M+</p>
                    <p className="font-sans text-xs text-ink/40 uppercase tracking-wider">Zimbabwe Population</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-ink mb-1">90.6%</p>
                    <p className="font-sans text-xs text-ink/40 uppercase tracking-wider">Mobile Penetration</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-ink mb-1">6.45M</p>
                    <p className="font-sans text-xs text-ink/40 uppercase tracking-wider">Internet Users</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-gold mb-1">12K+</p>
                    <p className="font-sans text-xs text-ink/40 uppercase tracking-wider">Businesses on ZimLedger</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-ink/5">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {["bg-zim-green", "bg-zim-yellow", "bg-zim-red", "bg-ink"].map((color, i) => (
                        <div key={i} className={`w-8 h-8 rounded-full ${color} border-2 border-parchment`} />
                      ))}
                    </div>
                    <p className="font-sans text-sm text-ink/50">
                      Trusted by shop owners, salons, hardware stores & market vendors
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-gold/20 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
