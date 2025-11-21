import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useChildData } from "../hooks/useChildData.js";

const LETTERS = ["A", "E", "R", "B", "N"];
const FIXED_XP_REWARD = 10;
const MATCH_THRESHOLD = 0.90; // 90%

export default function TraceLettersPage() {
  const navigate = useNavigate();
  const { updatePlayerXP, updateMissionProgress } = useChildData();

  const outlineRef = useRef(null); // canvas with the letter outline (visible)
  const drawRef = useRef(null); // canvas where user draws
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawPoints, setDrawPoints] = useState([]); // {x,y}
  const [isDrawing, setIsDrawing] = useState(false);
  const [feedback, setFeedback] = useState(null); // "correct" | "wrong" | null
  const [disabled, setDisabled] = useState(false); // disable while processing

  // Resize canvases to a fixed square and scale letter drawing accordingly
  const CANVAS_SIZE = 300; // inside white box

  // draw the outline of the current letter into outlineRef
useEffect(() => {
  const canvas = outlineRef.current;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  ctx.lineWidth = 22;
  ctx.strokeStyle = "rgba(86,167,79,0.15)";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const PAD = 40;
  const W = CANVAS_SIZE - PAD * 2;
  const H = CANVAS_SIZE - PAD * 2;

  const L = LETTERS[currentIndex];
  const path = new Path2D();

  // NOTA IMPORTANTE:
  // ahora NO se usa ctx.translate ni ctx.scale.
  // Todo se dibuja usando coordenadas centradas manualmente:
  const x = PAD;
  const y = PAD;

  if (L === "A") {
    path.moveTo(x + W * 0.12, y + H * 0.9);
    path.lineTo(x + W * 0.5,  y + H * 0.06);
    path.lineTo(x + W * 0.88, y + H * 0.9);
    path.moveTo(x + W * 0.3,  y + H * 0.55);
    path.lineTo(x + W * 0.7,  y + H * 0.55);
  }

  if (L === "E") {
path.moveTo(x + W * 0.15, y + H * 0.12);
path.lineTo(x + W * 0.15, y + H * 0.88);

// Línea horizontal superior
path.moveTo(x + W * 0.15, y + H * 0.12);
path.lineTo(x + W * 0.85, y + H * 0.12);

// Línea horizontal media
path.moveTo(x + W * 0.15, y + H * 0.5);
path.lineTo(x + W * 0.65, y + H * 0.5);

// Línea horizontal inferior
path.moveTo(x + W * 0.15, y + H * 0.88);
path.lineTo(x + W * 0.85, y + H * 0.88);
  }

  if (L === "R") {
path.moveTo(x + W * 0.15, y + H * 0.12);
path.lineTo(x + W * 0.15, y + H * 0.88);

// Línea superior horizontal
path.moveTo(x + W * 0.15, y + H * 0.12);
path.lineTo(x + W * 0.75, y + H * 0.12);

// Línea media horizontal
path.moveTo(x + W * 0.15, y + H * 0.5);
path.lineTo(x + W * 0.75, y + H * 0.5);

// Línea curva diagonal inferior (pierna de la R)
path.moveTo(x + W * 0.15, y + H * 0.5);
path.lineTo(x + W * 0.75, y + H * 0.88);

// Línea vertical derecha (parte superior de la R)
path.moveTo(x + W * 0.75, y + H * 0.12);
path.lineTo(x + W * 0.75, y + H * 0.5);
  }

  if (L === "B") {
path.moveTo(x + W * 0.15, y + H * 0.12);
path.lineTo(x + W * 0.85, y + H * 0.12);

// Línea diagonal
path.moveTo(x + W * 0.85, y + H * 0.12);
path.lineTo(x + W * 0.15, y + H * 0.88);

// Línea inferior
path.moveTo(x + W * 0.15, y + H * 0.88);
path.lineTo(x + W * 0.85, y + H * 0.88);
  }

  if (L === "N") {
    path.moveTo(x + W * 0.18, y + H * 0.9);
    path.lineTo(x + W * 0.18, y + H * 0.12);
    path.lineTo(x + W * 0.78, y + H * 0.88);
    path.lineTo(x + W * 0.78, y + H * 0.12);
  }

  ctx.stroke(path);
  outlineRef.current._currentPath = path;
}, [currentIndex]);

  // draw canvas pointer handlers
  useEffect(() => {
    const c = drawRef.current;
    c.width = CANVAS_SIZE;
    c.height = CANVAS_SIZE;
    // clear css sized canvas to crisp pixels
    c.style.width = `${CANVAS_SIZE}px`;
    c.style.height = `${CANVAS_SIZE}px`;
    // initial clear
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [currentIndex]);

  // pointer helpers
  const getPos = (e) => {
    const rect = drawRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  function startDraw(e) {
    if (disabled) return;
    e.preventDefault();
    setIsDrawing(true);
    const pos = getPos(e);
    setDrawPoints((s) => [...s, pos]);
    const ctx = drawRef.current.getContext("2d");
    ctx.lineWidth = 18;
    ctx.strokeStyle = "#4CAF50";
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function moveDraw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getPos(e);
    const ctx = drawRef.current.getContext("2d");
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setDrawPoints((s) => [...s, pos]);
  }

  function endDraw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    setIsDrawing(false);
    const ctx = drawRef.current.getContext("2d");
    ctx.beginPath();
  }

  // clear draw canvas and points
  const clearDraw = () => {
    const ctx = drawRef.current.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    setDrawPoints([]);
  };

  // check similarity
  const handleCheck = async () => {
    if (disabled) return;
    if (!drawPoints.length) return;
    setDisabled(true);
    setFeedback(null);

    // Evaluate points against outline path
    const outlineCanvas = outlineRef.current;
    const outlineCtx = outlineCanvas.getContext("2d");
    const path = outlineRef.current._currentPath;
    if (!path) {
      setFeedback("wrong");
      setTimeout(() => {
        clearDraw();
        setFeedback(null);
        setDisabled(false);
      }, 700);
      return;
    }

    // count hits: point is within stroke (isPointInStroke)
    let hits = 0;
    const total = drawPoints.length;
    for (let i = 0; i < total; i += 1) {
      const p = drawPoints[i];
      // isPointInStroke can be strict; to be more tolerant, test multiple radii by stroking on an offscreen context is complicated.
      // We'll rely on the fairly thick outline stroke used (22px).
      try {
        if (outlineCtx.isPointInStroke(path, p.x, p.y) || outlineCtx.isPointInPath(path, p.x, p.y)) {
          hits++;
        }
      } catch (err) {
        // some browsers may throw if path not compatible; ignore
      }
    }

    const accuracy = total === 0 ? 0 : hits / total;

    if (accuracy >= MATCH_THRESHOLD) {
      setFeedback("correct");
      // award XP and progress
      try {
        await Promise.all([
          updatePlayerXP(FIXED_XP_REWARD),
          updateMissionProgress(1, LETTERS.length),
        ]);
      } catch (err) {
        console.error(err);
      }

      // proceed to next or finish
      setTimeout(() => {
        if (currentIndex < LETTERS.length - 1) {
          setCurrentIndex((i) => i + 1);
          clearDraw();
          setFeedback(null);
          setDisabled(false);
        } else {
          // finished all letters -> navigate to completado with state similar to other activities
          navigate("/completado", {
            state: {
              correctCount: LETTERS.length,
              totalQuestions: LETTERS.length,
              xpGained: FIXED_XP_REWARD,
            },
          });
        }
      }, 600);
    } else {
      setFeedback("wrong");
      // clear and reset after short delay
      setTimeout(() => {
        clearDraw();
        setFeedback(null);
        setDisabled(false);
      }, 700);
    }
  };

  // small keyboard accessibility: space to check
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter") handleCheck();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawPoints, currentIndex, disabled]); // eslint-disable-line

  return (
    <div className="page-container">
      {/* header */}
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

        <h2 className="subject-title">Lenguaje</h2>
      </div>

      {/* progress */}
      <div className="progress-wrapper">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentIndex + 1) / LETTERS.length) * 100}%`,
            }}
          />
        </div>

        <div className="progress-leaf">
          {currentIndex + 1}/{LETTERS.length}
        </div>
      </div>

      {/* white framed box with canvas and optional example image */}
      <div className="frame">
        {/* optional image you uploaded (developer note: file path preserved) */}


        <div className="canvas-wrap">
          <canvas
            ref={outlineRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="outline-canvas"
          />
          <canvas
            ref={drawRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="draw-canvas"
            onMouseDown={startDraw}
            onMouseMove={moveDraw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={moveDraw}
            onTouchEnd={endDraw}
          />
        </div>
      </div>

      {/* feedback row like puzzle */}
      <div className="feedback-row">
        {feedback === "correct" && <div className="feedback correct">¡Correcto!</div>}
        {feedback === "wrong" && <div className="feedback wrong">Incorrecto</div>}
      </div>

      <p className="question-sub">Traza con tu dedo la letra en pantalla.</p>

      {/* controls */}
      <div className="controls">
        <button
          className={`comprobar-btn ${drawPoints.length > 0 && !disabled ? "active" : ""}`}
          onClick={handleCheck}
          disabled={drawPoints.length === 0 || disabled}
        >
          Comprobar
        </button>
      </div>

      <style jsx>{`
        .page-container {
          background: #f2ffe9;
          padding: 22px;
          min-height: 100vh;
          box-sizing: border-box;
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
          margin-top: 12px;
          text-align: center;
        }

        .progress-bar {
          width: 80%;
          margin: 0 auto;
          height: 8px;
          background: #cdecc5;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #4caf50;
          transition: width 0.3s;
        }
        
        .question-sub {
          margin-top: 15px;
          text-align: center;
          font-size: 22px;
          font-weight: 700;
          color: #2e7d32;
          font-family: Quicksand;
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

        .frame {
          margin: 18px auto 6px;
          width: ${CANVAS_SIZE + 40}px;
          max-width: calc(100% - 40px);
          padding: 18px;
          border-radius: 14px;
          position: relative;
          display: flex;
          justify-content: center;
        }

        .canvas-wrap {
          width: ${CANVAS_SIZE}px;
          height: ${CANVAS_SIZE}px;
          position: absolute;
          background: white;
          border: 6px solid #189918ff;
          border-radius: 10px;
          overflow: hidden;
        }

        .outline-canvas, .draw-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: ${CANVAS_SIZE}px;
          height: ${CANVAS_SIZE}px;
          touch-action: none;
          -webkit-tap-highlight-color: transparent;
        }

        .example-image {
          position: absolute;
          right: 10px;
          top: 10px;
          width: 78px;
          opacity: 0.9;
          pointer-events: none;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.12));
          border-radius: 8px;
        }

        .feedback-row { height: 28px; margin-top: 300px; text-align: center; }

        .feedback { font-weight: 700; font-family: Quicksand; font-size: 18px; padding: 4px 8px; border-radius: 8px; display: inline-block; }
        .feedback.correct { color: white; background: #4caf50; }
        .feedback.wrong { color: white; background: #d32f2f; }

        .controls { display: flex; justify-content: center; margin-top: 18px; }

        .comprobar-btn {
          position: fixed;
          bottom: 16px;
          left: 22px;
          right: 22px;
          background: #56a74f;
          color: white;
          padding: 14px;
          border-radius: 12px;
          border: none;
          font-size: 18px;
          font-weight: 700;
          font-family: Quicksand;
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
          opacity: 0.6;
          cursor: not-allowed;
        }
        .comprobar-btn.active {
          opacity: 1;
          cursor: pointer;
        }

        /* responsive adjustments */
        @media (max-width: 520px) {
          .frame { padding: 12px; }
          .example-image { width: 60px; right: 6px; top: 6px; }
        }
      `}</style>
    </div>
  );
}
