"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "ZimLedger changed how I run my tuckshop. I used to lose track of who owed me money. Now I send WhatsApp reminders and get paid the same day.",
    name: "Mai Chido",
    role: "Owner",
    business: "Chido's Tuckshop, Budiriro",
  },
  {
    quote:
      "The dual currency feature is a lifesaver. I sell in USD but my suppliers want ZiG. ZimLedger handles the conversion automatically.",
    name: "Tendai M.",
    role: "Manager",
    business: "Mupfumi Hardware, Bulawayo",
  },
  {
    quote:
      "I run a salon with three employees. The booking and expense tracking keeps everything organized. My accountant is impressed.",
    name: "Rumbidzai K.",
    role: "Proprietor",
    business: "Glamour Cuts, Avondale",
  },
  {
    quote:
      "As a market vendor, I needed something simple. ZimLedger is the first app that actually feels like it was made for someone like me.",
    name: "John B.",
    role: "Vendor",
    business: "Mbare Musika, Harare",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".testimonial-card");

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          delay: index * 0.1,
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-32 px-8 bg-parchment">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            Testimonials
          </span>
          <h2 className="editorial-heading text-5xl md:text-7xl">
            Voices from
            <br />
            <em className="italic">the ground</em>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card group p-8 md:p-10 bg-parchment-dark rounded-lg border border-ink/5 hover:border-gold/20 transition-all duration-500"
            >
              <Quote className="w-8 h-8 text-gold/30 mb-6 group-hover:text-gold/60 transition-colors" />

              <blockquote className="font-body text-lg text-ink/70 leading-relaxed mb-8">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-ink/10 flex items-center justify-center">
                  <span className="font-display text-lg text-ink/40">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-display text-base text-ink">{t.name}</p>
                  <p className="font-sans text-xs text-ink/40">
                    {t.role}, {t.business}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
