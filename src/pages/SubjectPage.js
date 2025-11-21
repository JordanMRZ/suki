import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getQuestions } from "../utils/questionsData.js"
import { useChildData } from "../hooks/useChildData.js"

// Define la recompensa de XP fija al finalizar la lección
const FIXED_XP_REWARD = 10; 

export default function SubjectPage() {
  const { subjectId, level: levelFromParams } = useParams()
  const navigate = useNavigate()

  const { updatePlayerXP, updateMissionProgress } = useChildData()

  const level = levelFromParams ? parseInt(levelFromParams) : 1

  const subjectNames = {
    lenguaje: "Ética y Valores",
    matematicas: "2. Matemáticas",
    ingles: "3. Inglés",
    biologia: "4. Biologia",
    historia: "5. Historia",
    espanol: "6. Español",
  }

  const subjectName = subjectNames[subjectId] || "Materia"
   
  // --- Estados de la Lección ---
  const [questions, setQuestions] = useState([]) 
  const [incorrectQuestions, setIncorrectQuestions] = useState([]) 
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [isReviewMode, setIsReviewMode] = useState(false); 
  
  // Guardamos el total original de preguntas para mostrarlo al final correctamente
  const [originalTotalQuestions, setOriginalTotalQuestions] = useState(0);

  // Carga inicial de preguntas
  useEffect(() => {
    const qs = getQuestions(subjectName, level)
    setQuestions(qs)
    setOriginalTotalQuestions(qs.length); // Guardamos cuántas eran al principio
  }, [subjectName, level])

  function handleOptionClick(i) {
    if (checked) return
    setSelected(i)
  }

  function handleCheck() {
    if (selected === null) return
    setChecked(true)
  }
   
  const finishLesson = useCallback(async (finalScore, totalQs) => {
    const xpGained = FIXED_XP_REWARD; 

    const updatePromises = [];
    
    updatePromises.push(updatePlayerXP(xpGained));
    updatePromises.push(updateMissionProgress(1, finalScore)); 

    try {
        await Promise.all(updatePromises);
        
        navigate("/completado", { 
            state: { 
                correctCount: finalScore, 
                totalQuestions: totalQs,
                xpGained: xpGained 
            } 
        });
    } catch (error) {
        console.error("Error al finalizar lección y actualizar datos:", error);
    }
  }, [navigate, updatePlayerXP, updateMissionProgress]);

  const current = questions[index]
  // Usamos questions.length para la barra de progreso actual, pero originalTotalQuestions para el final
  const currentTotalQuestions = questions.length 

  if (!current) return <p>Cargando...</p>


  function handleNext() {
    let isCorrect = selected === current.correctAnswer;
    
    let nextScore = score;
    let newIncorrectQuestions = [...incorrectQuestions];

    // 1. Verificar respuesta
    if (checked) {
      if (isCorrect) {
        nextScore = score + 1; 
      } else {
        // CAMBIO CLAVE:
        // Siempre agregamos a incorrectas si falló, sin importar si es modo repaso o no.
        // Esto asegura que si falla la corrección, se la vuelva a preguntar.
        newIncorrectQuestions.push(current);
      }
    }

    // 2. Avanzar a la siguiente pregunta del lote actual
    if (index + 1 < questions.length) {
      setScore(nextScore);
      setIncorrectQuestions(newIncorrectQuestions);
      setIndex(index + 1);
      setSelected(null);
      setChecked(false);
    } else {
      // 3. FIN DEL CICLO ACTUAL

      if (newIncorrectQuestions.length > 0) {
        // AÚN HAY ERRORES (O NUEVOS ERRORES EN LA CORRECCIÓN)
        
        // Preparamos el siguiente ciclo solo con las fallidas
        setQuestions(newIncorrectQuestions); 
        setIncorrectQuestions([]); // Limpiamos el acumulador para el nuevo ciclo
        
        setIndex(0); 
        setScore(0); // Reiniciamos score visual (opcional)
        setSelected(null);
        setChecked(false);
        
        // Activamos modo corrección (si no estaba ya activo)
        if (!isReviewMode) setIsReviewMode(true);
        
        console.log(`Fallo ${newIncorrectQuestions.length} preguntas. Reiniciando ciclo de corrección.`);
        
      } else {
        // CERO ERRORES PENDIENTES. ¡TERMINADO!
        
        // Si llegamos aquí, el usuario eventualmente corrigió todo.
        // El puntaje final visualmente será el total original (100%).
        const finalCorrectCount = originalTotalQuestions; 
        
        finishLesson(finalCorrectCount, originalTotalQuestions); 
      }
    }
  }

  const titleText = isReviewMode 
    ? "¡Vamos a Corregir! 🧠" 
    : subjectName;
    
  const questionLabelText = isReviewMode 
    ? `Repaso (${index + 1} de ${questions.length})` 
    : `Pregunta ${index + 1}`;

  return (
    <div className="page-container">
      {/* Encabezado */}
      <div className="header">
        <svg className="back" onClick={() => navigate("/main")} xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
        <path d="M12.8672 21.0938L5.27344 13.5L12.8672 5.90625M6.32812 13.5H21.7266" stroke="#56A74F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        <h2 className="subject-title">{titleText}</h2>
      </div>

      {/* Progreso con hojita SVG */}
      <div className="progress-wrapper">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((index + 1) / questions.length) * 100}%` }}></div>
        </div>

        {/* Hojita SVG con el número dentro */}
        <div className="progress-leaf">
          {index + 1}/{questions.length}
        </div>
      </div>

      {/* Pregunta */}
      <div className="question-section">
        <h3 className="question-label">{questionLabelText}</h3>
        <h1 className="question-text">{current.question}</h1>
        <p className="select-text">Selecciona el resultado correcto:</p>

        <div className="options-grid">
          {current.options.map((option, i) => (
            <button
              key={i}
              className={`option-btn 
                ${selected === i ? "selected" : ""} 
                ${checked && i === current.correctAnswer ? "correct" : ""}
                ${checked && selected === i && i !== current.correctAnswer ? "incorrect" : ""}
              `}
              onClick={() => handleOptionClick(i)}
              disabled={checked}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="footer">
        {!checked ? (
          <button className="comprobar-btn" onClick={handleCheck}>
            Comprobar
          </button>
        ) : (
          <button className="comprobar-btn next" onClick={handleNext}>
            {index + 1 < questions.length 
                ? "Siguiente Pregunta" 
                : (incorrectQuestions.length > 0 || (selected !== current.correctAnswer)) 
                    ? "Corregir Errores" // Si hay errores acumulados o la actual está mala
                    : "Finalizar Lección" // Si todo está perfecto
            }
          </button>
        )}
      </div>

      {/* Estilos JSX */}
      <style jsx>{`
        .page-container {
          background: #f2ffe9;
          padding: 25px;
          display: flex;
          flex-direction: column;
          min-height: 100vh; 
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .back {
          position: absolute;
          left: 0;
          background: none;
          border: none;
          font-size: 22px;
          cursor: pointer;
          color: #4caf50;
        }

        .subject-title {
          font-size: 24px;
          color: #4caf50;
          font-weight: 700;
          font-family: 'Quicksand';
        }

        .progress-wrapper {
          margin-top: 15px;
          text-align: center;
          position: relative;
        }

        .progress-bar {
          width: 80%;
          margin: 0 auto;
          height: 6px;
          background: #cdecc5;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-leaf {
          width: 64px;
          height: 23px;
          margin: 0 auto;
          margin-top: 10px;

          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='23' viewBox='0 0 64 23' fill='none'><path d='M0 23C0 10.2975 10.2975 0 23 0H64C64 12.7025 53.7025 23 41 23H0Z' fill='%2356A74F'/></svg>");
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;

          display: flex;
          align-items: center;
          justify-content: center;

          color: white;
          font-size: 16px;
          font-weight: 600;
          font-family: 'Quicksand';
        }

        .progress-fill {
          height: 100%;
          background: #4caf50;
          transition: 0.3s;
        }

        .question-section {
          margin-top: 15px;
          text-align: center;
          flex-grow: 1; 
        }

        .question-label {
          color: #4caf50;
          font-size: 26px;
          margin-bottom: 10px;
          font-weight: 700;
          font-family: 'Quicksand';
        }

        .question-text {
          font-size: 50px;
          color: #2e7d32;
          margin-bottom: 15px;
          font-weight: 700;
          font-family: 'Quicksand';
          word-wrap: break-word;
        }

        .select-text {
          margin-top: 10px;
          font-size: 16px;
          color: #2e7d32;
          font-family: 'Quicksand';
          font-weight: 700;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 25px;
        }

        .option-btn {
          background: #ffffff;
          border: 3px solid #4caf50;
          padding: 18px;
          border-radius: 25px;
          font-size: 18px;
          cursor: pointer;
          transition: 0.2s;
          font-family: 'Mulish';
          font-weight: 400;
        }

        .option-btn.selected {
          background: #c6efc6;
        }

        .option-btn.correct {
          background: #4caf50;
          color: white;
        }

        .option-btn.incorrect {
          background: #e56666;
          color: white;
        }

        .footer {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: auto;
          margin-bottom: 20px;
          background: transparent;
        }

        .comprobar-btn {
          width: 100%;
          margin-top: 20px;
          background: #57A863;
          color: white;
          border: none;
          padding: 16px 0;
          border-radius: 14px;
          font-size: 17px;
          font-weight: 600;
          text-align: center;
          display: block;
          cursor: pointer;
          font-weight: 700;
          font-family: 'Quicksand';
        }

        .next {
          background: #57A863;
        }
      `}</style>
    </div>
  )
}