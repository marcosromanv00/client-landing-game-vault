'use client';

import React, { useRef } from 'react';
import { Game } from '@/lib/data';
import ProductCard from './ProductCard';

interface GameCarouselProps {
  title: string;
  subtitle: string;
  games: Game[];
}

const GameCarousel: React.FC<GameCarouselProps> = ({ title, subtitle, games }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="game-carousel-container mb-5">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h3 className="gv-display h2 mb-0 text-dark">{title}</h3>
          <p className="text-muted mb-0">{subtitle}</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary rounded-circle p-2" onClick={() => scroll('left')}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <button className="btn btn-outline-secondary rounded-circle p-2" onClick={() => scroll('right')}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="d-flex gap-4 overflow-auto scrollbar-hide" 
        style={{ scrollSnapType: 'x mandatory', paddingBottom: '1rem' }}
      >
        {games.map((game) => (
          <div key={game.slug} className="flex-shrink-0" style={{ width: '280px', scrollSnapAlign: 'start' }}>
            <ProductCard game={game} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default GameCarousel;
