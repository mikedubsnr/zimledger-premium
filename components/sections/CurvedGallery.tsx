"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    id: "1",
    title: "The Market at Dawn",
    subtitle: "Harare Fresh Produce",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80",
    category: "Agriculture",
  },
  {
    id: "2",
    title: "Crafts & Culture",
    subtitle: "Avondale Flea Market",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80",
    category: "Artisan",
  },
  {
    id: "3",
    title: "Urban Commerce",
    subtitle: "Bulawayo CBD",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    category: "Retail",
  },
  {
    id: "4",
    title: "Digital Frontier",
    subtitle: "Fintech Innovation",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    category: "Technology",
  },
  {
    id: "5",
    title: "Made in Zim",
    subtitle: "Local Manufacturing",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    category: "Industry",
  },
  {
    id: "6",
    title: "The Great Zimbabwe",
    subtitle: "Heritage & Legacy",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    category: "Heritage",
  },
];

export default function CurvedGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !galleryRef.current) return;

    const items = galleryRef.current.querySelectorAll(".gallery-item");

    items.forEach((item, index) => {
      const direction = index % 2 === 0 ? 1 : -1;

      gsap.fromTo(
        item,
        {
          x: direction * 100,
          rotationY: direction * 15,
          opacity: 0.3,
          scale: 0.9,
        },
        {
          x: 0,
          rotationY: 0,
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: item,
            containerAnimation: undefined,
            start: "top 85%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );
    });

    // Horizontal scroll effect
    const scrollTween = gsap.to(galleryRef.current, {
      x: () => -(galleryRef.current!.scrollWidth - window.innerWidth + 100),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${galleryRef.current!.scrollWidth - window.innerWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Curved path effect
    items.forEach((item) => {
      gsap.to(item, {
        y: "random(-30, 30)",
        rotationZ: "random(-3, 3)",
        scrollTrigger: {
          trigger: item,
          containerAnimation: scrollTween,
          start: "left right",
          end: "right left",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: containerRef });

  return (
    <section className="relative py-32 overflow-hidden bg-parchment">
      <div className="px-8 mb-16">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
          Visual Stories
        </span>
        <h2 className="editorial-heading text-5xl md:text-7xl max-w-3xl">
          The Faces of
          <br />
          <em className="italic">Zimbabwean Enterprise</em>
        </h2>
      </div>

      <div ref={containerRef} className="relative">
        <div
          ref={galleryRef}
          className="flex gap-8 px-8 perspective-1000"
          style={{ width: "max-content" }}
        >
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="gallery-item relative flex-shrink-0 w-[400px] md:w-[500px] group cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-parchment-dark">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                  sizes="500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="font-sans text-xs tracking-wider uppercase text-gold mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="font-display text-2xl text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-white/70 text-sm">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-sans text-xs text-ink/40">
                  {String(index + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 mx-4 bg-ink/10" />
                <span className="font-display text-sm text-ink/60">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
