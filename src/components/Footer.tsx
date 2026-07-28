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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .footer {
          position: relative;
          padding: 8rem 2rem 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          background: #08080A;
        }
        .footer::before {
          content: '';
          position: absolute;
          bottom: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 500px;
          background: radial-gradient(ellipse at center, rgba(0, 240, 255, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .footer-inner {
          max-width: 1400px;
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
          font-size: 1.8rem;
          letter-spacing: 0.15em;
          color: #FFFFFF;
          margin-bottom: 1.25rem;
        }
        .footer-desc {
          color: #A1A1AA;
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 400px;
        }
        .newsletter-form {
          display: flex;
          gap: 0;
          border: 1px solid rgba(255, 255, 255, 0.15);
          overflow: hidden;
          transition: border-color 200ms ease, box-shadow 200ms ease;
          background: rgba(255, 255, 255, 0.03);
        }
        .newsletter-form:focus-within {
          border-color: #00F0FF;
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
        }
        .newsletter-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #FFFFFF;
          padding: 0.9rem 1.2rem;
          font-size: 0.9rem;
          font-family: var(--font-body);
          outline: none;
        }
        .newsletter-input::placeholder {
          color: #71717A;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-size: 0.7rem;
        }
        .newsletter-btn {
          background: #00F0FF;
          color: #080808;
          padding: 0 1.8rem;
          font-family: var(--font-accent);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
                      background 200ms ease;
        }
        .newsletter-btn:hover {
          background: #FFFFFF;
        }
        .newsletter-btn:active {
          transform: scale(0.94);
        }
        .newsletter-success {
          font-size: 0.8rem;
          color: #00F0FF;
          margin-top: 0.75rem;
          font-family: var(--font-accent);
          letter-spacing: 0.1em;
        }
        .footer-heading {
          font-family: var(--font-accent);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #00F0FF;
          margin-bottom: 1.5rem;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .footer-link {
          font-size: 0.95rem;
          color: #A1A1AA;
          text-decoration: none;
          transition: color 200ms ease, transform 200ms ease;
        }
        .footer-link:hover {
          color: #FFFFFF;
          transform: translateX(6px);
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .footer-copy {
          font-size: 0.75rem;
          color: #71717A;
          font-family: var(--font-accent);
          letter-spacing: 0.05em;
        }
        .footer-socials {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }
        .footer-social {
          font-family: var(--font-accent);
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: #A1A1AA;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 200ms ease;
        }
        .footer-social:hover { color: #00F0FF; }
        .back-to-top {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-family: var(--font-accent);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.6rem 1.2rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
                      border-color 200ms ease,
                      color 200ms ease;
        }
        .back-to-top:hover {
          border-color: #00F0FF;
          color: #00F0FF;
        }
        .back-to-top:active {
          transform: scale(0.93);
        }
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
              <h2 className="footer-brand-name">FREESTYLE STORE</h2>
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
                <a href="#destaques" className="footer-link">Destaques</a>
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
              <button className="back-to-top" onClick={scrollToTop}>
                Topo ↑
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
