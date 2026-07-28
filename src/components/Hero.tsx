import { useEffect, useRef, useState, useCallback } from 'react';

const FRAME_COUNT = 102;
const FRAME_PREFIX = '/frames/1/Trendy_oversized_hoodie_and_sk_';

// Text cards that appear at specific scroll progress ranges
const scrollTexts = [
  {
    side: 'left' as const,
    enterAt: 0.02,
    exitAt: 0.18,
    label: 'Freestyle Store',
    title: 'CULTURE\nIN MOTION',
    body: 'Uma marca que nasceu no rolê.',
    accent: '#00F0FF',
  },
  {
    side: 'right' as const,
    enterAt: 0.22,
    exitAt: 0.40,
    label: 'Coleção 2026',
    title: 'NOVO\nDROP',
    body: 'Coleções autorais com caimento impecável.\nFeitas para se destacar no asfalto.',
    accent: '#FF007F',
  },
  {
    side: 'left' as const,
    enterAt: 0.44,
    exitAt: 0.62,
    label: 'Qualidade Premium',
    title: 'FEITO PRA\nDURAR',
    body: 'Tecidos premium com acabamento que\nresiste ao rolê diário.',
    accent: '#C084FC',
  },
  {
    side: 'right' as const,
    enterAt: 0.66,
    exitAt: 0.84,
    label: 'Streetwear × Skate',
    title: 'ESTILO\nDE RUA',
    body: 'Design autêntico nascido no asfalto.\nSem tendências genéricas.',
    accent: '#00F0FF',
  },
  {
    side: 'center' as const,
    enterAt: 0.86,
    exitAt: 0.98,
    label: '',
    title: '',
    body: '',
  },
];

// Compute opacity and transform based on scroll progress
function getTextStyle(progress: number, enterAt: number, exitAt: number, side: 'left' | 'right' | 'center') {
  const fadeInDuration = 0.06;
  const fadeOutDuration = 0.06;
  const fadeInEnd = enterAt + fadeInDuration;
  const fadeOutStart = exitAt - fadeOutDuration;

  let opacity = 0;
  let translateX = 0;
  let translateY = 0;

  if (progress < enterAt || progress > exitAt) {
    opacity = 0;
    translateX = side === 'left' ? -60 : side === 'right' ? 60 : 0;
    translateY = side === 'center' ? 40 : 0;
  } else if (progress < fadeInEnd) {
    // Fading in
    const t = (progress - enterAt) / fadeInDuration;
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    opacity = eased;
    translateX = side === 'left' ? -60 * (1 - eased) : side === 'right' ? 60 * (1 - eased) : 0;
    translateY = side === 'center' ? 40 * (1 - eased) : 0;
  } else if (progress > fadeOutStart) {
    // Fading out
    const t = (progress - fadeOutStart) / fadeOutDuration;
    const eased = 1 - Math.pow(t, 3); // ease-in cubic
    opacity = eased;
    translateX = side === 'left' ? -60 * (1 - eased) : side === 'right' ? 60 * (1 - eased) : 0;
    translateY = side === 'center' ? -30 * (1 - eased) : 0;
  } else {
    // Fully visible
    opacity = 1;
    translateX = 0;
    translateY = 0;
  }

  return { opacity, translateX, translateY };
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const rafRef = useRef<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Preload all images
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `${FRAME_PREFIX}${paddedIndex}.png`;
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded === FRAME_COUNT) {
          setIsLoaded(true);
          drawFrame(0, images);
        }
      };
      images[i] = img;
    }

    imagesRef.current = images;
  }, []);

  const drawFrame = useCallback((index: number, images?: HTMLImageElement[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgs = images || imagesRef.current;
    const safeIndex = Math.max(0, Math.min(index, FRAME_COUNT - 1));
    const img = imgs[safeIndex];

    if (img && img.complete && img.naturalWidth > 0) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const x = (canvas.width - img.naturalWidth * scale) / 2;
      const y = (canvas.height - img.naturalHeight * scale) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    }
  }, []);

  // Refs for smooth LERP animation
  const targetFrameRef = useRef(0);
  const renderedFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);

  // 60 FPS LERP Render Loop (creates fluid inertia)
  useEffect(() => {
    if (!isLoaded) return;

    drawFrame(0);

    const render = () => {
      // Smoothly interpolate renderedFrame towards targetFrame
      const diff = targetFrameRef.current - renderedFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        renderedFrameRef.current += diff * 0.08; // 0.08 = fluid inertia
      } else {
        renderedFrameRef.current = targetFrameRef.current;
      }

      // Redraw canvas only when the rounded integer frame changes
      const discreteFrame = Math.round(renderedFrameRef.current);
      if (discreteFrame !== lastDrawnFrameRef.current) {
        drawFrame(discreteFrame);
        lastDrawnFrameRef.current = discreteFrame;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isLoaded, drawFrame]);

  // Scroll listener: updates target frame & progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !isLoaded) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(scrolled / scrollableHeight, 1));

      setScrollProgress(progress);
      targetFrameRef.current = progress * (FRAME_COUNT - 1);
    };

    const handleResize = () => {
      drawFrame(Math.max(0, lastDrawnFrameRef.current));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, drawFrame]);

  return (
    <>
      <style>{`
        .hero-text-card {
          position: absolute;
          z-index: 10;
          top: 50%;
          max-width: 400px;
          pointer-events: none;
          will-change: transform, opacity;
        }
        .hero-text-card.left {
          left: clamp(2rem, 6vw, 8rem);
        }
        .hero-text-card.right {
          right: clamp(2rem, 6vw, 8rem);
          text-align: right;
        }
        .hero-text-card.center {
          left: 50%;
          text-align: center;
        }
        .hero-text-label {
          font-family: var(--font-accent);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
          text-shadow: 0 0 12px currentColor, 0 2px 10px rgba(0,0,0,0.9);
        }
        .hero-text-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 700;
          line-height: 1.05;
          color: #FFFFFF;
          margin-bottom: 1rem;
          text-shadow: 0 4px 20px rgba(0,0,0,0.95), 0 0 35px rgba(0,0,0,0.9);
          white-space: pre-line;
        }
        .hero-text-body {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 500;
          line-height: 1.6;
          color: #F4F4F5;
          white-space: pre-line;
          text-shadow: 0 2px 12px rgba(0,0,0,0.95), 0 0 25px rgba(0,0,0,0.9);
        }
        .hero-text-accent-line {
          height: 3px;
          width: 50px;
          margin-bottom: 1rem;
          box-shadow: 0 0 12px currentColor;
        }
        .hero-text-card.right .hero-text-accent-line {
          margin-left: auto;
        }
        .hero-text-card.center .hero-text-accent-line {
          margin-left: auto;
          margin-right: auto;
        }
        .scroll-indicator {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          animation: pulse 2s ease-in-out infinite;
          transition: opacity 0.4s ease;
        }
        .scroll-indicator-text {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.35em;
          color: var(--color-text-secondary);
          font-family: var(--font-accent);
        }
        .scroll-indicator-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--color-cyan), transparent);
        }
        /* Progress bar */
        .hero-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: var(--color-cyan);
          z-index: 20;
          transition: width 0.05s linear;
          box-shadow: var(--shadow-glow-cyan);
        }
        @media (max-width: 768px) {
          .hero-text-card { max-width: 260px; }
          .hero-text-card.left { left: 1.5rem; }
          .hero-text-card.right { right: 1.5rem; }
          .hero-text-title { font-size: clamp(1.8rem, 7vw, 2.5rem); }
        }
      `}</style>

      <section
        ref={containerRef}
        style={{
          position: 'relative',
          height: '500vh',
          width: '100%',
        }}
      >
        {/* Sticky viewport */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: 'var(--color-pitch-black)',
          }}
        >
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />

          {/* Vignette */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 25%, rgba(8,8,8,0.75) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }} />

          {/* Bottom gradient */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '25vh',
            background: 'linear-gradient(to top, var(--color-pitch-black) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 3,
          }} />

          {/* Scroll-driven text overlays */}
          {scrollTexts.map((item, i) => {
            const style = getTextStyle(scrollProgress, item.enterAt, item.exitAt, item.side);
            const isCenter = item.side === 'center';

            return (
              <div
                key={i}
                className={`hero-text-card ${item.side}`}
                style={{
                  opacity: style.opacity,
                  transform: isCenter
                    ? `translate(-50%, -50%) translate(0px, ${style.translateY}px)`
                    : `translateY(-50%) translate(${style.translateX}px, ${style.translateY}px)`,
                }}
              >
                {item.label && (
                  <p className="hero-text-label" style={{ color: item.accent }}>
                    {item.label}
                  </p>
                )}
                <div
                  className="hero-text-accent-line"
                  style={{ background: item.accent }}
                />
                <h2 className="hero-text-title">{item.title}</h2>
                {item.body && (
                  <p className="hero-text-body">{item.body}</p>
                )}
              </div>
            );
          })}

          {/* Scroll indicator — fades out after scrolling starts */}
          <div
            className="scroll-indicator"
            style={{ opacity: scrollProgress < 0.02 ? 0.5 : 0 }}
          >
            <span className="scroll-indicator-text">Scroll para explorar</span>
            <div className="scroll-indicator-line" />
          </div>

          {/* Scroll progress bar at bottom */}
          <div className="hero-progress" style={{ width: `${scrollProgress * 100}%` }} />

          {/* Loading overlay */}
          {!isLoaded && (
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'var(--color-pitch-black)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 50,
              gap: '1.5rem',
            }}>
              <div style={{
                width: '200px',
                height: '2px',
                backgroundColor: 'var(--color-border)',
                borderRadius: '1px',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${loadProgress}%`,
                  backgroundColor: 'var(--color-cyan)',
                  transition: 'width 0.3s ease',
                  borderRadius: '1px',
                  boxShadow: 'var(--shadow-glow-cyan)',
                }} />
              </div>
              <span style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-accent)',
              }}>
                Carregando experiência {loadProgress}%
              </span>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
