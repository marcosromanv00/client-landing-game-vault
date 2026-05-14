'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import { Game } from '@/lib/data';

interface ProductCardProps {
  game: Game;
  large?: boolean;
}

const ProductCard = ({ game, large = false }: ProductCardProps) => {
  const { addItem } = useCart();
  
  // Use GOW as default, RDR for some specific games or based on slug length
  const isRDR = game.slug === 'red-dead-redemption-2' || (game.slug.length % 4 === 0 && game.slug !== 'god-of-war-ragnarok');
  
  const assets = {
    bg: isRDR ? '/assets/RDR_HeroBack.webp' : '/assets/GOW_HeroBack.webp',
    char: isRDR ? '/assets/RDR_HeroCharacter.webp' : '/assets/GOW_HeroCharacter.webp'
  };

  const gradientStyle = {
    background: `linear-gradient(${game.gradAngle || 135}deg, ${game.gradFrom}e6 0%, ${game.gradTo}e6 100%)`
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    window.dispatchEvent(new CustomEvent('gv-quickview', {
      detail: {
        game,
        slug: game.slug,
        x: rect.right,
        y: rect.top,
        width: rect.width,
        visible: true
      }
    }));
  };

  const handleMouseLeave = () => {
    // Add a tiny delay to allow moving to the modal
    setTimeout(() => {
        window.dispatchEvent(new CustomEvent('gv-quickview', {
            detail: { visible: false, slug: game.slug }
        }));
    }, 300);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Do NOT stop propagation, otherwise bootstrap data-attributes won't work
    addItem(game);
  };

  return (
    <div 
      className={`gv-card-container ${large ? 'h-100' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/product/${game.slug}`} className="text-decoration-none d-block h-100">
        <div className={`gv-card ${large ? 'h-100' : ''}`}>
          {/* Layer 1: Fondo (Background Image) */}
          <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
            <Image 
              src={assets.bg} 
              alt="background" 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover', opacity: 0.5 }} 
            />
          </div>

          {/* Layer 2: Filtro de color (Colored Gradient Overlay) */}
          <div className="gv-card-gradient position-absolute top-0 start-0 w-100 h-100" style={{ ...gradientStyle, zIndex: 1, opacity: 0.7 }}></div>
          
          {/* Layer 3: Viñeta (Dark edge/vignette) */}
          <div 
            className="position-absolute top-0 start-0 w-100 h-100" 
            style={{ 
              background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.4) 100%)',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          ></div>

          {/* Layer 4: Personaje (Character Image) */}
          <div className="gv-card-character">
            <div className="position-relative w-100 h-100" style={{ transform: 'scale(1.4) translateX(10%)' }}>
              <Image 
                src={assets.char} 
                alt={game.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'contain', objectPosition: 'bottom right' }} 
              />
            </div>
          </div>

          {/* Layer 5: Degradado a negro (Contrast for text) */}
          <div 
            className="position-absolute bottom-0 start-0 w-100" 
            style={{ 
              height: '60%', 
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
              zIndex: 4,
              pointerEvents: 'none'
            }}
          ></div>
          <div 
            className="position-absolute top-0 start-0 w-100" 
            style={{ 
              height: '30%', 
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
              zIndex: 4,
              pointerEvents: 'none'
            }}
          ></div>

          {/* Layer 6: Textos y botones (Content) */}
          <div className="gv-card-content" style={{ zIndex: 5 }}>
            {game.badge && (
              <span className={`gv-badge ${game.badge === 'En Oferta' ? 'bg-gv-red text-white' : 'bg-white text-black'}`} style={{ marginBottom: 'auto' }}>
                {game.badge}
              </span>
            )}
            
            <div className="d-flex justify-content-between align-items-center mb-1 mt-auto">
              <span className="small opacity-75 text-white">{game.platform}</span>
              <div className="d-flex align-items-center gap-1 text-white">
                <i className="bi bi-star-fill text-warning" style={{ fontSize: '0.7rem' }}></i>
                <span style={{ fontSize: '0.75rem' }}>{game.rating}</span>
              </div>
            </div>
            
            <h3 className="gv-card-title h5 text-white">{game.title}</h3>
            <p className="gv-card-desc text-white opacity-75">{game.description}</p>
            
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex flex-column">
                {game.originalPrice && (
                  <span className="text-decoration-line-through opacity-50 small text-white" style={{ fontSize: '0.7rem' }}>
                    ${game.originalPrice}
                  </span>
                )}
                <span className="fw-bold h5 mb-0 text-white">${game.price}</span>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button 
                className="gv-card-btn flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                onClick={handleAddToCart}
                data-bs-toggle="offcanvas"
                data-bs-target="#cartOffcanvas"
              >
                <i className="bi bi-cart-plus"></i>
                <span className="d-none d-sm-inline">Agregar al carrito</span>
                <span className="d-inline d-sm-none">Añadir</span>
              </button>
              <button 
                className="btn btn-outline-light rounded-circle p-0 d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px' }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <i className="bi bi-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

