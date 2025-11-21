import raccoon from "../assets/suki-landing-sombra.png";
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

export default function CompletadoPage() {
  
    const navigate = useNavigate();
    const location = useLocation();

    const { 
        correctCount = 0, 
        totalQuestions = 0,
        xpGained = 0 // Recibimos el XP ganado
    } = location.state || {};

    

    const percentage = totalQuestions > 0 
        ? Math.round((correctCount / totalQuestions) * 100) 
        : 0;

  return (
    <div className="page-container">
      
      <h1 className="title">FELICIDADES</h1>
      <p className="subtitle">Lo has completado</p>

      <img 
        src={raccoon}
        className="raccoon-img"
      />

      <div className="score-summary">

                <p className="xp-gained-text">¡Ganaste {xpGained} XP!</p>
        </div>

      <button className="comprobar-btn" onClick={() => navigate("/main")}>
        Siguiente
      </button>

      <style jsx>{`
        .page-container {
          background: #F4FFEF;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 40px 20px;
          text-align: center;
        }
        .score-summary {
            margin: 20px 0;
            padding: 15px;
            border: 2px solid #57A863;
            border-radius: 10px;
            background: #e9f5e9;
            font-size: 20px;
            font-weight: 600;
            color: #2e7d32;
        }
        .xp-gained-text {
            font-size: 22px;
            font-weight: 800;
            color: #4FAE4C;
            margin-top: 10px;
        }

        .title {
          margin-top: 30px;
          font-size: 32px;
          font-weight: 700;
          color: #2F5E36;
          font-family: 'Quicksand';
        }

        .subtitle {
          margin-top: -10px;
          font-size: 18px;
          color: #2F5E36;
          font-family: 'Quicksand';
          font-weight: 600;
        }

        .raccoon-img {
          width: 400px;
          height: auto;
          margin-top: 20px;
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
  )
}
