"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, MapPin, Mail, Phone, CheckCircle, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".contact-content",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );
  }, { scope: sectionRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-ink">
      <div className="container-editorial">
        <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Left */}
          <div>
            <span className="label-upper mb-5 block">Get in Touch</span>
            <h2 className="editorial-heading text-display-md text-parchment mb-6">
              Let us build{" "}
              <em className="italic text-gold">something together</em>
            </h2>
            <p className="font-body text-body-lg text-parchment/40 leading-relaxed mb-12 max-w-md">
              Whether you are a solo vendor or a growing enterprise, we would love to hear from you.
            </p>

            <div className="space-y-5">
              {[
                { icon: MapPin, label: "Address", value: "123 Samora Machel Ave, Harare" },
                { icon: Mail, label: "Email", value: "hello@zimledger.info" },
                { icon: Phone, label: "Phone", value: "+263 77 123 4567" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-parchment/5 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] text-parchment/25 uppercase tracking-wider">{item.label}</p>
                    <p className="font-body text-sm text-parchment/60">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-parchment/5 p-7 md:p-9 border border-parchment/8">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <CheckCircle className="w-12 h-12 text-gold mb-5" strokeWidth={1.5} />
                <h3 className="font-display text-xl text-parchment mb-3">Message Sent</h3>
                <p className="font-body text-sm text-parchment/40 max-w-xs">
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-5 py-2 border border-gold/30 text-gold font-sans text-xs tracking-wider uppercase hover:bg-gold hover:text-ink transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "Tendai Mutasa" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "tendai@yourbusiness.co.zw" },
                ].map((field) => (
                  <div key={field.id}>
                    <label className="block font-sans text-[10px] tracking-wider uppercase text-parchment/30 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      value={formData[field.id as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                      className="w-full px-4 py-3 bg-transparent border border-parchment/15 text-parchment font-body text-sm placeholder:text-parchment/15 focus:border-gold focus:outline-none transition-colors"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
                <div>
                  <label className="block font-sans text-[10px] tracking-wider uppercase text-parchment/30 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-parchment/15 text-parchment font-body text-sm placeholder:text-parchment/15 focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your business..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gold text-ink font-sans text-sm tracking-wide hover:bg-gold-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
