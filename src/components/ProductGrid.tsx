import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  tag?: string | null;
  img: string;
  featured?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Oversized Hoodie "Dust Neon"',
    category: 'Outerwear',
    price: 'R$ 299,90',
    tag: 'Destaque',
    img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800&h=1000',
    featured: true,
  },
  {
    id: 2,
    title: 'Skate Tee "Core Black"',
    category: 'T-Shirts',
    price: 'R$ 129,90',
    tag: null,
    img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600&h=800',
  },
  {
    id: 3,
    title: 'Cargo Pants "Urban Camo"',
    category: 'Bottoms',
    price: 'R$ 249,90',
    tag: 'Esgotando',
    img: 'https://images.unsplash.com/photo-1621335829175-95f437384d7c?auto=format&fit=crop&q=80&w=600&h=800',
  },
  {
    id: 4,
    title: 'Beanie "Pitch Black"',
    category: 'Acessórios',
    price: 'R$ 89,90',
    tag: null,
    img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=600&h=800',
  },
  {
    id: 5,
    title: 'Windbreaker "Neon Edge"',
    category: 'Outerwear',
    price: 'R$ 349,90',
    tag: 'Novo',
    img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600&h=800',
  },
];

const categories = ['Todos', 'Outerwear', 'T-Shirts', 'Bottoms', 'Acessórios'];

export function ProductGrid() {
  const [activeTab, setActiveTab] = useState('Todos');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header reveal
    gsap.from(headerRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

  }, { scope: sectionRef });

  useGSAP(() => {
    if (!gridRef.current) return;
    
    // Animate items on tab change or initial scroll
    const items = gridRef.current.querySelectorAll('.bento-card');
    
    gsap.fromTo(items, 
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        }
      }
    );
  }, { dependencies: [activeTab], scope: sectionRef });

  const toggleFav = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    if (selectedProduct) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  const filteredProducts =
    activeTab === 'Todos'
      ? products
      : products.filter((p) => p.category === activeTab);

  return (
    <>
      <style>{`
        .products-section {
          padding: 8rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        .products-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .products-label {
          font-family: var(--font-accent);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #00F0FF;
          text-shadow: 0 0 10px rgba(0,240,255,0.4);
          margin-bottom: 0.75rem;
        }
        .products-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: #FFFFFF;
        }
        .products-tabs {
          display: flex;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 4px;
          border-radius: 9999px;
          flex-wrap: wrap;
        }
        .tab-btn {
          background: transparent;
          border: none;
          color: #A1A1AA;
          font-family: var(--font-accent);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 200ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .tab-btn:hover {
          color: #FFFFFF;
        }
        .tab-btn:active {
          transform: scale(0.94);
        }
        .tab-btn.active {
          background: #00F0FF;
          color: #080808;
          font-weight: 700;
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
        }

        /* Bento Grid */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }
        .bento-card {
          position: relative;
          background: var(--color-surface);
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          transition: border-color 300ms ease, box-shadow 300ms ease;
          display: flex;
          flex-direction: column;
        }
        .bento-card.featured {
          grid-row: span 2;
        }
        .bento-card:hover {
          border-color: rgba(0, 240, 255, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        }
        .bento-img-wrap {
          position: relative;
          width: 100%;
          flex: 1;
          min-height: 280px;
          overflow: hidden;
          background: #050505;
        }
        .bento-card.featured .bento-img-wrap {
          min-height: 480px;
        }
        .bento-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .bento-card:hover .bento-img {
          transform: scale(1.06);
        }
        .fav-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(8, 8, 8, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          cursor: pointer;
          transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
                      background 200ms ease,
                      color 200ms ease;
        }
        .fav-btn:active {
          transform: scale(0.85);
        }
        .fav-btn.active {
          color: #FF007F;
          border-color: #FF007F;
          box-shadow: 0 0 12px rgba(255, 0, 127, 0.4);
        }
        .bento-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: #00F0FF;
          color: #080808;
          font-family: var(--font-accent);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.35rem 0.8rem;
          border-radius: 2px;
          z-index: 5;
        }
        .bento-overlay {
          position: absolute;
          inset: 0;
          background: rgba(8, 8, 8, 0.4);
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity 250ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
        }
        .bento-card:hover .bento-overlay {
          opacity: 1;
        }
        .quick-btn {
          background: #FFFFFF;
          color: #080808;
          border: none;
          font-family: var(--font-accent);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.8rem 1.8rem;
          cursor: pointer;
          transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
                      background 200ms ease;
        }
        .quick-btn:hover {
          background: #00F0FF;
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.6);
        }
        .quick-btn:active {
          transform: scale(0.94);
        }
        .bento-info {
          padding: 1.5rem;
          background: var(--color-surface);
        }
        .bento-category {
          font-family: var(--font-accent);
          font-size: 0.65rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 0.5rem;
        }
        .bento-name {
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 600;
          color: #FFFFFF;
          margin-bottom: 0.75rem;
        }
        .bento-price {
          font-family: var(--font-accent);
          font-weight: 700;
          color: #00F0FF;
          font-size: 1.1rem;
        }
        @media (max-width: 1024px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
          .bento-card.featured { grid-row: span 1; }
          .bento-card.featured .bento-img-wrap { min-height: 320px; }
        }
        @media (max-width: 650px) {
          .bento-grid { grid-template-columns: 1fr; }
          .products-section { padding: 5rem 1.5rem; }
        }

        /* Modal Styles */
        .product-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(4, 4, 6, 0.92);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: modalFade 250ms ease-out forwards;
        }
        .product-modal-content {
          position: relative;
          background: #080808;
          border: 1px solid rgba(255, 255, 255, 0.15);
          width: 100%;
          max-width: 900px;
          height: 80vh;
          max-height: 600px;
          display: flex;
          box-shadow: 0 30px 80px rgba(0,0,0,0.9);
          animation: modalScale 300ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
          transform-origin: center;
          overflow: hidden;
        }
        .product-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #FFFFFF;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), background 200ms ease;
        }
        .product-modal-close:hover {
          background: #FF007F;
        }
        .product-modal-close:active {
          transform: scale(0.88);
        }
        .product-modal-img-wrap {
          flex: 1;
          position: relative;
          background: #050505;
        }
        .product-modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .product-modal-info {
          flex: 1;
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow-y: auto;
        }
        .product-modal-category {
          font-family: var(--font-accent);
          font-size: 0.75rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 0.75rem;
        }
        .product-modal-title {
          font-family: var(--font-display);
          font-size: 2rem;
          color: #FFFFFF;
          margin-bottom: 1rem;
          line-height: 1.1;
        }
        .product-modal-price {
          font-family: var(--font-accent);
          font-weight: 700;
          color: #00F0FF;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .product-modal-desc {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: #A1A1AA;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .product-modal-sizes {
          margin-bottom: 2rem;
        }
        .size-label {
          display: block;
          font-family: var(--font-accent);
          font-size: 0.75rem;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 0.75rem;
        }
        .size-options {
          display: flex;
          gap: 0.75rem;
        }
        .size-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-accent);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease;
        }
        .size-btn:hover, .size-btn:active {
          border-color: #00F0FF;
          color: #00F0FF;
          background: rgba(0, 240, 255, 0.05);
        }
        .add-to-cart-btn {
          width: 100%;
          background: #FFFFFF;
          color: #080808;
          border: none;
          font-family: var(--font-accent);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 1.2rem;
          cursor: pointer;
          transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
                      background 200ms ease, box-shadow 200ms ease;
        }
        .add-to-cart-btn:hover {
          background: #00F0FF;
          box-shadow: 0 0 25px rgba(0, 240, 255, 0.5);
        }
        .add-to-cart-btn:active {
          transform: scale(0.96);
        }
        
        @keyframes modalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalScale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 768px) {
          .product-modal-backdrop {
            padding: 0;
            align-items: flex-end;
          }
          .product-modal-content {
            flex-direction: column;
            height: 90vh;
            max-height: none;
            width: 100%;
            border-radius: 24px 24px 0 0;
            border: none;
            border-top: 1px solid rgba(255, 255, 255, 0.15);
            animation: sheetSlideUp 350ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
          }
          .product-modal-img-wrap {
            height: 42vh;
            flex: none;
          }
          .product-modal-info {
            padding: 2rem 1.5rem;
          }
          .product-modal-close {
            top: 1rem;
            right: 1rem;
            background: rgba(8, 8, 8, 0.6);
            backdrop-filter: blur(8px);
          }
          
          @keyframes sheetSlideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        }
      `}</style>

      <section ref={sectionRef} id="novo-drop" className="products-section">
        <div ref={headerRef} className="products-header">
          <div>
            <p className="products-label">Catálogo 2026</p>
            <h2 className="products-title">Novo Drop</h2>
          </div>

          <div className="products-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="bento-grid">
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <div
                key={product.id}
                className={`bento-card ${product.featured && activeTab === 'Todos' ? 'featured' : ''}`}
              >
                <div className="bento-img-wrap">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="bento-img"
                    loading="lazy"
                  />
                  {product.tag && <span className="bento-tag">{product.tag}</span>}
                  
                  <button
                    className={`fav-btn ${isFav ? 'active' : ''}`}
                    onClick={(e) => toggleFav(product.id, e)}
                    aria-label="Favoritar"
                  >
                    {isFav ? '♥' : '♡'}
                  </button>

                  <div className="bento-overlay">
                    <button className="quick-btn" onClick={() => setSelectedProduct(product)}>Ver Detalhes</button>
                  </div>
                </div>

                <div className="bento-info">
                  <p className="bento-category">{product.category}</p>
                  <h3 className="bento-name">{product.title}</h3>
                  <span className="bento-price">{product.price}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Product Modal */}
        {selectedProduct && (
          <div className="product-modal-backdrop" onClick={() => setSelectedProduct(null)}>
            <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="product-modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
              
              <div className="product-modal-img-wrap">
                <img src={selectedProduct.img} alt={selectedProduct.title} className="product-modal-img" />
              </div>
              
              <div className="product-modal-info">
                <div>
                  <p className="product-modal-category">{selectedProduct.category}</p>
                  <h3 className="product-modal-title">{selectedProduct.title}</h3>
                  <p className="product-modal-price">{selectedProduct.price}</p>
                  <p className="product-modal-desc">
                    Desenvolvido com materiais de alta performance para garantir conforto e durabilidade. 
                    Esta peça faz parte do nosso drop exclusivo de 2026, projetada para o ambiente urbano.
                  </p>
                </div>
                
                <div className="product-modal-sizes">
                  <span className="size-label">Selecione o Tamanho:</span>
                  <div className="size-options">
                    {['P', 'M', 'G', 'GG'].map(size => (
                      <button key={size} className="size-btn">{size}</button>
                    ))}
                  </div>
                </div>
                
                <button className="add-to-cart-btn">Adicionar à Sacola</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
