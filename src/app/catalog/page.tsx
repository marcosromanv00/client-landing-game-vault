'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { GAMES, CONSOLES, ACCESSORIES } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';

const CatalogContent = ({ 
  initialPlatform, 
  initialType = 'games', 
  initialBadge = ''
}: { 
  initialPlatform: string,
  initialType?: string,
  initialBadge?: string
}) => {
  const [platformFilter, setPlatformFilter] = useState(initialPlatform);
  const [genreFilter, setGenreFilter] = useState('All');
  const [activeType, setActiveType] = useState(initialType);

  const platforms = ['All', 'PS5', 'Xbox', 'Nintendo', 'PC', 'Multi'];
  const genres = ['All', 'Acción / Aventura', 'RPG', 'Deportes', 'Shooter', 'Pelea', 'Racing'];

  let displayItems = [];
  
  if (activeType === 'consoles') {
    displayItems = CONSOLES.map(c => ({ 
      ...c, 
      platform: 'Multi' as const, 
      genre: 'Consola', 
      rating: 5, 
      reviewCount: 0, 
      esrb: 'E' as const,
      description: 'Consola de última generación.',
      releaseYear: 2024
    }));
  } else if (activeType === 'accessories') {
    displayItems = ACCESSORIES.map(a => ({ 
      ...a, 
      platform: 'Multi' as const, 
      genre: 'Accesorio', 
      rating: 5, 
      reviewCount: 0, 
      esrb: 'E' as const,
      description: 'Accesorio para potenciar tu juego.',
      releaseYear: 2024
    }));
  } else {
    displayItems = GAMES;
  }

  const filteredItems = displayItems.filter(item => {
    const matchesPlatform = platformFilter === 'All' || item.platform === platformFilter;
    const matchesGenre = genreFilter === 'All' || (item.genre && item.genre.includes(genreFilter));
    const matchesBadge = !initialBadge || (item.badge === initialBadge);
    
    return matchesPlatform && matchesGenre && matchesBadge;
  });

  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Catálogo', active: true }]} />
      
      <div className="row g-4">
        {/* Sidebar Filters */}
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '120px' }}>
            <h5 className="gv-display mb-4">FILTROS</h5>
            
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted mb-2 text-uppercase">Plataforma</label>
              <div className="d-flex flex-wrap gap-2">
                {platforms.map(p => (
                  <button 
                    key={p}
                    onClick={() => setPlatformFilter(p)}
                    className={`btn btn-sm rounded-pill px-3 ${platformFilter === p ? 'btn-danger' : 'btn-outline-secondary'}`}
                  >
                    {p === 'All' ? 'Todas' : p}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted mb-2 text-uppercase">Género</label>
              <select 
                className="form-select border-secondary-subtle rounded-3"
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
              >
                {genres.map(g => <option key={g} value={g}>{g === 'All' ? 'Todos los géneros' : g}</option>)}
              </select>
            </div>

            <div className="mb-0">
              <label className="form-label small fw-bold text-muted mb-2 text-uppercase">Precio Máximo</label>
              <input type="range" className="form-range" min="0" max="100" step="10" />
              <div className="d-flex justify-content-between small text-muted">
                <span>$0</span>
                <span>$100</span>
              </div>
            </div>
            
            <hr className="my-4 opacity-10" />
            
            <div className="bg-dark rounded-4 p-3 text-white">
              <div className="small fw-bold opacity-50 mb-1">PROMO</div>
              <div className="fw-bold mb-2">Suscripción Vault+</div>
              <p className="smaller opacity-75 mb-3" style={{ fontSize: '0.75rem' }}>Obtén acceso ilimitado a más de 100 juegos por $9.99/mes.</p>
              <button className="btn btn-gv-red text-white w-100 btn-sm fw-bold">SABER MÁS</button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="gv-display mb-0 h2">
              {initialBadge === 'En Oferta' ? 'OFERTAS ESPECIALES' : 
               activeType === 'consoles' ? 'CONSOLAS' :
               activeType === 'accessories' ? 'ACCESORIOS' :
               platformFilter === 'All' ? 'TODOS LOS JUEGOS' : platformFilter}
            </h1>
            <span className="text-muted small fw-bold">{filteredItems.length} resultados encontrados</span>
          </div>
          
          {filteredItems.length > 0 ? (
            <div className="row g-4">
              {filteredItems.map(item => (
                <div key={item.slug} className="col-sm-6 col-md-4">
                  <ProductCard game={item as unknown as import('@/lib/data').Game} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 bg-white rounded-4 shadow-sm">
              <i className="bi bi-search display-1 text-muted opacity-25"></i>
              <h3 className="mt-3">No hay resultados</h3>
              <p className="text-muted">Prueba ajustando los filtros de búsqueda.</p>
              <button className="btn btn-danger rounded-pill" onClick={() => {setPlatformFilter('All'); setGenreFilter('All'); setActiveType('games');}}>
                LIMPIAR FILTROS
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CatalogPageContent = () => {
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform') || 'All';
  const type = searchParams.get('type') || 'games';
  const badge = searchParams.get('badge') || '';
  
  return <CatalogContent key={`${platform}-${type}-${badge}`} initialPlatform={platform} initialType={type} initialBadge={badge} />;
};

const CatalogPage = () => {
  return (
    <div className="bg-light min-vh-100 pb-5">
      <Suspense fallback={
        <div className="container py-5 text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      }>
        <CatalogPageContent />
      </Suspense>
    </div>
  );
};

export default CatalogPage;
