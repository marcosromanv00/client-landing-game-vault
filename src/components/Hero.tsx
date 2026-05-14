'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/lib/data';

interface HeroProps {
  games: Game[];
}

const Hero: React.FC<HeroProps> = ({ games = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const handleSlideChange = useCallback((newIndex: number) => {
    if (newIndex === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsTransitioning(false);
    }, 400); // 400ms fade out before switching
  }, [activeIndex, isTransitioning]);

  // Automatic transition
  useEffect(() => {
    if (!games || games.length === 0) return;
    const interval = setInterval(() => {
      handleSlideChange((activeIndex + 1) % Math.min(games.length, 4));
    }, 6000); // 6 seconds transition
    return () => clearInterval(interval);
  }, [games, activeIndex, handleSlideChange]);


  if (!games || games.length === 0) return null;
  
  const heroGames = games.slice(0, 4);
  const activeGame = heroGames[activeIndex] || heroGames[0];

  // For the exact 1:1 recreation, we'll map known games to their assets, or fallback to GOW assets for demonstration
  const getAssets = (slug: string) => {
    if (slug === 'god-of-war-ragnarok') {
      return {
        bg: '/assets/GOW_HeroBack.jpeg',
        char: '/assets/GOW_HeroCharacter.png'
      };
    }
    if (slug === 'red-dead-redemption-2') {
      return {
        bg: '/assets/RDR_HeroBack.jpeg',
        char: '/assets/RDR_HeroCharacter.png'
      };
    }
    // Better fallback: just use a gradient background and no character if assets don't exist
    return {
      bg: '',
      char: ''
    };
  };

  const assets = getAssets(activeGame.slug);

  return (
    <section className="hero-wrapper" style={{ margin: '0' }}>
      <div 
        className="hero-card position-relative overflow-hidden w-100" 
        style={{ 
          height: '92vh',
          minHeight: '600px',
          backgroundColor: '#000',
          borderBottomLeftRadius: '32px',
          borderBottomRightRadius: '32px'
        }}
      >
        {/* Layer 1: Background Image / Gradient Fallback */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: assets.bg ? `url(${assets.bg})` : `linear-gradient(135deg, ${activeGame.gradFrom}, ${activeGame.gradTo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isTransitioning ? 0 : 0.8,
            transform: isTransitioning ? 'scale(1.02)' : 'scale(1)',
            transition: 'opacity 0.6s ease-in-out, transform 4s ease-out'
          }}
        ></div>

        {/* Layer 2: Main Gradient (Darker on the right for description, darker at bottom) */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.85) 100%)',
            pointerEvents: 'none'
          }}
        ></div>
        
        {/* Bottom Black Gradient to blend CTAs and lower games */}
        <div 
          className="position-absolute bottom-0 start-0 w-100"
          style={{
            height: '60%',
            background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, transparent 100%)',
            pointerEvents: 'none'
          }}
        ></div>

        <div 
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center align-items-md-end"
          style={{ pointerEvents: 'none' }}
        >
          {assets.char && (
            <div 
              className="position-relative w-100 h-100" 
              style={{ 
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'translateX(-20px)' : 'translateX(0)',
                transition: 'all 0.5s ease-out'
              }}
            >
              <Image 
                src={assets.char} 
                alt={activeGame.title} 
                fill
                priority
                className="hero-character-img"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.7))',
                }} 
              />
            </div>
          )}
        </div>

        {/* Link Overlay - Makes the entire hero clickable */}
        <Link 
          href={`/product/${activeGame.slug}`} 
          className="position-absolute top-0 start-0 w-100 h-100 z-1"
          aria-label={`Ver detalles de ${activeGame.title}`}
        />

        {/* Layer 4: Texts */}
        <div className="position-absolute top-50 start-0 translate-middle-y ps-4 ps-md-5 ms-md-5 z-2 w-100" style={{ maxWidth: 'min(450px, 90vw)', pointerEvents: 'none' }}>
          <div 
            className="hero-info" 
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'translateY(15px)' : 'translateY(0)',
              transition: 'all 0.5s ease-out'
            }}
          >
            <span className="gv-display text-gv-red display-5 display-md-4 fw-bold lh-1 mb-1 d-block">${activeGame.price}</span>
            <h1 className="gv-display text-white display-5 display-md-4 fw-bold lh-1 mb-2 text-wrap">{activeGame.title}</h1>
            <h2 className="gv-display text-white opacity-75 h5 h-md-4 mb-4">{activeGame.platform}</h2>
          </div>
        </div>

        {/* Layer 5: Floating boxes (Other games) - Hidden or smaller on mobile */}
        <div className="position-absolute start-0 ps-4 ps-md-5 ms-md-5 z-3 d-none d-md-block" style={{ bottom: '12%' }}>
          <p className="text-white fw-bold mb-3" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>OTRAS NOVEDADES:</p>
          <div className="d-flex gap-3">
            {heroGames.map((game, index) => (
              <div 
                key={game.slug}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSlideChange(index);
                }}
                className="switch-item rounded-4 overflow-hidden position-relative shadow-lg"
                style={{ 
                  width: '110px', 
                  height: '150px', 
                  cursor: 'pointer',
                  border: activeIndex === index ? '2px solid var(--gv-red)' : '2px solid transparent',
                  transition: 'all 0.3s ease',
                  background: '#1a1a1a',
                  transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <Image 
                  src={getAssets(game.slug).char} 
                  alt="thumbnail" 
                  fill
                  style={{ 
                    objectFit: 'cover', 
                    objectPosition: 'center 20%', 
                    opacity: activeIndex === index ? 1 : 0.6 
                  }} 
                />
                <div className="position-absolute bottom-0 w-100 h-50" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side Description text - Hidden on tablet/mobile */}
        <div 
          className="position-absolute end-0 pe-5 me-md-5 me-xl-5 pe-xl-5 z-2 d-none d-xl-block" 
          style={{ 
            bottom: '15%', 
            right: 'calc(10% + 150px)', 
            maxWidth: '500px',
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(15px)' : 'translateY(0)',
            transition: 'all 0.5s ease-out 0.1s',
            pointerEvents: 'none'
          }}
        >
          <h3 className="text-white gv-display display-5 mb-3">DESCRIPCIÓN</h3>
          <p className="text-white opacity-100 fw-medium" style={{ fontSize: '1.15rem', lineHeight: '1.6', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            {activeGame.description}
          </p>
        </div>

        {/* Layer 6: CTAs below characters - Stacking on mobile */}
        <div className="position-absolute start-50 translate-middle-x z-3 d-flex flex-column flex-md-row gap-3 gap-md-4 w-100 px-4 justify-content-center" style={{ bottom: '8%', maxWidth: '500px' }}>
          <button 
            className="btn bg-white text-dark rounded-pill px-4 px-md-5 py-2 py-md-3 fw-bold text-uppercase hover-scale shadow-lg w-100 w-md-auto"
            style={{ fontSize: '0.85rem' }}
            data-bs-toggle="offcanvas" 
            data-bs-target="#cartOffcanvas"
            onClick={(e) => e.stopPropagation()}
          >
            AÑADIR AL CARRITO
          </button>
          <Link 
            href={`/product/${activeGame.slug}`} 
            className="btn btn-outline-light rounded-pill px-4 px-md-5 py-2 py-md-3 fw-bold text-uppercase hover-scale shadow-lg w-100 w-md-auto"
            style={{ fontSize: '0.85rem', borderWidth: '1px' }}
            onClick={(e) => e.stopPropagation()}
          >
            COMPRAR AHORA
          </Link>
        </div>

        {/* Slide Dots (right side vertical) - Smaller on mobile */}
        <div className="position-absolute end-0 top-50 translate-middle-y pe-3 pe-md-4 me-md-3 d-flex flex-column gap-2 gap-md-3 z-3">
          {heroGames.map((_, i) => (
            <span 
              key={i} 
              className="rounded-circle shadow" 
              onClick={(e) => {
                e.stopPropagation();
                handleSlideChange(i);
              }}
              style={{
                width: '8px',
                height: '8px',
                background: activeIndex === i ? 'white' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: activeIndex === i ? 'scale(1.2)' : 'scale(1)'
              }}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
