import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

export default function Page() {
 const navigate = useNavigate()

  const [color, setColor] = useState("#2e7d32")
  const [size, setSize] = useState(4)
  const [lines, setLines] = useState([])
  const [history, setHistory] = useState([])
  const [tool, setTool] = useState("pen")

  const drawing = useRef(false)
  const svgRef = useRef(null)

  function startDraw(e) {
    drawing.current = true
    const point = getPoint(e)
    setLines((l) => [...l, { points: [point], color, size, tool }])
  }

  function draw(e) {
    if (!drawing.current) return
    const point = getPoint(e)

    setLines((l) => {
      const updated = [...l]
      updated[updated.length - 1].points.push(point)
      return updated
    })
  }

  function endDraw() {
    drawing.current = false
    if (lines.length > history.length) {
      setHistory([...lines])
    }
  }

  function getPoint(e) {
    const rect = svgRef.current.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  function undo() {
    if (lines.length > 0) {
      const updated = lines.slice(0, -1)
      setLines(updated)
      setHistory(updated)
    }
  }

  function clearCanvas() {
    setLines([])
    setHistory([])
  }

  function downloadDrawing() {
    const svg = svgRef.current
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    canvas.width = svg.clientWidth
    canvas.height = svg.clientHeight

    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = "drawing.png"
      link.click()
    }
    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  const predefinedColors = ["#2e7d32", "#4caf50", "#56A74F", "#000000", "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"]

  return (
    <div className="page-container">
      {/* Encabezado */}
      <div className="header">
        <button onClick={() => navigate("/main")} className="back-btn" title="Volver">
          ← Volver
        </button>
        <h2 className="subject-title">Tablero de Dibujo</h2>
      </div>

      {/* Lienzo */}
      <div className="canvas-wrapper">
        <svg
          ref={svgRef}
          className="drawing-canvas"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={(e) => startDraw(e.touches[0])}
          onTouchMove={(e) => draw(e.touches[0])}
          onTouchEnd={endDraw}
        >
          {lines.map((l, i) => (
            <polyline
              key={i}
              fill="none"
              stroke={l.color}
              strokeWidth={l.size}
              strokeLinecap="round"
              strokeLinejoin="round"
              points={l.points.map((p) => `${p.x},${p.y}`).join(" ")}
            />
          ))}
        </svg>
      </div>

      {/* Herramientas */}
      <div className="tools">
        {/* Herramientas */}
        <div className="tool-group">
          <label>Herramienta</label>
          <div className="tool-buttons">
            <button
              className={`tool-btn ${tool === "pen" ? "active" : ""}`}
              onClick={() => setTool("pen")}
              title="Pincel"
            >
              ✏️
            </button>
            <button
              className={`tool-btn ${tool === "eraser" ? "active" : ""}`}
              onClick={() => setTool("eraser")}
              title="Goma"
            >
              🧹
            </button>
          </div>
        </div>

        {/* Color */}
        <div className="tool-group">
          <label>Color</label>
          <div className="color-palette">
            {predefinedColors.map((c) => (
              <button
                key={c}
                className={`color-btn ${color === c ? "selected" : ""}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
                title={c}
              />
            ))}
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="color-input"
              title="Selector de color personalizado"
            />
          </div>
        </div>

        {/* Grosor */}
        <div className="tool-group">
          <label>Grosor: {size}px</label>
          <input
            type="range"
            min="1"
            max="20"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="size-slider"
          />
        </div>

        {/* Acciones */}
        <div className="tool-group">
          <label>Acciones</label>
          <div className="action-buttons">
            <button className="action-btn undo-btn" onClick={undo} title="Deshacer">
              ↶ Deshacer
            </button>
            <button className="action-btn clear-btn" onClick={clearCanvas} title="Borrar todo">
              🗑️ Borrar
            </button>
            <button className="action-btn download-btn" onClick={downloadDrawing} title="Descargar">
              ⬇️ Descargar
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-container {
          background: #f2ffe9;
          padding: 15px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Quicksand', sans-serif;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 0;
          margin-bottom: 10px;
          position: relative;
        }

        .back-btn {
          position: absolute;
          left: 0;
          padding: 8px 12px;
          background: #4caf50;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Quicksand', sans-serif;
          transition: all 0.2s;
        }

        .back-btn:active {
          transform: scale(0.95);
          box-shadow: 0 0 8px rgba(76, 175, 80, 0.4);
        }

        .subject-title {
          font-size: 22px;
          color: #4caf50;
          font-weight: 700;
          margin: 0;
        }

        .canvas-wrapper {
          flex: 1;
          margin-bottom: 15px;
          min-height: 0;
        }

        .drawing-canvas {
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 15px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          touch-action: none;
          cursor: crosshair;
        }

        .tools {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 12px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          max-height: 45vh;
          overflow-y: auto;
        }

        .tool-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tool-group label {
          font-size: 13px;
          color: #2e7d32;
          font-weight: 700;
          text-transform: uppercase;
        }

        .tool-buttons {
          display: flex;
          gap: 8px;
        }

        .tool-btn {
          flex: 1;
          padding: 10px;
          background: #f0f0f0;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tool-btn.active {
          background: #2e7d32;
          border-color: #2e7d32;
          box-shadow: 0 0 8px rgba(46, 125, 50, 0.3);
        }

        .color-palette {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
        }

        .color-btn {
          width: 100%;
          aspect-ratio: 1;
          border: 3px solid #ddd;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .color-btn.selected {
          border-color: #2e7d32;
          box-shadow: 0 0 8px rgba(46, 125, 50, 0.5);
          transform: scale(1.1);
        }

        .color-input {
          width: 100%;
          height: 40px;
          border: 2px solid #ddd;
          border-radius: 8px;
          cursor: pointer;
        }

        .size-slider {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
          background: linear-gradient(to right, #2e7d32, #4caf50);
        }

        .size-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2e7d32;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(46, 125, 50, 0.4);
        }

        .size-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2e7d32;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(46, 125, 50, 0.4);
        }

        .action-buttons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .action-btn {
          padding: 10px 8px;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Quicksand', sans-serif;
        }

        .undo-btn {
          background: #FFB74D;
          color: white;
        }

        .undo-btn:active {
          transform: scale(0.95);
          box-shadow: 0 0 8px rgba(255, 183, 77, 0.4);
        }

        .clear-btn {
          background: #e56666;
          color: white;
        }

        .clear-btn:active {
          transform: scale(0.95);
          box-shadow: 0 0 8px rgba(229, 102, 102, 0.4);
        }

        .download-btn {
          background: #4caf50;
          color: white;
        }

        .download-btn:active {
          transform: scale(0.95);
          box-shadow: 0 0 8px rgba(76, 175, 80, 0.4);
        }

        @media (max-width: 768px) {
          .page-container {
            padding: 10px;
          }

          .subject-title {
            font-size: 18px;
          }

          .tools {
            max-height: 50vh;
          }

          .action-buttons {
            grid-template-columns: 1fr;
          }

          .color-palette {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  )
}
