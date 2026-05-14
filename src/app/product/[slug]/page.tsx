'use client';

import React, { use } from 'react';
import { getGame, getRelated } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { useCart } from '@/lib/CartContext';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const game = getGame(resolvedParams.slug);
  const { addItem } = useCart();
  
  if (!game) {
    notFound();
  }

  const relatedGames = getRelated(game);

  const handleAddToCart = () => {
    addItem(game);
    // The Offcanvas is triggered by data-bs-toggle on the button, so we don't need extra JS here
    // but if we want manual control we could use the same logic as in ProductCard
  };

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
    // Default fallback to ensure there's always a hero background/character as requested
    return {
      bg: '/assets/GOW_HeroBack.jpeg',
      char: '/assets/GOW_HeroCharacter.png'
    };
  };

  const assets = getAssets(game.slug);

  return (
    <div className="bg-white min-vh-100 pb-5">
      {/* Pattern 2: Media-First Layout - Updated to match Landing Hero Style */}
      <section className="hero-wrapper" style={{ padding: '20px' }}>
        <div 
          className="hero-card position-relative overflow-hidden w-100 shadow-lg" 
          style={{ 
            height: '75vh',
            minHeight: '600px',
            backgroundColor: '#000',
            borderRadius: '32px'
          }}
        >
          {/* Layer 1: Background Image or Gradient Fallback */}
          <div 
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              backgroundImage: assets.bg ? `url(${assets.bg})` : 'none',
              background: !assets.bg ? `linear-gradient(${game.gradAngle || 135}deg, ${game.gradFrom} 0%, ${game.gradTo} 100%)` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.8
            }}
          ></div>

          {/* Layer 2: Main Gradient */}
          <div 
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.8) 100%)',
              pointerEvents: 'none'
            }}
          ></div>
          
          {/* Bottom Black Gradient */}
          <div 
            className="position-absolute bottom-0 start-0 w-100"
            style={{
              height: '60%',
              background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, transparent 100%)',
              pointerEvents: 'none'
            }}
          ></div>

          {/* Layer 3: Characters Centered */}
          <div 
            className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-end"
            style={{ pointerEvents: 'none' }}
          >
            {assets.char && (
              <div className="position-relative w-100" style={{ height: '95%' }}>
                <Image 
                  src={assets.char} 
                  alt={game.title} 
                  fill
                  priority
                  style={{ 
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.7))'
                  }} 
                />
              </div>
            )}
          </div>

          {/* Layer 4: Content */}
          <div className="container position-relative h-100 z-1 d-flex flex-column justify-content-center pt-5">
            <div className="text-white" style={{ maxWidth: '600px' }}>
              <Breadcrumbs 
                isDark
                items={[
                  { label: 'Juegos', href: '/catalog' },
                  { label: game.title, active: true }
                ]} 
              />
              <span className="badge bg-white text-black mb-3 px-3 py-2 fw-bold mt-4">{game.platform}</span>
              <h1 className="display-1 gv-display fw-bold mb-2">{game.title}</h1>
              
              <div className="d-flex align-items-center gap-4 mb-4">
                  <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-star-fill text-warning"></i>
                      <span className="fw-bold h4 mb-0">{game.rating}</span>
                      <span className="opacity-75">({game.reviewCount} reseñas)</span>
                  </div>
                  <span className="opacity-50">|</span>
                  <span className="fw-bold h5 mb-0 text-gv-red">{game.genre}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-5">
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="mb-5">
              <h4 className="gv-display mb-3 border-bottom pb-2">DESCRIPCIÓN</h4>
              <p className="lead opacity-75">{game.description}</p>
              <p className="opacity-75">
                Sumérgete en una experiencia de juego inmersiva con {game.title}. Este título redefine los estándares de su género con gráficos impresionantes (simulados aquí por nuestros vibrantes degradados) y una narrativa envolvente que te mantendrá al borde de tu asiento.
              </p>
            </div>

            <div className="mb-5">
              <h4 className="gv-display mb-3 border-bottom pb-2">DETALLES TÉCNICOS</h4>
              <div className="row g-3">
                <div className="col-6 col-md-4">
                    <div className="small text-muted mb-1 text-uppercase fw-bold">Clasificación</div>
                    <div className="fw-bold h5">ESRB {game.esrb}</div>
                </div>
                <div className="col-6 col-md-4">
                    <div className="small text-muted mb-1 text-uppercase fw-bold">Lanzamiento</div>
                    <div className="fw-bold h5">{game.releaseYear}</div>
                </div>
                <div className="col-6 col-md-4">
                    <div className="small text-muted mb-1 text-uppercase fw-bold">Desarrollador</div>
                    <div className="fw-bold h5">GameVault Studios</div>
                </div>
              </div>
            </div>

            {/* Simulated Gallery using Gradients */}
            <div className="mb-5">
              <h4 className="gv-display mb-3 border-bottom pb-2">GALERÍA</h4>
              <div className="row g-3">
                 <div className="col-md-8">
                    <div className="rounded-4 w-100" style={{ height: '300px', background: `linear-gradient(45deg, ${game.gradFrom}, ${game.gradTo})`, opacity: 0.8 }}></div>
                 </div>
                 <div className="col-md-4">
                    <div className="d-flex flex-column gap-3 h-100">
                        <div className="rounded-4 flex-grow-1" style={{ background: `linear-gradient(225deg, ${game.gradFrom}, ${game.gradTo})`, opacity: 0.6 }}></div>
                        <div className="rounded-4 flex-grow-1" style={{ background: `linear-gradient(315deg, ${game.gradFrom}, ${game.gradTo})`, opacity: 0.6 }}></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 position-relative">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '140px', zIndex: 10 }}>
                <div className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="h2 fw-bold mb-0">${game.price}</span>
                        {game.originalPrice && (
                            <span className="text-gv-red fw-bold">-{Math.round((1 - game.price / game.originalPrice) * 100)}%</span>
                        )}
                    </div>
                    {game.originalPrice && (
                        <div className="text-muted small text-decoration-line-through mt-n2">Antes: ${game.originalPrice}</div>
                    )}
                    
                    <button 
                      className="btn btn-danger btn-lg w-100 fw-bold py-3 mt-2 rounded-pill" 
                      data-bs-toggle="offcanvas" 
                      data-bs-target="#cartOffcanvas"
                      onClick={handleAddToCart}
                    >
                        AÑADIR AL CARRITO
                    </button>
                    <button className="btn btn-outline-dark btn-lg w-100 fw-bold py-3 rounded-pill">
                        COMPRAR AHORA
                    </button>

                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-2 rounded-pill py-2">
                            <i className="bi bi-heart"></i>
                            <span className="small fw-bold">DESEADOS</span>
                        </button>
                        <button className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-2 rounded-pill py-2">
                            <i className="bi bi-gift"></i>
                            <span className="small fw-bold">REGALAR</span>
                        </button>
                    </div>
                    
                    <div className="d-flex flex-column gap-2 mt-3 bg-light p-3 rounded-4">
                        <div className="d-flex align-items-center gap-2 smaller">
                            <i className="bi bi-truck text-gv-red"></i>
                            <span>Envío digital instantáneo</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 smaller">
                            <i className="bi bi-shield-lock text-gv-red"></i>
                            <span>Compra 100% protegida</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-5 pt-5">
           <h3 className="gv-display h2 mb-4">TAMBIÉN TE <span className="text-gv-red">PUEDE GUSTAR</span></h3>
           <div className="row g-4">
              {relatedGames.map(rel => (
                  <div key={rel.slug} className="col-6 col-md-3">
                      <ProductCard game={rel} />
                  </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
}
