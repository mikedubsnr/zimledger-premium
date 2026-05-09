"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Receipt,
  Banknote,
  Package,
  Users,
  MessageCircle,
  FileText,
  LayoutDashboard,
  CalendarDays,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const featuresList = [
  {
    icon: Receipt,
    title: "Sales Recording",
    description:
      "Capture every transaction in seconds. Cash, EcoCash, or bank transfer — all logged with a single tap.",
    code: "F / 01",
  },
  {
    icon: Banknote,
    title: "USD & ZiG, Side by Side",
    description:
      "Switch currencies on the fly. Set your own exchange rate and let the system handle the math.",
    code: "F / 02",
  },
  {
    icon: Package,
    title: "Live Inventory",
    description:
      "Watch stock tick down as you sell. Get alerts before you run out of your best-moving items.",
    code: "F / 03",
  },
  {
    icon: Users,
    title: "Debt Tracker",
    description:
      "Log who owes what, when it is due, and what has been paid. Never lose track of a dollar.",
    code: "F / 04",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Reminders",
    description:
      "Send polite payment nudges directly to customer WhatsApp with one tap. No awkward calls.",
    code: "F / 05",
  },
  {
    icon: FileText,
    title: "Invoices & Payments",
    description:
      "Generate professional invoices and track payments end to end. Get paid faster, look sharper.",
    code: "F / 06",
  },
  {
    icon: LayoutDashboard,
    title: "Daily Dashboard",
    description:
      "Today is sales, money owed, low stock — all on one screen. Read the room every morning.",
    code: "F / 07",
  },
  {
    icon: CalendarDays,
    title: "Bookings & Expenses",
    description:
      "Manage bookings and track expenses alongside your income. Complete financial clarity.",
    code: "F / 08",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(".feature-item");

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          delay: index % 2 === 0 ? 0 : 0.15,
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section id="features" ref={sectionRef} className="py-32 px-8 bg-parchment">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            What is Inside
          </span>
          <h2 className="editorial-heading text-5xl md:text-7xl max-w-4xl">
            Everything you juggle,
            <br />
            <em className="italic">in one place.</em>
          </h2>
          <p className="mt-6 font-body text-lg text-ink/50 max-w-2xl">
            Generic accounting tools were not made for the way money moves here.
            ZimLedger was. Each feature is shaped around real Zimbabwean SME workflows.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10">
          {featuresList.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.code}
                className="feature-item group p-8 md:p-12 bg-parchment hover:bg-parchment-dark transition-colors duration-500"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-sans text-xs tracking-wider text-ink/30">
                    {feature.code}
                  </span>
                  <Icon className="w-6 h-6 text-ink/20 group-hover:text-gold transition-colors duration-300" />
                </div>

                <h3 className="font-display text-2xl md:text-3xl text-ink mb-4 group-hover:text-ink transition-colors">
                  {feature.title}
                </h3>

                <p className="font-body text-ink/50 leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-8 h-px w-12 bg-ink/10 group-hover:w-24 group-hover:bg-gold transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
