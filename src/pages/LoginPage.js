import React from "react";
import raccoon from "../assets/suki-login.png"; // Cambia este nombre por el tuyo (png o svg)

export default function Login() {
  return (
    <div className="login-page">
      {/* Encabezado con mapache y título */}
              <div className="blob-container">
        
        <svg xmlns="http://www.w3.org/2000/svg" width="626" height="720" viewBox="0 0 626 720" fill="none">
        <circle cx="282.5" cy="282.5" r="282.5" fill="#DBFFD8"/>
        <ellipse cx="275.5" cy="283" rx="228.5" ry="227" fill="#F5FFF2"/>
        <ellipse cx="233" cy="254" rx="203" ry="192" fill="#DBFFD8"/>
        <path d="M238.823 256.878C238.067 256.021 239.108 254.771 240.088 255.36L246.639 259.295C246.967 259.492 247.379 259.484 247.699 259.276L252.222 256.335C253.062 255.788 254.095 256.681 253.676 257.591L251.422 262.489C251.261 262.838 251.315 263.248 251.559 263.544L256.173 269.127C256.895 270.002 255.835 271.213 254.872 270.613L248.76 266.798C248.43 266.592 248.011 266.596 247.685 266.808L243.173 269.743C242.332 270.289 241.3 269.397 241.719 268.486L243.964 263.609C244.129 263.25 244.067 262.826 243.805 262.53L238.823 256.878Z" fill="white"/>
        <path d="M261.379 258.227C261.09 257.131 262.559 256.476 263.181 257.423L273.786 273.548C273.998 273.869 274.374 274.04 274.755 273.989L287.963 272.219C288.971 272.084 289.514 273.366 288.714 273.996L278.251 282.243C277.948 282.482 277.81 282.874 277.895 283.25L281.963 301.135C282.212 302.231 280.743 302.841 280.142 301.891L270.375 286.444C270.167 286.114 269.785 285.935 269.397 285.987L256.202 287.756C255.194 287.891 254.651 286.609 255.45 285.98L265.895 277.747C266.207 277.501 266.344 277.092 266.243 276.707L261.379 258.227Z" fill="white"/>
        <path d="M562.632 243.273C562.903 242.163 564.524 242.304 564.601 243.444L565.113 251.069C565.139 251.451 565.38 251.784 565.734 251.928L570.732 253.961C571.66 254.338 571.517 255.695 570.531 255.871L565.223 256.819C564.845 256.887 564.539 257.165 564.436 257.535L562.488 264.511C562.183 265.603 560.583 265.425 560.526 264.292L560.166 257.096C560.146 256.708 559.904 256.366 559.544 256.22L554.557 254.192C553.629 253.814 553.771 252.458 554.758 252.281L560.044 251.337C560.433 251.268 560.745 250.975 560.839 250.591L562.632 243.273Z" fill="white"/>
        <path d="M574.409 262.558C575.143 261.695 576.52 262.526 576.099 263.578L568.921 281.493C568.779 281.85 568.853 282.257 569.112 282.54L578.11 292.37C578.797 293.12 578.055 294.298 577.081 294.002L564.335 290.125C563.966 290.013 563.565 290.123 563.305 290.408L550.949 303.963C550.191 304.794 548.851 303.937 549.288 302.901L556.388 286.06C556.54 285.7 556.468 285.285 556.204 284.997L547.215 275.176C546.528 274.426 547.27 273.248 548.243 273.545L560.967 277.415C561.347 277.53 561.761 277.409 562.019 277.106L574.409 262.558Z" fill="white"/>
        <path d="M256.319 610.154C255.871 609.089 257.25 608.196 257.981 609.078L271.507 625.389C271.749 625.681 272.133 625.804 272.497 625.707L285.702 622.186C286.649 621.933 287.324 623.091 286.665 623.84L277.488 634.268C277.234 634.557 277.16 634.967 277.298 635.326L284.624 654.299C285.038 655.37 283.653 656.221 282.941 655.334L270.369 639.655C270.128 639.355 269.739 639.227 269.368 639.325L256.175 642.843C255.227 643.096 254.553 641.938 255.211 641.189L264.374 630.778C264.636 630.48 264.706 630.055 264.553 629.691L256.319 610.154Z" fill="white"/>
        <path d="M267.868 591.944C267.399 590.988 268.744 590.262 269.588 591.015L276.242 596.958C276.54 597.225 276.977 597.329 277.364 597.226L283.81 595.505C284.875 595.221 285.752 596.417 284.963 597.079L280.194 601.083C279.906 601.324 279.819 601.699 279.97 602.043L283.146 609.282C283.567 610.241 282.211 610.92 281.393 610.159L275.263 604.461C274.965 604.184 274.519 604.073 274.125 604.178L267.694 605.895C266.629 606.179 265.752 604.983 266.541 604.321L271.289 600.335C271.587 600.084 271.669 599.691 271.496 599.339L267.868 591.944Z" fill="white"/>
        <path d="M549.504 433.413C549.504 432.349 551.031 432.289 551.457 433.336L554.818 441.601C554.969 441.971 555.315 442.257 555.708 442.334L562.254 443.625C563.335 443.839 563.596 445.299 562.596 445.546L556.552 447.043C556.188 447.134 555.944 447.432 555.928 447.807L555.596 455.705C555.552 456.751 554.036 456.764 553.636 455.722L550.638 447.907C550.493 447.527 550.141 447.232 549.74 447.153L543.21 445.865C542.128 445.652 541.868 444.192 542.867 443.944L548.884 442.454C549.263 442.36 549.509 442.043 549.509 441.651L549.504 433.413Z" fill="white"/>
        <path d="M572.652 445.932C573.333 445.026 574.757 445.771 574.401 446.846L568.337 465.168C568.216 465.533 568.315 465.935 568.591 466.202L578.175 475.461C578.907 476.168 578.238 477.389 577.249 477.153L564.289 474.065C563.913 473.976 563.52 474.11 563.278 474.411L551.776 488.699C551.072 489.574 549.682 488.801 550.054 487.74L556.107 470.496C556.236 470.127 556.139 469.717 555.858 469.445L546.284 460.195C545.552 459.488 546.22 458.267 547.21 458.503L560.147 461.585C560.534 461.678 560.939 461.531 561.178 461.213L572.652 445.932Z" fill="white"/>
        </svg>
        </div>
      <div className="header">
        <h1>Bienvenido a<br />Suki</h1>
        
      </div>
           <div className="raccoon-container">
          <img src={raccoon} alt="Mapache Suki" className="raccoon-login" />
        </div>

      {/* Formulario */}
      <div className="login-container">
        <h2>Inicio de sesión</h2>

        <form>
          <div className="input-group">
            <label>Correo Electrónico</label>
            <div className="input-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none"> <path d="M6.74999 8.99999C9.23527 8.99999 11.25 6.98527 11.25 4.49999C11.25 2.01472 9.23527 0 6.74999 0C4.26472 0 2.25 2.01472 2.25 4.49999C2.25 6.98527 4.26472 8.99999 6.74999 8.99999Z" fill="#758A73"/> <path d="M6.74999 10.5C3.02378 10.5041 0.00414843 13.5238 0 17.25C0 17.6642 0.335777 18 0.749987 18H12.75C13.1642 18 13.4999 17.6642 13.4999 17.25C13.4958 13.5238 10.4762 10.5041 6.74999 10.5Z" fill="#758A73"/> </svg>
              <input type="email" placeholder="correo@gmail.com" required />
            </div>
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <div className="input-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none"> <path d="M13.4583 6.669V5.54167C13.4583 4.07193 12.8745 2.66238 11.8352 1.62312C10.796 0.583853 9.38641 0 7.91667 0C6.44693 0 5.03738 0.583853 3.99812 1.62312C2.95885 2.66238 2.375 4.07193 2.375 5.54167V6.669C1.66991 6.97673 1.06977 7.48325 0.647978 8.12663C0.226183 8.77 0.00101205 9.52235 0 10.2917V15.0417C0.00125705 16.0911 0.418698 17.0972 1.16076 17.8392C1.90282 18.5813 2.9089 18.9987 3.95833 19H11.875C12.9244 18.9987 13.9305 18.5813 14.6726 17.8392C15.4146 17.0972 15.8321 16.0911 15.8333 15.0417V10.2917C15.8323 9.52235 15.6072 8.77 15.1854 8.12663C14.7636 7.48325 14.1634 6.97673 13.4583 6.669ZM3.95833 5.54167C3.95833 4.49185 4.37537 3.48503 5.1177 2.7427C5.86003 2.00037 6.86685 1.58333 7.91667 1.58333C8.96648 1.58333 9.9733 2.00037 10.7156 2.7427C11.458 3.48503 11.875 4.49185 11.875 5.54167V6.33333H3.95833V5.54167ZM14.25 15.0417C14.25 15.6716 13.9998 16.2756 13.5544 16.721C13.109 17.1664 12.5049 17.4167 11.875 17.4167H3.95833C3.32844 17.4167 2.72435 17.1664 2.27895 16.721C1.83356 16.2756 1.58333 15.6716 1.58333 15.0417V10.2917C1.58333 9.66178 1.83356 9.05769 2.27895 8.61229C2.72435 8.16689 3.32844 7.91667 3.95833 7.91667H11.875C12.5049 7.91667 13.109 8.16689 13.5544 8.61229C13.9998 9.05769 14.25 9.66178 14.25 10.2917V15.0417Z" fill="#758A73"/> <path d="M7.91667 11.0833C7.7067 11.0833 7.50534 11.1667 7.35687 11.3151C7.20841 11.4636 7.125 11.665 7.125 11.8749V13.4583C7.125 13.6682 7.20841 13.8696 7.35687 14.018C7.50534 14.1665 7.7067 14.2499 7.91667 14.2499C8.12663 14.2499 8.32799 14.1665 8.47646 14.018C8.62493 13.8696 8.70833 13.6682 8.70833 13.4583V11.8749C8.70833 11.665 8.62493 11.4636 8.47646 11.3151C8.32799 11.1667 8.12663 11.0833 7.91667 11.0833Z" fill="#758A73"/> </svg>
              <input type="password" placeholder="************" required />
            </div>
          </div>

          <a href="#" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </a>

          <button type="submit" className="login-button">
            Siguiente
          </button>

          <p className="register-text">
            No tienes cuenta? <a href="#">Regístrate</a>
          </p>
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
        .blob-container {
          position: fixed;
          top: 25%;
          left: 25%;
          transform: translate(-50%, -50%);
         width: 625.04px; /* reduce tamaño si es necesario */
          height: 719.28px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 0;
          pointer-events: none;
        }
        
        .blob-container svg {
          width: 100%;
          max-width: 625px;
          height: auto;
          opacity: 0.8;
        }
        .raccoon-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          width: 250px;
        }




        .raccoon-login {
          width: 250px;
          height: auto;
          transform: scale(1.4)translateY(32px);
        }

        .login-container {
          background: #fff;
          border-radius: 20px 20px 0 0;
          min-height: 60vh;
          width: 100%;
          overflow: hidden;
          flex: 1;
          z-index: 1;
        
          
        }

        form {
          padding: 30px;
        }


        .login-container h2 {
          color: #224420;
          font-family: 'Quicksand';
          font-weigth: 700;
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
