import { useState, useRef, useEffect, useCallback } from 'react';

interface CarouselItem {
  id: number;
  title: string;
  category: string;
  price: string;
  tag?: string | null;
  img: string;
  accent: string;
}

const items: CarouselItem[] = [
  {
    id: 1,
    title: 'Oversized Hoodie "Neon Vapor"',
    category: 'Outerwear',
    price: 'R$ 319,90',
    tag: 'Destaque',
    img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800&h=1000',
    accent: '#00F0FF',
  },
  {
    id: 2,
    title: 'Skate Tee "Asphalt Core"',
    category: 'T-Shirts',
    price: 'R$ 139,90',
    tag: 'Exclusivo',
    img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800&h=1000',
    accent: '#FF007F',
  },
  {
    id: 3,
    title: 'Cargo Pants "Shadow Stealth"',
    category: 'Bottoms',
    price: 'R$ 269,90',
    tag: 'Popular',
    img: 'https://images.unsplash.com/photo-1621335829175-95f437384d7c?auto=format&fit=crop&q=80&w=800&h=1000',
    accent: '#C084FC',
  },
  {
    id: 4,
    title: 'Windbreaker "Cyber Pulse"',
    category: 'Outerwear',
    price: 'R$ 369,90',
    tag: 'Novo',
    img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800&h=1000',
    accent: '#00F0FF',
  },
  {
    id: 5,
    title: 'Beanie "Night Ops"',
    category: 'Acessórios',
    price: 'R$ 99,90',
    tag: null,
    img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800&h=1000',
    accent: '#FF007F',
  },
  {
    id: 6,
    title: 'Street Joggers "Concrete"',
    category: 'Bottoms',
    price: 'R$ 229,90',
    tag: null,
    img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800&h=1000',
    accent: '#C084FC',
  },
  {
    id: 7,
    title: 'Cyber Sneakers "Vortex"',
    category: 'Footwear',
    price: 'R$ 599,90',
    tag: 'Novo',
    img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800&h=1000',
    accent: '#00F0FF',
  },
  {
    id: 8,
    title: 'Utility Vest "Tactical"',
    category: 'Outerwear',
    price: 'R$ 289,90',
    tag: 'Limitado',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800&h=1000',
    accent: '#FF007F',
  },
];

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  useEffect(() => {
    const updateMaxTranslate = () => {
      if (trackRef.current && trackRef.current.parentElement) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = trackRef.current.parentElement.clientWidth;
        setMaxTranslate(Math.max(0, trackWidth - viewportWidth));
      }
    };
    
    updateMaxTranslate();
    window.addEventListener('resize', updateMaxTranslate);
    return () => window.removeEventListener('resize', updateMaxTranslate);
  }, [items.length]);

  // Scroll reveal observer
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

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  }, []);

  // Pointer Drag Handlers (Emil Kowalski drag momentum feel)
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
    if (trackRef.current) {
      trackRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setDragOffset(diff);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.releasePointerCapture(e.pointerId);
    }

    // Velocity & Drag threshold check
    if (dragOffset < -60) {
      handleNext();
    } else if (dragOffset > 60) {
      handlePrev();
    }
    setDragOffset(0);
  };

  return (
    <>
      <style>{`
        .carousel-section {
          padding: 8rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }
        .carousel-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .carousel-label {
          font-family: var(--font-accent);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #00F0FF;
          text-shadow: 0 0 10px rgba(0,240,255,0.4);
          margin-bottom: 0.75rem;
        }
        .carousel-title {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          font-weight: 700;
          color: #FFFFFF;
        }
        .carousel-controls {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .carousel-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          cursor: pointer;
          transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
                      border-color 200ms ease,
                      background 200ms ease,
                      box-shadow 200ms ease;
        }
        .carousel-btn:hover {
          border-color: #00F0FF;
          box-shadow: 0 0 15px rgba(0,240,255,0.25);
          color: #00F0FF;
        }
        .carousel-btn:active {
          transform: scale(0.92);
        }
        .carousel-counter {
          font-family: var(--font-accent);
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          letter-spacing: 0.1em;
          min-width: 50px;
          text-align: center;
        }
        .carousel-viewport {
          overflow: hidden;
          touch-action: pan-y;
          cursor: grab;
          user-select: none;
          padding: 1rem 0;
        }
        .carousel-viewport:active {
          cursor: grabbing;
        }
        .carousel-track {
          display: flex;
          gap: 2rem;
          transition: ${isDragging ? 'none' : 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1)'};
          will-change: transform;
        }
        .carousel-card {
          flex: 0 0 340px;
          background: var(--color-surface);
          border: 1px solid var(--color-border-subtle);
          overflow: hidden;
          position: relative;
          transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1),
                      border-color 300ms ease,
                      box-shadow 300ms ease;
        }
        .carousel-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,255,255,0.15);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .carousel-img-wrap {
          position: relative;
          padding-bottom: 125%;
          overflow: hidden;
          background: var(--color-pitch-black);
        }
        .carousel-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .carousel-card:hover .carousel-img {
          transform: scale(1.06);
        }
        .carousel-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-family: var(--font-accent);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.35rem 0.8rem;
          color: #080808;
          border-radius: 2px;
        }
        .carousel-info {
          padding: 1.5rem;
        }
        .carousel-category {
          font-family: var(--font-accent);
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 0.5rem;
        }
        .carousel-item-title {
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 600;
          color: #FFFFFF;
          margin-bottom: 0.75rem;
        }
        .carousel-item-price {
          font-family: var(--font-accent);
          font-size: 1.05rem;
          font-weight: 700;
        }
        /* Indicator dots */
        .carousel-indicators {
          display: flex;
          justify-content: center;
          gap: 0.6rem;
          margin-top: 3rem;
        }
        .carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-border);
          cursor: pointer;
          transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .carousel-dot.active {
          width: 28px;
          border-radius: 4px;
          background: #00F0FF;
          box-shadow: 0 0 10px rgba(0,240,255,0.5);
        }
        @media (max-width: 768px) {
          .carousel-card { flex: 0 0 280px; }
          .carousel-section { padding: 5rem 1.5rem; }
        }
      `}</style>

      <section ref={sectionRef} className="carousel-section">
        <div className="carousel-header reveal">
          <div>
            <p className="carousel-label">Destaques da Semana</p>
            <h2 className="carousel-title">Coleção Essential</h2>
          </div>

          <div className="carousel-controls">
            <span className="carousel-counter">
              0{currentIndex + 1} / 0{items.length}
            </span>
            <button className="carousel-btn" onClick={handlePrev} aria-label="Anterior">
              ←
            </button>
            <button className="carousel-btn" onClick={handleNext} aria-label="Próximo">
              →
            </button>
          </div>
        </div>

        <div
          className="carousel-viewport reveal reveal-delay-1"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div
            ref={trackRef}
            className="carousel-track"
            style={{
              transform: `translateX(calc(-${Math.min(currentIndex * (340 + 32), maxTranslate)}px + ${dragOffset}px))`,
            }}
          >
            {items.map((item) => (
              <div key={item.id} className="carousel-card">
                <div className="carousel-img-wrap">
                  <img src={item.img} alt={item.title} className="carousel-img" loading="lazy" />
                  {item.tag && (
                    <span
                      className="carousel-tag"
                      style={{ background: item.accent }}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="carousel-info">
                  <p className="carousel-category">{item.category}</p>
                  <h3 className="carousel-item-title">{item.title}</h3>
                  <span className="carousel-item-price" style={{ color: item.accent }}>
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-indicators reveal reveal-delay-2">
          {items.map((_, idx) => (
            <div
              key={idx}
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
