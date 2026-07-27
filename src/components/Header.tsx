import { useState, useEffect } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Novo Drop', href: '#novo-drop' },
    { label: 'O Conceito', href: '#o-conceito' },
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
          padding: 1.25rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          transition: all 0.5s var(--ease-out-expo);
        }
        .header.scrolled {
          padding: 0.75rem 3rem;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border-bottom: 1px solid var(--glass-border);
        }
        .header-logo {
          height: 28px;
          object-fit: contain;
          transition: opacity 0.3s ease;
        }
        .header-logo:hover { opacity: 0.7; }
        .header-nav { display: flex; gap: 2.5rem; align-items: center; }
        .nav-link {
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--color-text-primary);
          transition: color 0.3s ease;
          position: relative;
          font-family: var(--font-accent);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--color-cyan);
          transition: width 0.3s var(--ease-out-expo);
        }
        .nav-link:hover { color: var(--color-cyan); }
        .nav-link:hover::after { width: 100%; }
        .menu-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          z-index: 1001;
          padding: 4px;
        }
        .menu-bar {
          width: 24px;
          height: 1.5px;
          background: var(--color-text-primary);
          transition: all 0.3s ease;
        }
        .menu-toggle.open .menu-bar:nth-child(1) {
          transform: rotate(45deg) translate(5px, 4px);
        }
        .menu-toggle.open .menu-bar:nth-child(2) { opacity: 0; }
        .menu-toggle.open .menu-bar:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -4px);
        }
        @media (max-width: 768px) {
          .header { padding: 1rem 1.5rem; }
          .header.scrolled { padding: 0.75rem 1.5rem; }
          .header-nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70vw;
            height: 100vh;
            background: var(--color-surface);
            flex-direction: column;
            justify-content: center;
            gap: 2rem;
            transition: right 0.4s var(--ease-out-expo);
            border-left: 1px solid var(--color-border);
          }
          .header-nav.open { right: 0; }
          .menu-toggle { display: flex; }
          .nav-link { font-size: 1rem; }
        }
      `}</style>

      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo/logo.jpg" alt="Freestyle Store" className="header-logo"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const next = e.currentTarget.nextElementSibling as HTMLSpanElement;
              if (next) next.style.display = 'block';
            }}
          />
          <span style={{
            display: 'none',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '0.15em',
          }}>
            FREESTYLE
          </span>
        </a>

        <div className={`menu-toggle${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span className="menu-bar" />
          <span className="menu-bar" />
          <span className="menu-bar" />
        </div>

        <nav className={`header-nav${menuOpen ? ' open' : ''}`}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-link"
              onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
