"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".story-content",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="story" ref={sectionRef} className="section-padding bg-parchment-dark">
      <div className="container-editorial">
        <div className="story-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column — Label & heading */}
          <div className="lg:col-span-4">
            <span className="label-upper mb-5 block">Our Story</span>
            <h2 className="editorial-heading text-display-md mb-6">
              Designed for the way{" "}
              <em className="italic text-gold">Zimbabweans do business</em>
            </h2>

            <div className="flex items-center gap-4 mt-10 pt-8 border-t border-ink/8">
              <div className="w-12 h-12 rounded-full bg-ink flex items-center justify-center">
                <span className="font-display text-base text-parchment font-bold">M</span>
              </div>
              <div>
                <p className="font-display text-base text-ink">Malcolm M.</p>
                <p className="font-sans text-xs text-ink/40">Founder, ZimLedger</p>
              </div>
            </div>
          </div>

          {/* Right column — Story text */}
          <div className="lg:col-span-8 lg:pt-2">
            <div className="space-y-6 font-body text-body-lg text-ink-muted leading-relaxed max-w-2xl">
              <p>
                We built ZimLedger because we watched our mothers, fathers, and neighbors
                struggle with tools made for Silicon Valley, not for Mbare. Tools that did not
                understand EcoCash, did not know what a tuckshop was, and certainly did not
                account for the daily reality of dual-currency life.
              </p>
              <p>
                Every feature started as a conversation. With spaza shop owners in Budiriro,
                Glen View. With salon managers in Avondale. With hardware store owners in
                Bulawayo. We listened, we built, we refined.
              </p>
              <p>
                The result is not just software. It is a financial companion that speaks your
                language, understands your rhythms, and grows with your ambition.
              </p>
            </div>

            {/* Zimbabwe locations */}
            <div className="mt-10 flex flex-wrap gap-3">
              {["Harare", "Bulawayo", "Mutare", "Gweru", "Masvingo", "Chitungwiza"].map((city) => (
                <span
                  key={city}
                  className="px-3 py-1.5 bg-parchment border border-ink/8 font-sans text-xs text-ink/50 tracking-wide"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
