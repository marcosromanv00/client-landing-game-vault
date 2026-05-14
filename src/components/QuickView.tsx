'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Game } from '@/lib/data';
import { useCart } from '@/lib/CartContext';

const QuickView = () => {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, side: 'right' as 'left' | 'right' });
  const [isVisible, setIsVisible] = useState(false);
  const mouseInsideRef = React.useRef(false);
  const activeSlugRef = React.useRef<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const handleQuickView = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { game, x, y, visible, width, slug } = customEvent.detail;
      
      if (visible) {
        const modalWidth = 320;
        const screenWidth = window.innerWidth;
        let side: 'left' | 'right' = 'right';
        let posX = x;

        // Detection of screen edge
        if (x + modalWidth > screenWidth - 20) {
          side = 'left';
          posX = x - width - modalWidth + 40; // Overlap slightly
        } else {
          posX = x - 40; // Overlap slightly with parent card
        }

        activeSlugRef.current = slug;
        setActiveGame(game);
        setPosition({ x: posX, y: y - 20, side });
        setIsVisible(true);
      } else {
        // Only hide if:
        // 1. The mouse is NOT inside the QuickView
        // 2. The event is for the current active game
        if (!mouseInsideRef.current && activeSlugRef.current === slug) {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('gv-quickview', handleQuickView);
    return () => window.removeEventListener('gv-quickview', handleQuickView);
  }, []);

  const handleAddToCart = () => {
    if (activeGame) {
      addItem(activeGame);
      setIsVisible(false); // Close quickview after adding
    }
  };

  const handleMouseEnter = () => {
    mouseInsideRef.current = true;
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    mouseInsideRef.current = false;
    setTimeout(() => {
      if (!mouseInsideRef.current) {
        setIsVisible(false);
      }
    }, 300);
  };

  if (!activeGame || !isVisible) return null;

  return (
    <div 
      className={`quickview-overlay ${position.side}`}
      style={{ 
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '320px',
        zIndex: 10000,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-dark border border-secondary rounded shadow-lg overflow-hidden animate-fade-in">
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-start mb-1">
            <h4 className="gv-display text-white mb-0">{activeGame.title}</h4>
            <span className="badge bg-gv-red smaller">HOT</span>
          </div>
          <p className="text-muted smaller mb-3">Lanzamiento: {activeGame.releaseYear || 2024}</p>
          
          <div 
            className="rounded mb-3 position-relative overflow-hidden group" 
            style={{ 
              height: '180px', 
              background: `linear-gradient(${activeGame.gradAngle || 135}deg, ${activeGame.gradFrom}, ${activeGame.gradTo})`
            }}
          >
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0 group-hover-opacity-100 transition-all">
                <i className="bi bi-play-circle-fill text-white display-4"></i>
            </div>
          </div>
          
          <div className="bg-secondary bg-opacity-10 p-3 rounded mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="smaller text-white-50">Reseñas de usuarios:</span>
              <span className="smaller text-success fw-bold">Muy Positivas ({activeGame.reviewCount || 0})</span>
            </div>
            <div className="d-flex flex-wrap gap-1">
              {(activeGame.genre || 'Acción, Aventura, RPG').split(',').map((tag: string) => (
                <span key={tag} className="badge bg-secondary bg-opacity-25 border border-secondary border-opacity-50 smaller px-2 py-1">{tag.trim()}</span>
              ))}
            </div>
          </div>
          
          <div className="d-flex flex-column gap-2">
            <button 
              className="btn btn-gv-red w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
              onClick={handleAddToCart}
              data-bs-toggle="offcanvas"
              data-bs-target="#cartOffcanvas"
            >
              <i className="bi bi-cart-plus"></i>
              AGREGAR AL CARRITO
            </button>
            <div className="d-flex gap-2">
              <Link 
                href={`/product/${activeGame.slug}`} 
                className="btn btn-outline-light flex-grow-1 fw-bold text-uppercase" 
                style={{ fontSize: '0.8rem' }}
                onClick={() => setIsVisible(false)}
              >
                DETALLES
              </Link>
              <button className="btn btn-outline-light px-3">
                <i className="bi bi-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .quickview-overlay {
          padding: 30px; /* Increased buffer for mouse movement */
          margin: -30px;
          pointer-events: all;
        }
        .animate-fade-in {
          animation: fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .smaller { font-size: 0.75rem; }
        .text-white-50 { color: rgba(255,255,255,0.5); }
        .group-hover-opacity-100:hover .opacity-0 { opacity: 1 !important; }
      `}</style>
    </div>
  );
};

export default QuickView;
