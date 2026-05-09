"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";

export default function SpotlightHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      ".hero-line",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      }
    )
      .fromTo(
        ".hero-subtitle",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .fromTo(
        ".hero-cta",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-parchment"
    >
      {/* Spotlight Effect */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 169, 110, 0.15), transparent 40%)`,
        }}
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              #1A1A1A 40px,
              #1A1A1A 41px
            )`,
          }}
        />
      </div>

      {/* Zimbabwe Colors Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-zim-green" />
        <div className="flex-1 bg-zim-yellow" />
        <div className="flex-1 bg-zim-red" />
        <div className="flex-1 bg-zim-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
        <div className="overflow-hidden mb-4">
          <p className="hero-line font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-gold">
            Built in Zimbabwe · For Zimbabwe
          </p>
        </div>

        <div className="overflow-hidden">
          <h1 className="hero-line font-display text-6xl md:text-8xl lg:text-9xl text-ink leading-[0.9] tracking-tight">
            Zim
            <em className="italic text-gold">Ledger</em>
          </h1>
        </div>

        <div className="overflow-hidden mt-4">
          <h2 className="hero-line font-display text-3xl md:text-5xl lg:text-6xl text-ink/80 leading-[1.1]">
            The definitive platform
            <br />
            for <em className="italic">Zimbabwean enterprise</em>
          </h2>
        </div>

        <div className="overflow-hidden mt-8">
          <p className="hero-subtitle font-body text-lg md:text-xl text-ink/50 max-w-2xl mx-auto leading-relaxed">
            Track income in USD and ZiG. Manage inventory. Generate invoices.
            Send WhatsApp reminders. All from one elegant dashboard.
          </p>
        </div>

        <div className="hero-cta mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#features"
            className="group px-8 py-4 bg-ink text-parchment font-sans text-sm tracking-wider uppercase hover:bg-gold transition-colors duration-300"
          >
            Start Free Trial
          </a>
          <a
            href="#video"
            className="group px-8 py-4 border border-ink/20 text-ink font-sans text-sm tracking-wider uppercase hover:border-gold hover:text-gold transition-colors duration-300"
          >
            Watch the Film
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-sans text-xs tracking-wider uppercase text-ink/30">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4 text-ink/30 animate-bounce" />
      </div>

      {/* Side Text */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <p
          className="font-sans text-xs tracking-[0.3em] uppercase text-ink/20"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Financial clarity for every Zimbabwean business
        </p>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <p
          className="font-sans text-xs tracking-[0.3em] uppercase text-ink/20"
          style={{ writingMode: "vertical-rl" }}
        >
          Est. 2024 · Harare, Zimbabwe
        </p>
      </div>
    </section>
  );
}
