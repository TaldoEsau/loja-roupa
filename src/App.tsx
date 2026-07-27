import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandIntro } from './components/Manifesto';
import { Features } from './components/Features';
import { ProductGrid } from './components/ProductGrid';
import { Lookbook } from './components/Lookbook';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
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
        <ProductGrid />
        <Lookbook />
      </main>
      <Footer />
    </>
  );
}

export default App;
