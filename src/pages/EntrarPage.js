import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import RaccoonMascot from '../components/RaccoonMascot';

const LoginPage = () => {
  const { speakText, fontSize, highContrast, theme } = useAccessibility();
  const { login } = useUser();
  const navigate = useNavigate();
  
  // Estados del formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para errores y validación
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mensajes de accesibilidad
  const loginMessage = "Inicia sesión en Suki para continuar tu aventura de aprendizaje.";
  const usernameMessage = "Nombre de usuario";
  const passwordMessage = "Contraseña";
  const submitMessage = "Iniciar sesión";
  const registerMessage = "Registrarse";
  const backMessage = "Volver";
  const demoMessage = "Acceso Demo (admin: admin123)";

  useEffect(() => {
    // Leer el mensaje de inicio de sesión al cargar la página
    speakText(loginMessage);
  }, [speakText, loginMessage]);

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = "El nombre de usuario es requerido";
      speakText("El nombre de usuario es requerido");
    }
    
    if (!password) {
      newErrors.password = "La contraseña es requerida";
      speakText("La contraseña es requerida");
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      speakText("Iniciando sesión...");
      
      // Simular un retraso para el inicio de sesión
      setTimeout(() => {
        const userData = {
          username,
          // En una aplicación real, aquí se verificarían las credenciales
        };
        
        login(userData);
        speakText("¡Inicio de sesión exitoso! Bienvenido de nuevo a Suki.");
        setIsSubmitting(false);
        navigate('/map');
      }, 1500);
    }
  };

  // Función para manejar el inicio de sesión de demo
  const handleDemoLogin = () => {
    speakText(demoMessage);
    setUsername('admin');
    setPassword('admin123');
    
    // Simular un retraso para el inicio de sesión
    setTimeout(() => {
      const userData = {
        username: 'admin',
        age: 4,
        accessibilitySettings: {
          fontSize: 'medium',
          highContrast: false,
          theme: 'pastel',
          textToSpeech: true
        }
      };
      
      login(userData);
      speakText("¡Inicio de sesión demo exitoso! Bienvenido a Suki.");
      navigate('/map');
    }, 1000);
  };

  // Función para ir a la página de registro
  const handleRegisterClick = () => {
    speakText(registerMessage);
    navigate('/register');
  };

  // Función para volver a la página de inicio
  const handleBackClick = () => {
    speakText(backMessage);
    navigate('/');
  };

  // Determinar las clases CSS según las opciones de accesibilidad
  const getThemeClass = () => {
    switch (theme) {
      case 'dark': return 'theme-dark';
      case 'blue': return 'theme-blue';
      default: return 'theme-pastel';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small': return 'font-small';
      case 'large': return 'font-large';
      default: return 'font-medium';
    }
  };

  const getContrastClass = () => {
    return highContrast ? 'high-contrast' : '';
  };

  return (
    <div className={`login-page ${getThemeClass()} ${getFontSizeClass()} ${getContrastClass()}`}>
      {/* Barra de navegación */}
      <nav className="navbar">
        <div className="logo">Suki</div>
        <button className="back-button" onClick={handleBackClick}>
          Volver
        </button>
      </nav>

      {/* Contenido principal */}
      <main className="main-content">
        <div className="login-container">
          <h1 className="login-title">Iniciar Sesión</h1>
          
          <div className="mascot-container">
            <RaccoonMascot size="medium" animated={true} />
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            {/* Campo de nombre de usuario */}
            <div className="form-group">
              <label htmlFor="username">{usernameMessage}</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => speakText(usernameMessage)}
                className={errors.username ? 'error' : ''}
                aria-required="true"
              />
              {errors.username && <p className="error-message">{errors.username}</p>}
            </div>
            
            {/* Campo de contraseña */}
            <div className="form-group">
              <label htmlFor="password">{passwordMessage}</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => speakText(passwordMessage)}
                className={errors.password ? 'error' : ''}
                aria-required="true"
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            
            {/* Botón de envío */}
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
              onClick={() => speakText(submitMessage)}
            >
              {isSubmitting ? 'Iniciando sesión...' : submitMessage}
            </button>
          </form>
          
          {/* Botón de demostración */}
          <div className="demo-section">
            <p>¿Quieres probar la aplicación?</p>
            <button
              className="demo-button"
              onClick={handleDemoLogin}
            >
              {demoMessage}
            </button>
          </div>
          
          {/* Enlace a la página de registro */}
          <div className="register-link">
            <p>¿No tienes una cuenta?</p>
            <button
              className="register-button"
              onClick={handleRegisterClick}
            >
              {registerMessage}
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        /* Temas */
        .theme-pastel {
          background: linear-gradient(135deg, #e6f7e6 0%, #c3e9c3 100%);
          color: #2d7a2d;
        }
        
        .theme-dark {
          background: linear-gradient(135deg, #2c3e2c 0%, #1a281a 100%);
          color: #a8d5a8;
        }
        
        .theme-blue {
          background: linear-gradient(135deg, #e6f2ff 0%, #c3e0ff 100%);
          color: #2d5a7a;
        }
        
        /* Tamaños de fuente */
        .font-small {
          font-size: 14px;
        }
        
        .font-medium {
          font-size: 16px;
        }
        
        .font-large {
          font-size: 20px;
        }
        
        /* Alto contraste */
        .high-contrast {
          filter: contrast(150%);
        }
        
        /* Barra de navegación */
        .navbar {
          background-color: rgba(168, 213, 168, 0.8);
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .theme-dark .navbar {
          background-color: rgba(44, 62, 44, 0.8);
        }
        
        .theme-blue .navbar {
          background-color: rgba(168, 193, 213, 0.8);
        }
        
        .logo {
          font-size: 28px;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .back-button {
          background-color: #6fa86f;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .theme-dark .back-button {
          background-color: #4a6f4a;
        }
        
        .theme-blue .back-button {
          background-color: #6f8fa8;
        }
        
        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        /* Contenido principal */
        .main-content {
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        
        .login-container {
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          padding: 30px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        .theme-dark .login-container {
          background-color: rgba(44, 62, 44, 0.8);
        }
        
        .theme-blue .login-container {
          background-color: rgba(230, 242, 255, 0.8);
        }
        
        .login-title {
          font-size: 32px;
          margin-bottom: 20px;
        }
        
        .mascot-container {
          margin: 20px 0;
        }
        
        .login-form {
          text-align: left;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        .form-group input {
          width: 100%;
          padding: 10px;
          border: 2px solid #a8d5a8;
          border-radius: 10px;
          font-size: 16px;
          box-sizing: border-box;
        }
        
        .theme-dark .form-group input {
          border-color: #4a6f4a;
          background-color: #2c3e2c;
          color: #a8d5a8;
        }
        
        .theme-blue .form-group input {
          border-color: #6f8fa8;
          background-color: white;
          color: #2d5a7a;
        }
        
        .form-group input.error {
          border-color: #ff6b6b;
        }
        
        .error-message {
          color: #ff6b6b;
          font-size: 14px;
          margin-top: 5px;
        }
        
        .submit-button {
          width: 100%;
          padding: 15px;
          background-color: #8bc34a;
          color: white;
          border: none;
          border-radius: 30px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .theme-dark .submit-button {
          background-color: #689f38;
        }
        
        .theme-blue .submit-button {
          background-color: #4a90e2;
        }
        
        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .register-link {
          margin-top: 20px;
        }
        
        .register-link p {
          margin-bottom: 10px;
        }
        
        .register-button {
          background: none;
          border: none;
          color: #2d7a2d;
          text-decoration: underline;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .theme-dark .register-button {
          color: #a8d5a8;
        }
        
        .theme-blue .register-button {
          color: #2d5a7a;
        }
        
        .register-button:hover {
          font-weight: bold;
        }
        
        .demo-section {
          margin: 20px 0;
          padding: 15px;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 15px;
        }
        
        .theme-dark .demo-section {
          background-color: rgba(44, 62, 44, 0.3);
        }
        
        .theme-blue .demo-section {
          background-color: rgba(230, 242, 255, 0.3);
        }
        
        .demo-section p {
          margin-bottom: 10px;
          font-size: 14px;
        }
        
        .demo-button {
          background-color: #FF9800;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .demo-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default LoginPage;