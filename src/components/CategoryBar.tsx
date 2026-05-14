'use client';

import React from 'react';
import Link from 'next/link';
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
  icon: React.ReactNode;
  slug: string;
}

const categories: Category[] = [
  {
    id: 'pc',
    name: 'PC GAMING',
    slug: 'pc',
    icon: <Monitor size={32} strokeWidth={1.5} />
  },
  {
    id: 'playstation',
    name: 'PLAYSTATION',
    slug: 'ps5',
    icon: <Gamepad2 size={32} strokeWidth={1.5} />
  },
  {
    id: 'xbox',
    name: 'XBOX',
    slug: 'xbox',
    icon: <Gamepad size={32} strokeWidth={1.5} />
  },
  {
    id: 'nintendo',
    name: 'NINTENDO',
    slug: 'nintendo',
    icon: <Joystick size={32} strokeWidth={1.5} />
  },
  {
    id: 'consoles',
    name: 'CONSOLAS',
    slug: 'consoles',
    icon: <Cpu size={32} strokeWidth={1.5} />
  },
  {
    id: 'accessories',
    name: 'ACCESORIOS',
    slug: 'accessories',
    icon: <Headphones size={32} strokeWidth={1.5} />
  },
  {
    id: 'new',
    name: 'LO NUEVO',
    slug: 'new',
    icon: <Star size={32} strokeWidth={1.5} />
  },
  {
    id: 'deals',
    name: 'OFERTAS',
    slug: 'offers',
    icon: <Tag size={32} strokeWidth={1.5} />
  }
];

export default function CategoryBar() {
  return (
    <section className="bg-white py-5 shadow-sm relative z-10 border-bottom border-light">
      <div className="container">
        <div className="row g-4 justify-content-center">
          {categories.map((category) => (
            <div key={category.id} className="col-6 col-sm-4 col-md-3 col-lg">
              <Link href={`/catalog?category=${category.slug}`} className="text-decoration-none group">
                <div className="category-card d-flex flex-column align-items-center p-4 rounded-4 text-center">
                  <div className="icon-wrapper mb-3 d-flex align-items-center justify-content-center transition-all">
                    <div className="icon-container d-flex align-items-center justify-content-center">
                      {category.icon}
                    </div>
                  </div>
                  <span className="category-name text-dark fw-bold transition-all">
                    {category.name}
                  </span>
                </div>
              </Link>
            </div>
          ))}
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
