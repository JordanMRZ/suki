import React, { useEffect } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import RaccoonMascot from '../components/RaccoonMascot';

const subjects = [
  {
    id: 'etica',
    name: 'Ética y Valores',
    progressKey: 'Ética y Valores',
    icon: '🧠',
    accent: '#FFE0B2',
    monsterColor: '#FF9A3C'
  },
  {
    id: 'matematicas',
    name: 'Matemáticas',
    progressKey: 'Matemáticas',
    icon: '➗',
    accent: '#CBE5FF',
    monsterColor: '#4A90E2'
  },
  {
    id: 'ingles',
    name: 'Inglés',
    progressKey: 'Inglés',
    icon: '🔤',
    accent: '#DCD3FF',
    monsterColor: '#7C6FF0'
  },
  {
    id: 'biologia',
    name: 'Biología',
    progressKey: 'Biología',
    icon: '🧬',
    accent: '#CFF7C1',
    monsterColor: '#4CAF50'
  },
  {
    id: 'historia',
    name: 'Historia',
    progressKey: 'Historia',
    icon: '🏛️',
    accent: '#E9D2FF',
    monsterColor: '#A64AC9'
  },
  {
    id: 'espanol',
    name: 'Español',
    progressKey: 'Español',
    icon: '📚',
    accent: '#FFF2B4',
    monsterColor: '#FFC107'
  }
];

const missions = [
  'Completa 3 actividades de cualquier materia',
  'Consigue 20 puntos hoy',
  'Visita una materia nueva'
];

const InteractiveMap = () => {
  const {
    speakText,
    fontSize,
    highContrast,
    theme,
    textToSpeech,
    setTextToSpeech,
    stopSpeaking
  } = useAccessibility();
  const { user, userProgress, updateTime } = useUser();
  const navigate = useNavigate();
  
  const mapMessage = 'Bienvenido al mapa interactivo. Selecciona una materia para comenzar a aprender.';
  const displayName = user?.name || 'Mariana';

  useEffect(() => {
    speakText(mapMessage);
    const startTime = Date.now();
    
    return () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      updateTime(elapsedTime, 'Mapa');
    };
  }, [speakText, mapMessage, updateTime]);

  const handleSubjectSelect = (subject) => {
    speakText(`Has seleccionado ${subject.name}`);
    setTimeout(() => {
      navigate(`/subject/${subject.id}`);
    }, 700);
  };

  const handleSettingsClick = () => {
    speakText('Configuración');
    navigate('/settings');
  };

  const handleProfileClick = () => {
    speakText('Perfil de usuario');
    navigate('/profile');
  };

  const handleBackHome = () => {
    speakText('Volver al inicio');
    navigate('/');
  };

  const handleSoundToggle = () => {
    const enabled = !textToSpeech;
    setTextToSpeech(enabled);

    if (enabled) {
      setTimeout(() => speakText('Sonido activado'), 150);
    } else {
      stopSpeaking();
    }
  };

  const getThemeClass = () => {
    switch (theme) {
      case 'dark':
        return 'theme-dark';
      case 'blue':
        return 'theme-blue';
      default:
        return 'theme-pastel';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small':
        return 'font-small';
      case 'large':
        return 'font-large';
      default:
        return 'font-medium';
    }
  };

  const getContrastClass = () => (highContrast ? 'high-contrast' : '');

  const trackHeight = subjects.length * 150 + 80;
  const totalMinutes = Math.max(0, Math.round(userProgress.totalTime / 60));
  const favoriteSubjects = [...subjects]
    .sort(
      (a, b) =>
        (userProgress.timeBySubject[b.progressKey] || 0) -
        (userProgress.timeBySubject[a.progressKey] || 0)
    )
    .slice(0, 3);

  return (
    <div className={`map-page ${getThemeClass()} ${getFontSizeClass()} ${getContrastClass()}`}>
      <div className="floating-clouds" aria-hidden="true">
        <span className="cloud cloud-1" />
        <span className="cloud cloud-2" />
        <span className="cloud cloud-3" />
        <span className="cloud cloud-4" />
      </div>

      <div className="map-layout">
        <aside className="map-panel">
          <div className="panel-actions">
            <button className="action-pill" onClick={handleProfileClick}>
              <span role="img" aria-hidden="true">
                👓
              </span>
            Perfil
          </button>
            <button className="action-pill" onClick={handleSettingsClick}>
              <span role="img" aria-hidden="true">
                ⚙️
              </span>
              Accesibilidad
          </button>
            <button className="action-pill" onClick={handleSoundToggle}>
              <span role="img" aria-hidden="true">
                {textToSpeech ? '🔊' : '🔇'}
              </span>
              Sonido
          </button>
        </div>

          <div className="user-card">
            <div className="user-avatar">
              <RaccoonMascot size="small" animated={false} />
            </div>
            <div className="user-info">
              <span className="user-name">{displayName}</span>
              <span className="user-level">Lv {userProgress.level}</span>
            </div>
          </div>

          <section className="missions-card">
            <h2>Misiones Diarias</h2>
            <ul>
              {missions.map((mission) => (
                <li key={mission}>{mission}</li>
              ))}
            </ul>
          </section>

          <section className="subjects-section">
            <div className="subjects-header">
              <h2>Materias</h2>
              <span className="subjects-subtitle">Explora el camino de aventuras</span>
            </div>

            <div className="path-wrapper" style={{ height: `${trackHeight}px` }}>
              <div className="path-line" />
              <div className="path-dots" />

              {subjects.map((subject, index) => {
                const subjectProgress = userProgress.subjects[subject.progressKey] || {
                  level: 1,
                  completedLevels: []
                };
                const isCompleted = subjectProgress.completedLevels.length >= 5;
            
            return (
                  <button
                key={subject.id}
                    className={`subject-stop ${isCompleted ? 'completed' : ''}`}
                style={{
                      '--stop-index': index,
                      '--accent-color': subject.accent
                }}
                onClick={() => handleSubjectSelect(subject)}
                  >
                    <span
                      className="subject-monster"
                      style={{ backgroundColor: subject.monsterColor }}
                      aria-hidden="true"
                    >
                      {subject.icon}
                    </span>
                    <span className="subject-details">
                      <span className="subject-name">{subject.name}</span>
                      <span className="subject-level-badge">
                        Nivel {subjectProgress.level}
                      </span>
                    </span>
                  </button>
            );
          })}
        </div>
        
            <div className="mascot-peek" aria-hidden="true">
              <RaccoonMascot size="medium" animated={true} />
            </div>
          </section>
        </aside>

        <section className="detail-panel">
          <div className="detail-card highlight">
            <h2>Tu progreso hoy</h2>
            <p>
              Has acumulado <strong>{userProgress.points}</strong> puntos y estás en el nivel{' '}
              <strong>{userProgress.level}</strong>.
            </p>
            <p>
              Tiempo total de aprendizaje: <strong>{totalMinutes}</strong> minutos.
            </p>
            <button className="back-home-button" onClick={handleBackHome}>
              Volver al inicio
            </button>
          </div>
          
          <div className="detail-grid">
            <div className="detail-card">
            <h3>Logros</h3>
            <p>{userProgress.achievements.length} logros desbloqueados</p>
              <p className="detail-hint">¡Sigue avanzando para conseguir más!</p>
            </div>
            <div className="detail-card">
              <h3>Sesión actual</h3>
              <p>{Math.max(1, totalMinutes)} minutos en total</p>
              <p className="detail-hint">Recuerda descansar cada 20 minutos.</p>
            </div>
            <div className="detail-card timeline">
              <h3>Materias favoritas</h3>
              <ul>
                {favoriteSubjects.map((subject) => {
                  const time = Math.round(
                    (userProgress.timeBySubject[subject.progressKey] || 0) / 60
                  );

                  return (
                    <li key={subject.id}>
                      <span
                        className="favorite-dot"
                        style={{ backgroundColor: subject.monsterColor }}
                      />
                      {subject.name}
                      <span className="favorite-time">{time} min</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
        </div>

      <style jsx>{`
        .map-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          padding: 40px 24px;
          overflow: hidden;
        }

        .floating-clouds {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .cloud {
          position: absolute;
          background: rgba(255, 255, 255, 0.65);
          border-radius: 50%;
          filter: blur(0.5px);
          animation: float 18s linear infinite;
        }

        .cloud-1 {
          width: 220px;
          height: 120px;
          top: 50px;
          left: 10%;
        }

        .cloud-2 {
          width: 180px;
          height: 100px;
          top: 220px;
          right: 12%;
          animation-delay: 4s;
        }

        .cloud-3 {
          width: 260px;
          height: 130px;
          bottom: 120px;
          left: 18%;
          animation-delay: 8s;
        }

        .cloud-4 {
          width: 200px;
          height: 110px;
          bottom: 40px;
          right: 6%;
          animation-delay: 12s;
        }

        .map-layout {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          gap: 40px;
          align-items: flex-start;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .map-panel {
          width: 380px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
          border-radius: 36px;
          padding: 28px 26px 40px;
          box-shadow: 0 22px 45px rgba(109, 192, 132, 0.25);
          position: relative;
          overflow: hidden;
        }

        .map-panel::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top left, rgba(171, 230, 193, 0.35), transparent 60%);
          pointer-events: none;
        }

        .panel-actions {
          display: flex;
          gap: 12px;
          justify-content: space-between;
          margin-bottom: 26px;
        }

        .action-pill {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 24px;
          border: none;
          font-weight: 600;
          font-size: 14px;
          background: rgba(143, 214, 168, 0.25);
          color: #2d7a2d;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .action-pill:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 16px rgba(91, 168, 116, 0.25);
        }

        .user-card {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 16px 18px;
          border-radius: 24px;
          background: rgba(223, 247, 225, 0.85);
          box-shadow: inset 0 0 0 2px rgba(134, 204, 150, 0.35);
          margin-bottom: 22px;
        }

        .user-avatar {
          width: 84px;
          height: 84px;
          border-radius: 28px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 10px 18px rgba(91, 168, 116, 0.25);
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
        }

        .user-name {
          font-size: 20px;
          font-weight: 700;
          color: #2b6c3a;
        }

        .user-level {
          font-size: 14px;
          font-weight: 600;
          color: #4b9360;
          background: rgba(134, 204, 150, 0.25);
          padding: 4px 12px;
          border-radius: 999px;
        }

        .missions-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          padding: 18px 20px;
          box-shadow: 0 12px 22px rgba(79, 141, 100, 0.18);
          margin-bottom: 24px;
        }

        .missions-card h2 {
          margin: 0 0 12px;
          font-size: 18px;
          color: #376944;
        }

        .missions-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .missions-card li {
          background: rgba(223, 247, 225, 0.6);
          border-radius: 16px;
          padding: 10px 12px;
          font-size: 14px;
          color: #2d6f3f;
          box-shadow: inset 0 0 0 1px rgba(134, 204, 150, 0.35);
        }

        .subjects-section {
          position: relative;
          padding-bottom: 40px;
        }

        .subjects-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .subjects-header h2 {
          margin: 0;
          font-size: 22px;
          color: #2b6c3a;
        }

        .subjects-subtitle {
          font-size: 13px;
          font-weight: 600;
          color: #4f9160;
        }

        .path-wrapper {
          --item-spacing: 130px;
          position: relative;
          margin: 24px auto 0;
          min-height: calc((var(--item-spacing) * ${subjects.length - 1}) + 120px);
          width: 100%;
          max-width: 320px;
        }

        .path-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 20px;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(134, 204, 150, 0.45) 0%, rgba(134, 204, 150, 0.9) 100%);
          filter: drop-shadow(0 12px 16px rgba(88, 158, 110, 0.18));
          transform: translateX(-50%);
        }

        .path-dots {
          position: absolute;
          left: 50%;
          top: 16px;
          bottom: 16px;
          width: 2px;
          background: repeating-linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.92) 0,
            rgba(255, 255, 255, 0.92) 14px,
            transparent 14px,
            transparent 28px
          );
          transform: translateX(-50%);
        }

        .subject-stop {
          position: absolute;
          left: 50%;
          top: calc(var(--stop-index) * var(--item-spacing));
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 14px 18px;
          width: 260px;
          border: none;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.92);
          cursor: pointer;
          box-shadow: 0 14px 24px rgba(88, 158, 110, 0.22);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          transform: translate(-50%, 0);
        }

        .subject-stop:hover {
          transform: translate(-50%, -6px);
          box-shadow: 0 18px 28px rgba(76, 136, 100, 0.28);
        }

        .subject-stop.completed {
          box-shadow: 0 18px 32px rgba(255, 215, 0, 0.35);
        }

        .subject-monster {
          width: 66px;
          height: 66px;
          border-radius: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          color: #ffffff;
          box-shadow: inset 0 -6px 0 rgba(0, 0, 0, 0.18);
        }

        .subject-details {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .subject-name {
          font-size: 16px;
          font-weight: 700;
          color: #25623a;
        }

        .subject-level-badge {
          margin-top: 6px;
          padding: 4px 12px;
          border-radius: 999px;
          background-color: var(--accent-color, #def5d8);
          color: #1f4c2d;
          font-size: 12px;
          font-weight: 600;
        }

        .subject-stop.completed .subject-level-badge {
          background-color: #ffe694;
          color: #724900;
        }

        .mascot-peek {
          position: absolute;
          right: -34px;
          bottom: 40px;
          width: 200px;
          transform: rotate(4deg);
          pointer-events: none;
        }

        .detail-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .detail-card {
          background: rgba(255, 255, 255, 0.92);
          border-radius: 28px;
          padding: 26px;
          box-shadow: 0 22px 38px rgba(89, 156, 116, 0.18);
          position: relative;
        }

        .highlight {
          background: linear-gradient(135deg, #e8ffec 0%, rgba(255, 255, 255, 0.9) 100%);
        }

        .detail-card h2,
        .detail-card h3 {
          margin-top: 0;
          color: #2d6f3f;
        }

        .detail-card p {
          margin: 10px 0;
          color: #356b42;
          line-height: 1.4;
        }

        .detail-hint {
          font-size: 13px;
          color: #4b9360;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .timeline ul {
          list-style: none;
          margin: 12px 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .timeline li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          color: #2f6740;
        }

        .favorite-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 12px;
        }

        .favorite-time {
          font-weight: 600;
          color: #296236;
          margin-left: 12px;
        }

        .back-home-button {
          margin-top: 16px;
          padding: 12px 20px;
          border-radius: 22px;
          border: none;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          background: #8bc34a;
          color: white;
          box-shadow: 0 12px 20px rgba(139, 195, 74, 0.32);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .back-home-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 26px rgba(139, 195, 74, 0.4);
        }

        @keyframes float {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(20px);
          }
          100% {
            transform: translateX(0);
          }
        }

        @media (max-width: 1100px) {
          .map-layout {
            flex-direction: column;
            align-items: center;
          }

          .map-panel {
            width: 100%;
            max-width: 420px;
          }

          .detail-panel {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .map-page {
            padding: 24px 16px;
          }

          .panel-actions {
            flex-direction: column;
          }

          .subject-stop {
            left: 0;
            width: 100%;
          }

          .path-wrapper {
            min-height: 600px;
          }

          .detail-grid {
            grid-template-columns: 1fr;
          }
        }

        .theme-dark .map-panel {
          background: linear-gradient(180deg, rgba(44, 62, 44, 0.95) 0%, rgba(35, 53, 35, 0.92) 100%);
          box-shadow: 0 22px 45px rgba(16, 32, 20, 0.6);
        }

        .theme-dark .action-pill {
          background: rgba(104, 159, 56, 0.35);
          color: #e3ffe7;
        }

        .theme-dark .user-card {
          background: rgba(35, 53, 35, 0.92);
          box-shadow: inset 0 0 0 2px rgba(104, 159, 56, 0.4);
        }

        .theme-dark .missions-card,
        .theme-dark .subject-stop,
        .theme-dark .detail-card {
          background: rgba(33, 49, 33, 0.92);
          color: #d0f6d0;
        }

        .theme-dark .subject-name,
        .theme-dark .detail-card p,
        .theme-dark .favorite-time,
        .theme-dark .subjects-subtitle {
          color: #c4efc4;
        }

        .theme-dark .subject-level-badge {
          color: #18331f;
        }

        .theme-dark .detail-card h2,
        .theme-dark .detail-card h3 {
          color: #c9f2c9;
        }

        .theme-dark .back-home-button {
          background: #7cb342;
        }

        .theme-blue .map-panel {
          background: linear-gradient(180deg, rgba(230, 242, 255, 0.95) 0%, rgba(212, 229, 255, 0.9) 100%);
        }

        .theme-blue .action-pill {
          background: rgba(116, 167, 214, 0.25);
          color: #285d8d;
        }

        .theme-blue .user-card {
          background: rgba(210, 232, 255, 0.85);
          box-shadow: inset 0 0 0 2px rgba(116, 167, 214, 0.35);
        }

        .theme-blue .missions-card,
        .theme-blue .detail-card,
        .theme-blue .subject-stop {
          background: rgba(240, 247, 255, 0.94);
        }

        .theme-blue .subject-name,
        .theme-blue .detail-card p,
        .theme-blue .favorite-time,
        .theme-blue .subjects-subtitle {
          color: #2d5a7a;
        }

        .theme-blue .back-home-button {
          background: #4a90e2;
          box-shadow: 0 12px 20px rgba(74, 144, 226, 0.3);
        }
      `}</style>
    </div>
  );
};

export default InteractiveMap;