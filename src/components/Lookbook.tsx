import { useState, useRef, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    id: 1,
    title: 'Editorial Session #01 — Urban Core',
    src: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=1200&h=1600',
    span: 'tall',
  },
  {
    id: 2,
    title: 'Asphalt & Concrete — Drop 2026',
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200&h=900',
    span: 'wide',
  },
  {
    id: 3,
    title: 'Night Ops Details',
    src: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&q=80&w=900&h=900',
    span: '',
  },
  {
    id: 4,
    title: 'Skate Culture Motion',
    src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200&h=900',
    span: 'wide',
  },
  {
    id: 5,
    title: 'Oversized Silhouette',
    src: 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?auto=format&fit=crop&q=80&w=900&h=1200',
    span: 'tall',
  },
  {
    id: 6,
    title: 'Street Texture & Atmosphere',
    src: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&q=80&w=900&h=900',
    span: '',
  },
  {
    id: 7,
    title: 'Neon Nights & Techwear',
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200&h=900',
    span: 'wide',
  },
  {
    id: 8,
    title: 'Urban Exploration',
    src: 'https://images.unsplash.com/photo-1492288991661-058aa541ff43?auto=format&fit=crop&q=80&w=900&h=900',
    span: '',
  },
  {
    id: 9,
    title: 'Underground Vibes',
    src: 'https://images.unsplash.com/photo-1511511450040-677116ff389e?auto=format&fit=crop&q=80&w=900&h=1200',
    span: 'tall',
  },
];

export function Lookbook() {
  const [selectedImg, setSelectedImg] = useState<typeof images[0] | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

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

    // Staggered grid items
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.lookbook-item');
      gsap.from(items, {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
        }
      });
    }

    // Image Parallax
    imagesRef.current.forEach((img) => {
      if (img) {
        gsap.to(img, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }
    });

  }, { scope: sectionRef });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedImg(null);
  }, []);

  useEffect(() => {
    if (selectedImg) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedImg, handleKeyDown]);

  return (
    <>
      <style>{`
        .lookbook-section {
          padding: 8rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        .lookbook-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .lookbook-label {
          font-family: var(--font-accent);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #FF007F;
          text-shadow: 0 0 10px rgba(255, 0, 127, 0.4);
          margin-bottom: 0.75rem;
        }
        .lookbook-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: #FFFFFF;
        }
        .lookbook-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 300px;
          gap: 1rem;
        }
        .lookbook-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: #050505;
          transition: border-color 300ms ease, box-shadow 300ms ease;
        }
        .lookbook-item:active {
          transform: scale(0.97);
        }
        .lookbook-item.tall { grid-row: span 2; }
        .lookbook-item.wide { grid-column: span 2; }
        
        .img-parallax-wrap {
          position: absolute;
          inset: -20px; /* Leave room for parallax scrolling */
          width: calc(100% + 40px);
          height: calc(100% + 40px);
        }

        .lookbook-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 700ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        /* Disable hover zoom so we can see the parallax clearly, or combine them */
        .lookbook-item:hover .lookbook-img {
          transform: scale(1.08);
        }
        
        .lookbook-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8, 8, 8, 0.85) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 300ms ease;
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
          pointer-events: none;
        }
        .lookbook-item:hover .lookbook-overlay {
          opacity: 1;
        }
        .lookbook-caption {
          font-family: var(--font-accent);
          font-size: 0.75rem;
          font-weight: 600;
          color: #FFFFFF;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        /* Modal Lightbox (Emil Kowalski Animation Specs) */
        .lightbox-modal {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(4, 4, 6, 0.92);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: modalFade 200ms ease-out forwards;
        }
        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 85vh;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 30px 80px rgba(0,0,0,0.9);
          animation: modalScale 250ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
          transform-origin: center;
        }
        .lightbox-img {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          display: block;
        }
        .lightbox-footer {
          background: #0C0C0E;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .lightbox-title {
          font-family: var(--font-accent);
          font-size: 0.8rem;
          color: #FFFFFF;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .lightbox-close {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #FFFFFF;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), background 200ms ease;
        }
        .lightbox-close:hover {
          background: #FF007F;
        }
        .lightbox-close:active {
          transform: scale(0.88);
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
          .lookbook-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 220px;
          }
          .lookbook-item.wide { grid-column: span 1; }
          .lookbook-section { padding: 5rem 1.5rem; }
        }
      `}</style>

      <section ref={sectionRef} id="lookbook" className="lookbook-section">
        <div ref={headerRef} className="lookbook-header">
          <p className="lookbook-label">Inspiração</p>
          <h2 className="lookbook-title">Lookbook 2026</h2>
        </div>

        <div ref={gridRef} className="lookbook-grid">
          {images.map((img, i) => (
            <div
              key={img.id}
              className={`lookbook-item ${img.span}`}
              onClick={() => setSelectedImg(img)}
            >
              <div className="img-parallax-wrap">
                <img 
                  ref={el => { imagesRef.current[i] = el; }}
                  src={img.src} 
                  alt={img.title} 
                  className="lookbook-img" 
                  loading="lazy" 
                />
              </div>
              <div className="lookbook-overlay">
                <span className="lookbook-caption">{img.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedImg && (
          <div className="lightbox-modal" onClick={() => setSelectedImg(null)}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImg.src} alt={selectedImg.title} className="lightbox-img" />
              <div className="lightbox-footer">
                <span className="lightbox-title">{selectedImg.title}</span>
                <button
                  className="lightbox-close"
                  onClick={() => setSelectedImg(null)}
                  aria-label="Fechar"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
