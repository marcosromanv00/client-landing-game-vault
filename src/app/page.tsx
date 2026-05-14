'use client';

import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import BentoGrid from '@/components/BentoGrid';
import GameCarousel from '@/components/GameCarousel';
import ProductCard from '@/components/ProductCard';
import CategoryBar from '@/components/CategoryBar';
import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/lib/data';
import { getProducts } from '@/lib/supabase';

export default function Home() {
  const [products, setProducts] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
        <div className="spinner-border text-gv-red" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Segmenting data
  // Segmenting data - Specific selection for Hero to include RDR2 instead of FIFA
  const heroGames = [
    ...products.slice(0, 3), // Elden Ring, GOW, Zelda
    products.find(p => p.slug === 'red-dead-redemption-2') || products[3]
  ].filter(Boolean) as Game[];

  
  // Specific category filtering
  const adventureGames = products.filter(p => 
    p.genre.toLowerCase().includes('aventura') || 
    p.genre.toLowerCase().includes('rpg')
  ).slice(0, 8);
  
  const actionGames = products.filter(p => 
    p.genre.toLowerCase().includes('acción') || 
    p.genre.toLowerCase().includes('lucha') ||
    p.genre.toLowerCase().includes('terror')
  ).slice(0, 8);
  
  // Hardware filtering (Consoles vs Accessories)
  const hardwareItems = products.filter(p => p.genre.toLowerCase() === 'hardware');
  const consoles = hardwareItems.filter(p => p.title.toLowerCase().includes('consola') || p.title.toLowerCase().includes('xbox series') || p.title.toLowerCase().includes('playstation 5'));
  const accessories = hardwareItems.filter(p => !consoles.includes(p));

  const bentoGames = products.slice(3, 11); // Increased for denser Bento
  const latestGames = products.slice(0, 8);
  const recGames = products.filter(p => p.rating >= 4.5).slice(0, 4);

  return (
    <div className="bg-white">
      {heroGames.length > 0 && <Hero games={heroGames} />}
      
      <CategoryBar />

      {/* Recommendation Bento Grid */}
      {recGames.length >= 4 && (
        <section className="py-5 bg-white">
          <div className="container">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <h2 className="gv-display display-4 mb-0 text-dark">LO MEJOR <span className="text-gv-red">PARA TI</span></h2>
                <p className="text-muted mb-0">Selecciones personalizadas basadas en tus gustos.</p>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-md-5 col-lg-4">
                <ProductCard game={recGames[0]} large />
              </div>
              <div className="col-md-7 col-lg-8">
                <div className="row g-4">
                  <div className="col-md-12">
                      <div className="gv-card w-100 position-relative overflow-hidden shadow-lg" style={{ height: '220px' }}>
                        <div className="gv-card-gradient position-absolute top-0 start-0 w-100 h-100" style={{ background: `linear-gradient(135deg, ${recGames[1].gradFrom}, ${recGames[1].gradTo})`, opacity: 0.85, zIndex: 1 }}></div>
                        
                        {/* Background Layer */}
                        <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
                          <Image 
                            src="/assets/RDR_HeroBack.jpeg" 
                            alt="" 
                            fill 
                            sizes="(max-width: 1200px) 100vw, 1000px"
                            style={{ objectFit: 'cover', opacity: 0.3 }} 
                          />
                        </div>

                        {/* Character Layer */}
                        <div className="position-absolute top-0 start-0 w-100 h-100 z-1" style={{ pointerEvents: 'none' }}>
                          <div className="position-relative w-100 h-100" style={{ transform: 'scale(1.2) translateX(35%) translateY(10%)' }}>
                            <Image 
                              src="/assets/RDR_HeroCharacter.png" 
                              alt="" 
                              fill 
                              sizes="400px"
                              style={{ objectFit: 'contain', objectPosition: 'bottom right' }} 
                            />
                          </div>
                        </div>

                        <div className="gv-card-content position-relative d-flex justify-content-between align-items-center h-100 p-4" style={{ zIndex: 2 }}>
                          <div>
                            <span className="badge bg-white text-dark mb-2">DESTACADO</span>
                            <h3 className="gv-display h2 mb-1 text-white">{recGames[1].title}</h3>
                            <p className="mb-0 text-white opacity-75">{recGames[1].genre}</p>
                          </div>
                          <Link href={`/product/${recGames[1].slug}`} className="btn btn-gv-red rounded-0 px-4 py-2 fw-bold shadow">RESERVAR AHORA</Link>
                        </div>
                      </div>
                  </div>
                  <div className="col-md-6">
                    <ProductCard game={recGames[2]} />
                  </div>
                  <div className="col-md-6">
                    <ProductCard game={recGames[3]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hardware: Consolas */}
      {consoles.length > 0 && (
        <section className="py-5 bg-light">
          <div className="container">
            <GameCarousel 
              title="CONSOLAS" 
              subtitle="El hardware más potente para tu experiencia gaming."
              games={consoles} 
            />
          </div>
        </section>
      )}

      {/* Category Carousels: Games */}
      <section className="py-5 bg-white">
        <div className="container">
          {adventureGames.length > 0 && (
            <GameCarousel 
              title="AVENTURAS Y ROL" 
              subtitle="Mundos abiertos y RPGs que te atraparán por horas."
              games={adventureGames} 
            />
          )}
          <div className="my-5"></div>
          {actionGames.length > 0 && (
            <GameCarousel 
              title="ACCIÓN Y TERROR" 
              subtitle="Adrenalina y combate en cada rincón."
              games={actionGames} 
            />
          )}
        </div>
      </section>

      {/* Hardware: Accesorios */}
      {accessories.length > 0 && (
        <section className="py-5 bg-light">
          <div className="container">
            <GameCarousel 
              title="ACCESORIOS" 
              subtitle="Mejora tu juego con los mejores periféricos."
              games={accessories} 
            />
          </div>
        </section>
      )}

      {/* Trending Games (Bento Grid) */}
      {bentoGames.length >= 6 && <BentoGrid games={bentoGames} />}

      {/* Special Offer Section */}
      <section className="py-5 bg-dark text-white overflow-hidden position-relative">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="text-gv-red fw-bold h5">OFERTA DE TEMPORADA</span>
              <h2 className="display-3 gv-display mb-4">HASTA 70% DE DESCUENTO</h2>
              <p className="lead opacity-75 mb-4">Aprovecha nuestras ofertas exclusivas en títulos seleccionados de la generación anterior y lanzamientos recientes.</p>
              <Link href="/catalog" className="btn btn-gv-red btn-lg rounded-0 px-5 fw-bold shadow">EXPLORAR OFERTAS</Link>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
               <div className="position-relative" style={{ height: '300px' }}>
                  <div className="position-absolute top-50 start-50 translate-middle w-75 h-100 rounded-0" style={{ background: 'linear-gradient(135deg, #e41e1e, #000)', opacity: 0.3, transform: 'rotate(-5deg)' }}></div>
                  <div className="position-absolute top-50 start-50 translate-middle w-75 h-100 rounded-0 shadow-lg border border-secondary" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', transform: 'rotate(5deg)' }}>
                    <div className="d-flex flex-column h-100 justify-content-center align-items-center text-center p-4">
                        <div className="display-1 gv-display text-gv-red">-70%</div>
                        <div className="h4 gv-display">SEASON PASS</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Games Grid */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="gv-display display-4 mb-0 text-dark">NUEVOS <span className="text-gv-red">INGRESOS</span></h2>
              <p className="text-muted mb-0">Recién llegados a nuestra bóveda.</p>
            </div>
            <Link href="/catalog" className="text-gv-red fw-bold text-decoration-none">Ver todos <i className="bi bi-arrow-right"></i></Link>
          </div>
          <div className="row g-4">
            {latestGames.map((game) => (
              <div key={game.slug} className="col-6 col-md-4 col-lg-3">
                <ProductCard game={game} />
              </div>
            ))}
          </div>
        </div>
      </section>


      <style jsx>{`
        .hover-bg-gv-red:hover {
          background-color: var(--gv-red) !important;
          border-color: var(--gv-red) !important;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
        .smaller { font-size: 0.75rem; }
      `}</style>
    </div>
  );
}
