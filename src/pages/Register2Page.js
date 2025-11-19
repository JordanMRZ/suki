import React from "react";
import raccoon from "../assets/suki-register2.png";

export default function Login() {
  return (
    <div className="login-page">
      {/* Encabezado con mapache y título */}
      <div className="blob-container-green">
        <svg xmlns="http://www.w3.org/2000/svg" width="474" height="447" viewBox="0 0 474 447" fill="none">
          <ellipse cx="220" cy="304.5" rx="74" ry="89.5" fill="url(#paint0_linear_344_215)"/>
          <ellipse cx="143" cy="357.5" rx="74" ry="89.5" fill="url(#paint1_linear_344_215)"/>
          <ellipse cx="296.878" cy="343.437" rx="77" ry="75.5" transform="rotate(2.22845 296.878 343.437)" fill="url(#paint2_linear_344_215)"/>
          <ellipse cx="382.878" cy="368.437" rx="77" ry="75.5" transform="rotate(2.22845 382.878 368.437)" fill="url(#paint3_linear_344_215)"/>
          <circle cx="328" cy="134" r="38" fill="url(#paint4_linear_344_215)"/>
          <circle cx="99" cy="55" r="38" fill="url(#paint5_linear_344_215)"/>
          <ellipse cx="267" cy="18.5" rx="19" ry="18.5" fill="url(#paint6_linear_344_215)"/>
          <ellipse cx="436" cy="195.5" rx="38" ry="37.5" fill="url(#paint7_linear_344_215)"/>
          <ellipse cx="405" cy="74.5" rx="19" ry="18.5" fill="url(#paint8_linear_344_215)"/>
          <ellipse cx="127" cy="190.5" rx="19" ry="18.5" fill="url(#paint9_linear_344_215)"/>
          <ellipse cx="30.5" cy="145.5" rx="30.5" ry="29.5" fill="url(#paint10_linear_344_215)"/>
          <path d="M54.3194 248.154C53.8708 247.089 55.2499 246.196 55.981 247.078L69.5069 263.389C69.7487 263.681 70.1327 263.804 70.4975 263.707L83.7017 260.186C84.6494 259.934 85.324 261.092 84.6652 261.84L75.4883 272.268C75.2338 272.557 75.16 272.968 75.2983 273.326L82.6245 292.299C83.038 293.37 81.6529 294.221 80.9412 293.334L68.3691 277.656C68.1284 277.355 67.7387 277.227 67.3683 277.326L54.175 280.843C53.2273 281.096 52.5527 279.938 53.2115 279.189L62.374 268.778C62.636 268.48 62.7058 268.055 62.5525 267.692L54.3194 248.154Z" fill="white"/>
          <path d="M73.8677 228.943C73.3991 227.988 74.7444 227.262 75.5876 228.015L82.2419 233.958C82.5402 234.225 82.977 234.329 83.3635 234.226L89.8098 232.505C90.875 232.22 91.7514 233.417 90.9628 234.079L86.1936 238.083C85.906 238.324 85.8187 238.699 85.9697 239.043L89.1462 246.282C89.5669 247.24 88.211 247.919 87.3934 247.159L81.263 241.46C80.9651 241.183 80.5192 241.073 80.125 241.178L73.6939 242.895C72.6286 243.179 71.7522 241.983 72.5408 241.32L77.2887 237.335C77.5872 237.084 77.6689 236.691 77.496 236.339L73.8677 228.943Z" fill="white"/>
          <path d="M387.523 62.4556C388.236 61.6663 389.409 62.6467 389.022 63.709L385.968 72.0919C385.832 72.4677 385.897 72.9121 386.136 73.2328L390.123 78.5823C390.782 79.4663 389.996 80.7237 389.088 80.2366L383.602 77.2908C383.271 77.1132 382.891 77.1709 382.627 77.4388L377.081 83.0718C376.347 83.8179 375.214 82.8101 375.617 81.769L378.638 73.9631C378.785 73.5838 378.722 73.1286 378.478 72.8015L374.5 67.4646C373.842 66.5805 374.628 65.3231 375.535 65.8102L380.997 68.7428C381.34 68.9272 381.735 68.8575 381.999 68.5663L387.523 62.4556Z" fill="white"/>
          <path d="M359.699 69.6528C360.029 68.5692 361.623 68.7837 361.655 69.9161L362.203 89.2081C362.214 89.5922 362.444 89.936 362.794 90.0927L374.961 95.5281C375.89 95.9431 375.678 97.3187 374.667 97.4346L361.431 98.9519C361.048 98.9959 360.724 99.2565 360.599 99.6216L354.66 116.975C354.296 118.039 352.726 117.786 352.714 116.662L352.523 98.387C352.519 97.9963 352.288 97.6438 351.931 97.4844L339.775 92.0542C338.846 91.6392 339.059 90.2636 340.069 90.1477L353.282 88.6331C353.677 88.5878 354.008 88.3121 354.124 87.9313L359.699 69.6528Z" fill="white"/>
          <path d="M118.02 84.9092C117.989 83.7669 119.59 83.4753 119.964 84.555L122.469 91.7757C122.594 92.1371 122.914 92.3953 123.294 92.4409L128.65 93.0839C129.646 93.2034 129.866 94.5499 128.96 94.98L124.09 97.2934C123.743 97.4582 123.521 97.8071 123.519 98.1912L123.48 105.434C123.473 106.568 121.883 106.818 121.529 105.74L119.285 98.8934C119.163 98.5241 118.839 98.2584 118.454 98.2121L113.109 97.5705C112.114 97.451 111.894 96.1045 112.799 95.6744L117.649 93.3707C118.006 93.2009 118.23 92.8364 118.22 92.4409L118.02 84.9092Z" fill="white"/>
          <path d="M134.464 100.407C134.945 99.3818 136.492 99.8207 136.363 100.946L134.162 120.12C134.118 120.502 134.296 120.875 134.621 121.08L145.892 128.19C146.752 128.733 146.347 130.064 145.33 130.035L132.013 129.655C131.627 129.644 131.269 129.856 131.094 130.2L122.747 146.533C122.236 147.533 120.717 147.06 120.865 145.946L123.275 127.829C123.326 127.442 123.148 127.06 122.817 126.852L111.557 119.748C110.697 119.205 111.102 117.874 112.12 117.903L125.413 118.282C125.811 118.294 126.178 118.068 126.347 117.708L134.464 100.407Z" fill="white"/>
          <defs>
            <linearGradient id="paint0_linear_344_215" x1="220" y1="215" x2="220" y2="394" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DBFFD8"/>
              <stop offset="1" stopColor="#F5FFF2"/>
            </linearGradient>
            <linearGradient id="paint1_linear_344_215" x1="143" y1="268" x2="143" y2="447" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DBFFD8"/>
              <stop offset="1" stopColor="#F5FFF2"/>
            </linearGradient>
            <linearGradient id="paint2_linear_344_215" x1="296.878" y1="267.937" x2="296.878" y2="418.937" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DBFFD8"/>
              <stop offset="1" stopColor="#F5FFF2"/>
            </linearGradient>
            <linearGradient id="paint3_linear_344_215" x1="382.878" y1="292.937" x2="382.878" y2="443.937" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DBFFD8"/>
              <stop offset="1" stopColor="#F5FFF2"/>
            </linearGradient>
            <linearGradient id="paint4_linear_344_215" x1="328" y1="96" x2="328" y2="172" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DBFFD8"/>
              <stop offset="1" stopColor="#F5FFF2"/>
            </linearGradient>
            <linearGradient id="paint5_linear_344_215" x1="99" y1="17" x2="99" y2="93" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DBFFD8"/>
              <stop offset="1" stopColor="#F5FFF2"/>
            </linearGradient>
            <linearGradient id="paint6_linear_344_215" x1="267" y1="0" x2="267" y2="37" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DBFFD8"/>
              <stop offset="1" stopColor="#F5FFF2"/>
            </linearGradient>
            <linearGradient id="paint7_linear_344_215" x1="436" y1="158" x2="436" y2="233" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DBFFD8"/>
              <stop offset="1" stopColor="#F5FFF2"/>
            </linearGradient>
            <linearGradient id="paint8_linear_344_215" x1="405" y1="56" x2="405" y2="93" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DBFFD8"/>
              <stop offset="1" stopColor="#F5FFF2"/>
            </linearGradient>
            <linearGradient id="paint9_linear_344_215" x1="127" y1="172" x2="127" y2="209" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DBFFD8"/>
              <stop offset="1" stopColor="#F5FFF2"/>
            </linearGradient>
            <linearGradient id="paint10_linear_344_215" x1="30.5" y1="116" x2="30.5" y2="175" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DBFFD8"/>
              <stop offset="1" stopColor="#F5FFF2"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="blob-container-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="557" height="258" viewBox="0 0 557 258" fill="none">
          <ellipse cx="92" cy="90.5" rx="92" ry="90.5" fill="white"/>
          <ellipse cx="216" cy="148.5" rx="92" ry="90.5" fill="white"/>
          <ellipse cx="356" cy="167.5" rx="92" ry="90.5" fill="white"/>
          <ellipse cx="465" cy="108.5" rx="92" ry="90.5" fill="white"/>
        </svg>
      </div>
      <div className="header">
        <h1>Bienvenido a<br />Suki</h1>

        <div className="raccoon-container">
          <img src={raccoon} alt="Mapache Suki" className="raccoon-login" />
        </div>
      </div>

      {/* Formulario */}
      <div className="login-container">
        <h2>Registro</h2>

        <form>
          <div className="input-group">
            <label>Nombre del niño</label>
            <div className="input-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none"> <path d="M6.74999 8.99999C9.23527 8.99999 11.25 6.98527 11.25 4.49999C11.25 2.01472 9.23527 0 6.74999 0C4.26472 0 2.25 2.01472 2.25 4.49999C2.25 6.98527 4.26472 8.99999 6.74999 8.99999Z" fill="#758A73"/> <path d="M6.74999 10.5C3.02378 10.5041 0.00414843 13.5238 0 17.25C0 17.6642 0.335777 18 0.749987 18H12.75C13.1642 18 13.4999 17.6642 13.4999 17.25C13.4958 13.5238 10.4762 10.5041 6.74999 10.5Z" fill="#758A73"/> </svg>
              <input type="text" placeholder="Nombre del niño" required />
            </div>
          </div>

          <div className="input-group">
            <label>Edad</label>
            <div className="input-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none"> <path d="M13.4583 6.669V5.54167C13.4583 4.07193 12.8745 2.66238 11.8352 1.62312C10.796 0.583853 9.38641 0 7.91667 0C6.44693 0 5.03738 0.583853 3.99812 1.62312C2.95885 2.66238 2.375 4.07193 2.375 5.54167V6.669C1.66991 6.97673 1.06977 7.48325 0.647978 8.12663C0.226183 8.77 0.00101205 9.52235 0 10.2917V15.0417C0.00125705 16.0911 0.418698 17.0972 1.16076 17.8392C1.90282 18.5813 2.9089 18.9987 3.95833 19H11.875C12.9244 18.9987 13.9305 18.5813 14.6726 17.8392C15.4146 17.0972 15.8321 16.0911 15.8333 15.0417V10.2917C15.8323 9.52235 15.6072 8.77 15.1854 8.12663C14.7636 7.48325 14.1634 6.97673 13.4583 6.669ZM3.95833 5.54167C3.95833 4.49185 4.37537 3.48503 5.1177 2.7427C5.86003 2.00037 6.86685 1.58333 7.91667 1.58333C8.96648 1.58333 9.9733 2.00037 10.7156 2.7427C11.458 3.48503 11.875 4.49185 11.875 5.54167V6.33333H3.95833V5.54167ZM14.25 15.0417C14.25 15.6716 13.9998 16.2756 13.5544 16.721C13.109 17.1664 12.5049 17.4167 11.875 17.4167H3.95833C3.32844 17.4167 2.72435 17.1664 2.27895 16.721C1.83356 16.2756 1.58333 15.6716 1.58333 15.0417V10.2917C1.58333 9.66178 1.83356 9.05769 2.27895 8.61229C2.72435 8.16689 3.32844 7.91667 3.95833 7.91667H11.875C12.5049 7.91667 13.109 8.16689 13.5544 8.61229C13.9998 9.05769 14.25 9.66178 14.25 10.2917V15.0417Z" fill="#758A73"/> <path d="M7.91667 11.0833C7.7067 11.0833 7.50534 11.1667 7.35687 11.3151C7.20841 11.4636 7.125 11.665 7.125 11.8749V13.4583C7.125 13.6682 7.20841 13.8696 7.35687 14.018C7.50534 14.1665 7.7067 14.2499 7.91667 14.2499C8.12663 14.2499 8.32799 14.1665 8.47646 14.018C8.62493 13.8696 8.70833 13.6682 8.70833 13.4583V11.8749C8.70833 11.665 8.62493 11.4636 8.47646 11.3151C8.32799 11.1667 8.12663 11.0833 7.91667 11.0833Z" fill="#758A73"/> </svg>
              <input type="number" placeholder="Digita la edad del niño" required min={3} max={15}/>
            </div>
          </div>

          <button type="submit" className="login-button">
            Completar el registro
          </button>

        </form>
      </div>

      <style jsx>{`
        .login-page {
          background-color: #F5FFF2;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: start;
          font-family: 'Mulish', sans-serif;
        }

        .header {
          text-align: center;
          margin-top: 40px;
          position: relative;
        }

        .header h1 {
          color: #4E8F4E;
          font-family: 'Fredoka', sans-serif;
          font-size: 36px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 20px;
          z-index: 1;
          position: relative;
        }
        
        .blob-container-green {
          position: fixed;
          bottom: 50%;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 474px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 0;
          pointer-events: none;
        }
        
        .blob-container-green svg {
          width: 100%;
          height: auto;
        }

        .blob-container-white {
          position: fixed;
          bottom: 35%;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 557px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 3;
          pointer-events: none;
        }
        
        .blob-container-white svg {
          width: 100%;
          height: auto;
        }
        
        .raccoon-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .raccoon-login {
          width: 200px;
          height: auto;
          transform: scale(1.4)translateY(28px);
        }

        .login-container {
          background: #fff;
          border-radius: 20px 20px 0 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          flex: 1;
          z-index: 4;
        }

        form {
          padding: 30px;
        }

        .login-container h2 {
          color: #224420;
          font-family: 'Quicksand';
          font-weight: 700;
          font-size: 22px;
          text-align: center;
          margin-bottom: 32px;
        }

        .input-group {
          margin-bottom: 16px;
        }

        label {
          display: flex;
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 6px;
          color: #224420;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          background: white;
          border: 1px solid #BAE6B7;
          border-radius: 12px;
          padding: 10px 14px;
        }

        .input-wrapper svg {
          margin-right: 10px;
          font-size: 1px;
          font-family: 'Mulish';
          font-weight: 400;
        }

        input {
          border: none;
          outline: none;
          font-size: 16px;
          width: 100%;
          color: #1C1C1C;
          font-family: 'Mulish';
        }

        input::placeholder {
          font-family: 'Mulish';
          color: #758A73;
        }

        .forgot-password {
          font-family: 'Mulish';
          display: block;
          text-align: right;
          font-size: 14px;
          color: #758A73;
          text-decoration: none;
          margin-top: 4px;
          margin-bottom: 20px;
        }

        .login-button {
          width: 100%;
          background-color: #56A74F;
          color: white;
          font-weight: 700;
          font-size: 18px;
          border: none; 
          border-radius: 10px;
          padding: 14px 0;
          cursor: pointer;
          transition: background 0.3s ease;
          font-family: 'Mulish', sans-serif;
        }

        .login-button:hover {
          background-color: #4E8F4E;
        }

        .register-text {
          text-align: center;
          margin-top: 20px;
          font-size: 15px;
        }

        .register-text a {
          color: #4E8F4E;
          font-weight: 600;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
