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
    title: "Record Every Sale",
    description:
      "Cash, EcoCash, bank transfer, or in-kind. Log every transaction in seconds with automatic categorisation.",
    code: "01",
  },
  {
    icon: Banknote,
    title: "USD & ZiG Together",
    description:
      "Set your own exchange rate. The system handles conversions automatically. No more manual calculations.",
    code: "02",
  },
  {
    icon: Package,
    title: "Live Stock Tracking",
    description:
      "Watch inventory tick down as you sell. Get low-stock alerts before you run out of your best-moving items.",
    code: "03",
  },
  {
    icon: Users,
    title: "Debt & Customer Ledger",
    description:
      "Know who owes what, when it is due, and what has been paid. Customer balances at a glance.",
    code: "04",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Reminders",
    description:
      "Send polite payment nudges directly to customer WhatsApp. One tap. No awkward phone calls.",
    code: "05",
  },
  {
    icon: FileText,
    title: "Professional Invoices",
    description:
      "Generate branded invoices and track payments end-to-end. Look professional without the accountant fees.",
    code: "06",
  },
  {
    icon: LayoutDashboard,
    title: "Daily Dashboard",
    description:
      "Today is sales, money owed, low stock, and top customers — all on one screen. Read the room every morning.",
    code: "07",
  },
  {
    icon: CalendarDays,
    title: "Bookings & Expenses",
    description:
      "Manage appointments and track business expenses alongside income. Complete financial clarity.",
    code: "08",
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
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%" },
          delay: (index % 2) * 0.1,
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section id="features" ref={sectionRef} className="section-padding bg-parchment">
      <div className="container-editorial">
        <div className="max-w-2xl mb-16 md:mb-20">
          <span className="label-upper mb-4 block">Features</span>
          <h2 className="editorial-heading text-display-md mb-5">
            Everything you juggle,{" "}
            <em className="italic">in one place</em>
          </h2>
          <p className="editorial-body">
            Generic accounting tools were not made for the way money moves here.
            ZimLedger was. Each feature is shaped around real Zimbabwean SME workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/[0.06]">
          {featuresList.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.code}
                className="feature-item group p-7 md:p-10 bg-parchment hover:bg-parchment-warm transition-colors duration-500"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-sans text-[11px] tracking-wider text-ink/25 font-medium">
                    {feature.code}
                  </span>
                  <Icon className="w-5 h-5 text-ink/15 group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
                </div>

                <h3 className="font-display text-xl md:text-2xl text-ink mb-3 group-hover:text-ink-light transition-colors">
                  {feature.title}
                </h3>

                <p className="font-body text-body-sm text-ink-muted leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-6 h-px w-10 bg-ink/8 group-hover:w-20 group-hover:bg-gold/40 transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
