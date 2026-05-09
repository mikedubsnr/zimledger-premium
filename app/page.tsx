import Navigation from "@/components/sections/Navigation";
import SpotlightHero from "@/components/sections/SpotlightHero";
import BridgeScene from "@/components/three/BridgeScene";
import Features from "@/components/sections/Features";
import EditorialSection from "@/components/sections/EditorialSection";
import HowItWorks from "@/components/sections/HowItWorks";
import CurvedGallery from "@/components/sections/CurvedGallery";
import VideoFeature from "@/components/sections/VideoFeature";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Newsletter from "@/components/sections/Newsletter";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <SpotlightHero />
      <BridgeScene />
      <Features />
      <EditorialSection />
      <HowItWorks />
      <section id="gallery">
        <CurvedGallery />
      </section>
      <section id="video">
        <VideoFeature />
      </section>
      <Testimonials />
      <Pricing />
      <Newsletter />
      <Contact />
      <Footer />
    </main>
  );
}
