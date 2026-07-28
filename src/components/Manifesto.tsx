import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function BrandIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  const quote = "Nascida no asfalto. Feita para quem transforma o movimento em estilo.";
  const words = quote.split(' ');

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Card entrance
    gsap.from(cardRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    // Scrubbing text reveal
    if (textRef.current) {
      const wordElements = textRef.current.querySelectorAll('.scrub-word');
      
      gsap.to(wordElements, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center 40%",
          scrub: true,
        }
      });
    }

    // Body reveal
    gsap.from(bodyRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 40%",
      }
    });

  }, { scope: sectionRef });

  return (
    <>
      <style>{`
        .brand-intro {
          padding: 12rem 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          background: radial-gradient(circle at center, rgba(0,240,255,0.03) 0%, transparent 60%);
        }
        .brand-intro::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 100px;
          background: linear-gradient(to bottom, #00F0FF, transparent);
        }
        .brand-card {
          max-width: 800px;
          width: 100%;
          text-align: center;
          padding: 4rem 3rem;
          background: rgba(18, 18, 22, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          backdrop-filter: blur(12px);
          transition: border-color 300ms ease, box-shadow 300ms ease;
        }
        .brand-card:hover {
          border-color: rgba(0, 240, 255, 0.3);
          box-shadow: 0 0 40px rgba(0, 240, 255, 0.08);
        }
        .brand-label {
          font-family: var(--font-accent);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #00F0FF;
          text-shadow: 0 0 12px rgba(0, 240, 255, 0.5);
          margin-bottom: 2rem;
        }
        .brand-quote {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.12;
          letter-spacing: -0.02em;
          margin-bottom: 2rem;
          text-transform: uppercase;
        }
        .scrub-word {
          opacity: 0.15;
          display: inline-block;
          margin-right: 0.25em;
          will-change: opacity;
        }
        .brand-body {
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 400;
          color: #A1A1AA;
          line-height: 1.8;
          max-width: 580px;
          margin: 0 auto;
        }
        .brand-divider {
          width: 80px;
          height: 1px;
          background: linear-gradient(to right, transparent, #00F0FF, transparent);
          margin: 2.5rem auto;
        }
        @media (max-width: 768px) {
          .brand-intro { padding: 6rem 1.5rem; }
          .brand-card { padding: 3rem 1.5rem; }
        }
      `}</style>

      <section ref={sectionRef} id="o-conceito" className="brand-intro">
        <div ref={cardRef} className="brand-card">
          <p className="brand-label">Manifesto</p>
          <h2 ref={textRef} className="brand-quote">
            {words.map((word, i) => (
              <span key={i} className="scrub-word">{word}</span>
            ))}
          </h2>
          <div className="brand-divider" />
          <p ref={bodyRef} className="brand-body">
            A Freestyle Store representa a fusão do streetwear com a cultura skater urbana.
            Nossa estética é limpa, sombria e pensada para impactar. Cada peça é uma declaração 
            de identidade — feita para quem vive o rolê.
          </p>
        </div>
      </section>
    </>
  );
}
