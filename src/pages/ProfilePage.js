import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../context/AccessibilityContext';
import { useUser } from '../context/UserContext';
import RaccoonMascot from '../components/RaccoonMascot';

const ProfilePage = () => {
  const { speakText, fontSize, highContrast, theme } = useAccessibility();
  const { userProgress, logout } = useUser();
  const navigate = useNavigate();
  
  // Mensajes de accesibilidad
  const welcomeMessage = "Perfil de usuario";
  const backMessage = "Volver al mapa";
  const logoutMessage = "Cerrar sesión";

  useEffect(() => {
    // Leer el mensaje de bienvenida al cargar la página
    speakText(welcomeMessage);
  }, [speakText, welcomeMessage]);

  // Función para volver al mapa
  const handleBackToMap = () => {
    speakText(backMessage);
    navigate('/map');
  };

  // Función para cerrar sesión
  const handleLogout = () => {
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

  // Calcular estadísticas
  const totalSubjects = Object.keys(userProgress.subjects).length;
  const completedSubjects = Object.values(userProgress.subjects).filter(
    subject => subject.completedLevels.length >= 5
  ).length;
  const totalLevels = Object.values(userProgress.subjects).reduce(
    (sum, subject) => sum + subject.level, 0
  );

  return (
    <div className={`profile-page ${getThemeClass()} ${getFontSizeClass()} ${getContrastClass()}`}>
      {/* Barra de navegación */}
      <nav className="navbar">
        <div className="logo">Suki</div>
        <div className="nav-buttons">
          <button className="back-button" onClick={handleBackToMap}>
            Volver
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="main-content">
        <div className="profile-container">
          <h1 className="profile-title">Perfil de Usuario</h1>
          
          {/* Mapache guía */}
          <div className="mascot-container">
            <RaccoonMascot size="large" animated={true} />
          </div>
          
          {/* Información del usuario */}
          <div className="user-info">
            <div className="info-card">
              <h3>Información Personal</h3>
              <p><strong>Nombre:</strong> {userProgress.username}</p>
              <p><strong>Edad:</strong> {userProgress.age} años</p>
            </div>
            
            <div className="info-card">
              <h3>Progreso General</h3>
              <p><strong>Nivel:</strong> {userProgress.level}</p>
              <p><strong>Puntos:</strong> {userProgress.points}</p>
              <p><strong>Materias completadas:</strong> {completedSubjects}/{totalSubjects}</p>
              <p><strong>Niveles totales:</strong> {totalLevels}</p>
            </div>
            
            <div className="info-card">
              <h3>Logros</h3>
              <p>Has desbloqueado {userProgress.achievements.length} logros:</p>
              <div className="achievements-list">
                {userProgress.achievements.length > 0 ? (
                  userProgress.achievements.map((achievement, index) => (
                    <div key={index} className="achievement-item">
                      <span className="achievement-icon">🏆</span>
                      <span className="achievement-text">{achievement}</span>
                    </div>
                  ))
                ) : (
                  <p>¡Sigue aprendiendo para desbloquear logros!</p>
                )}
              </div>
            </div>
            
            <div className="info-card">
              <h3>Progreso por Materias</h3>
              <div className="subjects-progress">
                {Object.entries(userProgress.subjects).map(([subjectName, subjectData]) => (
                  <div key={subjectName} className="subject-progress-item">
                    <div className="subject-name">{subjectName}</div>
                    <div className="subject-level">Nivel {subjectData.level}</div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${(subjectData.level / 10) * 100}%` }}
                      ></div>
                    </div>
                    <div className="subject-stats">
                      <span>{subjectData.completedLevels.length}/10 niveles completados</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .profile-page {
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
        
        .nav-buttons {
          display: flex;
          gap: 10px;
        }
        
        .back-button, .logout-button {
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
        
        .theme-dark .back-button,
        .theme-dark .logout-button {
          background-color: #4a6f4a;
        }
        
        .theme-blue .back-button,
        .theme-blue .logout-button {
          background-color: #6f8fa8;
        }
        
        .logout-button {
          background-color: #ff6b6b;
        }
        
        .theme-dark .logout-button {
          background-color: #d63031;
        }
        
        .theme-blue .logout-button {
          background-color: #e74c3c;
        }
        
        .back-button:hover, .logout-button:hover {
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
        
        .profile-container {
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          padding: 30px;
          width: 100%;
          max-width: 800px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        .theme-dark .profile-container {
          background-color: rgba(44, 62, 44, 0.8);
        }
        
        .theme-blue .profile-container {
          background-color: rgba(230, 242, 255, 0.8);
        }
        
        .profile-title {
          font-size: 36px;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        /* Mapache */
        .mascot-container {
          margin: 20px 0;
        }
        
        /* Información del usuario */
        .user-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 20px;
        }
        
        .info-card {
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: left;
        }
        
        .theme-dark .info-card {
          background-color: rgba(44, 62, 44, 0.7);
        }
        
        .theme-blue .info-card {
          background-color: rgba(230, 242, 255, 0.7);
        }
        
        .info-card h3 {
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 20px;
          text-align: center;
          color: #2d7a2d;
        }
        
        .theme-dark .info-card h3 {
          color: #a8d5a8;
        }
        
        .theme-blue .info-card h3 {
          color: #2d5a7a;
        }
        
        .info-card p {
          margin: 10px 0;
        }
        
        /* Logros */
        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
        }
        
        .achievement-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 10px;
        }
        
        .theme-dark .achievement-item {
          background-color: rgba(44, 62, 44, 0.5);
        }
        
        .theme-blue .achievement-item {
          background-color: rgba(230, 242, 255, 0.5);
        }
        
        .achievement-icon {
          font-size: 20px;
        }
        
        .achievement-text {
          font-weight: bold;
        }
        
        /* Progreso por materias */
        .subjects-progress {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 10px;
        }
        
        .subject-progress-item {
          padding: 15px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 10px;
        }
        
        .theme-dark .subject-progress-item {
          background-color: rgba(44, 62, 44, 0.5);
        }
        
        .theme-blue .subject-progress-item {
          background-color: rgba(230, 242, 255, 0.5);
        }
        
        .subject-name {
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .subject-level {
          font-size: 14px;
          margin-bottom: 10px;
          color: #666;
        }
        
        .theme-dark .subject-level {
          color: #aaa;
        }
        
        .theme-blue .subject-level {
          color: #555;
        }
        
        .progress-bar {
          width: 100%;
          height: 10px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 5px;
        }
        
        .theme-dark .progress-bar {
          background-color: rgba(44, 62, 44, 0.5);
        }
        
        .theme-blue .progress-bar {
          background-color: rgba(230, 242, 255, 0.5);
        }
        
        .progress-fill {
          height: 100%;
          background-color: #8bc34a;
          border-radius: 5px;
        }
        
        .theme-dark .progress-fill {
          background-color: #689f38;
        }
        
        .theme-blue .progress-fill {
          background-color: #4a90e2;
        }
        
        .subject-stats {
          font-size: 12px;
          color: #666;
        }
        
        .theme-dark .subject-stats {
          color: #aaa;
        }
        
        .theme-blue .subject-stats {
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;