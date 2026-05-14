'use client';

import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  isDark?: boolean;
}

const Breadcrumbs = ({ items, isDark = false }: BreadcrumbsProps) => {
  const textColor = isDark ? 'text-white' : 'text-muted';
  const activeColor = isDark ? 'text-white' : 'text-dark';
  const opacity = isDark ? 'opacity-75' : '';

  return (
    <nav 
      aria-label="breadcrumb" 
      className="py-3"
      style={isDark ? { '--bs-breadcrumb-divider-color': 'rgba(255,255,255,0.5)' } as React.CSSProperties : {}}
    >
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">
          <Link href="/" className={`text-decoration-none small ${textColor} ${opacity}`}>Inicio</Link>
        </li>
        {items.map((item, index) => (
          <li 
            key={index} 
            className={`breadcrumb-item small ${item.active ? `${activeColor} fw-bold` : ''}`}
            aria-current={item.active ? 'page' : undefined}
          >
            {item.active || !item.href ? (
              <span className={item.active ? '' : `${textColor} ${opacity}`}>{item.label}</span>
            ) : (
              <Link href={item.href} className={`text-decoration-none ${textColor} ${opacity}`}>{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
