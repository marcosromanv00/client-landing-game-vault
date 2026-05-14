'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { searchGames } from '@/lib/data';
import { useCart } from '@/lib/CartContext';
import OffcanvasCart from './OffcanvasCart';

const NavbarContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHome = pathname === '/';
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { cartCount } = useCart();

  const fullPath = pathname + (searchParams.toString() ? '?' + searchParams.toString() : '');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const results = searchTerm.length > 1 ? searchGames(searchTerm) : [];

  const navLinks = [
    { name: 'PRODUCTOS', href: '/catalog' },
    { name: 'CONSOLAS', href: '/catalog?type=consoles' },
    { name: 'ACCESORIOS', href: '/catalog?type=accessories' },
    { name: 'GÉNEROS', href: '/catalog?view=genres' },
    { name: 'OFERTAS', href: '/catalog?badge=En Oferta' },
  ];

  return (
    <>
      <header className={`header-main transition-all ${isHome ? 'position-fixed w-100 z-3 px-4' : 'position-sticky top-0 z-3'} ${isScrolled ? 'pt-2' : 'pt-4'}`}>
        
        {/* Level 1: Administrative */}
        <nav className="navbar navbar-expand navbar-dark mx-auto rounded-pill px-4 py-2 glass-header-v2 mb-2" style={{ maxWidth: '1200px' }}>
          <div className="container-fluid align-items-center">
            <Link href="/" className="navbar-brand fw-bold gv-display fs-3 text-white m-0 pe-4">
              GAME<span className="text-gv-red">VAULT</span>
            </Link>

            <div className="navbar-nav mx-auto d-none d-md-flex gap-4">
              <Link href="#" className="nav-link fw-bold text-white hover-opacity-100" style={{ fontSize: '0.7rem', letterSpacing: '2px' }}>SERVICIOS</Link>
              <Link href="#" className="nav-link fw-bold text-white hover-opacity-100" style={{ fontSize: '0.7rem', letterSpacing: '2px' }}>CONTACTO</Link>
            </div>

            <div className="d-flex align-items-center gap-3">
              <button className="btn text-white p-0 border-0 hover-scale" onClick={() => setShowSearch(!showSearch)}>
                <i className={`bi ${showSearch ? 'bi-x-lg' : 'bi-search'} fs-5`}></i>
              </button>
              
              <Link href="#" className="btn text-white p-0 border-0 hover-scale">
                <i className="bi bi-heart fs-5"></i>
              </Link>
              
              <button className="btn text-white p-0 position-relative border-0 hover-scale" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
                <i className="bi bi-cart3 fs-5"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-gv-red" style={{ fontSize: '0.5rem' }}>
                    {cartCount}
                  </span>
                )}
              </button>

              <Link href="#" className="btn text-white p-0 border-0 hover-scale">
                <div className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center" style={{ width: '28px', height: '28px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <i className="bi bi-person-fill text-white fs-6"></i>
                </div>
              </Link>
            </div>

            {/* Floating Search Dropdown */}
            {showSearch && (
              <div className="position-absolute top-100 end-0 mt-3 p-3 rounded-4 shadow-lg animate-fade-in" style={{ width: '350px', background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.1)', zIndex: 1000 }}>
                <input 
                  ref={searchInputRef}
                  type="text" 
                  className="form-control form-control-sm bg-white bg-opacity-10 border-0 text-white rounded-3 px-3 py-2 mb-2 font-inter" 
                  placeholder="Buscar juegos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowResults(true)}
                />
                {showResults && results.length > 0 && (
                  <div className="results-list overflow-auto" style={{ maxHeight: '250px' }}>
                    {results.map((game) => (
                      <Link 
                        key={game.slug} 
                        href={`/product/${game.slug}`}
                        className="d-flex align-items-center gap-2 p-2 text-decoration-none text-white rounded-3 hover-bg-white-10 mb-1"
                        onClick={() => { setShowSearch(false); setSearchTerm(''); }}
                      >
                        <div className="rounded bg-gv-red bg-opacity-20 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                          <span className="text-gv-red fw-bold" style={{ fontSize: '0.7rem' }}>{game.title.charAt(0)}</span>
                        </div>
                        <div className="flex-grow-1 overflow-hidden">
                          <div className="fw-bold text-truncate" style={{ fontSize: '0.75rem' }}>{game.title}</div>
                          <div className="opacity-50 text-uppercase" style={{ fontSize: '0.6rem' }}>{game.platform}</div>
                        </div>
                        <div className="fw-bold" style={{ fontSize: '0.75rem' }}>${game.price}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Level 2: Discovery */}
        <nav className="navbar navbar-expand mx-auto rounded-pill px-2 py-1 glass-header-v2-sub" style={{ maxWidth: '900px' }}>
          <div className="container-fluid justify-content-center">
            <ul className="navbar-nav gap-2 gap-md-4 align-items-center">
              {navLinks.map((link) => {
                const isActive = fullPath === link.href;
                return (
                  <li key={link.name} className="nav-item position-relative group" style={{ zIndex: 1 }}>
                    <Link 
                      href={link.href}
                      className={`nav-link fw-black p-2 rounded-pill transition-all position-relative z-1 ${isActive ? 'text-white' : 'text-white opacity-80 hover-opacity-100'}`}
                      style={{ fontSize: '0.65rem', letterSpacing: '2px' }}
                    >
                      {link.name}
                      {link.name === 'OFERTAS' && <span className="ms-1 pulse-dot"></span>}
                    </Link>
                    {isActive && <div className="active-pill-bg"></div>}
                    {!isActive && <div className="hover-pill-bg"></div>}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>

      <OffcanvasCart />

      <style jsx>{`
        .header-main { z-index: 1000 !important; }
        .gv-display { font-family: var(--font-bebas); }
        .font-inter { font-family: var(--font-inter); }
        
        .glass-header-v2 {
          background: rgba(10, 10, 10, 0.95) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        }

        .glass-header-v2-sub {
          background: rgba(10, 10, 10, 0.92) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
        }

        .hover-scale { transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .hover-scale:hover { transform: scale(1.15); }
        .hover-opacity-100 { transition: opacity 0.2s ease; }
        .hover-opacity-100:hover { opacity: 1 !important; }
        .hover-bg-white-10:hover { background: rgba(255, 255, 255, 0.1); }

        .active-pill-bg {
          position: absolute;
          inset: 0;
          background: var(--gv-red, #E41E1E);
          border-radius: 50px;
          z-index: 0;
          box-shadow: 0 0 15px rgba(228, 30, 30, 0.5);
          transform: scale(1.05);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .hover-pill-bg {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50px;
          z-index: -1;
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.2s ease-out;
        }
        .nav-item:hover .hover-pill-bg { opacity: 1; transform: scale(1); }

        .pulse-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: var(--gv-red, #E41E1E);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(228, 30, 30, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(228, 30, 30, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(228, 30, 30, 0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .transition-all { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .fw-black { font-weight: 900; }
      `}</style>
    </>
  );
};

const Navbar = () => (
  <Suspense fallback={<div style={{ height: '100px' }} />}>
    <NavbarContent />
  </Suspense>
);

export default Navbar;
