import { ReactLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandIntro } from './components/Manifesto';
import { Features } from './components/Features';
import { Carousel } from './components/Carousel';
import { ProductGrid } from './components/ProductGrid';
import { Lookbook } from './components/Lookbook';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
      <Header />
      <main>
        <Hero />
        <BrandIntro />
        <Features />
        <Carousel />
        <ProductGrid />
        <Lookbook />
      </main>
      <Footer />
    </ReactLenis>
  );
}

export default App;
