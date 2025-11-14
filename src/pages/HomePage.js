

export default function Home() {
  return (
    <div className="home-page">
      {/* Logo */}
      <div className="logo-container">
        <h1 className="logo">suki</h1>
      </div>

      {/* Main content */}
      <main className="main-content">
        {/* Decorative blob background */}
        <div className="blob-container">
          <svg viewBox="0 0 400 600" className="blob-svg" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 100 150 Q 50 200 80 280 Q 110 360 100 420 Q 90 480 150 520 Q 210 560 280 540 Q 350 520 370 450 Q 390 380 360 310 Q 330 240 350 180 Q 370 120 320 90 Q 270 60 210 80 Q 150 100 100 150 Z"
              fill="#c8e6c9"
              opacity="0.6"
            />
          </svg>

          {/* Raccoon placeholder - empty space as requested */}
          <div className="raccoon-placeholder" />
        </div>

        {/* Text */}
        <p className="welcome-text">Aprender es divertido cuando lo entiendes a tu manera.</p>

        {/* Buttons */}
        <div className="buttons-container">
          <button className="primary-button">Empieza ahora</button>

          <button className="secondary-button">Ya tengo una cuenta</button>
        </div>
      </main>

      <style jsx>{`
        .home-page {
          min-height: 100vh;
          background-color: #e8f5e9;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 24px;
        }

        .logo-container {
          width: 100%;
          display: flex;
          justify-content: center;
          padding-top: 16px;
          margin-bottom: 40px;
        }

        .logo {
          color: #5fa55f;
          font-size: 48px;
          font-weight: bold;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 448px;
          width: 100%;
        }

        .blob-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          max-width: 400px;
          margin-bottom: 32px;
          overflow: hidden;
        }

        .blob-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .raccoon-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 192px;
          height: 256px;
          margin: auto;
        }

        .welcome-text {
          text-align: center;
          color: #000000;
          font-size: 20px;
          font-weight: 500;
          line-height: 1.5;
          margin-bottom: 48px;
          padding: 0 16px;
        }

        .buttons-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .primary-button {
          width: 100%;
          background-color: #5fa55f;
          color: white;
          font-size: 18px;
          font-weight: 600;
          padding: 16px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .primary-button:hover {
          background-color: #4e8f4e;
        }

        .secondary-button {
          width: 100%;
          background-color: white;
          color: #5fa55f;
          font-size: 18px;
          font-weight: 600;
          padding: 16px;
          border-radius: 12px;
          border: 2px solid #5fa55f;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .secondary-button:hover {
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  )
}
