import React, { useEffect, useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

const RaccoonMascot = ({ size = 'medium', animated = true, onClick }) => {
  const { speakText } = useAccessibility();
  const [animation, setAnimation] = useState('idle');
  
  // Mensajes que puede decir el mapache
  const messages = [
    "¡Hola! Soy Suki, tu guía en esta aventura",
    "¿Estás listo para aprender algo nuevo hoy?",
    "¡Vamos a divertirnos mientras aprendemos!",
    "¡Eres increíble!",
    "¿Qué te gustaría explorar hoy?",
    "¡Cada pregunta es una nueva aventura!"
  ];

  // Animaciones del mapache
  useEffect(() => {
    if (!animated) return;
    
    const animations = ['idle', 'blink', 'wiggle', 'jump'];
    let currentAnimation = 0;
    
    const interval = setInterval(() => {
      currentAnimation = (currentAnimation + 1) % animations.length;
      setAnimation(animations[currentAnimation]);
      
      // Cada 4 animaciones, el mapache dice algo
      if (currentAnimation === 0 && Math.random() > 0.5) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        speakText(randomMessage);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [animated, speakText, messages]);

  // Función para manejar el clic en el mapache
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      speakText(randomMessage);
      setAnimation('jump');
      setTimeout(() => setAnimation('idle'), 1000);
    }
  };

  // Determinar el tamaño según el parámetro
  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'raccoon-small';
      case 'large': return 'raccoon-large';
      default: return 'raccoon-medium';
    }
  };

  return (
    <div 
      className={`raccoon-container ${getSizeClass()} ${animation}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      aria-label="Mapache Suki, mascota de la aplicación"
    >
      <div className="raccoon">
        {/* Orejas */}
        <div className="raccoon-ear left"></div>
        <div className="raccoon-ear right"></div>
        
        {/* Cabeza */}
        <div className="raccoon-head">
          {/* Máscara característica del mapache */}
          <div className="raccoon-mask">
            <div className="raccoon-eye left">
              <div className="raccoon-pupil"></div>
            </div>
            <div className="raccoon-eye right">
              <div className="raccoon-pupil"></div>
            </div>
          </div>
          
          {/* Nariz */}
          <div className="raccoon-nose"></div>
          
          {/* Boca */}
          <div className="raccoon-mouth"></div>
        </div>
        
        {/* Cuerpo */}
        <div className="raccoon-body"></div>
        
        {/* Cola */}
        <div className="raccoon-tail">
          <div className="raccoon-tail-stripe"></div>
          <div className="raccoon-tail-stripe"></div>
          <div className="raccoon-tail-stripe"></div>
        </div>
      </div>
      
      <style jsx>{`
        .raccoon-container {
          display: inline-block;
          position: relative;
          transition: transform 0.3s ease;
        }
        
        .raccoon-container:hover {
          transform: scale(1.05);
        }
        
        .raccoon-small {
          width: 100px;
          height: 100px;
        }
        
        .raccoon-medium {
          width: 200px;
          height: 200px;
        }
        
        .raccoon-large {
          width: 300px;
          height: 300px;
        }
        
        .raccoon {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        /* Cabeza del mapache */
        .raccoon-head {
          position: absolute;
          width: 60%;
          height: 50%;
          background-color: #8B7355;
          border-radius: 50%;
          top: 20%;
          left: 20%;
          z-index: 2;
        }
        
        /* Máscara del mapache */
        .raccoon-mask {
          position: absolute;
          width: 80%;
          height: 40%;
          background-color: #2C2C2C;
          border-radius: 50%;
          top: 25%;
          left: 10%;
        }
        
        /* Orejas */
        .raccoon-ear {
          position: absolute;
          width: 20%;
          height: 25%;
          background-color: #8B7355;
          border-radius: 50% 50% 0 0;
          z-index: 1;
        }
        
        .raccoon-ear.left {
          top: 10%;
          left: 25%;
          transform: rotate(-15deg);
        }
        
        .raccoon-ear.right {
          top: 10%;
          right: 25%;
          transform: rotate(15deg);
        }
        
        /* Ojos */
        .raccoon-eye {
          position: absolute;
          width: 15%;
          height: 15%;
          background-color: white;
          border-radius: 50%;
          top: 30%;
        }
        
        .raccoon-eye.left {
          left: 25%;
        }
        
        .raccoon-eye.right {
          right: 25%;
        }
        
        .raccoon-pupil {
          position: absolute;
          width: 50%;
          height: 50%;
          background-color: black;
          border-radius: 50%;
          top: 25%;
          left: 25%;
        }
        
        /* Nariz */
        .raccoon-nose {
          position: absolute;
          width: 10%;
          height: 8%;
          background-color: #FF69B4;
          border-radius: 50%;
          top: 50%;
          left: 45%;
        }
        
        /* Boca */
        .raccoon-mouth {
          position: absolute;
          width: 20%;
          height: 10%;
          border-bottom: 3px solid #2C2C2C;
          border-radius: 0 0 50% 50%;
          top: 60%;
          left: 40%;
        }
        
        /* Cuerpo */
        .raccoon-body {
          position: absolute;
          width: 70%;
          height: 40%;
          background-color: #8B7355;
          border-radius: 50%;
          bottom: 10%;
          left: 15%;
          z-index: 1;
        }
        
        /* Cola */
        .raccoon-tail {
          position: absolute;
          width: 40%;
          height: 60%;
          background-color: #8B7355;
          border-radius: 50%;
          bottom: 5%;
          right: 5%;
          transform: rotate(30deg);
          z-index: 0;
        }
        
        .raccoon-tail-stripe {
          position: absolute;
          width: 100%;
          height: 15%;
          background-color: #2C2C2C;
          left: 0;
        }
        
        .raccoon-tail-stripe:nth-child(1) {
          top: 20%;
        }
        
        .raccoon-tail-stripe:nth-child(2) {
          top: 45%;
        }
        
        .raccoon-tail-stripe:nth-child(3) {
          top: 70%;
        }
        
        /* Animaciones */
        .idle .raccoon-pupil {
          animation: lookAround 5s infinite;
        }
        
        .blink .raccoon-eye {
          animation: blink 0.5s;
        }
        
        .wiggle {
          animation: wiggle 1s;
        }
        
        .jump {
          animation: jump 1s;
        }
        
        @keyframes lookAround {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-2px, -2px); }
          50% { transform: translate(2px, -2px); }
          75% { transform: translate(0, -2px); }
        }
        
        @keyframes blink {
          0%, 100% { height: 15%; }
          50% { height: 2%; }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        
        @keyframes jump {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default RaccoonMascot;