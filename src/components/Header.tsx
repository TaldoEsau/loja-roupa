import { useState, useEffect } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Novo Drop', href: '#novo-drop' },
    { label: 'O Conceito', href: '#o-conceito' },
    { label: 'Destaques', href: '#destaques' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <>
      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem 3.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          transition: padding 300ms cubic-bezier(0.23, 1, 0.32, 1),
                      background 300ms ease,
                      border-color 300ms ease;
        }
        .header.scrolled {
          padding: 0.85rem 3.5rem;
          background: rgba(8, 8, 8, 0.82);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .header-logo-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .header-logo-link:active {
          transform: scale(0.96);
        }
        .header-logo {
          height: 30px;
          object-fit: contain;
          transition: opacity 0.3s ease;
        }
        .header-logo-text {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: 0.18em;
          color: #FFFFFF;
        }
        .header-nav {
          display: flex;
          gap: 2.25rem;
          align-items: center;
        }
        .nav-link {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: #E4E4E7;
          transition: color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          font-family: var(--font-accent);
          padding: 0.4rem 0;
          text-decoration: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #00F0FF;
          transition: width 300ms cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.6);
        }
        .nav-link:hover {
          color: #00F0FF;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link:active {
          transform: scale(0.95);
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .cart-trigger {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          color: #FFFFFF;
          font-family: var(--font-accent);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
                      border-color 200ms ease,
                      background 200ms ease;
        }
        .cart-trigger:hover {
          border-color: #00F0FF;
          background: rgba(0, 240, 255, 0.08);
          color: #00F0FF;
        }
        .cart-trigger:active {
          transform: scale(0.93);
        }
        .cart-badge {
          background: #00F0FF;
          color: #080808;
          font-weight: 700;
          font-size: 0.65rem;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .menu-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          z-index: 1001;
          padding: 6px;
          border-radius: 4px;
          transition: transform 160ms ease;
        }
        .menu-toggle:active {
          transform: scale(0.92);
        }
        .menu-bar {
          width: 24px;
          height: 2px;
          background: #FFFFFF;
          transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease;
        }
        .menu-toggle.open .menu-bar:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .menu-toggle.open .menu-bar:nth-child(2) { opacity: 0; }
        .menu-toggle.open .menu-bar:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
        @media (max-width: 900px) {
          .header { padding: 1.25rem 1.75rem; }
          .header.scrolled { padding: 0.85rem 1.75rem; }
          .header-nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80vw;
            max-width: 360px;
            height: 100vh;
            background: #0C0C0E;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 3rem;
            gap: 2.25rem;
            transition: right 400ms cubic-bezier(0.23, 1, 0.32, 1);
            border-left: 1px solid rgba(255,255,255,0.08);
            box-shadow: -20px 0 60px rgba(0,0,0,0.8);
          }
          .header-nav.open { right: 0; }
          .menu-toggle { display: flex; }
          .nav-link { font-size: 1.1rem; }
        }
      `}</style>

      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="header-logo-link">
          <img
            src="/logo/logo.jpg"
            alt="Freestyle Store"
            className="header-logo"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const next = e.currentTarget.nextElementSibling as HTMLSpanElement;
              if (next) next.style.display = 'block';
            }}
          />
          <span className="header-logo-text">FREESTYLE</span>
        </a>

        <div className="header-actions">


          <div
            className={`menu-toggle${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation"
          >
            <span className="menu-bar" />
            <span className="menu-bar" />
            <span className="menu-bar" />
          </div>
        </div>

        <nav className={`header-nav${menuOpen ? ' open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
