import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useChildData } from "../hooks/useChildData.js";

// --- PUZZLE 1 ---
import p00 from "../assets/image3_r1c1.png";
import p01 from "../assets/image3_r1c2.png";
import p02 from "../assets/image3_r1c3.png";
import p10 from "../assets/image3_r2c1.png";
import p11 from "../assets/image3_r2c2.png";
import p12 from "../assets/image3_r2c3.png";
import p20 from "../assets/image3_r3c1.png";
import p21 from "../assets/image3_r3c2.png";
import p22 from "../assets/image3_r3c3.png";

// --- PUZZLE 2 ---
import q00 from "../assets/image2_r1c1.png";
import q01 from "../assets/image2_r1c2.png";
import q02 from "../assets/image2_r1c3.png";
import q10 from "../assets/image2_r2c1.png";
import q11 from "../assets/image2_r2c2.png";
import q12 from "../assets/image2_r2c3.png";
import q20 from "../assets/image2_r3c1.png";
import q21 from "../assets/image2_r3c2.png";
import q22 from "../assets/image2_r3c3.png";

// --- PUZZLE 3 ---
import r00 from "../assets/image1_r1c1.png";
import r01 from "../assets/image1_r1c2.png";
import r02 from "../assets/image1_r1c3.png";
import r10 from "../assets/image1_r2c1.png";
import r11 from "../assets/image1_r2c2.png";
import r12 from "../assets/image1_r2c3.png";
import r20 from "../assets/image1_r3c1.png";
import r21 from "../assets/image1_r3c2.png";
import r22 from "../assets/image1_r3c3.png";

const FIXED_XP_REWARD = 10;

export default function PuzzlePage() {
  const navigate = useNavigate();
  const { updatePlayerXP, updateMissionProgress } = useChildData();

  const PUZZLES = [
    [
      { id: 1, img: p00 }, { id: 2, img: p01 }, { id: 3, img: p02 },
      { id: 4, img: p10 }, { id: 5, img: p11 }, { id: 6, img: p12 },
      { id: 7, img: p20 }, { id: 8, img: p21 }, { id: 9, img: p22 }
    ],
    [
      { id: 1, img: q00 }, { id: 2, img: q01 }, { id: 3, img: q02 },
      { id: 4, img: q10 }, { id: 5, img: q11 }, { id: 6, img: q12 },
      { id: 7, img: q20 }, { id: 8, img: q21 }, { id: 9, img: q22 }
    ],
    [
      { id: 1, img: r00 }, { id: 2, img: r01 }, { id: 3, img: r02 },
      { id: 4, img: r10 }, { id: 5, img: r11 }, { id: 6, img: r12 },
      { id: 7, img: r20 }, { id: 8, img: r21 }, { id: 9, img: r22 }
    ],
  ];

  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const basePieces = PUZZLES[currentPuzzleIndex];

  const [pieces, setPieces] = useState([]);
  const [selected, setSelected] = useState([]); // array of selected indices (max 2)
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState(null); // "correct" | "wrong" | null

  useEffect(() => {
    const shuffled = [...basePieces].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
    setSelected([]);
    setFinished(false);
    setFeedback(null);
  }, [currentPuzzleIndex]);

  useEffect(() => {
    if (pieces.length === 0) return;
    const isCorrect = pieces.every((p, i) => p.id === basePieces[i].id);
    if (isCorrect) {
      setFinished(true);
      setTimeout(() => handlePuzzleCompleted(), 500);
    }
  }, [pieces]); // eslint-disable-line

  function handleSelect(index) {
    if (finished) return;
    if (selected.includes(index)) {
      // toggle off
      setSelected((s) => s.filter((x) => x !== index));
      setFeedback(null);
      return;
    }
    if (selected.length === 2) return;
    setSelected((s) => [...s, index]);
    setFeedback(null);
  }

  // botón Comprobar: hace swap solo cuando hay 2 seleccionadas
  function handleCheck() {
    if (selected.length !== 2) return;

    const [i1, i2] = selected;
    const copy = [...pieces];
    [copy[i1], copy[i2]] = [copy[i2], copy[i1]];
    setPieces(copy);
    setSelected([]);

    const correct = copy.every((p, i) => p.id === basePieces[i].id);
    if (correct) {
      setFeedback("correct");
      // el efecto useEffect sobre `pieces` detectará completion y llamará handlePuzzleCompleted
    } else {
      setFeedback("wrong");
    }
  }

  const handlePuzzleCompleted = useCallback(async () => {
    const isLast = currentPuzzleIndex === PUZZLES.length - 1;

    if (!isLast) {
      setCurrentPuzzleIndex((i) => i + 1);
      return;
    }

    try {
      await Promise.all([
        updatePlayerXP(FIXED_XP_REWARD),
        updateMissionProgress(1, PUZZLES.length),
      ]);

      navigate("/completado", {
        state: {
          correctCount: PUZZLES.length,
          totalQuestions: PUZZLES.length,
          xpGained: FIXED_XP_REWARD,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }, [currentPuzzleIndex, navigate, updatePlayerXP, updateMissionProgress]);

  return (
    <div className="page-container">

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

        <h2 className="subject-title">Arte</h2>
      </div>

      {/* PROGRESO 1 / 3 */}
      <div className="progress-wrapper">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentPuzzleIndex + 1) / PUZZLES.length) * 100}%`,
            }}
          ></div>
        </div>

        <div className="progress-leaf">
          {currentPuzzleIndex + 1}/{PUZZLES.length}
        </div>
      </div>

      {/* FEEDBACK */}
      <div className="feedback-row">
        {feedback === "correct" && <div className="feedback correct">¡Correcto!</div>}
        {feedback === "wrong" && <div className="feedback wrong">Intenta de nuevo</div>}
      </div>

      {/* GRID */}
      <div className="puzzle-grid" role="grid" aria-label={`Puzzle ${currentPuzzleIndex + 1}`}>
        {pieces.map((p, i) => (
          <div
            key={p.id + "-" + i}
            className={`piece ${selected.includes(i) ? "selected" : ""}`}
            onClick={() => handleSelect(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSelect(i); }}
          >
            <img src={p.img} alt={`pieza ${p.id}`} draggable={false} />
          </div>
        ))}
      </div>

      <p className="question-sub">Resuelve el rompecabezas</p>

      {/* BOTÓN COMPROBAR */}
      <div className="controls">
        <button
          className={`check-btn ${selected.length === 2 ? "active" : ""}`}
          onClick={handleCheck}
          disabled={selected.length !== 2}
        >
          Hacer Movimiento
        </button>
      </div>

      <style jsx>{`
        .page-container {
          background: #f2ffe9;
          padding: 25px;
        }

        .header {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .back { position: absolute; left: 0; cursor: pointer; }

        .subject-title {
          font-size: 24px;
          color: #4caf50;
          font-weight: 700;
          font-family: Quicksand;
        }

        .progress-wrapper { margin-top: 15px; text-align: center; }

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

        .feedback-row { height: 28px; margin-top: 10px; text-align: center; }

        .feedback { font-weight: 700; font-family: Quicksand; }
        .feedback.correct { color: #2e7d32; }
        .feedback.wrong { color: #d32f2f; }

        .puzzle-grid {
          margin-top: 15px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          width: 320px;
          height: 320px;
          margin-left: auto;
          margin-right: auto;
        }

        .piece {
          width: 100%;
          height: 100%;
          cursor: pointer;
          border: 3px solid transparent;
          border-radius: 6px;
          display: flex;
        }

        .question-sub {
          margin-top: 50px;
          text-align: center;
          font-size: 22px;
          font-weight: 700;
          color: #2e7d32;
          font-family: Quicksand;
        }

        .piece.selected { border-color: #4caf50; }

        .piece img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 6px;
          user-select: none;
          pointer-events: none;
        }

        .controls { display: flex; justify-content: center; margin-top: 18px; }

        .check-btn {
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

        .check-btn.active {
          background: #4caf50;
          color: white;
          opacity: 1;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
