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
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
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
    <section id="contact" ref={sectionRef} className="py-32 px-8 bg-ink">
      <div className="max-w-7xl mx-auto">
        <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div>
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
              Get in Touch
            </span>
            <h2 className="editorial-heading text-5xl md:text-6xl text-parchment mb-8">
              Let's build
              <br />
              <em className="italic text-gold">something together</em>
            </h2>
            <p className="font-body text-lg text-parchment/50 leading-relaxed mb-12 max-w-md">
              Whether you are a solo vendor or a growing enterprise, we would love to hear from you.
              Tell us about your business and how we can help.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-parchment/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-sans text-sm text-parchment/30 uppercase tracking-wider">Address</p>
                  <p className="font-body text-parchment/70">123 Samora Machel Ave, Harare</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-parchment/5 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-sans text-sm text-parchment/30 uppercase tracking-wider">Email</p>
                  <p className="font-body text-parchment/70">hello@zimledger.info</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-parchment/5 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-sans text-sm text-parchment/30 uppercase tracking-wider">Phone</p>
                  <p className="font-body text-parchment/70">+263 77 123 4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-parchment/5 p-8 md:p-10 rounded-lg border border-parchment/10">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <CheckCircle className="w-16 h-16 text-gold mb-6" />
                <h3 className="font-display text-2xl text-parchment mb-4">Message Sent</h3>
                <p className="font-body text-parchment/50">
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-6 py-3 border border-gold/30 text-gold font-sans text-sm tracking-wider uppercase hover:bg-gold hover:text-ink transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-sans text-xs tracking-wider uppercase text-parchment/40 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-parchment/20 text-parchment font-body placeholder:text-parchment/20 focus:border-gold focus:outline-none transition-colors"
                    placeholder="Tendai Mutasa"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs tracking-wider uppercase text-parchment/40 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-parchment/20 text-parchment font-body placeholder:text-parchment/20 focus:border-gold focus:outline-none transition-colors"
                    placeholder="tendai@yourbusiness.co.zw"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs tracking-wider uppercase text-parchment/40 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-parchment/20 text-parchment font-body placeholder:text-parchment/20 focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your business..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gold text-ink font-sans text-sm tracking-wider uppercase hover:bg-gold-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
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
