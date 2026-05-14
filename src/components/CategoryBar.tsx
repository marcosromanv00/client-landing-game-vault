'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Monitor, 
  Gamepad, 
  Gamepad2, 
  Joystick, 
  Cpu, 
  Headphones, 
  Star, 
  Tag 
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  slug: string;
}

const categories: Category[] = [
  {
    id: 'pc',
    name: 'PC GAMING',
    slug: 'pc',
    icon: Monitor
  },
  {
    id: 'playstation',
    name: 'PLAYSTATION',
    slug: 'ps5',
    icon: Gamepad2
  },
  {
    id: 'xbox',
    name: 'XBOX',
    slug: 'xbox',
    icon: Gamepad
  },
  {
    id: 'nintendo',
    name: 'NINTENDO',
    slug: 'nintendo',
    icon: Joystick
  },
  {
    id: 'consoles',
    name: 'CONSOLAS',
    slug: 'consoles',
    icon: Cpu
  },
  {
    id: 'accessories',
    name: 'ACCESORIOS',
    slug: 'accessories',
    icon: Headphones
  },
  {
    id: 'new',
    name: 'LO NUEVO',
    slug: 'new',
    icon: Star
  },
  {
    id: 'deals',
    name: 'OFERTAS',
    slug: 'offers',
    icon: Tag
  }
];

export default function CategoryBar() {
  return (
    <section className="bg-white py-4 py-md-5 shadow-sm relative z-10 border-bottom border-light overflow-hidden">
      <div className="container">
        <div className="row g-3 g-md-4 justify-content-start justify-content-lg-center flex-nowrap overflow-auto pb-2 category-nav-scroll">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isRDR = index % 2 !== 0;
            const assets = {
              bg: isRDR ? '/assets/RDR_HeroBack.jpeg' : '/assets/GOW_HeroBack.jpeg',
              char: isRDR ? '/assets/RDR_HeroCharacter.png' : '/assets/GOW_HeroCharacter.png'
            };

            return (
              <div key={category.id} className="col-auto col-lg">
                <Link href={`/catalog?category=${category.slug}`} className="text-decoration-none group">
                  <div className="category-card d-flex flex-column align-items-center p-3 p-md-4 rounded-4 text-center overflow-hidden position-relative" style={{ minWidth: '110px' }}>
                    {/* Background Layer */}
                    <div className="position-absolute top-0 start-0 w-100 h-100 z-0 opacity-0 category-bg-hover transition-all">
                      <Image 
                        src={assets.bg} 
                        alt="" 
                        fill 
                        sizes="150px"
                        style={{ objectFit: 'cover', opacity: 0.2 }} 
                      />
                    </div>
                    
                    {/* Character Layer */}
                    <div className="position-absolute top-0 start-0 w-100 h-100 z-0 opacity-0 category-char-hover transition-all" style={{ transform: 'scale(1.2) translateY(10%) translateX(10%)' }}>
                      <Image 
                        src={assets.char} 
                        alt="" 
                        fill 
                        sizes="150px"
                        style={{ objectFit: 'contain', objectPosition: 'bottom right' }} 
                      />
                    </div>

                    <div className="icon-wrapper mb-2 mb-md-3 d-flex align-items-center justify-content-center transition-all position-relative z-1">
                      <div className="icon-container d-flex align-items-center justify-content-center">
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                    </div>
                    <span className="category-name text-dark fw-bold transition-all position-relative z-1">
                      {category.name}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .category-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 12px rgba(0,0,0,0.01);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          height: 100%;
        }
        
        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
          border-color: rgba(228, 30, 30, 0.15);
        }

        .icon-wrapper {
          color: #374151; /* Gray-700 for better visibility */
        }

        .category-card:hover .icon-wrapper {
          color: var(--gv-red);
          transform: scale(1.15);
        }

        .category-name {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          opacity: 0.7;
          text-transform: uppercase;
        }

        .category-card:hover .category-name {
          opacity: 1;
          color: var(--gv-red) !important;
        }

        .icon-container {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f9fafb;
          border-radius: 18px;
          transition: all 0.3s ease;
        }

        .category-card:hover .icon-container {
          background: rgba(228, 30, 30, 0.05);
        }

        .category-card:hover .category-bg-hover,
        .category-card:hover .category-char-hover {
          opacity: 1;
        }

        .category-card:hover .category-char-hover {
          transform: scale(1.3) translateY(5%) translateX(5%);
        }

        @media (min-width: 992px) {
          .col-lg {
            flex: 1 0 0%;
            width: 12.5%;
          }
        }
      `}</style>
    </section>
  );
}
