import Navigation from "@/components/sections/Navigation";
import SpotlightHero from "@/components/sections/SpotlightHero";
import Features from "@/components/sections/Features";
import OurStory from "@/components/sections/OurStory";
import HowItWorks from "@/components/sections/HowItWorks";
import VideoFeature from "@/components/sections/VideoFeature";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <SpotlightHero />
      <Features />
      <OurStory />
      <HowItWorks />
      <section id="video">
        <VideoFeature />
      </section>
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
