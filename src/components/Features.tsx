import { useEffect, useRef } from 'react';

const features = [
  {
    number: '01',
    title: 'Exclusividade',
    description: 'Modelagens autorais e lançamentos selecionados. Cada peça carrega a essência e a identidade da marca.',
    accent: '#00F0FF', // Neon Cyan
  },
  {
    number: '02',
    title: 'Autenticidade',
    description: 'Design nascido no asfalto. Sem modismos genéricos — pura expressão da cultura urbana.',
    accent: '#FF007F', // Neon Magenta
  },
  {
    number: '03',
    title: 'Qualidade',
    description: 'Tecidos de alta gramatura com acabamento reforçado. Feito para aguentar o ritmo do rolê.',
    accent: '#A855F7', // Neon Violet
  },
];

export function Features() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .features-section {
          padding: 8rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          border-top: 1px solid var(--color-border-subtle);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }
        .feature-card {
          padding: 2.5rem 0;
          position: relative;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 2px;
          transition: width 0.5s var(--ease-out-expo);
        }
        .feature-card:hover::before { width: 80px; }
        .feature-number {
          font-family: var(--font-display);
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1;
          letter-spacing: -0.02em;
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .feature-card:hover .feature-number {
          transform: translateY(-2px) scale(1.03);
        }
        .feature-title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          margin-bottom: 1rem;
          color: var(--color-text-primary);
        }
        .feature-desc {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
        }
        @media (max-width: 768px) {
          .features-grid { grid-template-columns: 1fr; gap: 0; }
          .feature-card {
            padding: 2rem 0;
            border-bottom: 1px solid var(--color-border-subtle);
          }
          .feature-card:last-child { border-bottom: none; }
        }
      `}</style>

      <section ref={sectionRef} className="features-section">
        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={f.number}
              className={`feature-card reveal reveal-delay-${i + 1}`}
            >
              <style>{`
                .feature-card:nth-child(${i + 1})::before {
                  background: ${f.accent};
                  box-shadow: 0 0 10px ${f.accent};
                }
                .feature-card:nth-child(${i + 1}) .feature-number {
                  color: ${f.accent};
                  text-shadow: 0 0 12px ${f.accent}AA, 0 0 25px ${f.accent}66;
                }
              `}</style>
              <div className="feature-number">{f.number}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
