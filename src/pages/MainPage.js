import React from "react";
import suki from "../assets/suki-landing-sombra.png";
import lado from '../assets/gemini-suki-lado.png'
import monstruo1 from '../assets/monstruo-1.png'
import monstruo2 from '../assets/monstruo-2.png'
import monstruo3 from '../assets/monstruo-3.png'
import monstruo4 from '../assets/monstruo-4.png'
import monstruo5 from '../assets/monstruo-5.png'
import monstruo6 from '../assets/monstruo-6.png'
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from '../hooks/useAuthStatus'; 
import { useChildData } from '../hooks/useChildData';

export default function MainDashboard() {
  const navigate = useNavigate();
  const { loggedIn, checkingStatus } = useAuthStatus(); 
  const { childName, childLevel, loading, xpPercentage } = useChildData();

  const currentXpPercentage = xpPercentage ? `${xpPercentage}%` : '0%';

  const levelNumber = childLevel.replace('lv ', '').trim();

  const handleSubjectClick = (subjectId) => {
      
        // 2. Navegar después de un pequeño retraso
        setTimeout(() => {
            navigate(`/subject/${subjectId}/${levelNumber}`);
        }, 700);
    };

  if (checkingStatus || loading) {
    // Muestra un spinner o pantalla de carga mientras se verifican ambos estados
    return <div
  className="loading-screen"
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#F5FFF2",
    fontFamily: "Mulish, sans-serif",
  }}
>
  <img
    src={suki}
    alt="Suki"
    style={{
      width: "200px",
      height: "auto",
      marginBottom: "20px",
    }}
  />

  <h1
    style={{
      fontSize: "42px",
      fontWeight: "700",
      color: "#4E8F4E",
    }}
  >
    Cargando Suki...
  </h1>
</div>; 
  }

  if (!loggedIn) {
    // Redirección si la verificación de Auth falla
    navigate("/login"); 
    return null; 
  }
  return (
    <div className="dashboard-page">
      {/* Top Navigation Bar */}
      <div className="top-nav">
        <button className="nav-icon settings">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="23" viewBox="0 0 21 23" fill="none">
          <path d="M0.375174 16.7567C1.14296 18.0932 2.84566 18.5523 4.17822 17.7823C4.17914 17.7818 4.18001 17.7813 4.18092 17.7807L4.59397 17.5415C5.37368 18.2105 6.26991 18.7294 7.23754 19.0719V19.5495C7.23754 21.0919 8.4843 22.3423 10.0222 22.3423C11.5601 22.3423 12.8069 21.0919 12.8069 19.5495V19.072C13.7747 18.7288 14.6709 18.2094 15.4505 17.5396L15.8654 17.7798C17.1983 18.551 18.9022 18.0926 19.6711 16.7558C20.4401 15.419 19.983 13.7102 18.6501 12.939L18.2379 12.7006C18.4235 11.6882 18.4235 10.6503 18.2379 9.63787L18.6501 9.39957C19.9829 8.62837 20.4401 6.91953 19.6711 5.58274C18.9022 4.246 17.1983 3.7875 15.8654 4.55871L15.4524 4.79797C14.6719 4.12975 13.775 3.61186 12.8069 3.27036V2.79279C12.8069 1.25038 11.5601 0 10.0222 0C8.4843 0 7.23754 1.25038 7.23754 2.79279V3.27036C6.26978 3.61348 5.3735 4.13294 4.59397 4.80268L4.17905 4.56159C2.84614 3.79034 1.14227 4.24884 0.373303 5.58558C-0.39566 6.92232 0.0614626 8.6312 1.39437 9.40241L1.8065 9.64071C1.62097 10.6531 1.62097 11.691 1.8065 12.7035L1.39437 12.9418C0.0651611 13.715 -0.390482 15.4206 0.375174 16.7567ZM10.0222 7.44745C12.0728 7.44745 13.7351 9.11462 13.7351 11.1712C13.7351 13.2277 12.0728 14.8949 10.0222 14.8949C7.97165 14.8949 6.30933 13.2277 6.30933 11.1712C6.30933 9.11462 7.97165 7.44745 10.0222 7.44745Z" fill="white"/>
          </svg>
        </button>
        <button className="nav-button accessibility" onClick={() => navigate("/Accessibility")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="currentColor" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m0-13a2 2 0 1 0 0-4a2 2 0 0 0 0 4m-5.707.31a.75.75 0 0 0-.586 1.38l.002.001l.002.001l.01.004l.032.014a15 15 0 0 0 .572.225c.38.145.914.338 1.527.53c.988.312 2.236.64 3.398.748v1.24c0 .43-.124.853-.357 1.216l-2.524 3.925a.75.75 0 0 0 1.262.812l2.37-3.686l2.368 3.686a.75.75 0 0 0 1.262-.812l-2.524-3.925a2.25 2.25 0 0 1-.357-1.217v-1.239c1.162-.108 2.41-.436 3.399-.748a28 28 0 0 0 2.098-.755l.033-.014l.01-.004l.002-.001a.75.75 0 0 0-.585-1.381l-.007.003l-.027.011l-.11.045q-.148.061-.42.164c-.36.137-.865.32-1.444.502c-1.178.37-2.588.715-3.699.715s-2.52-.345-3.698-.715a27 27 0 0 1-1.974-.711L6.3 9.313z" clip-rule="evenodd"/></svg>
          Accesibilidad
        </button>
        <button className="nav-button sound">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
          <g clip-path="url(#clip0_298_40)">
          <path d="M19.0667 3.93528C18.8918 3.77941 18.6639 3.69639 18.4298 3.70328C18.1956 3.71016 17.973 3.80642 17.8076 3.97229C17.6422 4.13815 17.5466 4.36105 17.5404 4.59521C17.5341 4.82937 17.6178 5.05703 17.7742 5.23144C19.3015 6.76272 20.1593 8.83723 20.1593 11C20.1593 13.1628 19.3015 15.2373 17.7742 16.7686C17.6811 16.8516 17.6059 16.9527 17.5532 17.0657C17.5006 17.1787 17.4715 17.3013 17.4678 17.4259C17.4642 17.5506 17.486 17.6747 17.5319 17.7906C17.5779 17.9065 17.647 18.0118 17.735 18.1001C17.8231 18.1884 17.9282 18.2578 18.044 18.3041C18.1598 18.3504 18.2838 18.3725 18.4085 18.3692C18.5331 18.3659 18.6558 18.3372 18.7689 18.2849C18.8821 18.2325 18.9834 18.1576 19.0667 18.0648C20.9377 16.1897 21.9886 13.649 21.9886 11C21.9886 8.3511 20.9377 5.81035 19.0667 3.93528Z" fill="white"/>
          <path d="M16.5852 6.68524C16.5007 6.59769 16.3995 6.52786 16.2877 6.47982C16.1759 6.43178 16.0556 6.40649 15.9339 6.40543C15.8121 6.40437 15.6914 6.42757 15.5788 6.47366C15.4661 6.51975 15.3638 6.58781 15.2777 6.67388C15.1916 6.75995 15.1236 6.8623 15.0775 6.97495C15.0314 7.08761 15.0082 7.20831 15.0093 7.33003C15.0103 7.45174 15.0356 7.57203 15.0837 7.68386C15.1317 7.7957 15.2015 7.89685 15.2891 7.98141C16.0881 8.78282 16.5368 9.86832 16.5368 11C16.5368 12.1317 16.0881 13.2172 15.2891 14.0186C15.2015 14.1031 15.1317 14.2043 15.0837 14.3161C15.0356 14.428 15.0103 14.5482 15.0093 14.67C15.0082 14.7917 15.0314 14.9124 15.0775 15.025C15.1236 15.1377 15.1916 15.24 15.2777 15.3261C15.3638 15.4122 15.4661 15.4802 15.5788 15.5263C15.6914 15.5724 15.8121 15.5956 15.9339 15.5946C16.0556 15.5935 16.1759 15.5682 16.2877 15.5202C16.3995 15.4721 16.5007 15.4023 16.5852 15.3147C17.7277 14.1694 18.3693 12.6177 18.3693 11C18.3693 9.38226 17.7277 7.83057 16.5852 6.68524Z" fill="white"/>
          <path d="M12.6674 0.189701C9.88215 0.712499 7.40419 2.28539 5.74567 4.58328H4.58333C3.3682 4.58474 2.20326 5.06809 1.34403 5.92732C0.484808 6.78655 0.00145554 7.95149 0 9.16662L0 12.8333C0.00145554 14.0484 0.484808 15.2134 1.34403 16.0726C2.20326 16.9318 3.3682 17.4152 4.58333 17.4166H5.74658C7.40462 19.7146 9.88234 21.2875 12.6674 21.8102C12.7996 21.8345 12.9355 21.8295 13.0655 21.7955C13.1955 21.7614 13.3165 21.6992 13.4198 21.6132C13.5231 21.5272 13.6062 21.4196 13.6632 21.2979C13.7203 21.1763 13.7499 21.0435 13.75 20.9091V1.09078C13.7499 0.956389 13.7203 0.823652 13.6632 0.701976C13.6062 0.580299 13.5231 0.47266 13.4198 0.386682C13.3165 0.300705 13.1955 0.238492 13.0655 0.204452C12.9355 0.170411 12.7996 0.165376 12.6674 0.189701Z" fill="white"/>
          </g>
          <defs>
          <clipPath id="clip0_298_40">
          <rect width="22" height="22" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          Sonido
        </button>
      </div>

      {/* User Profile Section */}
      <div className="user-profile">
        <div className="xpbar">
          <div 
          className="xp-progress" 
          style={{ width: currentXpPercentage }} 
        />
        <div className="xpbar-content">
          <div className="avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#4E8F4E">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
          <span className="user-name">{childName}</span>
          <span className="user-level">{childLevel}</span>
        </div>
        </div>
      </div>

      {/* Daily Missions Section */}
      <div className="daily-missions">
        <h3>Misiones Diarias</h3>
        <div className="mission-bar"></div>
        <div className="mission-bar"></div>
        <div className="mission-bar"></div>
      </div>

      {/* Main Content - Subjects Path */}
      <div className="subjects-section">
        <div className="subjects-header">
          <h2>Materias</h2>
            <div class="cloud-bg">
            <svg xmlns="http://www.w3.org/2000/svg" width="186" height="83" viewBox="0 0 186 83" fill="none">
              <ellipse cx="49" cy="23" rx="49" ry="23" fill="white"/>
              <ellipse cx="125.497" cy="35.9234" rx="60.497" ry="29.9234" fill="white"/>
              <ellipse cx="76.497" cy="52.9234" rx="60.497" ry="29.9234" fill="white"/>
            </svg>
            </div>
          <div className="raccoon-character">
              <img src={lado} alt="Mapache Suki" className="raccoon-login" />
          </div>
        </div>

        {/* Winding Path with Subjects */}
        <div className="path-container">
          <svg className="dotted-path" xmlns="http://www.w3.org/2000/svg" width="317" height="1622" viewBox="0 0 317 1622" fill="none">
            <path d="M231.26 1338.77H81.4956C64.4374 1338.77 47.4434 1349.94 40.0913 1369.48C25.3869 1402.29 34 1596.37 34 1621.5" stroke="#D5FFC7" strokeWidth="70"/>
            <path d="M212.128 878H76.2553C60.7794 878 45.3617 889.205 38.6915 908.813C25.3511 941.727 25 968.338 25 993.549C25 1055.54 40.0958 1114 81.532 1114H236" stroke="#D5FFC7" strokeWidth="70"/>
            <path d="M212.374 417.407H76.3229C60.8265 417.407 45.3885 428.608 38.7095 448.21C25.3515 481.114 25 507.717 25 532.919C25 594.895 40.1157 653.332 81.6066 653.332H236.278" stroke="#D5FFC7" strokeWidth="70"/>
            <path d="M197.583 192.65H108.583H96.9739L83.8174 189.857C74.9174 189.857 59.8261 166.823 52.8609 146.581C40.0047 109.219 46.0928 37.902 46.0928 0" stroke="#D5FFC7" strokeWidth="70"/>
            <path d="M126.589 1114.02H246.693C260.373 1114.02 274.001 1124.69 279.897 1143.36C291.69 1174.71 292 1200.05 292 1224.06C292 1283.1 278.656 1338.77 242.029 1338.77H105.487" stroke="#D5FFC7" strokeWidth="70"/>
            <path d="M126.589 1114.02H246.693C260.373 1114.02 274.001 1124.69 279.897 1143.36C291.69 1174.71 292 1200.05 292 1224.06C292 1283.1 278.656 1338.77 242.029 1338.77H105.487" stroke="#D5FFC7" strokeWidth="70"/>
            <path d="M104.846 653.332H228.937C243.071 653.332 257.152 664.003 263.244 682.677C275.427 714.023 275.748 739.367 275.748 763.376C275.748 822.418 261.961 878.089 224.118 878.089H83.0435" stroke="#D5FFC7" strokeWidth="70"/>
            <path d="M99.4286 192.649H223.519C237.653 192.649 251.734 203.32 257.826 221.994C270.01 253.34 270.33 278.684 270.33 302.694C270.33 361.735 256.544 417.407 218.7 417.407H77.6261" stroke="#D5FFC7" strokeWidth="70"/>
            <path d="M231.26 1338.77H81.4956C64.4374 1338.77 47.4434 1349.94 40.0913 1369.48C25.3869 1402.29 34 1596.37 34 1621.5" stroke="#A9CEA7" strokeWidth="10" strokeDasharray="20 20"/>
            <path d="M212.128 878H76.2553C60.7794 878 45.3617 889.205 38.6915 908.813C25.3511 941.727 25 968.338 25 993.549C25 1055.54 40.0958 1114 81.532 1114H236" stroke="#A9CEA7" strokeWidth="10" strokeDasharray="20 20"/>
            <path d="M212.374 417.407H76.3229C60.8265 417.407 45.3885 428.608 38.7095 448.21C25.3515 481.114 25 507.717 25 532.919C25 594.895 40.1157 653.332 81.6066 653.332H236.278" stroke="#A9CEA7" strokeWidth="10" strokeDasharray="20 20"/>
            <path d="M197.583 192.65H108.583H96.9739L83.8174 189.857C74.9174 189.857 59.8261 166.823 52.8609 146.581C40.0047 109.219 46.0928 37.902 46.0928 0" stroke="#A9CEA7" strokeWidth="10" strokeDasharray="20 20"/>
            <path d="M126.589 1114.02H246.693C260.373 1114.02 274.001 1124.69 279.897 1143.36C291.69 1174.71 292 1200.05 292 1224.06C292 1283.1 278.656 1338.77 242.029 1338.77H105.487" stroke="#A9CEA7" strokeWidth="10" strokeDasharray="20 20"/>
            <path d="M126.589 1114.02H246.693C260.373 1114.02 274.001 1124.69 279.897 1143.36C291.69 1174.71 292 1200.05 292 1224.06C292 1283.1 278.656 1338.77 242.029 1338.77H105.487" stroke="#A9CEA7" strokeWidth="10" strokeDasharray="20 20"/>
            <path d="M104.846 653.332H228.937C243.071 653.332 257.152 664.003 263.244 682.677C275.427 714.023 275.748 739.367 275.748 763.376C275.748 822.418 261.961 878.089 224.118 878.089H83.0435" stroke="#A9CEA7" strokeWidth="10" strokeDasharray="20 20"/>
            <path d="M99.4286 192.649H223.519C237.653 192.649 251.734 203.32 257.826 221.994C270.01 253.34 270.33 278.684 270.33 302.694C270.33 361.735 256.544 417.407 218.7 417.407H77.6261" stroke="#A9CEA7" strokeWidth="10" strokeDasharray="20 20"/>
          </svg>

          {/* Math Subject Node - positioned at first right curve apex */}
          <div className="path-node" style={{top: '100px', right: '0px'}}>
            <div className="subject-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                <text x="4" y="16" fontSize="14" fontWeight="bold" fill="#4E8F4E">+−</text>
                <text x="4" y="8" fontSize="14" fontWeight="bold" fill="#4E8F4E">×÷</text>
              </svg>
            </div>
            <div className="subject-title">Arte</div>
          </div>

           <div className="path-node" style={{top: '110px', right: '220px'}}>
              <img src={monstruo1} className="monstruo1" />
          </div>

           <div className="path-node" style={{top: '40px', right: '80px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="58" height="84" viewBox="0 0 58 84" fill="none">
            <path d="M18.0198 10.9087C17.9895 9.76638 19.5898 9.47485 19.9642 10.5545L22.4688 17.7752C22.5941 18.1366 22.9146 18.3948 23.2943 18.4404L28.6505 19.0834C29.6457 19.2029 29.8658 20.5494 28.9604 20.9795L24.0904 23.2929C23.7434 23.4577 23.5216 23.8066 23.5194 24.1907L23.4798 31.4334C23.4736 32.5675 21.8829 32.8171 21.5296 31.7395L19.2847 24.8929C19.1636 24.5236 18.8395 24.2579 18.4537 24.2116L13.1094 23.57C12.1141 23.4505 11.894 22.104 12.7995 21.6739L17.6491 19.3702C18.0065 19.2004 18.2302 18.8359 18.2197 18.4404L18.0198 10.9087Z" fill="white"/>
            <path d="M34.4635 26.4074C34.9447 25.3818 36.4915 25.8207 36.3623 26.9462L34.1613 46.12C34.1175 46.5018 34.2962 46.8748 34.6212 47.0798L45.8917 54.1901C46.7522 54.733 46.3466 56.0645 45.3296 56.0354L32.0124 55.6552C31.6266 55.6442 31.269 55.8561 31.0934 56.1997L22.7468 72.5327C22.2354 73.5335 20.7169 73.0599 20.865 71.9458L23.2747 53.8293C23.3262 53.442 23.1475 53.0601 22.817 52.8517L11.5572 45.7482C10.6966 45.2053 11.1022 43.8738 12.1193 43.9028L25.4126 44.2823C25.8106 44.2937 26.1774 44.0679 26.3465 43.7075L34.4635 26.4074Z" fill="white"/>
            </svg>
          </div>

          
           <div className="path-node" style={{top: '60px', right: '0px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="47" height="54" viewBox="0 0 47 54" fill="none">
            <ellipse cx="19" cy="18.5" rx="19" ry="18.5" fill="url(#paint0_linear_353_62)"/>
            <ellipse cx="38" cy="45.5" rx="9" ry="8.5" fill="url(#paint1_linear_353_62)"/>
            <defs>
            <linearGradient id="paint0_linear_353_62" x1="19" y1="0" x2="19" y2="37" gradientUnits="userSpaceOnUse">
            <stop stop-color="#DBFFD8"/>
            <stop offset="1" stop-color="#F3FFF4"/>
            </linearGradient>
            <linearGradient id="paint1_linear_353_62" x1="38" y1="37" x2="38" y2="54" gradientUnits="userSpaceOnUse">
            <stop stop-color="#DBFFD8"/>
            <stop offset="1" stop-color="#F3FFF4"/>
            </linearGradient>
            </defs>
            </svg>
          </div>



          <div className="path-node" style={{top: '190px', right: '160px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="215" height="112" viewBox="0 0 215 112" fill="none">
          <ellipse cx="78" cy="54" rx="78" ry="46" fill="#56A74F"/>
          <ellipse cx="155" cy="75" rx="60" ry="25" fill="#56A74F"/>
          <ellipse cx="78" cy="46" rx="78" ry="46" fill="#FEFEFE"/>
          <ellipse cx="155" cy="67" rx="60" ry="25" fill="#FEFEFE"/>
          <circle cx="19.5" cy="52.5" r="7.5" fill="url(#paint0_linear_350_539)"/>
          <circle cx="29.5" cy="44.5" r="4.5" fill="url(#paint1_linear_350_539)"/>
          <circle cx="22.5" cy="37.5" r="2.5" fill="url(#paint2_linear_350_539)"/>
          <circle cx="29.5" cy="25.5" r="7.5" fill="url(#paint3_linear_350_539)"/>
          <circle cx="40.5" cy="12.5" r="4.5" fill="url(#paint4_linear_350_539)"/>
          <circle cx="29.5" cy="10.5" r="2.5" fill="url(#paint5_linear_350_539)"/>
          <circle cx="36.7779" cy="67.3211" r="7.5" transform="rotate(73.7552 36.7779 67.3211)" fill="url(#paint6_linear_350_539)"/>
          <circle cx="47.2559" cy="74.6842" r="4.5" transform="rotate(73.7552 47.2559 74.6842)" fill="url(#paint7_linear_350_539)"/>
          <circle cx="52.0179" cy="66.0053" r="2.5" transform="rotate(73.7552 52.0179 66.0053)" fill="url(#paint8_linear_350_539)"/>
          <circle cx="140.928" cy="77.9281" r="7.5" transform="rotate(-3.37246 140.928 77.9281)" fill="url(#paint9_linear_350_539)"/>
          <circle cx="162.928" cy="83.9281" r="7.5" transform="rotate(-3.37246 162.928 83.9281)" fill="url(#paint10_linear_350_539)"/>
          <circle cx="152.616" cy="63.5866" r="4.5" transform="rotate(-36.0157 152.616 63.5866)" fill="url(#paint11_linear_350_539)"/>
          <circle cx="172.285" cy="73.2858" r="4.5" transform="rotate(-36.0157 172.285 73.2858)" fill="url(#paint12_linear_350_539)"/>
          <circle cx="130.476" cy="48.4767" r="7.5" transform="rotate(-36.0157 130.476 48.4767)" fill="url(#paint13_linear_350_539)"/>
          <circle cx="141.285" cy="40.2858" r="4.5" transform="rotate(-36.0157 141.285 40.2858)" fill="url(#paint14_linear_350_539)"/>
          <circle cx="132.624" cy="36.0858" r="2.5" transform="rotate(-36.0157 132.624 36.0858)" fill="url(#paint15_linear_350_539)"/>
          <circle cx="198.689" cy="65.6894" r="7.5" transform="rotate(-1.46607 198.689 65.6894)" fill="url(#paint16_linear_350_539)"/>
          <circle cx="184.727" cy="77.5612" r="4.5" transform="rotate(-0.208531 184.727 77.5612)" fill="url(#paint17_linear_350_539)"/>
          <circle cx="183.476" cy="67.7407" r="2.5" transform="rotate(-0.878882 183.476 67.7407)" fill="url(#paint18_linear_350_539)"/>
          <circle cx="159.538" cy="72.538" r="2.5" transform="rotate(-0.878882 159.538 72.538)" fill="url(#paint19_linear_350_539)"/>
          <defs>
          <linearGradient id="paint0_linear_350_539" x1="19.5" y1="45" x2="19.5" y2="60" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint1_linear_350_539" x1="29.5" y1="40" x2="29.5" y2="49" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint2_linear_350_539" x1="22.5" y1="35" x2="22.5" y2="40" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint3_linear_350_539" x1="29.5" y1="18" x2="29.5" y2="33" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint4_linear_350_539" x1="40.5" y1="8" x2="40.5" y2="17" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint5_linear_350_539" x1="29.5" y1="8" x2="29.5" y2="13" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint6_linear_350_539" x1="36.7779" y1="59.8211" x2="36.7779" y2="74.8211" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint7_linear_350_539" x1="47.2559" y1="70.1842" x2="47.2559" y2="79.1842" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint8_linear_350_539" x1="52.0179" y1="63.5053" x2="52.0179" y2="68.5053" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint9_linear_350_539" x1="140.928" y1="70.4281" x2="140.928" y2="85.4281" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint10_linear_350_539" x1="162.928" y1="76.4281" x2="162.928" y2="91.4281" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint11_linear_350_539" x1="152.616" y1="59.0866" x2="152.616" y2="68.0866" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint12_linear_350_539" x1="172.285" y1="68.7858" x2="172.285" y2="77.7858" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint13_linear_350_539" x1="130.476" y1="40.9767" x2="130.476" y2="55.9767" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint14_linear_350_539" x1="141.285" y1="35.7858" x2="141.285" y2="44.7858" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint15_linear_350_539" x1="132.624" y1="33.5858" x2="132.624" y2="38.5858" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint16_linear_350_539" x1="198.689" y1="58.1894" x2="198.689" y2="73.1894" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint17_linear_350_539" x1="184.727" y1="73.0612" x2="184.727" y2="82.0612" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint18_linear_350_539" x1="183.476" y1="65.2407" x2="183.476" y2="70.2407" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint19_linear_350_539" x1="159.538" y1="70.038" x2="159.538" y2="75.038" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CDD2F3"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          </defs>
          </svg>
          </div>
          


          {/* Cube Subject Node - positioned at left curve apex */}
          <div className="path-node" style={{top: '290px', left: '0px'}} onClick={() => handleSubjectClick('lenguaje', 'Lenguaje')}>
            <div className="subject-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6B9D" strokeWidth="2">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
             <div className="subject-title">Lenguaje</div>
          </div>

          <div className="path-node" style={{top: '350px', right: '10px'}}>
              <img src={monstruo2} className="monstruo1" />
          </div>

          <div className="path-node" style={{top: '450px', right: '160px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="58" height="84" viewBox="0 0 58 84" fill="none">
            <path d="M18.0198 10.9087C17.9895 9.76638 19.5898 9.47485 19.9642 10.5545L22.4688 17.7752C22.5941 18.1366 22.9146 18.3948 23.2943 18.4404L28.6505 19.0834C29.6457 19.2029 29.8658 20.5494 28.9604 20.9795L24.0904 23.2929C23.7434 23.4577 23.5216 23.8066 23.5194 24.1907L23.4798 31.4334C23.4736 32.5675 21.8829 32.8171 21.5296 31.7395L19.2847 24.8929C19.1636 24.5236 18.8395 24.2579 18.4537 24.2116L13.1094 23.57C12.1141 23.4505 11.894 22.104 12.7995 21.6739L17.6491 19.3702C18.0065 19.2004 18.2302 18.8359 18.2197 18.4404L18.0198 10.9087Z" fill="white"/>
            <path d="M34.4635 26.4074C34.9447 25.3818 36.4915 25.8207 36.3623 26.9462L34.1613 46.12C34.1175 46.5018 34.2962 46.8748 34.6212 47.0798L45.8917 54.1901C46.7522 54.733 46.3466 56.0645 45.3296 56.0354L32.0124 55.6552C31.6266 55.6442 31.269 55.8561 31.0934 56.1997L22.7468 72.5327C22.2354 73.5335 20.7169 73.0599 20.865 71.9458L23.2747 53.8293C23.3262 53.442 23.1475 53.0601 22.817 52.8517L11.5572 45.7482C10.6966 45.2053 11.1022 43.8738 12.1193 43.9028L25.4126 44.2823C25.8106 44.2937 26.1774 44.0679 26.3465 43.7075L34.4635 26.4074Z" fill="white"/>
            </svg>
          </div>

          <div className="path-node" style={{top: '410px', left: '150px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="218" height="96" viewBox="0 0 218 96" fill="none">
          <ellipse cx="81" cy="50" rx="78" ry="46" fill="#56A74F"/>
          <ellipse cx="158" cy="71" rx="60" ry="25" fill="#56A74F"/>
          <ellipse cx="78" cy="46" rx="78" ry="46" fill="white"/>
          <ellipse cx="155" cy="67" rx="60" ry="25" fill="white"/>
          <path d="M171 50L178.794 65.75H163.206L171 50Z" fill="url(#paint0_linear_351_570)"/>
          <path d="M162 61L169.794 76.75H154.206L162 61Z" fill="url(#paint1_linear_351_570)"/>
          <path d="M138 67L145.794 82.75H130.206L138 67Z" fill="url(#paint2_linear_351_570)"/>
          <path d="M48 60L55.7942 75.75H40.2058L48 60Z" fill="url(#paint3_linear_351_570)"/>
          <path d="M30 62L37.7942 77.75H22.2058L30 62Z" fill="url(#paint4_linear_351_570)"/>
          <path d="M57 70L64.7942 85.75H49.2058L57 70Z" fill="url(#paint5_linear_351_570)"/>
          <path d="M78 69L85.7942 84.75H70.2058L78 69Z" fill="url(#paint6_linear_351_570)"/>
          <path d="M99 67L106.794 82.75H91.2058L99 67Z" fill="url(#paint7_linear_351_570)"/>
          <path d="M124 67L131.794 82.75H116.206L124 67Z" fill="url(#paint8_linear_351_570)"/>
          <path d="M155 71L162.794 86.75H147.206L155 71Z" fill="url(#paint9_linear_351_570)"/>
          <path d="M189 61L196.794 76.75H181.206L189 61Z" fill="url(#paint10_linear_351_570)"/>
          <path d="M177 69L182.196 81H171.804L177 69Z" fill="url(#paint11_linear_351_570)"/>
          <path d="M200 50L207.794 65.75H192.206L200 50Z" fill="url(#paint12_linear_351_570)"/>
          <path d="M183 35L190.794 50.75H175.206L183 35Z" fill="url(#paint13_linear_351_570)"/>
          <path d="M186.5 46L191.263 58.75H181.737L186.5 46Z" fill="url(#paint14_linear_351_570)"/>
          <path d="M21 37L28.7942 52.75H13.2058L21 37Z" fill="url(#paint15_linear_351_570)"/>
          <path d="M18 51L25.7942 66.75H10.2058L18 51Z" fill="url(#paint16_linear_351_570)"/>
          <path d="M30 22L37.7942 37.75H22.2058L30 22Z" fill="url(#paint17_linear_351_570)"/>
          <path d="M9 28L16.7942 43.75H1.20577L9 28Z" fill="url(#paint18_linear_351_570)"/>
          <path d="M9 45L14.1962 57H3.80385L9 45Z" fill="url(#paint19_linear_351_570)"/>
          <path d="M15 11L22.7942 26.75H7.20577L15 11Z" fill="url(#paint20_linear_351_570)"/>
          <path d="M18.5 22L23.2631 34.75H13.7369L18.5 22Z" fill="url(#paint21_linear_351_570)"/>
          <path d="M26.5 9L31.2631 21.75H21.7369L26.5 9Z" fill="url(#paint22_linear_351_570)"/>
          <defs>
          <linearGradient id="paint0_linear_351_570" x1="171" y1="50" x2="171" y2="71" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint1_linear_351_570" x1="162" y1="61" x2="162" y2="82" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint2_linear_351_570" x1="138" y1="67" x2="138" y2="88" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint3_linear_351_570" x1="48" y1="60" x2="48" y2="81" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint4_linear_351_570" x1="30" y1="62" x2="30" y2="83" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint5_linear_351_570" x1="57" y1="70" x2="57" y2="91" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint6_linear_351_570" x1="78" y1="69" x2="78" y2="90" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint7_linear_351_570" x1="99" y1="67" x2="99" y2="88" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint8_linear_351_570" x1="124" y1="67" x2="124" y2="88" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint9_linear_351_570" x1="155" y1="71" x2="155" y2="92" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint10_linear_351_570" x1="189" y1="61" x2="189" y2="82" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint11_linear_351_570" x1="177" y1="69" x2="177" y2="85" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint12_linear_351_570" x1="200" y1="50" x2="200" y2="71" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint13_linear_351_570" x1="183" y1="35" x2="183" y2="56" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint14_linear_351_570" x1="186.5" y1="46" x2="186.5" y2="63" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint15_linear_351_570" x1="21" y1="37" x2="21" y2="58" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint16_linear_351_570" x1="18" y1="51" x2="18" y2="72" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint17_linear_351_570" x1="30" y1="22" x2="30" y2="43" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint18_linear_351_570" x1="9" y1="28" x2="9" y2="49" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint19_linear_351_570" x1="9" y1="45" x2="9" y2="61" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint20_linear_351_570" x1="15" y1="11" x2="15" y2="32" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint21_linear_351_570" x1="18.5" y1="22" x2="18.5" y2="39" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          <linearGradient id="paint22_linear_351_570" x1="26.5" y1="9" x2="26.5" y2="26" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E95C5C"/>
          <stop offset="0.706731" stop-color="white"/>
          </linearGradient>
          </defs>
          </svg>
          </div>


          {/* Tree Subject Node - positioned at right curve apex */}
          <div className="path-node" style={{top: '510px', right: '0px'}}>
            <div className="subject-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#4E8F4E">
                <circle cx="12" cy="8" r="6"/>
                <rect x="10" y="14" width="4" height="8" fill="#8B4513"/>
              </svg>
            </div>
             <div className="subject-title">Naturales</div>
          </div>

          <div className="path-node" style={{top: '510px', right: '215px'}}>
              <img src={monstruo3} className="monstruo1" />
          </div>

          <div className="path-node" style={{top: '600px', right: '160px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="218" height="96" viewBox="0 0 218 96" fill="none">
          <ellipse cx="81" cy="50" rx="78" ry="46" fill="#56A74F"/>
          <ellipse cx="158" cy="71" rx="60" ry="25" fill="#56A74F"/>
          <ellipse cx="78" cy="46" rx="78" ry="46" fill="white"/>
          <ellipse cx="155" cy="67" rx="60" ry="25" fill="white"/>
          </svg>
          </div>

          <div className="path-node" style={{top: '650px', right: '100px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="58" height="84" viewBox="0 0 58 84" fill="none">
            <path d="M18.0198 10.9087C17.9895 9.76638 19.5898 9.47485 19.9642 10.5545L22.4688 17.7752C22.5941 18.1366 22.9146 18.3948 23.2943 18.4404L28.6505 19.0834C29.6457 19.2029 29.8658 20.5494 28.9604 20.9795L24.0904 23.2929C23.7434 23.4577 23.5216 23.8066 23.5194 24.1907L23.4798 31.4334C23.4736 32.5675 21.8829 32.8171 21.5296 31.7395L19.2847 24.8929C19.1636 24.5236 18.8395 24.2579 18.4537 24.2116L13.1094 23.57C12.1141 23.4505 11.894 22.104 12.7995 21.6739L17.6491 19.3702C18.0065 19.2004 18.2302 18.8359 18.2197 18.4404L18.0198 10.9087Z" fill="white"/>
            <path d="M34.4635 26.4074C34.9447 25.3818 36.4915 25.8207 36.3623 26.9462L34.1613 46.12C34.1175 46.5018 34.2962 46.8748 34.6212 47.0798L45.8917 54.1901C46.7522 54.733 46.3466 56.0645 45.3296 56.0354L32.0124 55.6552C31.6266 55.6442 31.269 55.8561 31.0934 56.1997L22.7468 72.5327C22.2354 73.5335 20.7169 73.0599 20.865 71.9458L23.2747 53.8293C23.3262 53.442 23.1475 53.0601 22.817 52.8517L11.5572 45.7482C10.6966 45.2053 11.1022 43.8738 12.1193 43.9028L25.4126 44.2823C25.8106 44.2937 26.1774 44.0679 26.3465 43.7075L34.4635 26.4074Z" fill="white"/>
            </svg>
          </div>

           <div className="path-node" style={{top: '605px', right: '130px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="37" viewBox="0 0 38 37" fill="none">
          <ellipse cx="19" cy="18.5" rx="19" ry="18.5" fill="url(#paint0_linear_353_63)"/>
          <defs>
          <linearGradient id="paint0_linear_353_63" x1="19" y1="0" x2="19" y2="37" gradientUnits="userSpaceOnUse">
          <stop stop-color="#DBFFD8"/>
          <stop offset="1" stop-color="#F3FFF4"/>
          </linearGradient>
          </defs>
          </svg>
          </div>


          {/* Book Subject Node - positioned at left curve apex */}
          <div className="path-node" style={{top: '700px', left: '0px'}}>
            <div className="subject-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#9B59B6">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20v-2H6.5A2.5 2.5 0 004 17.5V19.5zM6.5 3A2.5 2.5 0 004 5.5v10A2.5 2.5 0 006.5 13H20V3H6.5z"/>
              </svg>
            </div>
             <div className="subject-title">Sociales</div>
          </div>

          <div className="path-node" style={{top: '750px', right: '10px'}}>
              <img src={monstruo5} className="monstruo1" />
          </div>

          <div className="path-node" style={{top: '750px', right: '325px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="37" viewBox="0 0 38 37" fill="none">
          <ellipse cx="19" cy="18.5" rx="19" ry="18.5" fill="url(#paint0_linear_353_63)"/>
          <defs>
          <linearGradient id="paint0_linear_353_63" x1="19" y1="0" x2="19" y2="37" gradientUnits="userSpaceOnUse">
          <stop stop-color="#DBFFD8"/>
          <stop offset="1" stop-color="#F3FFF4"/>
          </linearGradient>
          </defs>
          </svg>
          </div>

          <div className="path-node" style={{top: '850px', right: '150px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="58" height="84" viewBox="0 0 58 84" fill="none">
            <path d="M18.0198 10.9087C17.9895 9.76638 19.5898 9.47485 19.9642 10.5545L22.4688 17.7752C22.5941 18.1366 22.9146 18.3948 23.2943 18.4404L28.6505 19.0834C29.6457 19.2029 29.8658 20.5494 28.9604 20.9795L24.0904 23.2929C23.7434 23.4577 23.5216 23.8066 23.5194 24.1907L23.4798 31.4334C23.4736 32.5675 21.8829 32.8171 21.5296 31.7395L19.2847 24.8929C19.1636 24.5236 18.8395 24.2579 18.4537 24.2116L13.1094 23.57C12.1141 23.4505 11.894 22.104 12.7995 21.6739L17.6491 19.3702C18.0065 19.2004 18.2302 18.8359 18.2197 18.4404L18.0198 10.9087Z" fill="white"/>
            <path d="M34.4635 26.4074C34.9447 25.3818 36.4915 25.8207 36.3623 26.9462L34.1613 46.12C34.1175 46.5018 34.2962 46.8748 34.6212 47.0798L45.8917 54.1901C46.7522 54.733 46.3466 56.0645 45.3296 56.0354L32.0124 55.6552C31.6266 55.6442 31.269 55.8561 31.0934 56.1997L22.7468 72.5327C22.2354 73.5335 20.7169 73.0599 20.865 71.9458L23.2747 53.8293C23.3262 53.442 23.1475 53.0601 22.817 52.8517L11.5572 45.7482C10.6966 45.2053 11.1022 43.8738 12.1193 43.9028L25.4126 44.2823C25.8106 44.2937 26.1774 44.0679 26.3465 43.7075L34.4635 26.4074Z" fill="white"/>
            </svg>
          </div>

          <div className="path-node" style={{top: '800px', left: '170px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="218" height="113" viewBox="0 0 218 113" fill="none">
          <ellipse cx="81" cy="50" rx="78" ry="46" fill="#56A74F"/>
          <ellipse cx="158" cy="71" rx="60" ry="25" fill="#56A74F"/>
          <ellipse cx="78" cy="46" rx="78" ry="46" fill="white"/>
          <ellipse cx="155" cy="67" rx="60" ry="25" fill="white"/>
          <path d="M13 43C17.8 82.2 29.3333 87 34.5 87L47 78.5001L57.5 62.0001C61.6667 86.6667 61.4 126.6 65 97.0001C65 60.0001 86.5 38.5001 85 72.5001C85 103.3 90.3333 100.5 92.5 99.5001C100.667 91.8334 91.8 76.3039 85 66.3039C78.2 56.3039 118.833 64.3334 130.5 70.5001L149.5 72.5001" stroke="white" stroke-width="10"/>
          </svg>
          </div>


          {/* Flag Subject Node - positioned at right curve apex */}
          <div className="path-node" style={{top: '900px', right: '0px'}}>
            <div className="subject-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2">
                <path d="M5 3v18M5 5h12l-2 4 2 4H5"/>
              </svg>
            </div>
             <div className="subject-title">Matematicas</div>
          </div>

          <div className="path-node" style={{top: '950px', right: '210px'}}>
              <img src={monstruo4} className="monstruo1" />
          </div>

          <div className="path-node" style={{top: '1040px', right: '100px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="58" height="84" viewBox="0 0 58 84" fill="none">
            <path d="M18.0198 10.9087C17.9895 9.76638 19.5898 9.47485 19.9642 10.5545L22.4688 17.7752C22.5941 18.1366 22.9146 18.3948 23.2943 18.4404L28.6505 19.0834C29.6457 19.2029 29.8658 20.5494 28.9604 20.9795L24.0904 23.2929C23.7434 23.4577 23.5216 23.8066 23.5194 24.1907L23.4798 31.4334C23.4736 32.5675 21.8829 32.8171 21.5296 31.7395L19.2847 24.8929C19.1636 24.5236 18.8395 24.2579 18.4537 24.2116L13.1094 23.57C12.1141 23.4505 11.894 22.104 12.7995 21.6739L17.6491 19.3702C18.0065 19.2004 18.2302 18.8359 18.2197 18.4404L18.0198 10.9087Z" fill="white"/>
            <path d="M34.4635 26.4074C34.9447 25.3818 36.4915 25.8207 36.3623 26.9462L34.1613 46.12C34.1175 46.5018 34.2962 46.8748 34.6212 47.0798L45.8917 54.1901C46.7522 54.733 46.3466 56.0645 45.3296 56.0354L32.0124 55.6552C31.6266 55.6442 31.269 55.8561 31.0934 56.1997L22.7468 72.5327C22.2354 73.5335 20.7169 73.0599 20.865 71.9458L23.2747 53.8293C23.3262 53.442 23.1475 53.0601 22.817 52.8517L11.5572 45.7482C10.6966 45.2053 11.1022 43.8738 12.1193 43.9028L25.4126 44.2823C25.8106 44.2937 26.1774 44.0679 26.3465 43.7075L34.4635 26.4074Z" fill="white"/>
            </svg>
          </div>

          <div className="path-node" style={{top: '1000px', right: '160px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="218" height="96" viewBox="0 0 218 96" fill="none">
          <ellipse cx="81" cy="50" rx="78" ry="46" fill="#56A74F"/>
          <ellipse cx="158" cy="71" rx="60" ry="25" fill="#56A74F"/>
          <ellipse cx="78" cy="46" rx="78" ry="46" fill="white"/>
          <ellipse cx="155" cy="67" rx="60" ry="25" fill="white"/>
          </svg>
          </div>


          {/* Bunny Subject Node - positioned at bottom left */}
          <div className="path-node" style={{top: '1100px', left: '0px'}}>
            <div className="subject-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#E91E63">
                <ellipse cx="8" cy="6" rx="2" ry="5"/>
                <ellipse cx="16" cy="6" rx="2" ry="5"/>
                <circle cx="12" cy="14" r="6"/>
                <circle cx="10" cy="13" r="1" fill="white"/>
                <circle cx="14" cy="13" r="1" fill="white"/>
              </svg>
            </div>
             <div className="subject-title">Vida Practica</div>
          </div>

          <div className="path-node" style={{top: '1220px', right: '-10px'}}>
              <img src={monstruo6} className="monstruo1" />
          </div>

          <div className="path-node" style={{top: '1205px', right: '140px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="37" viewBox="0 0 38 37" fill="none">
          <ellipse cx="19" cy="18.5" rx="19" ry="18.5" fill="url(#paint0_linear_353_63)"/>
          <defs>
          <linearGradient id="paint0_linear_353_63" x1="19" y1="0" x2="19" y2="37" gradientUnits="userSpaceOnUse">
          <stop stop-color="#DBFFD8"/>
          <stop offset="1" stop-color="#F3FFF4"/>
          </linearGradient>
          </defs>
          </svg>
          </div>

          <div className="path-node" style={{top: '1240px', right: '140px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="58" height="84" viewBox="0 0 58 84" fill="none">
            <path d="M18.0198 10.9087C17.9895 9.76638 19.5898 9.47485 19.9642 10.5545L22.4688 17.7752C22.5941 18.1366 22.9146 18.3948 23.2943 18.4404L28.6505 19.0834C29.6457 19.2029 29.8658 20.5494 28.9604 20.9795L24.0904 23.2929C23.7434 23.4577 23.5216 23.8066 23.5194 24.1907L23.4798 31.4334C23.4736 32.5675 21.8829 32.8171 21.5296 31.7395L19.2847 24.8929C19.1636 24.5236 18.8395 24.2579 18.4537 24.2116L13.1094 23.57C12.1141 23.4505 11.894 22.104 12.7995 21.6739L17.6491 19.3702C18.0065 19.2004 18.2302 18.8359 18.2197 18.4404L18.0198 10.9087Z" fill="white"/>
            <path d="M34.4635 26.4074C34.9447 25.3818 36.4915 25.8207 36.3623 26.9462L34.1613 46.12C34.1175 46.5018 34.2962 46.8748 34.6212 47.0798L45.8917 54.1901C46.7522 54.733 46.3466 56.0645 45.3296 56.0354L32.0124 55.6552C31.6266 55.6442 31.269 55.8561 31.0934 56.1997L22.7468 72.5327C22.2354 73.5335 20.7169 73.0599 20.865 71.9458L23.2747 53.8293C23.3262 53.442 23.1475 53.0601 22.817 52.8517L11.5572 45.7482C10.6966 45.2053 11.1022 43.8738 12.1193 43.9028L25.4126 44.2823C25.8106 44.2937 26.1774 44.0679 26.3465 43.7075L34.4635 26.4074Z" fill="white"/>
            </svg>
          </div>

          <div className="path-node" style={{top: '1250px', left: '180px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="218" height="96" viewBox="0 0 218 96" fill="none">
          <ellipse cx="81" cy="50" rx="78" ry="46" fill="#56A74F"/>
          <ellipse cx="158" cy="71" rx="60" ry="25" fill="#56A74F"/>
          <ellipse cx="78" cy="46" rx="78" ry="46" fill="white"/>
          <ellipse cx="155" cy="67" rx="60" ry="25" fill="white"/>
          </svg>
          </div>

        </div>
      </div>

      {/* Achievements Section */}
      <div className="achievements-section">
        <div className="achievement-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M55 20.4049V20.5874C55 22.7374 55 23.8149 54.4825 24.6949C53.965 25.5749 53.0225 26.0974 51.1425 27.1449L49.16 28.2449C50.525 23.6249 50.9825 18.6599 51.15 14.4149L51.175 13.8624L51.18 13.7324C52.8075 14.2974 53.7225 14.7199 54.2925 15.5099C55 16.4924 55 17.7974 55 20.4049ZM5 20.4049V20.5874C5 22.7374 5 23.8149 5.5175 24.6949C6.035 25.5749 6.9775 26.0974 8.8575 27.1449L10.8425 28.2449C9.475 23.6249 9.0175 18.6599 8.85 14.4149L8.825 13.8624L8.8225 13.7324C7.1925 14.2974 6.2775 14.7199 5.7075 15.5099C5 16.4924 5 17.7999 5 20.4049Z" fill="#FFE345"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M40.9425 5.86758C37.3254 5.27507 33.6653 4.9849 30 5.00008C25.5425 5.00008 21.8675 5.39258 19.0575 5.86758C16.21 6.34758 14.7875 6.58758 13.5975 8.05258C12.41 9.51758 12.4725 11.1001 12.5975 14.2651C13.03 25.1351 15.375 38.7151 28.125 39.9151V48.7501H24.55C23.9723 48.7504 23.4125 48.9509 22.9658 49.3173C22.5192 49.6837 22.2132 50.1936 22.1 50.7601L21.625 53.1251H15C14.5027 53.1251 14.0258 53.3226 13.6742 53.6743C13.3225 54.0259 13.125 54.5028 13.125 55.0001C13.125 55.4974 13.3225 55.9743 13.6742 56.3259C14.0258 56.6775 14.5027 56.8751 15 56.8751H45C45.4973 56.8751 45.9742 56.6775 46.3258 56.3259C46.6775 55.9743 46.875 55.4974 46.875 55.0001C46.875 54.5028 46.6775 54.0259 46.3258 53.6743C45.9742 53.3226 45.4973 53.1251 45 53.1251H38.375L37.9 50.7601C37.7868 50.1936 37.4808 49.6837 37.0342 49.3173C36.5875 48.9509 36.0277 48.7504 35.45 48.7501H31.875V39.9151C44.625 38.7151 46.9725 25.1376 47.4025 14.2651C47.5275 11.1001 47.5925 9.51508 46.4025 8.05258C45.2125 6.58758 43.79 6.34758 40.9425 5.86758Z" fill="#FFE345"/>
        </svg>
          <h3>Logros</h3>
        </div>
        <div className="achievement-bar"></div>
        <div className="achievement-bar"></div>
        <div className="achievement-bar"></div>
        <div className="achievement-bar"></div>
      </div>

      {/* Control Panel Section */}
      <div className="control-panel-section">
        <h3>Panel de control</h3>
        <button className="control-panel-button" onClick={() => navigate("/paneldecontrolcuenta")}>
          Ir al panel de control
        </button>
      </div>


      <style jsx>{`

        html{
            
        }

        .dashboard-page {
          background-color: #F5FFF2;
          min-height: 100vh;
          
          font-family: 'Mulish', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .top-nav {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 20px;
          justify-content: space-between;
          margin-left: 25px;
          margin-right: 25px;
          margin-top: 25px;
        }

        .nav-icon {
          background-color: #56A74F;
          border: none;
          border-radius: 12px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .nav-icon:hover {
          background-color: #4E8F4E;
        }

        .nav-button {
          background-color: #56A74F;
          border: none;
          border-radius: 12px;
          padding: 10px 16px;
          color: white;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
          font-family: 'Mulish', sans-serif;
        }

        .nav-button:hover {
          background-color: #4E8F4E;
        }

        .user-profile {
          background: #C9F9B9; /* El color de borde externo */
          border-radius: 38.5px;
          padding: 5px;
          display: flex;
          /* Reducimos margins si es necesario, pero la estructura Flex es importante */
          margin-left: 25px;
          margin-right: 25px;
          margin-bottom: 20px;
          position: relative; /* Importante para que el contenido de .xpbar-content quede bien */
      }

      .xpbar {
          /* El fondo de la barra, que representa el 100% del nivel */
          width: 100%; 
          height: 60px; /* Le damos una altura fija para que se note la barra */
          background: #C9F9B9; 
          border-radius: 38.5px;
          padding: 0; /* Quitamos el padding aquí */
          position: relative; /* ¡CLAVE! Permite posicionar los elementos internos */
          overflow: hidden; /* Oculta cualquier parte de .xp-progress que se desborde */
      }

      .xp-progress {
          /* ESTE ES EL INDICADOR DE PROGRESO QUE CRECERÁ */
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background-color: #fff; /* Un color de progreso suave */
          transition: width 0.5s ease-in-out; /* Animación de crecimiento */
          /* width: 0% - 100% (Se asigna en línea en el JSX) */
      }

      .xpbar-content {
          /* Este contenedor mantiene la foto, nombre y nivel */
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex; /* Mantenemos el diseño interno con flex */
          align-items: center;
          justify-content: space-between; /* Ajustamos la distribución */
          padding: 0 20px; /* Padding interno para que no se pegue a los bordes */
          z-index: 10; /* Asegura que se vea sobre la barra de progreso */
      }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #E8F5E9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }

        .user-name {
          font-weight: 700;
          font-size: 18px;
          color: #224420;
          flex: 1;
          flex-grow: 1;
        }

        .user-level {
          background-color: #C8E6C9;
          padding: 6px 16px;
          margin-right: 35px;
          border-radius: 15px;
          font-weight: 700;
          color: #224420;
          font-size: 14px;
          flex-shrink: 0;
        }

        .daily-missions {
          background: #C9F9B9;
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 30px;
          margin-left: 25px;
          margin-right: 25px;
          box-shadow: 0px 7px 0px 0px #A9CEA7;
        }

        .daily-missions h3 {
          color: #0A6802;
          font-size: 20px;
          margin: 0 0 12px 0;
          font-family: 'Quicksand';
          font-weight: 700;
          text-align: left;

        }

        .mission-bar {
          background: white;
          height: 12px;
          border-radius: 6px;
          margin-bottom: 8px;
        }

        .mission-bar:last-child {
          margin-bottom: 0;
        }

        .subjects-section {
          position: relative;
          margin-bottom: 40px;
        }

        .subjects-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          position: relative;
        }
        .cloud-bg {
          position: absolute;
          top: -10px;     /* ajustas */
          left: 10px;    /* ajustas */
          z-index: 0;
          
        }

        .subjects-header h2 {
          color: #0A6802;
          font-size: 40px;
          font-weight: 900;
          margin: 0;
          position: relative;
          z-index: 2;  
          font-family: 'Mulish', sans-serif;
          margin-left: 25px;
        }

        /* Added CSS-based raccoon character styles */
        .raccoon-character {
          width: 120px;
          height: 120px;
          margin-top: -20px;
          position: relative;
          margin-left: 20px;
        }

        .path-container {
          position: relative;
          width: 100%;
          max-width: 317px;
          margin: 0 auto;
          min-height: 1400px;
        }

        .dotted-path {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          height: 1400px;
          z-index: 0;
        }

        .path-node {
          position: absolute;
        }
        

        .subject-icon {
          width: 110px;
          height: 110px;
          background: white;
          border: 8px solid #C9F9B9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .subject-title {
          background: white;
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          color: #224420;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          white-space: nowrap;
          font-family: 'Quicksand', sans-serif;
        }

        .monstruo1 {
          position: relative;
          width: 120px;
          height: auto;
          z-index: 9999;
        }


        .achievements-section {
          background: white;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin-left: 25px;
          margin-right: 25px;
        }

        .achievement-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .achievement-header h3 {
          color: #224420;
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          font-family: 'Quicksand';
        }

        .achievement-bar {
          background: #E8F5E9;
          height: 14px;
          border-radius: 7px;
          margin-bottom: 10px;
        }

        .achievement-bar:last-child {
          margin-bottom: 0;
        }

        .control-panel-section {
          background: white;
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          margin-bottom: 40px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin-left: 25px;
          margin-right: 25px;
        }

        .control-panel-section h3 {
          color: #224420;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 16px 0;
          font-family: 'Quicksand', sans-serif;
        }

        .control-panel-button {
          background-color: #56A74F;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 14px 32px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.3s;
          font-family: 'Mulish', sans-serif;
          width: 100%;
          max-width: 300px;
        }

        .control-panel-button:hover {
          background-color: #4E8F4E;
        }


      `}</style>
    </div>
  );
}
