"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function EditorialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".editorial-image",
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".editorial-image",
          start: "top 75%",
        },
      }
    );

    gsap.fromTo(
      ".editorial-text",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".editorial-text",
          start: "top 80%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-32 px-8 bg-parchment">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="editorial-image relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80"
              alt="Zimbabwean business owner"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />

            {/* Floating Badge */}
            <div className="absolute bottom-8 left-8 bg-parchment/95 backdrop-blur-sm p-6 rounded-lg max-w-xs">
              <p className="font-display text-3xl text-ink mb-1">12,000+</p>
              <p className="font-sans text-xs tracking-wider uppercase text-ink/50">
                Businesses Trust ZimLedger
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="editorial-text">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-6 block">
              Our Story
            </span>

            <h2 className="editorial-heading text-4xl md:text-5xl lg:text-6xl mb-8">
              Designed for the way
              <br />
              <em className="italic">Zimbabweans do business</em>
            </h2>

            <div className="space-y-6 font-body text-lg text-ink/60 leading-relaxed">
              <p>
                We built ZimLedger because we watched our mothers, fathers, and neighbors 
                struggle with tools made for Silicon Valley, not for Mbare. Tools that did not 
                understand EcoCash, did not know what a tuckshop was, and certainly did not 
                account for the daily reality of dual-currency life.
              </p>
              <p>
                Every feature started as a conversation. With spaza shop owners in Budiriro. 
                With salon managers in Avondale. With hardware store owners in Bulawayo. We 
                listened, we built, we refined.
              </p>
              <p>
                The result is not just software. It is a financial companion that speaks your 
                language, understands your rhythms, and grows with your ambition.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                  alt="Founder"
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-display text-lg text-ink">Tendai M.</p>
                <p className="font-sans text-sm text-ink/40">Founder, ZimLedger</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
