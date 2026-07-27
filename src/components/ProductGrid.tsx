import { useEffect, useRef } from 'react';

const products = [
  {
    id: 1,
    title: 'Oversized Hoodie "Dust Neon"',
    category: 'Outerwear',
    price: 'R$ 299,90',
    tag: 'Novo',
    img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600&h=800',
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
  {
    id: 6,
    title: 'Jogger "Street Flow"',
    category: 'Bottoms',
    price: 'R$ 199,90',
    tag: null,
    img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=600&h=800',
  },
];

export function ProductGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .products-section {
          padding: 6rem 2rem 8rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        .products-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .products-label {
          font-family: var(--font-accent);
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--color-cyan);
          margin-bottom: 0.75rem;
        }
        .products-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4rem);
        }
        .products-cta {
          font-family: var(--font-accent);
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 4px;
          transition: all 0.3s ease;
        }
        .products-cta:hover {
          color: var(--color-cyan);
          border-color: var(--color-cyan);
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .product-card {
          position: relative;
          background: var(--color-surface);
          border: 1px solid var(--color-border-subtle);
          overflow: hidden;
          transition: all 0.5s var(--ease-out-expo);
          cursor: pointer;
        }
        .product-card:hover {
          border-color: var(--color-border);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .product-img-wrap {
          position: relative;
          padding-bottom: 130%;
          overflow: hidden;
        }
        .product-img {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s var(--ease-out-expo);
        }
        .product-card:hover .product-img {
          transform: scale(1.05);
        }
        .product-tag {
          position: absolute;
          top: 1rem; left: 1rem;
          background: var(--color-cyan);
          color: var(--color-pitch-black-pure);
          font-family: var(--font-accent);
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.3rem 0.8rem;
        }
        .product-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 50%;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 1rem;
        }
        .product-card:hover .product-overlay { opacity: 1; }
        .product-quick-view {
          font-family: var(--font-accent);
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 0.6rem 1.5rem;
          transition: all 0.3s ease;
        }
        .product-quick-view:hover {
          background: white;
          color: black;
        }
        .product-info {
          padding: 1.25rem 1.5rem;
        }
        .product-category {
          font-family: var(--font-accent);
          font-size: 0.65rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 0.5rem;
        }
        .product-name {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-text-primary);
          margin-bottom: 0.75rem;
        }
        .product-price {
          font-family: var(--font-accent);
          font-weight: 600;
          color: var(--color-cyan);
          font-size: 1rem;
        }
        @media (max-width: 1024px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .products-grid { grid-template-columns: 1fr; }
          .products-section { padding: 4rem 1.5rem 6rem; }
        }
      `}</style>

      <section ref={sectionRef} id="novo-drop" className="products-section">
        <div className="products-header reveal">
          <div>
            <p className="products-label">Coleção 2026</p>
            <h2 className="products-title">Novo Drop</h2>
          </div>
          <a href="#" className="products-cta">Ver tudo →</a>
        </div>

        <div className="products-grid">
          {products.map((product, i) => (
            <div key={product.id} className={`product-card reveal reveal-delay-${Math.min(i + 1, 4)}`}>
              <div className="product-img-wrap">
                <img src={product.img} alt={product.title} className="product-img" loading="lazy" />
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <div className="product-overlay">
                  <button className="product-quick-view">Quick View</button>
                </div>
              </div>
              <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3 className="product-name">{product.title}</h3>
                <span className="product-price">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
