'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchGames } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = searchGames(query);

  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Búsqueda', active: true }]} />
      
      <div className="mb-5">
        <h1 className="gv-display display-4 mb-2">RESULTADOS PARA: <span className="text-gv-red">{query.toUpperCase()}</span></h1>
        <p className="text-muted fw-bold">{results.length} coincidencias encontradas</p>
      </div>

      {results.length > 0 ? (
        <div className="row g-4">
          {results.map(game => (
            <div key={game.slug} className="col-sm-6 col-md-4 col-lg-3">
              <ProductCard game={game} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm">
           <i className="bi bi-emoji-frown display-1 text-muted opacity-25"></i>
           <h3 className="mt-4 gv-display">NO ENCONTRAMOS LO QUE BUSCAS</h3>
           <p className="text-muted mb-4">Intenta con otros términos o explora nuestro catálogo completo.</p>
           <a href="/catalog" className="btn btn-danger rounded-pill px-5 fw-bold">VER TODO EL CATÁLOGO</a>
        </div>
      )}

      {results.length === 0 && (
         <div className="mt-5 pt-4">
            <h4 className="gv-display mb-4">EXPLORA POR PLATAFORMA</h4>
            <div className="row g-3">
               {['PS5', 'Xbox', 'Nintendo', 'PC'].map(p => (
                  <div key={p} className="col-6 col-md-3">
                     <div className="p-4 bg-white border rounded-4 text-center hover-shadow transition-all">
                        <div className="h3 gv-display mb-0">{p}</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      )}
      
      <style jsx>{`
        .hover-shadow:hover {
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
            transform: translateY(-5px);
            cursor: pointer;
        }
        .transition-all { transition: all 0.3s; }
      `}</style>
    </div>
  );
};

const SearchPage = () => {
  return (
    <div className="bg-light min-vh-100 pb-5">
      <Suspense fallback={
        <div className="container py-5 text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      }>
        <SearchResults />
      </Suspense>
    </div>
  );
};

export default SearchPage;
