import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import RaccoonMascot from '../components/RaccoonMascot';

const RegisterPage = () => {
  const { speakText, fontSize, highContrast, theme } = useAccessibility();
  const { register } = useUser();
  const navigate = useNavigate();
  
  // Estados del formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: 'medium',
    highContrast: false,
    theme: 'pastel',
    textToSpeech: true
  });
  
  // Estados para errores y validación
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mensajes de accesibilidad
  const registerMessage = "Crea tu cuenta en Suki para comenzar a aprender y divertirte.";
  const usernameMessage = "Nombre de usuario";
  const passwordMessage = "Contraseña";
  const confirmPasswordMessage = "Confirmar contraseña";
  const ageMessage = "Edad";
  const submitMessage = "Registrarse";
  const backMessage = "Volver";

  useEffect(() => {
    // Leer el mensaje de registro al cargar la página
    speakText(registerMessage);
  }, [speakText, registerMessage]);

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = "El nombre de usuario es requerido";
      speakText("El nombre de usuario es requerido");
    } else if (username.length < 3) {
      newErrors.username = "El nombre de usuario debe tener al menos 3 caracteres";
      speakText("El nombre de usuario debe tener al menos 3 caracteres");
    }
    
    if (!password) {
      newErrors.password = "La contraseña es requerida";
      speakText("La contraseña es requerida");
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      speakText("La contraseña debe tener al menos 6 caracteres");
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
      speakText("Las contraseñas no coinciden");
    }
    
    if (!age) {
      newErrors.age = "La edad es requerida";
      speakText("La edad es requerida");
    } else if (age < 1 || age > 5) {
      newErrors.age = "La edad debe estar entre 1 y 5 años";
      speakText("La edad debe estar entre 1 y 5 años");
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      speakText("Registrando cuenta...");
      
      // Simular un retraso para el registro
      setTimeout(() => {
        const userData = {
          username,
          age: parseInt(age),
          accessibilitySettings
        };
        
        register(userData);
        speakText("¡Registro exitoso! Bienvenido a Suki.");
        setIsSubmitting(false);
        navigate('/map');
      }, 1500);
    }
  };

  // Manejar cambios en la configuración de accesibilidad
  const handleAccessibilityChange = (setting, value) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    // Leer el cambio en voz alta
    if (setting === 'fontSize') {
      const sizeMap = {
        'small': 'pequeño',
        'medium': 'mediano',
        'large': 'grande'
      };
      speakText(`Tamaño de letra cambiado a ${sizeMap[value]}`);
    } else if (setting === 'highContrast') {
      speakText(value ? "Alto contraste activado" : "Alto contraste desactivado");
    } else if (setting === 'theme') {
      const themeMap = {
        'pastel': 'pastel',
        'dark': 'oscuro',
        'blue': 'azul'
      };
      speakText(`Tema cambiado a ${themeMap[value]}`);
    } else if (setting === 'textToSpeech') {
      speakText(value ? "Lectura en voz alta activada" : "Lectura en voz alta desactivada");
    }
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
    <div className={`register-page ${getThemeClass()} ${getFontSizeClass()} ${getContrastClass()}`}>
      {/* Barra de navegación */}
      <nav className="navbar">
        <div className="logo">Suki</div>
        <button className="back-button" onClick={handleBackClick}>
          Volver
        </button>
      </nav>

      {/* Contenido principal */}
      <main className="main-content">
        <div className="register-container">
          <h1 className="register-title">Crear Cuenta</h1>
          
          <div className="mascot-container">
            <RaccoonMascot size="medium" animated={true} />
          </div>
          
          <form onSubmit={handleSubmit} className="register-form">
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
            
            {/* Campo de confirmación de contraseña */}
            <div className="form-group">
              <label htmlFor="confirmPassword">{confirmPasswordMessage}</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => speakText(confirmPasswordMessage)}
                className={errors.confirmPassword ? 'error' : ''}
                aria-required="true"
              />
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
            </div>
            
            {/* Campo de edad */}
            <div className="form-group">
              <label htmlFor="age">{ageMessage}</label>
              <select
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                onFocus={() => speakText(ageMessage)}
                className={errors.age ? 'error' : ''}
                aria-required="true"
              >
                <option value="">Selecciona tu edad</option>
                <option value="1">1 año</option>
                <option value="2">2 años</option>
                <option value="3">3 años</option>
                <option value="4">4 años</option>
                <option value="5">5 años</option>
              </select>
              {errors.age && <p className="error-message">{errors.age}</p>}
            </div>
            
            {/* Configuración de accesibilidad */}
            <div className="accessibility-settings">
              <h2>Configuración de Accesibilidad</h2>
              
              {/* Tamaño de letra */}
              <div className="setting-group">
                <label>Tamaño de letra</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="fontSize"
                      value="small"
                      checked={accessibilitySettings.fontSize === 'small'}
                      onChange={() => handleAccessibilityChange('fontSize', 'small')}
                    />
                    Pequeño
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="fontSize"
                      value="medium"
                      checked={accessibilitySettings.fontSize === 'medium'}
                      onChange={() => handleAccessibilityChange('fontSize', 'medium')}
                    />
                    Mediano
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="fontSize"
                      value="large"
                      checked={accessibilitySettings.fontSize === 'large'}
                      onChange={() => handleAccessibilityChange('fontSize', 'large')}
                    />
                    Grande
                  </label>
                </div>
              </div>
              
              {/* Alto contraste */}
              <div className="setting-group">
                <label>
                  <input
                    type="checkbox"
                    checked={accessibilitySettings.highContrast}
                    onChange={(e) => handleAccessibilityChange('highContrast', e.target.checked)}
                  />
                  Alto contraste
                </label>
              </div>
              
              {/* Tema */}
              <div className="setting-group">
                <label>Tema</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="theme"
                      value="pastel"
                      checked={accessibilitySettings.theme === 'pastel'}
                      onChange={() => handleAccessibilityChange('theme', 'pastel')}
                    />
                    Pastel
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={accessibilitySettings.theme === 'dark'}
                      onChange={() => handleAccessibilityChange('theme', 'dark')}
                    />
                    Oscuro
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="theme"
                      value="blue"
                      checked={accessibilitySettings.theme === 'blue'}
                      onChange={() => handleAccessibilityChange('theme', 'blue')}
                    />
                    Azul
                  </label>
                </div>
              </div>
              
              {/* Lectura en voz alta */}
              <div className="setting-group">
                <label>
                  <input
                    type="checkbox"
                    checked={accessibilitySettings.textToSpeech}
                    onChange={(e) => handleAccessibilityChange('textToSpeech', e.target.checked)}
                  />
                  Lectura en voz alta
                </label>
              </div>
            </div>
            
            {/* Botón de envío */}
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
              onClick={() => speakText(submitMessage)}
            >
              {isSubmitting ? 'Registrando...' : submitMessage}
            </button>
          </form>
        </div>
      </main>

      <style jsx>{`
        .register-page {
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
        
        .register-container {
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          padding: 30px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        .theme-dark .register-container {
          background-color: rgba(44, 62, 44, 0.8);
        }
        
        .theme-blue .register-container {
          background-color: rgba(230, 242, 255, 0.8);
        }
        
        .register-title {
          font-size: 32px;
          margin-bottom: 20px;
        }
        
        .mascot-container {
          margin: 20px 0;
        }
        
        .register-form {
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
        
        .form-group input,
        .form-group select {
          width: 100%;
          padding: 10px;
          border: 2px solid #a8d5a8;
          border-radius: 10px;
          font-size: 16px;
          box-sizing: border-box;
        }
        
        .theme-dark .form-group input,
        .theme-dark .form-group select {
          border-color: #4a6f4a;
          background-color: #2c3e2c;
          color: #a8d5a8;
        }
        
        .theme-blue .form-group input,
        .theme-blue .form-group select {
          border-color: #6f8fa8;
          background-color: white;
          color: #2d5a7a;
        }
        
        .form-group input.error,
        .form-group select.error {
          border-color: #ff6b6b;
        }
        
        .error-message {
          color: #ff6b6b;
          font-size: 14px;
          margin-top: 5px;
        }
        
        .accessibility-settings {
          margin: 30px 0;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 15px;
        }
        
        .theme-dark .accessibility-settings {
          background-color: rgba(44, 62, 44, 0.5);
        }
        
        .theme-blue .accessibility-settings {
          background-color: rgba(230, 242, 255, 0.5);
        }
        
        .accessibility-settings h2 {
          font-size: 20px;
          margin-top: 0;
          margin-bottom: 15px;
        }
        
        .setting-group {
          margin-bottom: 15px;
        }
        
        .radio-group {
          display: flex;
          gap: 15px;
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
      `}</style>
    </div>
  );
};

export default RegisterPage;