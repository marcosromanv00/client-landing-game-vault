'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { Game } from '@/lib/data';

interface ProductCardProps {
  game: Game;
  large?: boolean;
}

const ProductCard = ({ game, large = false }: ProductCardProps) => {
  const { addItem } = useCart();
  
  const gradientStyle = {
    background: `linear-gradient(${game.gradAngle || 135}deg, ${game.gradFrom} 0%, ${game.gradTo} 100%)`
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
          {game.badge && (
            <span className={`gv-badge ${game.badge === 'En Oferta' ? 'bg-gv-red text-white' : 'bg-white text-black'}`}>
              {game.badge}
            </span>
          )}
          
          <div className="gv-card-gradient" style={gradientStyle}></div>
          
          <div className="gv-card-content">
            <div className="d-flex justify-content-between align-items-center mb-1">
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

            <div className="d-flex gap-2 mt-auto">
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
                  // Wishlist logic
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

