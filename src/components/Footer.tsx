import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gv-black text-white py-5 mt-auto border-top border-secondary">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <Link href="/" className="navbar-brand fw-bold gv-display fs-2 mb-3 d-block text-white text-decoration-none">
              GAME<span className="text-gv-red">VAULT</span>
            </Link>
            <p className="opacity-50 small pe-lg-5">
              Tu destino definitivo para videojuegos de todas las plataformas. Desde los últimos lanzamientos hasta los clásicos más buscados.
            </p>
            <div className="d-flex gap-3 mt-4">
              <Link href="#" className="text-white fs-5"><i className="bi bi-facebook"></i></Link>
              <Link href="#" className="text-white fs-5"><i className="bi bi-instagram"></i></Link>
              <Link href="#" className="text-white fs-5"><i className="bi bi-twitter-x"></i></Link>
              <Link href="#" className="text-white fs-5"><i className="bi bi-youtube"></i></Link>
            </div>
          </div>
          
          <div className="col-sm-6 col-lg-2">
            <h5 className="gv-display mb-3">TIENDA</h5>
            <ul className="list-unstyled small opacity-75 d-flex flex-column gap-2">
              <li><Link href="/catalog" className="text-white text-decoration-none hover-text-gv-red">Catálogo Completo</Link></li>
              <li><Link href="#" className="text-white text-decoration-none">Nuevos Lanzamientos</Link></li>
              <li><Link href="#" className="text-white text-decoration-none">Ofertas Especiales</Link></li>
              <li><Link href="#" className="text-white text-decoration-none">Próximos Juegos</Link></li>
            </ul>
          </div>

          <div className="col-sm-6 col-lg-2">
            <h5 className="gv-display mb-3">CATEGORÍAS</h5>
            <ul className="list-unstyled small opacity-75 d-flex flex-column gap-2">
              <li><Link href="#" className="text-white text-decoration-none">Consolas</Link></li>
              <li><Link href="#" className="text-white text-decoration-none">Accesorios</Link></li>
              <li><Link href="#" className="text-white text-decoration-none">Juegos Digitales</Link></li>
              <li><Link href="#" className="text-white text-decoration-none">Coleccionables</Link></li>
            </ul>
          </div>
          
          <div className="col-sm-6 col-lg-2">
            <h5 className="gv-display mb-3">SOPORTE</h5>
            <ul className="list-unstyled small opacity-75 d-flex flex-column gap-2">
              <li><Link href="#" className="text-white text-decoration-none">Preguntas Frecuentes</Link></li>
              <li><Link href="#" className="text-white text-decoration-none">Métodos de Envío</Link></li>
              <li><Link href="#" className="text-white text-decoration-none">Términos y Condiciones</Link></li>
              <li><Link href="#" className="text-white text-decoration-none">Privacidad</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-4">
            <h5 className="gv-display mb-3">BOLETÍN</h5>
            <p className="small opacity-50 mb-3">Suscríbete para recibir ofertas exclusivas y noticias.</p>
            <div className="input-group mb-3">
              <input type="text" className="form-control bg-dark border-secondary text-white" placeholder="tu@email.com" />
              <button className="btn btn-danger" type="button">UNIRSE</button>
            </div>
          </div>
        </div>
        
        <hr className="my-5 opacity-25" />
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 small opacity-50">
          <p className="mb-0">© 2024 GameVault Store. Todos los derechos reservados.</p>
          <div className="d-flex gap-4">
             <span>Desarrollado para fines educativos</span>
             <div className="d-flex gap-2 align-items-center">
                <i className="bi bi-shield-check text-success"></i>
                <span>Pago Seguro</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
