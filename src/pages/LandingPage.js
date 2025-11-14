import { useState, useEffect } from "react";
import raccoon from "../assets/suki-landing-sombra.png";

export default function Welcome() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const button = document.querySelector(".primary-button");
      if (button) {
        const rect = button.getBoundingClientRect();
        setShowNavbar(rect.top < -50);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="welcome-page">
      {/* Navbar que aparece al hacer scroll */}
      {showNavbar && (
        <div className="navbar">
          <h1 className="navbar-logo">suki</h1>

        </div>
      )}
      {/* Logo */}
      <div className="logo-container">
        <h1 className="logo">suki</h1>
      </div>
      {showNavbar && (
  <div className="navbar">
    <h1 className="navbar-logo">suki</h1>
    <button className="primary2-button">Empieza ahora</button>
  </div>
)}

      {/* Main content */}
      <main className="main-content">
        {/* Blob de fondo decorativo */}
        <div className="blob-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="446" height="463" viewBox="0 0 446 463" fill="none">
            <circle cx="223" cy="240" r="223" fill="#E2F9E0"/>
            <circle cx="222.5" cy="239.5" r="166.5" fill="#CEEECC"/>
            <circle cx="368.5" cy="66.5" r="49.5" fill="#E2F9E0"/>
            <circle cx="332.5" cy="401.5" r="49.5" fill="#E2F9E0"/>
            <circle cx="95.5" cy="401.5" r="49.5" fill="#E2F9E0"/>
            <circle cx="142.5" cy="49.5" r="49.5" fill="#E2F9E0"/>
        </svg>
          {/* Mapache */}
          <div className="raccoon-container">
            <img src={raccoon} alt="Mapache Suki" className="raccoon-img" />
          </div>
        </div>

        {/* Texto */}
        <p className="welcome-text">
          Aprender es divertido <br /> cuando lo haces a tu manera.
        </p>

        {/* Botones */}
        <div className="buttons-container">
          <button className="primary-button">Empieza ahora</button>
          <button className="secondary-button">Ya tengo una cuenta</button>
        </div>
      </main>

      <section id="quienes-somos" className="section">
        <div class="svg-fondo-1">
          <h2>¿De que trata?</h2>
          <p>
            Suki es una app educativa para niños de primaria que enseña materias como matemáticas, lectura y ciencias mediante juegos y recompensas divertidas.
          </p>
        </div>
        
      </section>

      <section id="que-hacemos" className="section">
        <h2>¿Quienes somos?</h2>
        <p>
          En Suki creemos que aprender debe ser divertido. Diseñamos juegos y actividades que desarrollan habilidades en los niños, mientras los padres pueden seguir su progreso fácilmente.
        </p>
      </section>

      <section id="mision" className="section">
        <h2>¿Porque hacemos esto?</h2>
        <p>
Queremos que cada niño aprenda de forma divertida y accesible. En Suki creemos que el juego es la mejor manera de descubrir y crecer, acompañando a las familias en cada paso del aprendizaje.
        </p>
      </section>

      <section id="contacto" className="section">
        <h2>Contacto</h2>
        <p>
          📩 Email: contacto@sukiapp.com <br />
          🌐 www.sukiapp.com
        </p>
      </section>
      <footer className="footer">
  <div className="footer-wave">
    <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#ffffff"
        d="M0,64L48,58.7C96,53,192,43,288,69.3C384,96,480,160,576,170.7C672,181,768,139,864,122.7C960,107,1056,117,1152,128C1248,139,1344,149,1392,154.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      ></path>
    </svg>
  </div>

  <div className="footer-content">
    <div className="footer-section">
      <h3>Sobre nosotros</h3>
      <ul>
        <li><a href="#cursos">Cursos</a></li>
        <li><a href="#mision">Misión</a></li>
        <li><a href="#metodo">Método de enseñanza</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h3>Contacto</h3>
      <ul>
        <li><a href="mailto:contacto@sukiapp.com">contacto@sukiapp.com</a></li>
        <li><a href="#">Instagram</a></li>
        <li><a href="#">Facebook</a></li>
      </ul>
    </div>
  </div>
</footer>

      <style jsx>{`
        .welcome-page {
          min-height: 100vh;
          background-color: #F5FFF2;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 30px
        }

        .logo-container {
          width: 100%;
          display: flex;
          justify-content: center;
          padding-top: 16px;
          margin-bottom: 40px;
        }

        .logo {
          color: #56A74F;
          font-size: 64px;
          margin: 0;
          font-family: 'Fredoka';
          font-weight: 700;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 422px;
          width: 100%;
          
        }
        .blob-container {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;
        }
        .blob-container svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 446px; 
        height: 463px;
        }


      

        .raccoon-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        }

        .raccoon-img {
          width: 358px;
          height: auto;
        }

        .welcome-text {
          text-align: center;
          color: #000000;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 48px;
          padding: 0 16px;
          font-family: 'Quicksand';
        }

        .buttons-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .primary-button {
          width: 100%;
          background-color: #56A74F;
          color: white;
          font-size: 22px;
          font-weight: 700;
          padding: 16px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-family: 'Mulish';
          
        }
        .primary2-button {
            
          width: 207px;
          background-color: #56A74F;
          margin-left: 20px;
          color: white;
          font-size: 21px;
          font-weight: 700;
          padding: 16px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-family: 'Mulish';
          
        }

        .primary-button:hover {
          background-color: #4e8f4e;
        }

        .secondary-button {
          width: 100%;
          background-color: white;
          color: #56A74F;
          font-size: 22px;
          font-weight: 700;
          padding: 16px;
          border-radius: 12px;
          border: 2px solid #56A74F;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-family: 'Mulish';
        }

        .secondary-button:hover {
          background-color: #f5f5f5;
        }
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: #F5FFF2;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          padding: 12px 24px;
          
          animation: fadeInNavbar 0.4s forwards;
        }

        @keyframes fadeInNavbar {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .navbar-logo {
          color: #56A74F;
          font-size: 40px;
          font-family: 'Fredoka';
          margin: 0;
          font-weight: 700;
          
        }

        .navbar nav {
          display: flex;
          
          
        }

        .section {
          padding: 80px 24px;
          max-width: 800px;
          text-align: center;
        }

        .section h2 {
          font-family: 'Fredoka';
          font-weight: 700;
          color: #56A74F;
          font-size: 36px;
          margin-bottom: 16px;
          z-index: 2;
        }

        .section p {
          font-family: 'Mulish';
          color: #333;
          font-size: 20px;
          line-height: 1.6;
        }
        .footer {
          position: relative;
          background-color: #56A74F;
          color: white;
          text-align: center;
          width: 100%;
          padding-top: 40px;
          padding-bottom: 40px;
          font-family: 'Mulish';
          overflow: hidden;
        }

        .footer-wave {
          position: absolute;
          top: -1px;
          left: 0;
          width: 100%;
        }

        .footer-wave svg {
          display: block;
          width: 100%;
          height: 80px;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
          z-index: 2;
          position: relative;
        }

        .footer-section h3 {
          font-family: 'Fredoka';
          color: white;
          font-size: 20px;
          margin-bottom: 8px;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-section li {
          margin-bottom: 6px;
        }

        .footer-section a {
          color: white;
          text-decoration: none;
          font-size: 16px;
          opacity: 0.9;
          transition: opacity 0.2s ease;
        }

        .footer-section a:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
