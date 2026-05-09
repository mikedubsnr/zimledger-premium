"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function VideoFeature() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current || !overlayRef.current) return;

    gsap.fromTo(
      overlayRef.current,
      { opacity: 1 },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      ".video-title",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      }
    );
  }, { scope: sectionRef });

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-ink overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1920&q=80"
          onLoadedData={() => setIsLoaded(true)}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4"
            type="video/mp4"
          />
        </video>
        <div ref={overlayRef} className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-center">
        <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-8 block">
          Cinematic Feature
        </span>

        <h2 className="video-title font-display text-5xl md:text-7xl lg:text-8xl text-white max-w-5xl leading-[0.95] mb-8">
          The Rhythm of
          <br />
          <em className="italic text-gold">Zimbabwean Business</em>
        </h2>

        <p className="video-title font-body text-lg md:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed">
          From the bustling markets of Mbare to the boardrooms of Harare, 
          witness the pulse of enterprise that drives our nation forward.
        </p>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={togglePlay}
            className="group flex items-center justify-center w-16 h-16 rounded-full border border-white/30 hover:border-gold hover:bg-gold/10 transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white group-hover:text-gold transition-colors" />
            ) : (
              <Play className="w-6 h-6 text-white group-hover:text-gold transition-colors ml-1" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/20 hover:border-gold hover:bg-gold/10 transition-all duration-300"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white/60 group-hover:text-gold transition-colors" />
            ) : (
              <Volume2 className="w-5 h-5 text-white/60 group-hover:text-gold transition-colors" />
            )}
          </button>
        </div>

        {/* Stats */}
        <div className="absolute bottom-16 left-0 right-0 px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5M+", label: "Transactions Recorded" },
              { value: "12K", label: "Active Businesses" },
              { value: "$40M", label: "GDP Impact" },
              { value: "98%", label: "Uptime Guarantee" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl text-gold mb-2">
                  {stat.value}
                </div>
                <div className="font-sans text-xs tracking-wider uppercase text-white/40">
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
