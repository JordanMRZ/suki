import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAccessibility } from '../context/AccessibilityContext';
import { useUser } from '../context/UserContext';
import { getQuestions } from '../utils/questionsData';
import RaccoonMascot from '../components/RaccoonMascot';

const SubjectPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { speakText, fontSize, highContrast, theme } = useAccessibility();
  const { userProgress, addPoints, completeLevel, addAchievement, updateTime } = useUser();
  
  // Estados para el manejo de preguntas
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  
  // Referencia para el temporizador
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const initializedRef = useRef(false);
  
  // Mapeo de IDs de materia a nombres
  const subjectNames = {
    'etica': 'Ética y Valores',
    'matematicas': 'Matemáticas',
    'ingles': 'Inglés',
    'biologia': 'Biología',
    'historia': 'Historia',
    'espanol': 'Español'
  };
  
  const subjectName = subjectNames[subjectId] || 'Materia';
  const currentLevel = userProgress.subjects[subjectName]?.level || 1;
  
  // Mensajes de accesibilidad
  const welcomeMessage = useMemo(() => `Bienvenido a ${subjectName}, nivel ${currentLevel}`, [subjectName, currentLevel]);
  const correctMessage = "¡Correcto! ¡Muy bien hecho!";
  const incorrectMessage = "Incorrecto. ¡Inténtalo de nuevo!";
  const levelCompletedMessage = useMemo(() => `¡Felicidades! Has completado el nivel ${currentLevel} de ${subjectName}`, [subjectName, currentLevel]);
  const backMessage = "Volver al mapa";
  
  // Función para preparar preguntas mezcladas para el nivel
  const prepareShuffledQuestions = useCallback(() => {
    const allQuestions = getQuestions(subjectName, currentLevel);

    // Mezclar las preguntas usando el algoritmo de Fisher-Yates
    const shuffled = [...allQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setShuffledQuestions(shuffled);
    setQuestionIndex(0);
    setQuestionsAnswered(0);
    setCorrectAnswers(0);
    setLevelCompleted(false);

    // Cargar la primera pregunta
    if (shuffled.length > 0) {
      setCurrentQuestion(shuffled[0]);
      speakText(shuffled[0].question);
    }
  }, [subjectName, currentLevel, speakText]);

  useEffect(() => {
    // Leer el mensaje de bienvenida al cargar la página
    speakText(welcomeMessage);

    // Preparar preguntas mezcladas para el nivel
    prepareShuffledQuestions();

    // Iniciar el temporizador para el tiempo de uso
    startTimeRef.current = Date.now();

    return () => {
      // Calcular el tiempo transcurrido cuando el componente se desmonta
      if (startTimeRef.current) {
        const elapsedTime = (Date.now() - startTimeRef.current) / 1000; // en segundos
        updateTime(elapsedTime, subjectName);
      }

      // Limpiar el temporizador
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [subjectId, speakText, welcomeMessage, updateTime, prepareShuffledQuestions, subjectName]);

  // Efecto para preparar nuevas preguntas cuando cambia el nivel
  useEffect(() => {
    if (currentLevel) {
      prepareShuffledQuestions();
    }
  }, [currentLevel, prepareShuffledQuestions]);

  
  // Función para manejar la selección de respuesta
  const handleAnswerSelect = useCallback((index) => {
    if (showFeedback) return;
    
    setSelectedAnswer(index);
    const correct = index === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    setShowNextButton(true);
    
    // Leer el feedback en voz alta
    speakText(correct ? correctMessage : incorrectMessage);
    
    // Actualizar estadísticas usando el estado actualizado
    setQuestionsAnswered(prevQuestionsAnswered => {
      const newQuestionsAnswered = prevQuestionsAnswered + 1;
      
      if (correct) {
        setCorrectAnswers(prevCorrectAnswers => {
          const newCorrectAnswers = prevCorrectAnswers + 1;
          // Añadir puntos según la dificultad
          addPoints(10, subjectName);
          return newCorrectAnswers;
        });
      }
      
      return newQuestionsAnswered;
    });
  }, [showFeedback, currentQuestion, speakText, correctMessage, incorrectMessage, addPoints, subjectName]);
  
  // Función para verificar si se ha completado el nivel
  const checkLevelCompletion = useCallback(() => {
    const successRate = correctAnswers / 10; // 10 preguntas por nivel

    if (successRate >= 0.7) { // 70% de respuestas correctas para pasar de nivel
      setLevelCompleted(true);
      completeLevel(subjectName, currentLevel);

      // Verificar logros
      if (currentLevel === 1) {
        addAchievement(`Primeros pasos en ${subjectName}`);
      }

      speakText(levelCompletedMessage);
    } else {
      // Si no se ha completado el nivel, volver a empezar
      speakText(`Necesitas practicar más. Intenta el nivel ${currentLevel} de nuevo.`);
      prepareShuffledQuestions();
    }
  }, [correctAnswers, completeLevel, subjectName, currentLevel, addAchievement, speakText, levelCompletedMessage, prepareShuffledQuestions]);

  // Función para manejar el botón "Siguiente"
  const handleNextQuestion = useCallback(() => {
    if (questionsAnswered >= 10) { // Si es la última pregunta (1-10)
      checkLevelCompletion();
    } else {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);

      if (nextIndex < shuffledQuestions.length) {
        const question = shuffledQuestions[nextIndex];
        setCurrentQuestion(question);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setShowNextButton(false);

        // Leer la pregunta en voz alta
        if (question) {
          speakText(question.question);
        }
      }
    }
  }, [questionsAnswered, checkLevelCompletion, questionIndex, shuffledQuestions, speakText]);
  
  // Función para volver al mapa
  const handleBackToMap = useCallback(() => {
    speakText(backMessage);
    navigate('/map');
  }, [speakText, backMessage, navigate]);
  
  // Función para continuar al siguiente nivel
  const handleNextLevel = useCallback(() => {
    navigate('/map');
  }, [navigate]);
  
  // Determinar las clases CSS según las opciones de accesibilidad
  const getThemeClass = useCallback(() => {
    switch (theme) {
      case 'dark': return 'theme-dark';
      case 'blue': return 'theme-blue';
      default: return 'theme-pastel';
    }
  }, [theme]);
  
  const getFontSizeClass = useCallback(() => {
    switch (fontSize) {
      case 'small': return 'font-small';
      case 'large': return 'font-large';
      default: return 'font-medium';
    }
  }, [fontSize]);
  
  const getContrastClass = useCallback(() => {
    return highContrast ? 'high-contrast' : '';
  }, [highContrast]);
  
  // Si no hay pregunta actual, mostrar un mensaje de carga
  if (!currentQuestion) {
    return (
      <div className={`subject-page ${getThemeClass()} ${getFontSizeClass()} ${getContrastClass()}`}>
        <div className="loading-container">
          <p>Cargando pregunta...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`subject-page ${getThemeClass()} ${getFontSizeClass()} ${getContrastClass()}`}>
      {/* Barra de navegación */}
      <nav className="navbar">
        <div className="logo">Suki</div>
        <div className="nav-info">
          <span className="subject-info">{subjectName} - Nivel {currentLevel}</span>
          <button className="back-button" onClick={handleBackToMap}>
            Volver
          </button>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="main-content">
        <div className="question-container">
          {/* Progreso */}
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(questionsAnswered / 10) * 100}%` }}
            ></div>
            <span className="progress-text">{questionsAnswered}/10</span>
          </div>
          
          {/* Mapache guía */}
          <div className="mascot-container">
            <RaccoonMascot size="medium" animated={true} />
          </div>
          
          {/* Pantalla de nivel completado */}
          {levelCompleted ? (
            <div className="level-completed">
              <h2 className="completed-title">¡Nivel Completado!</h2>
              <div className="completed-stats">
                <p>Has respondido correctamente {correctAnswers} de 10 preguntas</p>
                <p>Has ganado {correctAnswers * 10} puntos</p>
              </div>
              <button 
                className="next-level-button"
                onClick={handleNextLevel}
              >
                Continuar
              </button>
            </div>
          ) : (
            <>
              {/* Pregunta */}
              <div className="question-box">
                <h2 className="question-text">{currentQuestion.question}</h2>
                
                {/* Opciones de respuesta */}
                <div className="options-container">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      className={`option-button ${
                        selectedAnswer === index 
                          ? (isCorrect ? 'correct' : 'incorrect') 
                          : ''
                      } ${
                        showFeedback && index === currentQuestion.correctAnswer 
                          ? 'correct' 
                          : ''
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showFeedback}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                {/* Feedback */}
                {showFeedback && (
                  <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
                    <p>{isCorrect ? '¡Correcto!' : 'Incorrecto'}</p>
                    {isCorrect && (
                      <div className="points-earned">
                        <p>+10 puntos</p>
                      </div>
                    )}
                    {showNextButton && (
                      <button
                        className="next-button"
                        onClick={handleNextQuestion}
                      >
                        Siguiente
                      </button>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <style jsx>{`
        .subject-page {
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
        
        .nav-info {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .subject-info {
          font-size: 18px;
          font-weight: bold;
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
        
        .question-container {
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          padding: 30px;
          width: 100%;
          max-width: 800px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        .theme-dark .question-container {
          background-color: rgba(44, 62, 44, 0.8);
        }
        
        .theme-blue .question-container {
          background-color: rgba(230, 242, 255, 0.8);
        }
        
        /* Barra de progreso */
        .progress-bar {
          width: 100%;
          height: 30px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 15px;
          margin-bottom: 30px;
          position: relative;
          overflow: hidden;
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
          border-radius: 15px;
          transition: width 0.5s ease;
        }
        
        .theme-dark .progress-fill {
          background-color: #689f38;
        }
        
        .theme-blue .progress-fill {
          background-color: #4a90e2;
        }
        
        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: bold;
        }
        
        /* Mapache */
        .mascot-container {
          margin: 20px 0;
        }
        
        /* Caja de pregunta */
        .question-box {
          margin-top: 20px;
        }
        
        .question-text {
          font-size: 24px;
          margin-bottom: 30px;
        }
        
        /* Opciones de respuesta */
        .options-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .option-button {
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.7);
          border: 2px solid #a8d5a8;
          border-radius: 15px;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .theme-dark .option-button {
          background-color: rgba(44, 62, 44, 0.7);
          border-color: #4a6f4a;
        }
        
        .theme-blue .option-button {
          background-color: rgba(230, 242, 255, 0.7);
          border-color: #6f8fa8;
        }
        
        .option-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .option-button:disabled {
          cursor: not-allowed;
        }
        
        .option-button.correct {
          background-color: #4CAF50;
          color: white;
          border-color: #4CAF50;
        }
        
        .option-button.incorrect {
          background-color: #ff6b6b;
          color: white;
          border-color: #ff6b6b;
        }
        
        /* Feedback */
        .feedback {
          padding: 15px;
          border-radius: 10px;
          font-size: 20px;
          font-weight: bold;
          margin-top: 20px;
        }
        
        .correct-feedback {
          background-color: rgba(76, 175, 80, 0.2);
          color: #2e7d32;
        }
        
        .theme-dark .correct-feedback {
          background-color: rgba(76, 175, 80, 0.3);
        }
        
        .theme-blue .correct-feedback {
          background-color: rgba(76, 175, 80, 0.2);
        }
        
        .incorrect-feedback {
          background-color: rgba(255, 107, 107, 0.2);
          color: #c62828;
        }
        
        .theme-dark .incorrect-feedback {
          background-color: rgba(255, 107, 107, 0.3);
        }
        
        .theme-blue .incorrect-feedback {
          background-color: rgba(255, 107, 107, 0.2);
        }
        
        .points-earned {
          margin-top: 10px;
          font-size: 18px;
        }
        
        .next-button {
          margin-top: 15px;
          padding: 10px 20px;
          background-color: #8bc34a;
          color: white;
          border: none;
          border-radius: 20px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .theme-dark .next-button {
          background-color: #689f38;
        }
        
        .theme-blue .next-button {
          background-color: #4a90e2;
        }
        
        .next-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        /* Pantalla de nivel completado */
        .level-completed {
          text-align: center;
        }
        
        .completed-title {
          font-size: 36px;
          color: #4CAF50;
          margin-bottom: 30px;
        }
        
        .theme-dark .completed-title {
          color: #81C784;
        }
        
        .theme-blue .completed-title {
          color: #4CAF50;
        }
        
        .completed-stats {
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 15px;
          padding: 20px;
          margin-bottom: 30px;
        }
        
        .theme-dark .completed-stats {
          background-color: rgba(44, 62, 44, 0.5);
        }
        
        .theme-blue .completed-stats {
          background-color: rgba(230, 242, 255, 0.5);
        }
        
        .completed-stats p {
          margin: 10px 0;
          font-size: 18px;
        }
        
        .next-level-button {
          padding: 15px 30px;
          background-color: #8bc34a;
          color: white;
          border: none;
          border-radius: 30px;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .theme-dark .next-level-button {
          background-color: #689f38;
        }
        
        .theme-blue .next-level-button {
          background-color: #4a90e2;
        }
        
        .next-level-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }
        
        /* Contenedor de carga */
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 24px;
        }
      `}</style>
    </div>
  );
};

export default SubjectPage;