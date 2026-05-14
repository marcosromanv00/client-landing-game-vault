'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

import { useCart } from '@/lib/CartContext';

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { cart, cartTotal, clearCart } = useCart();

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      setStep(step + 1);
      setValidated(false);
    }
  };

  const handleConfirm = () => {
    setSubmitted(true);
    clearCart();
  };


  if (submitted) {
    return (
      <div className="container py-5 text-center">
        <div className="py-5 animate-fade-in">
            <i className="bi bi-check-circle-fill text-success display-1 mb-4"></i>
            <h1 className="gv-display display-3">¡PEDIDO CONFIRMADO!</h1>
            <p className="lead text-muted mb-5">Gracias por tu compra. Hemos enviado los detalles a tu correo electrónico.</p>
            <Link href="/" className="btn btn-gv-red btn-lg rounded-pill px-5 fw-bold">VOLVER AL INICIO</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && !submitted) {
    return (
      <div className="container py-5 text-center min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <i className="bi bi-cart-x display-1 opacity-10 mb-4"></i>
        <h2 className="gv-display">TU CARRITO ESTÁ VACÍO</h2>
        <p className="text-muted mb-4">Añade algunos juegos antes de proceder al pago.</p>
        <Link href="/catalog" className="btn btn-gv-red rounded-pill px-5">IR AL CATÁLOGO</Link>
      </div>
    );
  }

  return (
    <div className="bg-gv-black min-vh-100 pb-5">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Carrito', href: '/catalog' }, { label: 'Checkout', active: true }]} />
        
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-dark text-white">
              {/* Stepper Header */}
              <div className="d-flex justify-content-between mb-5 position-relative">
                <div className="position-absolute top-50 start-0 w-100 bg-secondary" style={{ height: '2px', zIndex: 0 }}></div>
                {[1, 2, 3].map((s) => (
                  <div key={s} className="position-relative z-1 d-flex flex-column align-items-center">
                    <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold ${step >= s ? 'bg-gv-red text-white' : 'bg-dark text-secondary border border-secondary'}`} style={{ width: '40px', height: '40px' }}>
                      {s}
                    </div>
                    <span className={`smaller mt-2 fw-bold ${step >= s ? 'text-white' : 'text-secondary'}`}>
                      {s === 1 ? 'ENVÍO' : s === 2 ? 'PAGO' : 'REVISIÓN'}
                    </span>
                  </div>
                ))}
              </div>

              {step === 1 && (
                <form className={`needs-validation animate-fade-in ${validated ? 'was-validated' : ''}`} noValidate onSubmit={nextStep}>
                  <h2 className="gv-display mb-4">DATOS DE ENVÍO</h2>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-uppercase opacity-50">Nombre</label>
                      <input type="text" className="form-control bg-gv-black border-secondary text-white rounded-3 py-2" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-uppercase opacity-50">Apellido</label>
                      <input type="text" className="form-control bg-gv-black border-secondary text-white rounded-3 py-2" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold text-uppercase opacity-50">Email</label>
                      <input type="email" className="form-control bg-gv-black border-secondary text-white rounded-3 py-2" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold text-uppercase opacity-50">Dirección</label>
                      <input type="text" className="form-control bg-gv-black border-secondary text-white rounded-3 py-2" required />
                    </div>
                  </div>
                  <button className="btn btn-gv-red w-100 py-3 rounded-pill fw-bold mt-5" type="submit">SIGUIENTE PASO</button>
                </form>
              )}

              {step === 2 && (
                <form className="needs-validation animate-fade-in" noValidate onSubmit={nextStep}>
                  <h2 className="gv-display mb-4">MÉTODO DE PAGO</h2>
                  <div className="bg-gv-black p-4 rounded-4 border border-secondary mb-4">
                    <div className="form-check mb-3">
                      <input className="form-check-input" type="radio" name="pay" id="cc" defaultChecked />
                      <label className="form-check-label fw-bold" htmlFor="cc">Tarjeta de Crédito / Débito</label>
                    </div>
                    <div className="row g-3">
                      <div className="col-12">
                        <input type="text" className="form-control bg-dark border-secondary text-white" placeholder="Número de Tarjeta" required />
                      </div>
                      <div className="col-md-6">
                        <input type="text" className="form-control bg-dark border-secondary text-white" placeholder="MM/YY" required />
                      </div>
                      <div className="col-md-6">
                        <input type="text" className="form-control bg-dark border-secondary text-white" placeholder="CVC" required />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-3 mt-4">
                    <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setStep(1)}>VOLVER</button>
                    <button className="btn btn-gv-red flex-grow-1 py-3 rounded-pill fw-bold" type="submit">SIGUIENTE PASO</button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <div className="animate-fade-in">
                  <h2 className="gv-display mb-4">RESUMEN DEL PEDIDO</h2>
                  <div className="bg-gv-black p-4 rounded-4 border border-secondary mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="opacity-50">Dirección:</span>
                      <span className="fw-bold text-end">Av. Principal 123, San José</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="opacity-50">Método:</span>
                      <span className="fw-bold">Tarjeta terminada en 4242</span>
                    </div>
                  </div>
                  <div className="d-flex gap-3 mt-4">
                    <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setStep(2)}>VOLVER</button>
                    <button className="btn btn-gv-red flex-grow-1 py-3 rounded-pill fw-bold" onClick={handleConfirm}>CONFIRMAR Y PAGAR</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card border-0 shadow-lg rounded-4 p-4 sticky-top bg-dark text-white" style={{ top: '120px' }}>
              <h4 className="gv-display mb-4">MI CARRITO</h4>
              <div className="mb-4 overflow-auto" style={{ maxHeight: '300px' }}>
                {cart.map(item => (
                  <div key={item.slug} className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <div className="fw-bold smaller">{item.title}</div>
                      <div className="smaller opacity-50">x{item.quantity}</div>
                    </div>
                    <span className="smaller fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <ul className="list-group list-group-flush mb-3 bg-transparent">
                <li className="list-group-item bg-transparent text-white border-secondary px-0 d-flex justify-content-between">
                  <span className="opacity-75">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </li>
                <li className="list-group-item bg-transparent text-white border-secondary px-0 d-flex justify-content-between">
                  <span className="opacity-75">Envío</span>
                  <span className="text-success">Gratis</span>
                </li>
                <li className="list-group-item bg-transparent text-white border-0 px-0 d-flex justify-content-between pt-3">
                  <span className="h4 gv-display">TOTAL</span>
                  <span className="h4 gv-display text-gv-red">${cartTotal.toFixed(2)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .smaller { font-size: 0.7rem; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
