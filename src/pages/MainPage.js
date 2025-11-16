import React from "react";

export default function MainDashboard() {
  return (
    <div className="dashboard-page">
      {/* Top Navigation Bar */}
      <div className="top-nav">
        <button className="nav-icon settings">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="23" viewBox="0 0 21 23" fill="none">
          <path d="M0.375174 16.7567C1.14296 18.0932 2.84566 18.5523 4.17822 17.7823C4.17914 17.7818 4.18001 17.7813 4.18092 17.7807L4.59397 17.5415C5.37368 18.2105 6.26991 18.7294 7.23754 19.0719V19.5495C7.23754 21.0919 8.4843 22.3423 10.0222 22.3423C11.5601 22.3423 12.8069 21.0919 12.8069 19.5495V19.072C13.7747 18.7288 14.6709 18.2094 15.4505 17.5396L15.8654 17.7798C17.1983 18.551 18.9022 18.0926 19.6711 16.7558C20.4401 15.419 19.983 13.7102 18.6501 12.939L18.2379 12.7006C18.4235 11.6882 18.4235 10.6503 18.2379 9.63787L18.6501 9.39957C19.9829 8.62837 20.4401 6.91953 19.6711 5.58274C18.9022 4.246 17.1983 3.7875 15.8654 4.55871L15.4524 4.79797C14.6719 4.12975 13.775 3.61186 12.8069 3.27036V2.79279C12.8069 1.25038 11.5601 0 10.0222 0C8.4843 0 7.23754 1.25038 7.23754 2.79279V3.27036C6.26978 3.61348 5.3735 4.13294 4.59397 4.80268L4.17905 4.56159C2.84614 3.79034 1.14227 4.24884 0.373303 5.58558C-0.39566 6.92232 0.0614626 8.6312 1.39437 9.40241L1.8065 9.64071C1.62097 10.6531 1.62097 11.691 1.8065 12.7035L1.39437 12.9418C0.0651611 13.715 -0.390482 15.4206 0.375174 16.7567ZM10.0222 7.44745C12.0728 7.44745 13.7351 9.11462 13.7351 11.1712C13.7351 13.2277 12.0728 14.8949 10.0222 14.8949C7.97165 14.8949 6.30933 13.2277 6.30933 11.1712C6.30933 9.11462 7.97165 7.44745 10.0222 7.44745Z" fill="white"/>
          </svg>
        </button>
        <button className="nav-button accessibility">
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="28" viewBox="0 0 23 28" fill="none">
        <path d="M8.14817 3.40507C8.14817 2.73161 8.31676 2.07327 8.63262 1.51331C8.94847 0.953353 9.39742 0.516918 9.92267 0.259197C10.4479 0.00147538 11.0259 -0.0659563 11.5835 0.0654289C12.1411 0.196814 12.6533 0.521115 13.0553 0.997322C13.4573 1.47353 13.7311 2.08025 13.842 2.74077C13.9529 3.40129 13.896 4.08593 13.6785 4.70813C13.4609 5.33032 13.0924 5.86212 12.6197 6.23627C12.147 6.61043 11.5912 6.81013 11.0227 6.81013C10.2603 6.81013 9.52918 6.45138 8.9901 5.81281C8.45102 5.17424 8.14817 4.30814 8.14817 3.40507ZM21.5627 22.7004H20.6199L19.5505 19.5224C19.3032 18.7838 18.8739 18.1506 18.3184 17.7052C17.763 17.2598 17.1072 17.0229 16.4364 17.0253H12.9391C12.812 17.0253 12.6902 16.9655 12.6003 16.8591C12.5105 16.7527 12.46 16.6083 12.46 16.4578V14.7553H16.7718C17.153 14.7553 17.5186 14.5759 17.7881 14.2566C18.0577 13.9373 18.2091 13.5043 18.2091 13.0527C18.2091 12.6012 18.0577 12.1682 17.7881 11.8489C17.5186 11.5296 17.153 11.3502 16.7718 11.3502H12.46V9.64768C12.46 9.19614 12.3086 8.7631 12.039 8.44381C11.7695 8.12452 11.4039 7.94515 11.0227 7.94515C10.6415 7.94515 10.2759 8.12452 10.0064 8.44381C9.73687 8.7631 9.58544 9.19614 9.58544 9.64768V16.4578C9.58834 17.3334 9.83539 18.1834 10.2882 18.8755C10.741 19.5677 11.3741 20.0632 12.0892 20.2851C11.78 21.1849 11.2806 21.9753 10.639 22.5804C9.99745 23.1855 9.23528 23.585 8.42575 23.7404C7.61622 23.8958 6.78655 23.802 6.01647 23.4679C5.24639 23.1339 4.5618 22.5708 4.02849 21.8328C3.49517 21.0948 3.13106 20.2068 2.97116 19.254C2.81125 18.3012 2.86093 17.3156 3.1154 16.3922C3.36988 15.4687 3.82061 14.6382 4.42426 13.9806C5.02792 13.3231 5.76421 12.8605 6.56237 12.6373C6.9334 12.5335 7.2544 12.2593 7.45476 11.8751C7.65511 11.4909 7.71842 11.0281 7.63075 10.5886C7.54307 10.1491 7.3116 9.76888 6.98725 9.53154C6.66291 9.2942 6.27225 9.21921 5.90123 9.32307C4.57958 9.69333 3.3647 10.4729 2.38091 11.582C1.39712 12.691 0.679738 14.0898 0.302176 15.6351C-0.0753852 17.1805 -0.0995717 18.8169 0.232092 20.3769C0.563755 21.937 1.23936 23.3646 2.18977 24.5138C3.14019 25.663 4.33128 26.4925 5.64118 26.9173C6.95108 27.3421 8.33275 27.3471 9.6448 26.9317C10.9568 26.5163 12.1522 25.6954 13.1085 24.5531C14.0648 23.4108 14.7477 21.988 15.0873 20.4304H16.4288C16.5243 20.4303 16.6178 20.4641 16.697 20.5274C16.7762 20.5907 16.8376 20.6807 16.8734 20.7856L18.3107 25.0352C18.4174 25.3513 18.6017 25.6223 18.8398 25.8131C19.078 26.0039 19.3589 26.1058 19.6464 26.1055H21.5627C21.9439 26.1055 22.3095 25.9261 22.579 25.6068C22.8486 25.2875 23 24.8545 23 24.403C23 23.9514 22.8486 23.5184 22.579 23.1991C22.3095 22.8798 21.9439 22.7004 21.5627 22.7004Z" fill="white"/>
        </svg>
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
        <div className="avatar">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#4E8F4E">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>
        <span className="user-name">Mariana</span>
        <span className="user-level">lv 1</span>
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
          <div className="raccoon-character">
            <div className="raccoon-body">
              <div className="raccoon-ear left"></div>
              <div className="raccoon-ear right"></div>
              <div className="raccoon-face">
                <div className="raccoon-mask"></div>
                <div className="raccoon-eye left"></div>
                <div className="raccoon-eye right"></div>
                <div className="raccoon-nose"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Winding Path with Subjects */}
        <div className="path-container">
          <svg className="dotted-path" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 1400" fill="none">
            <path d="M150 0 L150 100 Q150 150 200 180 L250 200 M250 200 Q280 220 280 270 L280 310 Q280 360 230 390 L180 420 M180 420 Q130 450 100 500 L80 540 M80 540 Q60 590 90 640 L120 680 M120 680 Q150 720 200 740 L240 760 M240 760 Q280 780 280 830 L280 870 Q280 920 230 950 L180 980 M180 980 Q130 1010 100 1060 L70 1100 M70 1100 Q40 1150 70 1200 L100 1240 M100 1240 Q130 1280 180 1300 L220 1320" 
                  stroke="#BAE6B7" strokeWidth="16" strokeDasharray="12,12" strokeLinecap="round"/>
          </svg>

          {/* Math Subject Node - positioned at first right curve apex */}
          <div className="path-node" style={{top: '180px', right: '25px'}}>
            <div className="subject-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                <text x="4" y="16" fontSize="14" fontWeight="bold" fill="#4E8F4E">+−</text>
                <text x="4" y="8" fontSize="14" fontWeight="bold" fill="#4E8F4E">×÷</text>
              </svg>
            </div>
          </div>
          <div className="character-spot blue-monster" style={{top: '80px', left: '10px'}}>
            <div className="monster-body blue">
              <div className="monster-eye"></div>
              <div className="monster-mouth"></div>
              <div className="monster-tooth left"></div>
              <div className="monster-tooth right"></div>
            </div>
          </div>

          {/* Cube Subject Node - positioned at left curve apex */}
          <div className="path-node" style={{top: '420px', left: '50px'}}>
            <div className="subject-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6B9D" strokeWidth="2">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
          </div>
          <div className="character-spot red-monster" style={{top: '310px', right: '20px'}}>
            <div className="monster-body red">
              <div className="monster-horn left"></div>
              <div className="monster-horn right"></div>
              <div className="monster-eye angry"></div>
              <div className="monster-eye angry"></div>
              <div className="monster-mouth angry"></div>
            </div>
          </div>

          {/* Tree Subject Node - positioned at right curve apex */}
          <div className="path-node" style={{top: '740px', right: '30px'}}>
            <div className="subject-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#4E8F4E">
                <circle cx="12" cy="8" r="6"/>
                <rect x="10" y="14" width="4" height="8" fill="#8B4513"/>
              </svg>
            </div>
          </div>
          <div className="character-spot green-monster" style={{top: '520px', left: '5px'}}>
            <div className="monster-body green">
              <div className="monster-eye single"></div>
              <div className="monster-mouth happy"></div>
              <div className="monster-tentacle"></div>
              <div className="monster-tentacle"></div>
            </div>
          </div>

          {/* Book Subject Node - positioned at left curve apex */}
          <div className="path-node" style={{top: '980px', left: '50px'}}>
            <div className="subject-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#9B59B6">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20v-2H6.5A2.5 2.5 0 004 17.5V19.5zM6.5 3A2.5 2.5 0 004 5.5v10A2.5 2.5 0 006.5 13H20V3H6.5z"/>
              </svg>
            </div>
          </div>
          <div className="character-spot purple-dog" style={{top: '850px', right: '30px'}}>
            <div className="monster-body purple">
              <div className="dog-ear left"></div>
              <div className="dog-ear right"></div>
              <div className="monster-eye"></div>
              <div className="monster-eye"></div>
              <div className="dog-snout"></div>
            </div>
          </div>

          {/* Flag Subject Node - positioned at right curve apex */}
          <div className="path-node" style={{top: '1300px', right: '50px'}}>
            <div className="subject-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2">
                <path d="M5 3v18M5 5h12l-2 4 2 4H5"/>
              </svg>
            </div>
          </div>
          <div className="character-spot yellow-monster" style={{top: '1070px', left: '10px'}}>
            <div className="monster-body yellow">
              <div className="monster-eye angry"></div>
              <div className="monster-eye angry"></div>
              <div className="monster-mouth growl"></div>
              <div className="monster-fang left"></div>
              <div className="monster-fang right"></div>
            </div>
          </div>

          {/* Bunny Subject Node - positioned at bottom left */}
          <div className="path-node" style={{top: '1240px', left: '70px'}}>
            <div className="subject-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#E91E63">
                <ellipse cx="8" cy="6" rx="2" ry="5"/>
                <ellipse cx="16" cy="6" rx="2" ry="5"/>
                <circle cx="12" cy="14" r="6"/>
                <circle cx="10" cy="13" r="1" fill="white"/>
                <circle cx="14" cy="13" r="1" fill="white"/>
              </svg>
            </div>
          </div>
          <div className="character-spot blue-cat" style={{top: '1180px', right: '40px'}}>
            <div className="monster-body blue-gray">
              <div className="cat-ear left"></div>
              <div className="cat-ear right"></div>
              <div className="monster-eye"></div>
              <div className="monster-eye"></div>
              <div className="cat-whiskers"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="achievements-section">
        <div className="achievement-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#FFD700">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            <circle cx="12" cy="12" r="4" fill="#FFA500"/>
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
        <button className="control-panel-button">
          Ir al panel de control
        </button>
      </div>


      <style jsx>{`

        html{
            padding: 10px;
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
          background: #C9F9B9;
          border-radius: 38.5px;
          padding: 5px;
          display: flex;
          align-items: center;

          margin-bottom: 20px;
          
        }
        
        .xpbar{
          display: flex;
          background: white;
          border-radius: 38.5px;
          padding: 12px 20px;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #E8F5E9;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-name {
          font-weight: 700;
          font-size: 18px;
          color: #224420;
          flex: 1;
        }

        .user-level {
          background-color: #C8E6C9;
          padding: 6px 16px;
          border-radius: 15px;
          font-weight: 700;
          color: #224420;
          font-size: 14px;
        }

        .daily-missions {
          background: #C9F9B9;
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 30px;
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
          margin-bottom: 20px;
        }

        .subjects-header h2 {
          color: #0A6802;
          font-size: 32px;
          font-weight: 900;
          margin: 0;
          font-family: 'Mulish', sans-serif;
        }

        /* Added CSS-based raccoon character styles */
        .raccoon-character {
          width: 120px;
          height: 120px;
          margin-top: -20px;
          position: relative;
        }

        .raccoon-body {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .raccoon-face {
          width: 80px;
          height: 80px;
          background: #8B7355;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .raccoon-ear {
          width: 25px;
          height: 30px;
          background: #8B7355;
          border-radius: 50% 50% 0 0;
          position: absolute;
          top: 20px;
        }

        .raccoon-ear.left {
          left: 15px;
          transform: rotate(-20deg);
        }

        .raccoon-ear.right {
          right: 15px;
          transform: rotate(20deg);
        }

        .raccoon-mask {
          width: 60px;
          height: 25px;
          background: #5D4E37;
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 30px;
        }

        .raccoon-eye {
          width: 14px;
          height: 14px;
          background: #2C1810;
          border-radius: 50%;
          position: absolute;
          top: 35px;
        }

        .raccoon-eye.left {
          left: 20px;
        }

        .raccoon-eye.right {
          right: 20px;
        }

        .raccoon-eye::after {
          content: '';
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
        }

        .raccoon-nose {
          width: 12px;
          height: 10px;
          background: #2C1810;
          border-radius: 50%;
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
        }

        .path-container {
          position: relative;
          min-height: 1400px;
          margin: 20px 0;
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
          z-index: 2;
        }

        .subject-icon {
          width: 60px;
          height: 60px;
          background: white;
          border: 4px solid #C8E6C9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Added CSS-based monster character styles */
        .character-spot {
          position: absolute;
          z-index: 1;
        }

        .monster-body {
          width: 80px;
          height: 80px;
          border-radius: 50% 50% 45% 45%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .monster-body.blue {
          background: #5DADE2;
        }

        .monster-body.red {
          background: #E74C3C;
        }

        .monster-body.green {
          background: #52C470;
        }

        .monster-body.purple {
          background: #9B59B6;
        }

        .monster-body.yellow {
          background: #F39C12;
        }

        .monster-body.blue-gray {
          background: #7F8C8D;
        }

        .monster-eye {
          width: 18px;
          height: 18px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 25px;
          border: 2px solid #2C3E50;
        }

        .monster-eye::after {
          content: '';
          width: 8px;
          height: 8px;
          background: #2C3E50;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .blue-monster .monster-eye:first-of-type {
          left: 18px;
        }

        .blue-monster .monster-eye:last-of-type {
          right: 18px;
        }

        .monster-eye.single {
          width: 28px;
          height: 28px;
          left: 50%;
          transform: translateX(-50%);
        }

        .monster-eye.angry {
          width: 14px;
          height: 14px;
        }

        .red-monster .monster-eye:first-of-type {
          left: 20px;
        }

        .red-monster .monster-eye:last-of-type {
          right: 20px;
        }

        .purple-dog .monster-eye:first-of-type {
          left: 20px;
        }

        .purple-dog .monster-eye:last-of-type {
          right: 20px;
        }

        .yellow-monster .monster-eye:first-of-type {
          left: 20px;
        }

        .yellow-monster .monster-eye:last-of-type {
          right: 20px;
        }

        .blue-cat .monster-eye:first-of-type {
          left: 20px;
        }

        .blue-cat .monster-eye:last-of-type {
          right: 20px;
        }

        .monster-mouth {
          width: 35px;
          height: 20px;
          background: #2C3E50;
          border-radius: 0 0 35px 35px;
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
        }

        .monster-mouth.happy {
          border-radius: 0 0 40px 40px;
        }

        .monster-mouth.angry {
          width: 30px;
          height: 15px;
          border-radius: 30px 30px 0 0;
          bottom: 20px;
        }

        .monster-mouth.growl {
          width: 25px;
          height: 18px;
          border-radius: 0 0 30px 30px;
        }

        .monster-tooth {
          width: 6px;
          height: 10px;
          background: white;
          position: absolute;
          bottom: 25px;
        }

        .monster-tooth.left {
          left: 24px;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .monster-tooth.right {
          right: 24px;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .monster-horn {
          width: 12px;
          height: 18px;
          background: #C0392B;
          position: absolute;
          top: -5px;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .monster-horn.left {
          left: 15px;
        }

        .monster-horn.right {
          right: 15px;
        }

        .monster-tentacle {
          width: 20px;
          height: 25px;
          background: #52C470;
          border-radius: 0 0 15px 15px;
          position: absolute;
          bottom: -15px;
        }

        .monster-tentacle:first-of-type {
          left: 15px;
        }

        .monster-tentacle:last-of-type {
          right: 15px;
        }

        .dog-ear {
          width: 25px;
          height: 35px;
          background: #8E44AD;
          border-radius: 50% 50% 0 0;
          position: absolute;
          top: -10px;
        }

        .dog-ear.left {
          left: 5px;
          transform: rotate(-15deg);
        }

        .dog-ear.right {
          right: 5px;
          transform: rotate(15deg);
        }

        .dog-snout {
          width: 30px;
          height: 20px;
          background: #A569BD;
          border-radius: 50%;
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
        }

        .monster-fang {
          width: 8px;
          height: 12px;
          background: white;
          position: absolute;
          bottom: 28px;
          clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
        }

        .monster-fang.left {
          left: 22px;
        }

        .monster-fang.right {
          right: 22px;
        }

        .cat-ear {
          width: 20px;
          height: 25px;
          background: #95A5A6;
          position: absolute;
          top: -8px;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .cat-ear.left {
          left: 10px;
        }

        .cat-ear.right {
          right: 10px;
        }

        .cat-whiskers::before,
        .cat-whiskers::after {
          content: '';
          width: 20px;
          height: 2px;
          background: #34495E;
          position: absolute;
          bottom: 25px;
        }

        .cat-whiskers::before {
          left: -15px;
        }

        .cat-whiskers::after {
          right: -15px;
        }

        .achievements-section {
          background: white;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .achievement-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .achievement-header h3 {
          color: #224420;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          font-family: 'Quicksand', sans-serif;
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

        @media (max-width: 768px) {
          .dashboard-page {
            padding: 16px;
          }

          .subjects-header h2 {
            font-size: 28px;
          }

          .raccoon-character {
            width: 90px;
            height: 90px;
          }
        }
      `}</style>
    </div>
  );
}
