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
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
          delay: index * 0.1,
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="section-padding bg-parchment">
      <div className="container-editorial">
        <div className="text-center mb-16 md:mb-20">
          <span className="label-upper mb-4 block">Testimonials</span>
          <h2 className="editorial-heading text-display-md">
            Voices from{" "}
            <em className="italic">the ground</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card group p-7 md:p-9 bg-parchment-warm border border-ink/[0.04] hover:border-gold/15 transition-all duration-500"
            >
              <Quote className="w-6 h-6 text-gold/20 mb-5 group-hover:text-gold/40 transition-colors" strokeWidth={1.5} />

              <blockquote className="font-body text-body-sm text-ink-muted leading-relaxed mb-7">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-3 pt-5 border-t border-ink/[0.04]">
                <div className="w-10 h-10 rounded-full bg-ink/8 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-sm text-ink/40">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-display text-sm text-ink">{t.name}</p>
                  <p className="font-sans text-[11px] text-ink/35">
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
