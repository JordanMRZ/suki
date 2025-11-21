import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChildData } from "../hooks/useChildData.js";
import policia from "../assets/objeto-policia.svg";
import medico from "../assets/objeto-medico.svg";
import bombero from "../assets/objeto-bombero.svg";

const FIXED_XP_REWARD = 10;

export default function SubjectPage() {
  const { subjectId, level: levelFromParams } = useParams();
  const navigate = useNavigate();

  const { updatePlayerXP, updateMissionProgress } = useChildData();

  const level = levelFromParams ? parseInt(levelFromParams) : 1;

  const subjectNames = {
    matematicas: "2. Matemáticas",
  };

  const subjectName = subjectNames[subjectId] || "Materia";

  // ------------------------------
  // PREGUNTAS FIJAS (SIN getQuestions)
  // ------------------------------
const fixedQuestions = [
  {
    question: "¿Qué profesión es?",
    fruit: policia, // importa tu imagen policia.svg
    options: ["Policía", "Doctor", "Bombero", "Chef"],
    correctAnswer: 0,
  },
  {
    question: "¿Qué profesión es?",
    fruit: medico, // importa tu imagen doctor.svg
    options: ["Bombero", "Doctor", "Jardinero", "Chef"],
    correctAnswer: 1,
  },
  {
    question: "¿Qué profesión es?",
    fruit: bombero, // importa tu imagen bombero.svg
    options: ["Doctor", "Chef", "Policía", "Bombero"],
    correctAnswer: 3,
  },
];

  const [questions, setQuestions] = useState(fixedQuestions);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [index, setIndex] = useState(0); // <<--- ESTE ES EL CORRECTO
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [originalTotalQuestions] = useState(fixedQuestions.length);

  const current = questions[index]; // <<--- ARREGLADO

  function handleOptionClick(i) {
    if (checked) return;
    setSelected(i);
  }

  function handleCheck() {
    if (selected === null) return;
    setChecked(true);
  }

  const finishLesson = useCallback(
    async (finalScore, totalQs) => {
      const xpGained = FIXED_XP_REWARD;
      try {
        await Promise.all([
          updatePlayerXP(xpGained),
          updateMissionProgress(1, finalScore),
        ]);

        navigate("/completado", {
          state: {
            correctCount: finalScore,
            totalQuestions: totalQs,
            xpGained,
          },
        });
      } catch (err) {
        console.error(err);
      }
    },
    [navigate, updatePlayerXP, updateMissionProgress]
  );

  function handleNext() {
    const isCorrect = selected === current.correctAnswer;

    let nextScore = score;
    let newIncorrectQuestions = [...incorrectQuestions];

    if (checked) {
      if (isCorrect) nextScore++;
      else newIncorrectQuestions.push(current);
    }

    // Siguiente pregunta
    if (index + 1 < questions.length) {
      setScore(nextScore);
      setIncorrectQuestions(newIncorrectQuestions);
      setIndex(index + 1);
      setSelected(null);
      setChecked(false);
      return;
    }

    // Review mode si hay falladas
    if (newIncorrectQuestions.length > 0) {
      setQuestions(newIncorrectQuestions);
      setIncorrectQuestions([]);
      setIndex(0);
      setScore(0);
      setSelected(null);
      setChecked(false);
      if (!isReviewMode) setIsReviewMode(true);
      return;
    }

    // Terminar todo
    finishLesson(originalTotalQuestions, originalTotalQuestions);
  }

  return (
    <div className="page-container">
      {/* ENCABEZADO */}
      <div className="header">
        <svg
          className="back"
          onClick={() => navigate("/main")}
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
        >
          <path
            d="M12.8672 21.0938L5.27344 13.5L12.8672 5.90625M6.32812 13.5H21.7266"
            stroke="#56A74F"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h2 className="subject-title">Sociales</h2>
      </div>

      {/* PROGRESO */}
      <div className="progress-wrapper">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((index + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>

        <div className="progress-leaf">
          {index + 1}/{questions.length}
        </div>
      </div>

      {/* FRUTAS */}
            <div className="apples-area">
            <img src={current.fruit} width={120} alt="fruit" />
            </div>

      <p className="question-sub">{current.question}</p>

      {/* OPCIONES */}
      <div className="options-grid">
        {current.options.map((opt, i) => (
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
            {opt}
          </button>
        ))}
      </div>

      {!checked ? (
        <button className="comprobar-btn" onClick={handleCheck}>
          Comprobar
        </button>
      ) : (
        <button className="comprobar-btn next" onClick={handleNext}>
          Siguiente
        </button>
      )}

      {/* ESTILOS */}
      <style jsx>{`
        .page-container {
          background: #f2ffe9;
          padding: 25px;
          display: flex;
          flex-direction: column;
        }

        .header {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .back {
          position: absolute;
          left: 0;
          cursor: pointer;
        }

        .subject-title {
          font-size: 24px;
          color: #4caf50;
          font-weight: 700;
          font-family: Quicksand;
        }

        .progress-wrapper {
          margin-top: 15px;
          text-align: center;
        }

        .progress-bar {
          width: 80%;
          margin: 0 auto;
          height: 6px;
          background: #cdecc5;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #4caf50;
          transition: 0.3s;
        }

        .progress-leaf {
          width: 64px;
          height: 23px;
          margin: 10px auto 0;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='23' viewBox='0 0 64 23' fill='none'><path d='M0 23C0 10.2975 10.2975 0 23 0H64C64 12.7025 53.7025 23 41 23H0Z' fill='%2356A74F'/></svg>");
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 15px;
          font-weight: 700;
          font-family: Quicksand;
        }

        .apples-area {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 50px;
        }

        .question-sub {
          margin-top: 15px;
          text-align: center;
          font-size: 22px;
          font-weight: 700;
          color: #2e7d32;
          font-family: Quicksand;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 25px;
        }

        .option-btn {
          height: 65px;
          border-radius: 50px;
          padding: 18px;
          font-size: 20px;
          border: 3px solid #4caf50;
          background: white;
          font-family: Quicksand;
        }

        .selected {
          background: #c9f4c9;
        }

        .correct {
          background: #4caf50;
          color: white;
        }

        .incorrect {
          background: #e56666;
          color: white;
        }

        .comprobar-btn {
          position: fixed;
          margin-bottom: 25px;
          bottom: 0;
          left: 25px;
          right: 25px;
          width: auto;
          background: #56a74f;
          color: white;
          padding: 15px;
          border-radius: 12px;
          font-size: 18px;
          font-family: Quicksand;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
