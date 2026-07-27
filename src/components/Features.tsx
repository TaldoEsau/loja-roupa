import { useEffect, useRef } from 'react';

const features = [
  {
    number: '01',
    title: 'Exclusividade',
    description: 'Drops limitados. Quando acaba, acaba. Cada peça é uma edição que não volta.',
    accent: 'var(--color-cyan)',
  },
  {
    number: '02',
    title: 'Autenticidade',
    description: 'Design nascido na rua. Sem tendências genéricas — só o que a cultura dita.',
    accent: 'var(--color-magenta)',
  },
  {
    number: '03',
    title: 'Qualidade',
    description: 'Tecidos premium com acabamento que resiste ao rolê diário. Feito pra durar.',
    accent: 'var(--color-violet)',
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
          opacity: 0.08;
          margin-bottom: 1rem;
          line-height: 1;
        }
        .feature-title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          margin-bottom: 1rem;
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
            <div key={f.number} className={`feature-card reveal reveal-delay-${i + 1}`}
              style={{ '--accent': f.accent } as React.CSSProperties}
            >
              <style>{`
                .feature-card:nth-child(${i + 1})::before {
                  background: ${f.accent};
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
