import React, { useEffect } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import RaccoonMascot from '../components/RaccoonMascot';

const SettingsPage = () => {
  const { 
    fontSize, 
    setFontSize, 
    highContrast, 
    setHighContrast, 
    theme, 
    setTheme, 
    textToSpeech, 
    setTextToSpeech,
    speakText 
  } = useAccessibility();
  
  const { userProgress, logout } = useUser();
  const navigate = useNavigate();

  // Mensajes de accesibilidad
  const settingsMessage = "Configuración de accesibilidad y cuenta";
  const backMessage = "Volver al mapa";
  const logoutMessage = "Cerrar sesión";

  useEffect(() => {
    // Leer el mensaje de configuración al cargar la página
    speakText(settingsMessage);
  }, [speakText, settingsMessage]);

  // Función para manejar cambios en la configuración de accesibilidad
  const handleFontSizeChange = (size) => {
    setFontSize(size);
    const sizeMap = {
      'small': 'pequeño',
      'medium': 'mediano',
      'large': 'grande'
    };
    speakText(`Tamaño de letra cambiado a ${sizeMap[size]}`);
  };

  const handleHighContrastChange = (checked) => {
    setHighContrast(checked);
    speakText(checked ? "Alto contraste activado" : "Alto contraste desactivado");
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    const themeMap = {
      'pastel': 'pastel',
      'dark': 'oscuro',
      'blue': 'azul'
    };
    speakText(`Tema cambiado a ${themeMap[newTheme]}`);
  };

  const handleTextToSpeechChange = (checked) => {
    setTextToSpeech(checked);
    speakText(checked ? "Lectura en voz alta activada" : "Lectura en voz alta desactivada");
  };

  // Función para volver al mapa
  const handleBackClick = () => {
    speakText(backMessage);
    navigate('/map');
  };

  // Función para cerrar sesión
  const handleLogoutClick = () => {
    speakText(logoutMessage);
    logout();
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
    <div className={`settings-page ${getThemeClass()} ${getFontSizeClass()} ${getContrastClass()}`}>
      {/* Barra de navegación */}
      <nav className="navbar">
        <div className="logo">Suki</div>
        <button className="back-button" onClick={handleBackClick}>
          Volver
        </button>
      </nav>

      {/* Contenido principal */}
      <main className="main-content">
        <div className="settings-container">
          <h1 className="settings-title">Configuración</h1>
          
          <div className="mascot-container">
            <RaccoonMascot size="medium" animated={true} />
          </div>
          
          {/* Configuración de accesibilidad */}
          <div className="settings-section">
            <h2>Accesibilidad</h2>
            
            {/* Tamaño de letra */}
            <div className="setting-group">
              <label>Tamaño de letra</label>
              <div className="radio-group">
                <label className={`radio-button ${fontSize === 'small' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="fontSize"
                    value="small"
                    checked={fontSize === 'small'}
                    onChange={() => handleFontSizeChange('small')}
                  />
                  Pequeño
                </label>
                <label className={`radio-button ${fontSize === 'medium' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="fontSize"
                    value="medium"
                    checked={fontSize === 'medium'}
                    onChange={() => handleFontSizeChange('medium')}
                  />
                  Mediano
                </label>
                <label className={`radio-button ${fontSize === 'large' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="fontSize"
                    value="large"
                    checked={fontSize === 'large'}
                    onChange={() => handleFontSizeChange('large')}
                  />
                  Grande
                </label>
              </div>
            </div>
            
            {/* Alto contraste */}
            <div className="setting-group">
              <label className="switch-label">
                <div className="switch">
                  <input
                    type="checkbox"
                    checked={highContrast}
                    onChange={(e) => handleHighContrastChange(e.target.checked)}
                  />
                  <span className="slider"></span>
                </div>
                Alto contraste
              </label>
            </div>
            
            {/* Tema */}
            <div className="setting-group">
              <label>Tema</label>
              <div className="radio-group">
                <label className={`radio-button ${theme === 'pastel' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="theme"
                    value="pastel"
                    checked={theme === 'pastel'}
                    onChange={() => handleThemeChange('pastel')}
                  />
                  Pastel
                </label>
                <label className={`radio-button ${theme === 'dark' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={theme === 'dark'}
                    onChange={() => handleThemeChange('dark')}
                  />
                  Oscuro
                </label>
                <label className={`radio-button ${theme === 'blue' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="theme"
                    value="blue"
                    checked={theme === 'blue'}
                    onChange={() => handleThemeChange('blue')}
                  />
                  Azul
                </label>
              </div>
            </div>
            
            {/* Lectura en voz alta */}
            <div className="setting-group">
              <label className="switch-label">
                <div className="switch">
                  <input
                    type="checkbox"
                    checked={textToSpeech}
                    onChange={(e) => handleTextToSpeechChange(e.target.checked)}
                  />
                  <span className="slider"></span>
                </div>
                Lectura en voz alta
              </label>
            </div>
          </div>
          
          {/* Información de la cuenta */}
          <div className="settings-section">
            <h2>Mi Progreso</h2>
            
            <div className="progress-info">
              <div className="progress-card">
                <h3>Nivel Actual</h3>
                <p className="progress-value">{userProgress.level}</p>
              </div>
              
              <div className="progress-card">
                <h3>Puntos Acumulados</h3>
                <p className="progress-value">{userProgress.points}</p>
              </div>
              
              <div className="progress-card">
                <h3>Logros</h3>
                <p className="progress-value">{userProgress.achievements.length}</p>
              </div>
              
              <div className="progress-card">
                <h3>Tiempo de Juego</h3>
                <p className="progress-value">{Math.floor(userProgress.totalTime / 60)} minutos</p>
              </div>
            </div>
          </div>
          
          {/* Botón de cerrar sesión */}
          <button 
            className="logout-button"
            onClick={handleLogoutClick}
          >
            Cerrar Sesión
          </button>
        </div>
      </main>

      <style jsx>{`
        .settings-page {
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
        
        .settings-container {
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          padding: 30px;
          width: 100%;
          max-width: 600px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        .theme-dark .settings-container {
          background-color: rgba(44, 62, 44, 0.8);
        }
        
        .theme-blue .settings-container {
          background-color: rgba(230, 242, 255, 0.8);
        }
        
        .settings-title {
          font-size: 32px;
          margin-bottom: 20px;
        }
        
        .mascot-container {
          margin: 20px 0;
        }
        
        .settings-section {
          margin-bottom: 30px;
          text-align: left;
        }
        
        .settings-section h2 {
          font-size: 24px;
          margin-top: 0;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid rgba(168, 213, 168, 0.5);
        }
        
        .theme-dark .settings-section h2 {
          border-bottom-color: rgba(74, 111, 74, 0.5);
        }
        
        .theme-blue .settings-section h2 {
          border-bottom-color: rgba(111, 143, 168, 0.5);
        }
        
        .setting-group {
          margin-bottom: 20px;
        }
        
        .setting-group label {
          display: block;
          margin-bottom: 10px;
          font-weight: bold;
        }
        
        /* Radio buttons personalizados */
        .radio-group {
          display: flex;
          gap: 15px;
        }
        
        .radio-button {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          border-radius: 10px;
          background-color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .theme-dark .radio-button {
          background-color: rgba(44, 62, 44, 0.5);
        }
        
        .theme-blue .radio-button {
          background-color: rgba(230, 242, 255, 0.5);
        }
        
        .radio-button.selected {
          background-color: #8bc34a;
          color: white;
        }
        
        .theme-dark .radio-button.selected {
          background-color: #689f38;
        }
        
        .theme-blue .radio-button.selected {
          background-color: #4a90e2;
        }
        
        .radio-button input {
          margin-right: 8px;
        }
        
        /* Switch personalizado */
        .switch-label {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
          margin-right: 10px;
        }
        
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        
        input:checked + .slider {
          background-color: #8bc34a;
        }
        
        .theme-dark input:checked + .slider {
          background-color: #689f38;
        }
        
        .theme-blue input:checked + .slider {
          background-color: #4a90e2;
        }
        
        input:checked + .slider:before {
          transform: translateX(26px);
        }
        
        /* Información de progreso */
        .progress-info {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        
        .progress-card {
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 15px;
          padding: 15px;
          text-align: center;
        }
        
        .theme-dark .progress-card {
          background-color: rgba(44, 62, 44, 0.5);
        }
        
        .theme-blue .progress-card {
          background-color: rgba(230, 242, 255, 0.5);
        }
        
        .progress-card h3 {
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 16px;
        }
        
        .progress-value {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }
        
        /* Botón de cerrar sesión */
        .logout-button {
          width: 100%;
          padding: 15px;
          background-color: #ff6b6b;
          color: white;
          border: none;
          border-radius: 30px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .theme-dark .logout-button {
          background-color: #d63031;
        }
        
        .theme-blue .logout-button {
          background-color: #e74c3c;
        }
        
        .logout-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;