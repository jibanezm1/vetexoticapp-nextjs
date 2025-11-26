export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>
              <i className="fas fa-paw"></i> VetExoticApp
            </h3>
            <p>
              Cuidado especializado para sus mascotas exóticas con la más alta calidad médica
              y profesionalismo.
            </p>
            <div className="social-links">
              <a href="https://instagram.com/drasibo.exotic" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/vetexoticapp" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://wa.me/56934497035" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Servicios</h4>
            <ul>
              <li>Cirugía de Tejidos Blandos</li>
              <li>Odontología Veterinaria</li>
              <li>Medicina de Aves</li>
              <li>Medicina de Reptiles</li>
              <li>Atención a Domicilio</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contacto</h4>
            <ul>
              <li>
                <i className="fas fa-phone"></i> +56 9 3449 7035
              </li>
              <li>
                <i className="fas fa-envelope"></i> vetexotic.app@gmail.com
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i> San Bernardo, Chile
              </li>
              <li>
                <i className="fab fa-instagram"></i> @drasibo.exotic
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 VetExoticApp - Dra. Siboney Pérez. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
