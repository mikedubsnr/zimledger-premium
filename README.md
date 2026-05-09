# ZimLedger Premium

> A sophisticated editorial-design fullstack web application for ZimLedger — the definitive financial platform for Zimbabwean businesses.

![ZimLedger](https://img.shields.io/badge/Built%20in-Zimbabwe-009739?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)

## Features

### Visual & Interactive
- **Spotlight Typography Effect** — Mouse-following spotlight that illuminates text with a warm gold gradient
- **Procedural 3D WebGL Bridge** — Custom GLSL shader bridge with Zimbabwe flag colors (green, yellow, red, black) and floating geometric elements using Three.js / React Three Fiber
- **Curved Scroll Gallery** — Horizontal scroll-driven gallery with 3D perspective transforms, parallax depth, and GSAP ScrollTrigger
- **Cinematic Video Feature** — Full-screen background video with overlay fade, play/pause controls, and animated statistics
- **Editorial Design Aesthetic** — Warm off-white (`#F5F0E8`) backgrounds, Playfair Display typography, subtle grain texture overlay
- **Smooth Scroll** — Lenis-powered buttery smooth scrolling integrated with GSAP ScrollTrigger
- **GSAP Animations** — Staggered reveals, clip-path image animations, scroll-driven timeline effects

### Functional
- **Contact Form API** — Zod-validated form with POST endpoint (`/api/contact`)
- **Newsletter Signup API** — Email capture endpoint (`/api/newsletter`)
- **Responsive Navigation** — Fixed navbar with blur backdrop, mobile hamburger menu
- **Pricing Section** — Three-tier pricing cards with hover effects
- **Testimonials** — Social proof grid with quote styling
- **How It Works** — Animated step-by-step process with connecting timeline

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 |
| 3D / WebGL | Three.js, @react-three/fiber, @react-three/drei |
| Animation | GSAP + ScrollTrigger, Framer Motion |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Validation | Zod |
| Email (optional) | Resend |

## Project Structure

```
zimledger-premium/
├── app/
│   ├── api/
│   │   ├── contact/route.ts      # Contact form API
│   │   └── newsletter/route.ts   # Newsletter signup API
│   ├── globals.css               # Global styles, fonts, animations
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Home page composing all sections
├── components/
│   ├── sections/
│   │   ├── Navigation.tsx        # Fixed responsive navbar
│   │   ├── SpotlightHero.tsx     # Hero with mouse spotlight effect
│   │   ├── Features.tsx          # 8-feature grid with editorial styling
│   │   ├── EditorialSection.tsx  # Image + text editorial layout
│   │   ├── HowItWorks.tsx        # 3-step animated process
│   │   ├── CurvedGallery.tsx     # Horizontal scroll gallery
│   │   ├── VideoFeature.tsx      # Cinematic video background section
│   │   ├── Testimonials.tsx      # Customer quotes grid
│   │   ├── Pricing.tsx           # 3-tier pricing cards
│   │   ├── Newsletter.tsx        # Email signup form
│   │   ├── Contact.tsx           # Contact form + info
│   │   └── Footer.tsx            # Multi-column footer
│   ├── three/
│   │   └── BridgeScene.tsx       # WebGL 3D bridge + floating elements
│   └── ui/
│       └── SmoothScroll.tsx      # Lenis smooth scroll wrapper
├── hooks/
│   └── useLenis.ts               # Lenis initialization hook
├── lib/
│   └── utils.ts                  # cn() utility for Tailwind
├── types/
│   └── index.ts                  # Shared TypeScript interfaces
├── public/                       # Static assets
├── next.config.js                # Next.js config (static export)
├── tailwind.config.ts            # Tailwind with custom colors/fonts
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/zimledger-premium.git
cd zimledger-premium

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | Resend API key for contact emails | Optional |
| `NEWSLETTER_API_KEY` | Your newsletter service API key | Optional |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy — Vercel will auto-detect Next.js and build

```bash
# Or deploy via CLI
npm i -g vercel
vercel --prod
```

### Static Export

The project is configured for static export (`output: 'export'` in `next.config.js`).

```bash
npm run build
# Output is in ./dist/
```

> **Note:** API routes require a server runtime. For static-only hosting (GitHub Pages, etc.), API routes will not function. Use Vercel, Netlify Functions, or a Node.js server for full functionality.

## Customization

### Colors
Edit `tailwind.config.ts` to adjust the Zimbabwe-inspired palette:
- `parchment` — Warm off-white background
- `gold` — Accent color (#C9A96E)
- `zim-green`, `zim-yellow`, `zim-red`, `zim-black` — Flag colors

### Typography
The project uses Google Fonts loaded in `globals.css`:
- **Playfair Display** — Headings (editorial serif)
- **Source Serif 4** — Body text
- **Inter** — UI elements, navigation

### 3D Scene
Modify `components/three/BridgeScene.tsx` to customize:
- Bridge geometry and shader colors
- Floating element count and behavior
- Camera movement and fog

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

WebGL features require hardware acceleration. Fallbacks are in place for reduced-motion preferences.

## License

MIT License — Built with pride in Zimbabwe.

---

**ZimLedger** — *The definitive financial platform for Zimbabwean businesses.*
