import { useEffect, useRef } from 'react';

const images = [
  { src: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800&h=1000', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800&h=600', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&q=80&w=600&h=600', span: '' },
  { src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800&h=600', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?auto=format&fit=crop&q=80&w=600&h=800', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&q=80&w=600&h=600', span: '' },
];

export function Lookbook() {
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
      { threshold: 0.05 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .lookbook-section {
          padding: 6rem 2rem 8rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        .lookbook-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .lookbook-label {
          font-family: var(--font-accent);
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--color-magenta);
          margin-bottom: 0.75rem;
        }
        .lookbook-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4rem);
        }
        .lookbook-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 280px;
          gap: 0.75rem;
        }
        .lookbook-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .lookbook-item.tall { grid-row: span 2; }
        .lookbook-item.wide { grid-column: span 2; }
        .lookbook-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s var(--ease-out-expo);
        }
        .lookbook-item:hover .lookbook-img {
          transform: scale(1.08);
        }
        .lookbook-item::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0);
          transition: background 0.4s ease;
        }
        .lookbook-item:hover::after {
          background: rgba(0,0,0,0.2);
        }
        @media (max-width: 768px) {
          .lookbook-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 200px;
          }
          .lookbook-item.wide { grid-column: span 1; }
        }
      `}</style>

      <section ref={sectionRef} id="lookbook" className="lookbook-section">
        <div className="lookbook-header reveal">
          <p className="lookbook-label">Inspiração</p>
          <h2 className="lookbook-title">Lookbook</h2>
        </div>

        <div className="lookbook-grid">
          {images.map((img, i) => (
            <div key={i} className={`lookbook-item ${img.span} reveal reveal-delay-${Math.min(i + 1, 4)}`}>
              <img src={img.src} alt={`Lookbook ${i + 1}`} className="lookbook-img" loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
