import { useEffect, useRef, useState } from 'react';

export function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <>
      <style>{`
        .footer {
          position: relative;
          padding: 8rem 2rem 2rem;
          border-top: 1px solid var(--color-border-subtle);
          overflow: hidden;
        }
        .footer::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--color-cyan-glow) 0%, transparent 70%);
          pointer-events: none;
          opacity: 0.3;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 4rem;
          margin-bottom: 5rem;
        }
        .footer-brand-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          letter-spacing: 0.15em;
          margin-bottom: 1.5rem;
        }
        .footer-desc {
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 380px;
        }
        .newsletter-form {
          display: flex;
          gap: 0;
          border: 1px solid var(--color-border);
          overflow: hidden;
          transition: border-color 0.3s ease;
        }
        .newsletter-form:focus-within {
          border-color: var(--color-cyan);
        }
        .newsletter-input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--color-text-primary);
          padding: 0.9rem 1.2rem;
          font-size: 0.85rem;
          font-family: var(--font-body);
          outline: none;
        }
        .newsletter-input::placeholder {
          color: var(--color-text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-size: 0.7rem;
        }
        .newsletter-btn {
          background: var(--color-cyan);
          color: var(--color-pitch-black-pure);
          padding: 0 1.8rem;
          font-family: var(--font-accent);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .newsletter-btn:hover {
          background: var(--color-text-primary);
        }
        .newsletter-success {
          font-size: 0.8rem;
          color: var(--color-cyan);
          margin-top: 0.75rem;
          font-family: var(--font-accent);
          letter-spacing: 0.1em;
        }
        .footer-heading {
          font-family: var(--font-accent);
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 1.5rem;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .footer-link {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          transition: all 0.3s ease;
        }
        .footer-link:hover {
          color: var(--color-text-primary);
          padding-left: 8px;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid var(--color-border-subtle);
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-copy {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          font-family: var(--font-accent);
          letter-spacing: 0.05em;
        }
        .footer-socials {
          display: flex;
          gap: 1.5rem;
        }
        .footer-social {
          font-family: var(--font-accent);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: var(--color-text-muted);
          text-transform: uppercase;
          transition: color 0.3s ease;
        }
        .footer-social:hover { color: var(--color-cyan); }
        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .footer { padding: 5rem 1.5rem 2rem; }
        }
      `}</style>

      <footer ref={sectionRef} id="contato" className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="reveal">
              <h2 className="footer-brand-name">Freestyle Store</h2>
              <p className="footer-desc">
                Junte-se ao movimento. Cadastre-se para receber acesso antecipado a novos drops e conteúdos exclusivos.
              </p>
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-btn">
                  {subscribed ? '✓' : 'Assinar'}
                </button>
              </form>
              {subscribed && (
                <p className="newsletter-success">Cadastrado com sucesso!</p>
              )}
            </div>

            <div className="reveal reveal-delay-1">
              <h3 className="footer-heading">Navegação</h3>
              <div className="footer-links">
                <a href="#novo-drop" className="footer-link">Novo Drop</a>
                <a href="#o-conceito" className="footer-link">O Conceito</a>
                <a href="#lookbook" className="footer-link">Lookbook</a>
                <a href="#contato" className="footer-link">Contato</a>
              </div>
            </div>

            <div className="reveal reveal-delay-2">
              <h3 className="footer-heading">Informações</h3>
              <div className="footer-links">
                <a href="#" className="footer-link">Política de Trocas</a>
                <a href="#" className="footer-link">Termos de Uso</a>
                <a href="#" className="footer-link">Privacidade</a>
                <a href="#" className="footer-link">FAQ</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom reveal">
            <span className="footer-copy">
              &copy; {new Date().getFullYear()} Freestyle Store. Todos os direitos reservados.
            </span>
            <div className="footer-socials">
              <a href="#" className="footer-social">Instagram</a>
              <a href="#" className="footer-social">TikTok</a>
              <a href="#" className="footer-social">YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
