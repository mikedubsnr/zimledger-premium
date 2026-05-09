"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setEmail("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-8 bg-parchment-dark border-y border-ink/5">
      <div className="max-w-3xl mx-auto text-center">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
          Stay Updated
        </span>
        <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">
          Join the <em className="italic">ZimLedger</em> newsletter
        </h3>
        <p className="font-body text-ink/50 mb-8">
          Get insights on Zimbabwean business, product updates, and exclusive offers.
        </p>

        {isSubmitted ? (
          <div className="flex items-center justify-center gap-2 text-zim-green">
            <CheckCircle className="w-5 h-5" />
            <span className="font-sans text-sm">You are subscribed! Welcome aboard.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-parchment border border-ink/10 text-ink font-body placeholder:text-ink/20 focus:border-gold focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-ink text-parchment font-sans text-sm tracking-wider uppercase hover:bg-gold hover:text-ink transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Subscribe
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
