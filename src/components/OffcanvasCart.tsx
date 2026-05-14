'use client';

import React from 'react';
import Link from 'next/link';

interface BootstrapWindow extends Window {
  bootstrap?: {
    Offcanvas: {
      getInstance: (el: HTMLElement | null) => { hide: () => void } | null;
    };
  };
}

import { useCart } from '@/lib/CartContext';

const OffcanvasCart = () => {
  const { cart, removeItem, cartTotal } = useCart();

  const closeOffcanvas = () => {
    const bsWindow = window as unknown as BootstrapWindow;
    const bsOffcanvas = bsWindow.bootstrap?.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
    if (bsOffcanvas) bsOffcanvas.hide();
  };

  return (
    <div className="offcanvas offcanvas-end bg-gv-black text-white" tabIndex={-1} id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel">
      <div className="offcanvas-header border-bottom border-secondary">
        <h5 className="offcanvas-title gv-display" id="cartOffcanvasLabel">TU CARRITO</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        {cart.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-cart-x display-4 opacity-25 mb-3 d-block"></i>
            <p className="text-muted">Tu carrito está vacío</p>
            <Link href="/catalog" className="btn btn-outline-danger btn-sm rounded-pill px-4" onClick={closeOffcanvas}>
              EXPLORAR JUEGOS
            </Link>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {cart.map((item) => (
              <div key={item.slug} className="d-flex gap-3 align-items-center animate-fade-in">
                <div 
                  className="rounded-3" 
                  style={{ 
                    width: '60px', 
                    height: '80px', 
                    background: `linear-gradient(${item.gradAngle || 135}deg, ${item.gradFrom}, ${item.gradTo})` 
                  }}
                ></div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0 fw-bold">{item.title}</h6>
                    <span className="smaller opacity-50">x{item.quantity}</span>
                  </div>
                  <span className="small opacity-50">{item.platform}</span>
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <span className="text-gv-red fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    <button 
                      className="btn btn-link btn-sm text-white p-0 opacity-50 hover-opacity-100"
                      onClick={() => removeItem(item.slug)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="offcanvas-footer p-4 border-top border-secondary">
        <div className="d-flex justify-content-between mb-3">
          <span className="opacity-75">Subtotal</span>
          <span className="fw-bold h5 mb-0">${cartTotal.toFixed(2)}</span>
        </div>
        <div className="d-flex flex-column gap-2">
          <Link 
            href="/checkout" 
            className={`btn btn-danger w-100 fw-bold py-2 ${cart.length === 0 ? 'disabled' : ''}`} 
            onClick={closeOffcanvas}
          >
            PROCEDER AL PAGO
          </Link>
          <Link href="/catalog" className="btn btn-outline-light w-100 fw-bold py-2" onClick={closeOffcanvas}>
            SEGUIR COMPRANDO
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OffcanvasCart;
