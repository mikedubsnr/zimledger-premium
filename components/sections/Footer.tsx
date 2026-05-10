"use client";

import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Security", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Documentation", "API Reference", "Support", "Status"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-parchment/6">
      <div className="container-editorial section-padding pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-parchment flex items-center justify-center">
                <span className="font-display text-sm text-ink font-bold">Z</span>
              </div>
              <span className="font-display text-lg text-parchment">
                Zim<em className="italic text-gold">Ledger</em>
              </span>
            </a>
            <p className="font-body text-xs text-parchment/30 leading-relaxed max-w-[200px] mb-5">
              The definitive financial platform for Zimbabwean businesses.
            </p>
            <div className="flex gap-3">
              {["X", "in", "fb"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full border border-parchment/8 flex items-center justify-center text-parchment/25 hover:border-gold hover:text-gold transition-all text-[10px] font-sans"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-sans text-[10px] tracking-wider uppercase text-parchment/20 mb-5">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans text-xs text-parchment/40 hover:text-gold transition-colors flex items-center gap-0.5 group"
                    >
                      {link}
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-parchment/6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[10px] text-parchment/15">
            &copy; {new Date().getFullYear()} ZimLedger. All rights reserved. Built in Zimbabwe.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-zim-green" />
            <div className="w-1.5 h-1.5 rounded-full bg-zim-yellow" />
            <div className="w-1.5 h-1.5 rounded-full bg-zim-red" />
            <div className="w-1.5 h-1.5 rounded-full bg-zim-black" />
          </div>
        </div>
      </div>
    </footer>
  );
}
