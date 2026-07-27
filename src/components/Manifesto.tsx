import { useEffect, useRef } from 'react';

export function BrandIntro() {
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
        .brand-intro {
          padding: 10rem 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .brand-intro::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 120px;
          background: linear-gradient(to bottom, var(--color-cyan), transparent);
        }
        .brand-content {
          max-width: 700px;
          text-align: center;
        }
        .brand-label {
          font-family: var(--font-accent);
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--color-cyan);
          margin-bottom: 2rem;
        }
        .brand-quote {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3.5rem);
          color: var(--color-text-primary);
          line-height: 1.15;
          margin-bottom: 2rem;
          text-transform: uppercase;
        }
        .brand-body {
          font-size: 1rem;
          color: var(--color-text-secondary);
          line-height: 1.8;
          max-width: 520px;
          margin: 0 auto;
        }
        .brand-divider {
          width: 60px;
          height: 1px;
          background: var(--color-border);
          margin: 2.5rem auto;
        }
      `}</style>

      <section ref={sectionRef} id="o-conceito" className="brand-intro">
        <div className="brand-content">
          <p className="brand-label reveal">Manifesto</p>
          <h2 className="brand-quote reveal reveal-delay-1">
            Nascida no asfalto.<br />
            Feita para quem transforma<br />
            o movimento em estilo.
          </h2>
          <div className="brand-divider reveal reveal-delay-2" />
          <p className="brand-body reveal reveal-delay-3">
            A Freestyle Store representa a fusão do streetwear com a cultura skater urbana.
            Nossa estética é limpa, sombria e pensada para impactar. Cada peça é uma declaração 
            de identidade — feita para quem vive o rolê.
          </p>
        </div>
      </section>
    </>
  );
}
