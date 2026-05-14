import React from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/lib/data';

interface BentoGridProps {
  games: Game[];
}

const BentoGrid: React.FC<BentoGridProps> = ({ games = [] }) => {
  if (!games || games.length < 6) return null;

  return (
    <section className="py-5 bg-white overflow-hidden">
      <div className="container">
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h2 className="gv-display display-3 mb-0 text-dark">TÍTULOS <span className="text-gv-red">TENDENCIA</span></h2>
            <p className="text-muted mb-0 h5 opacity-75">Lo más jugado esta semana en todas las plataformas.</p>
          </div>
          <Link href="/catalog" className="btn btn-dark rounded-0 fw-bold px-5 py-3 d-none d-md-block shadow-lg">
            VER TODO EL CATÁLOGO
          </Link>
        </div>

        <div className="row g-4">
          {/* Top Row: Feature + 2 Small */}
          <div className="col-lg-5">
             <ProductCard game={games[0]} large />
          </div>
          
          <div className="col-lg-7">
             <div className="row g-4 h-100">
                <div className="col-12">
                    <div className="gv-card w-100 position-relative overflow-hidden shadow-lg" style={{ height: '300px' }}>
                         <div className="gv-card-gradient position-absolute top-0 start-0 w-100 h-100" style={{ background: `linear-gradient(90deg, ${games[1].gradFrom}, ${games[1].gradTo})`, zIndex: 1, opacity: 0.85 }}></div>
                         
                         {/* Background Layer */}
                         <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
                           <Image 
                             src="/assets/GOW_HeroBack.jpeg" 
                             alt="" 
                             fill 
                             sizes="(max-width: 1200px) 100vw, 800px"
                             style={{ objectFit: 'cover', opacity: 0.4 }} 
                           />
                         </div>

                         {/* Character Layer */}
                         <div className="position-absolute top-0 start-0 w-100 h-100 z-1" style={{ pointerEvents: 'none' }}>
                            <div className="position-relative w-100 h-100" style={{ transform: 'scale(1.1) translateX(25%) translateY(5%)' }}>
                              <Image 
                                src="/assets/GOW_HeroCharacter.png" 
                                alt="" 
                                fill 
                                sizes="400px"
                                style={{ objectFit: 'contain', objectPosition: 'bottom right' }} 
                              />
                            </div>
                         </div>
                         
                         <div className="gv-card-content position-relative d-flex justify-content-between align-items-center h-100 p-4 p-md-5" style={{ zIndex: 2, background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }}>
                            <div className="flex-grow-1">
                                <span className="badge bg-white text-black mb-3 px-3 py-2 rounded-0 fw-bold">{games[1].platform}</span>
                                <h3 className="gv-display display-4 mb-2 text-white">{games[1].title}</h3>
                                <p className="mb-4 text-white opacity-75 d-none d-md-block" style={{ maxWidth: '400px' }}>{games[1].description}</p>
                                <Link href={`/product/${games[1].slug}`} className="btn btn-gv-red rounded-0 px-4 py-2 fw-bold shadow">EXPLORAR AHORA</Link>
                            </div>
                            <div className="text-end d-none d-sm-block mt-auto">
                                <div className="text-white opacity-50 text-decoration-line-through mb-1">${(games[1].price * 1.2).toFixed(2)}</div>
                                <div className="display-5 fw-bold mb-0 text-white">${games[1].price}</div>
                            </div>
                         </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <ProductCard game={games[2]} />
                </div>
                <div className="col-md-6">
                    <ProductCard game={games[3]} />
                </div>
             </div>
          </div>

          {/* Middle Row: Denser Grid */}
          <div className="col-md-12 col-lg-6">
            <div className="gv-card h-100 bg-gv-red d-flex flex-row align-items-center justify-content-between p-4 p-md-5 overflow-hidden position-relative group shadow-lg">
                {/* Background Layer */}
                <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
                  <Image 
                    src="/assets/RDR_HeroBack.jpeg" 
                    alt="" 
                    fill 
                    sizes="(max-width: 1200px) 100vw, 800px"
                    style={{ objectFit: 'cover', opacity: 0.3 }} 
                  />
                </div>

                {/* Character Layer */}
                <div className="position-absolute top-0 start-0 w-100 h-100 z-1" style={{ pointerEvents: 'none' }}>
                  <div className="position-relative w-100 h-100" style={{ transform: 'scale(1.3) translateX(30%)' }}>
                    <Image 
                      src="/assets/RDR_HeroCharacter.png" 
                      alt="" 
                      fill 
                      sizes="400px"
                      style={{ objectFit: 'contain', objectPosition: 'bottom right' }} 
                    />
                  </div>
                </div>

                <div className="position-absolute top-0 end-0 w-100 h-100 opacity-10 pointer-events-none transition-all z-2" style={{ background: 'radial-gradient(circle at top right, white, transparent)' }}></div>
                <div className="position-relative" style={{ zIndex: 3 }}>
                    <div className="display-3 gv-display text-white mb-0" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>-70%</div>
                    <h3 className="gv-display text-white mb-3">OFERTA FLASH</h3>
                    <p className="text-white opacity-90 mb-4 d-none d-md-block fw-light" style={{ maxWidth: '250px' }}>Solo por las próximas 24 horas. Amplía tu colección hoy mismo.</p>
                    <Link href="/catalog" className="btn btn-white text-gv-red rounded-0 px-5 py-2 fw-bold shadow hover-scale transition-all" style={{ background: 'white' }}>VER OFERTAS</Link>
                </div>
                <div className="d-none d-md-block position-relative" style={{ zIndex: 3, transform: 'rotate(15deg)' }}>
                    <i className="bi bi-lightning-fill text-white" style={{ fontSize: '10rem', opacity: 0.15 }}></i>
                </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <ProductCard game={games[4]} />
          </div>
          <div className="col-md-6 col-lg-3">
            <ProductCard game={games[5]} />
          </div>

          {/* Bottom Row: Additional Density */}
          {games.length >= 8 && (
            <>
              <div className="col-12">
                <div className="gv-card bg-dark d-flex align-items-center p-4 p-md-5 border border-secondary border-opacity-20 shadow-sm transition-all hover-scale overflow-hidden position-relative" style={{ height: 'auto', minHeight: '120px' }}>
                    {/* Background Layer */}
                    <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
                      <Image 
                        src="/assets/GOW_HeroBack.jpeg" 
                        alt="" 
                        fill 
                        sizes="100vw"
                        style={{ objectFit: 'cover', opacity: 0.2 }} 
                      />
                    </div>
                    
                    <div className="row g-0 align-items-center w-100 position-relative z-1">
                        <div className="col-8 col-md-9">
                            <h4 className="gv-display text-white mb-1 fs-2">PRÓXIMOS LANZAMIENTOS Y PRE-VENTAS</h4>
                            <p className="text-muted small mb-0 d-none d-sm-block fs-6">Asegura tu copia de los juegos más esperados del año con beneficios exclusivos de reserva.</p>
                        </div>
                        <div className="col-4 col-md-3 text-end">
                            <Link href="/catalog" className="btn btn-outline-light rounded-0 px-4 py-2 fw-bold w-100">VER CALENDARIO</Link>
                        </div>
                    </div>
                </div>
              </div>
              <div className="col-md-6">
                <ProductCard game={games[6]} />
              </div>
              <div className="col-md-6">
                <ProductCard game={games[7]} />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};


export default BentoGrid;
