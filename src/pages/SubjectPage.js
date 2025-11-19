import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAccessibility } from "../context/AccessibilityContext";
import { useUser } from "../context/UserContext";
import { getQuestions } from "../utils/questionsData";

export default function SubjectPage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const { speakText, fontSize, highContrast, theme } = useAccessibility();
  const { addPoints } = useUser();

  const subjectNames = {
    etica: "1. Ética y Valores",
    matematicas: "2. Matemáticas",
    ingles: "3. Inglés",
    biologia: "4. Biologia",
    historia: "5. Historia",
    espanol: "6. Español",
  };

  const subjectName = subjectNames[subjectId] || "Materia";

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const qs = getQuestions(subjectName, 1);
    setQuestions(qs);
    if (qs[0]) speakText(qs[0].question);
  }, [subjectName, speakText]);

  const current = questions[index];

  if (!current) return <p>Cargando...</p>;

  function handleOptionClick(i) {
    if (checked) return;
    setSelected(i);
  }

  function handleCheck() {
    if (selected === null) return;

    const correct = selected === current.correctAnswer;
    setChecked(true);

    speakText(correct ? "Correcto" : "Incorrecto");

    if (correct) addPoints(10, subjectName);
  }

  function handleNext() {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
      setChecked(false);
      speakText(questions[index + 1].question);
    } else {
      navigate("/map");
    }
  }

  return (
    <div className="page-container">
      {/* Encabezado */}
      <div className="header">
        <button className="back" onClick={() => navigate("/map")}>←</button>
        <h2 className="subject-title">{subjectName}</h2>
      </div>

      {/* Progreso con hojita SVG */}
<div className="progress-wrapper">
  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${((index + 1) / questions.length) * 100}%` }}
    ></div>
  </div>

  {/* Hojita SVG con el número dentro */}
  <div className="progress-leaf">
    {index + 1}/{questions.length}
  </div>
</div>


      {/* Pregunta */}
      <div className="question-section">
        <h3 className="question-label">Pregunta {index + 1}</h3>
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
      Siguiente
    </button>
  )}
</div>


      <style jsx>{`
        .page-container {
          background: #f2ffe9;
          min-height: 100vh;
          padding: 25px;
          display: flex;
          flex-direction: column;
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
          font-size: 22px;
          color: #4caf50;
          font-weight: bold;
        }

        /* ===== HOJITA SVG DEL PROGRESO ===== */
.progress-wrapper {
  margin-top: 15px;
  text-align: center;
  position: relative;
}

/* línea verde original */
.progress-bar {
  width: 80%;
  margin: 0 auto;
  height: 6px;
  background: #cdecc5;
  border-radius: 10px;
  overflow: hidden;
}

/* hoja SVG */
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
  font-size: 14px;
  font-weight: 700;
}

        .progress-fill {
          height: 100%;
          background: #4caf50;
          transition: 0.3s;
        }

        .progress-text {
          margin-top: 5px;
          display: block;
          color: #4caf50;
          font-weight: bold;
        }

        .question-section {
          margin-top: 35px;
          text-align: center;
        }

        .question-label {
          color: #4caf50;
          font-size: 18px;
          margin-bottom: 20px;
        }

        .question-text {
          font-size: 38px;
          color: #2e7d32;
          margin-bottom: 15px;
          font-weight: bold;
        }

        .select-text {
          margin-top: 10px;
          font-size: 16px;
          color: #2e7d32;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 25px;
        }

        .option-btn {
          background: #ffffff;
          border: 2px solid #4caf50;
          padding: 18px;
          border-radius: 25px;
          font-size: 18px;
          cursor: pointer;
          transition: 0.2s;
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

        .check-btn,
        .next-btn {
          margin-top: auto;
          background: #4caf50;
          border: none;
          color: white;
          padding: 15px;
          border-radius: 25px;
          font-size: 18px;
          cursor: pointer;
          width: 100%;
          max-width: 350px;
          align-self: center;
          margin-bottom: 20px;
        }
.footer {
  width: 90%;
  display: flex;
  justify-content: center;
  margin-top: auto; /* Empuja el botón hacia abajo */
  margin-bottom: 20px;
  background: transparent;
}

.comprobar-btn {
  width: 100%;
  max-width: 350px;
  background: #57A863;
  color: white;
  border: none;
  padding: 16px 0;
  border-radius: 14px;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  display: block;
}


  .next {
    background: #57A863;
  }
      `}</style>
    </div>
  );
}
