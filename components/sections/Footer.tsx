"use client";

import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Security", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press Kit", "Contact"],
  Resources: ["Documentation", "API Reference", "Community", "Support", "Status"],
  Legal: ["Privacy", "Terms", "Cookies", "Licenses"],
};

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-parchment/10">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect width="100" height="100" rx="20" fill="#F5F0E8" />
                  <text
                    x="50"
                    y="65"
                    textAnchor="middle"
                    fill="#1A1A1A"
                    fontFamily="Playfair Display"
                    fontSize="45"
                    fontWeight="700"
                  >
                    Z
                  </text>
                </svg>
              </div>
              <span className="font-display text-xl text-parchment">
                Zim<em className="italic text-gold">Ledger</em>
              </span>
            </a>
            <p className="font-body text-sm text-parchment/40 max-w-xs leading-relaxed mb-6">
              The definitive financial platform for Zimbabwean businesses. Built with care in Harare.
            </p>
            <div className="flex gap-4">
              {["X", "in", "fb"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full border border-parchment/10 flex items-center justify-center text-parchment/30 hover:border-gold hover:text-gold transition-all"
                >
                  <span className="font-sans text-xs">{social}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-sans text-xs tracking-wider uppercase text-parchment/30 mb-6">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans text-sm text-parchment/50 hover:text-gold transition-colors flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-parchment/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-parchment/20">
            &copy; {new Date().getFullYear()} ZimLedger. All rights reserved. Built in Zimbabwe.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-zim-green" />
            <div className="w-2 h-2 rounded-full bg-zim-yellow" />
            <div className="w-2 h-2 rounded-full bg-zim-red" />
            <div className="w-2 h-2 rounded-full bg-zim-black" />
          </div>
        </div>
      </div>
    </footer>
  );
}
