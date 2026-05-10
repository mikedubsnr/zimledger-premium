"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "17M+", label: "Zimbabwe Population" },
  { value: "90.6%", label: "Mobile Penetration" },
  { value: "6.45M", label: "Internet Users" },
  { value: "12K+", label: "Businesses on ZimLedger" },
];

export default function VideoFeature() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".video-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative bg-ink overflow-hidden">
      {/* Video container */}
      <div className="relative w-full aspect-video max-h-[70vh]">
        <iframe
          src={`https://www.youtube.com/embed/MEgVutW2j4c?autoplay=0&mute=1&loop=1&playlist=MEgVutW2j4c&controls=0&modestbranding=1&rel=0`}
          title="ZimLedger — Built in Zimbabwe"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-ink/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <span className="video-title font-sans text-[11px] tracking-[0.3em] uppercase text-gold mb-6 block">
          Cinematic Feature
        </span>

        <h2 className="video-title font-display text-4xl md:text-6xl lg:text-7xl text-white max-w-4xl leading-[1.05] mb-6">
          The Rhythm of{" "}
          <em className="italic text-gold">Zimbabwean Business</em>
        </h2>

        <p className="video-title font-body text-base md:text-lg text-white/50 max-w-xl mb-10 leading-relaxed">
          From the bustling markets of Mbare to the boardrooms of Harare,
          witness the pulse of enterprise that drives our nation forward.
        </p>

        {/* Watch on YouTube button */}
        <a
          href="https://www.youtube.com/watch?v=MEgVutW2j4c"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-sans text-sm tracking-wide hover:bg-white/10 transition-colors"
        >
          <Play className="w-4 h-4" />
          Watch on YouTube
        </a>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 bg-ink border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl md:text-3xl text-gold mb-1.5">
                  {stat.value}
                </div>
                <div className="font-sans text-[11px] tracking-wider uppercase text-white/30">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
