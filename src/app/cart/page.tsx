'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

const CartPage = () => {
  const cartItems = [
    { slug: 'god-of-war-ragnarok', title: 'God of War: Ragnarök', platform: 'PS5', price: 59.99, grad: 'linear-gradient(135deg, #1a0505, #8b1a1a)' },
    { slug: 'elden-ring', title: 'Elden Ring', platform: 'PC', price: 49.99, grad: 'linear-gradient(135deg, #0a0a1a, #3a1a6e)' },
    { slug: 'zelda-totk', title: 'Zelda: Tears of the Kingdom', platform: 'Nintendo', price: 59.99, grad: 'linear-gradient(135deg, #0a1a0a, #2e7d32)' }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-light min-vh-100 pb-5">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Carrito de Compras', active: true }]} />
        
        <h1 className="gv-display display-4 mb-5">MI <span className="text-gv-red">CARRITO</span></h1>

        <div className="row g-5">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th className="px-4 py-3 gv-display fw-normal">PRODUCTO</th>
                      <th className="py-3 gv-display fw-normal text-center">CANTIDAD</th>
                      <th className="py-3 gv-display fw-normal text-end px-4">PRECIO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.slug}>
                        <td className="px-4 py-4">
                          <div className="d-flex align-items-center gap-3">
                            <div className="rounded-3 shadow-sm" style={{ width: '60px', height: '80px', background: item.grad }}></div>
                            <div>
                                <h6 className="mb-0 fw-bold">{item.title}</h6>
                                <span className="small text-muted">{item.platform}</span>
                                <div className="mt-2">
                                    <button className="btn btn-link btn-sm p-0 text-danger text-decoration-none smaller fw-bold">ELIMINAR</button>
                                </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                            <div className="input-group input-group-sm mx-auto" style={{ width: '100px' }}>
                                <button className="btn btn-outline-secondary border-secondary-subtle">-</button>
                                <input type="text" className="form-control text-center border-secondary-subtle" defaultValue="1" />
                                <button className="btn btn-outline-secondary border-secondary-subtle">+</button>
                            </div>
                        </td>
                        <td className="text-end px-4">
                          <span className="fw-bold">${item.price}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-white border-top">
                <Link href="/catalog" className="text-gv-red fw-bold text-decoration-none">
                    <i className="bi bi-arrow-left me-2"></i> CONTINUAR COMPRANDO
                </Link>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '120px' }}>
              <h4 className="gv-display mb-4">RESUMEN DEL PEDIDO</h4>
              
              <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-4">
                <span className="h4 gv-display">TOTAL</span>
                <span className="h4 gv-display text-gv-red">${subtotal.toFixed(2)}</span>
              </div>
              
              <Link href="/checkout" className="btn btn-danger btn-lg w-100 fw-bold rounded-pill py-3 mb-3">
                FINALIZAR COMPRA
              </Link>
              
              <div className="text-center">
                <p className="smaller text-muted mb-0">Los impuestos y envío se calculan al finalizar la compra.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
