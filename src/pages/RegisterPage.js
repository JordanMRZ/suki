import React from "react";
import raccoon from "../assets/suki-register1-caritasola.png";
import raccoonpatitas from "../assets/suki-register1-patitas.png"; // Cambia este nombre por el tuyo (png o svg)

export default function Login() {
  return (
    <div className="login-page">
      {/* Encabezado con mapache y título */}

          <div className="blob-right">
          <svg xmlns="http://www.w3.org/2000/svg" width="151" height="118" viewBox="0 0 151 118" fill="none">
          <ellipse cx="28.6536" cy="25.9713" rx="28.6536" ry="25.9713" transform="matrix(-1 0 0 1 57.3071 66.0576)" fill="white"/>
          <ellipse cx="31.8373" cy="36.134" rx="31.8373" ry="36.134" transform="matrix(-1 0 0 1 151 0)" fill="white"/>
          <ellipse cx="46.8464" cy="29.9234" rx="46.8464" ry="29.9234" transform="matrix(-1 0 0 1 130.078 30.4883)" fill="white"/>
          <rect width="95.0572" height="33.8756" transform="matrix(-1 0 0 1 119.162 84.1245)" fill="white"/>
          </svg>
          </div>
          <div className="blob-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="195" height="118" viewBox="0 0 195 118" fill="none">
          <ellipse cx="157.997" cy="92.0289" rx="37.003" ry="25.9713" fill="white"/>
          <ellipse cx="41.1145" cy="36.134" rx="41.1145" ry="36.134" fill="white"/>
          <ellipse cx="87.5151" cy="60.4117" rx="60.497" ry="29.9234" fill="white"/>
          <rect x="41.1145" y="84.1245" width="122.756" height="33.8756" fill="white"/>
          </svg>
        </div>
      <div className="header">
        <h1>Bienvenido a<br />Suki</h1>
        


        <div className="raccoon-container">
          <img src={raccoon} alt="Mapache Suki" className="raccoon-login" />
  
          <img src={raccoonpatitas} alt="Mapache Suki" className="raccoon-login-patitas" />
        </div>

        
        
      </div>

      {/* Formulario */}
      <div className="login-container">
        <h2>Registro</h2>

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

            <div className="input-group">
            <label>Confirmar Contraseña</label>
            <div className="input-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none"> <path d="M13.4583 6.669V5.54167C13.4583 4.07193 12.8745 2.66238 11.8352 1.62312C10.796 0.583853 9.38641 0 7.91667 0C6.44693 0 5.03738 0.583853 3.99812 1.62312C2.95885 2.66238 2.375 4.07193 2.375 5.54167V6.669C1.66991 6.97673 1.06977 7.48325 0.647978 8.12663C0.226183 8.77 0.00101205 9.52235 0 10.2917V15.0417C0.00125705 16.0911 0.418698 17.0972 1.16076 17.8392C1.90282 18.5813 2.9089 18.9987 3.95833 19H11.875C12.9244 18.9987 13.9305 18.5813 14.6726 17.8392C15.4146 17.0972 15.8321 16.0911 15.8333 15.0417V10.2917C15.8323 9.52235 15.6072 8.77 15.1854 8.12663C14.7636 7.48325 14.1634 6.97673 13.4583 6.669ZM3.95833 5.54167C3.95833 4.49185 4.37537 3.48503 5.1177 2.7427C5.86003 2.00037 6.86685 1.58333 7.91667 1.58333C8.96648 1.58333 9.9733 2.00037 10.7156 2.7427C11.458 3.48503 11.875 4.49185 11.875 5.54167V6.33333H3.95833V5.54167ZM14.25 15.0417C14.25 15.6716 13.9998 16.2756 13.5544 16.721C13.109 17.1664 12.5049 17.4167 11.875 17.4167H3.95833C3.32844 17.4167 2.72435 17.1664 2.27895 16.721C1.83356 16.2756 1.58333 15.6716 1.58333 15.0417V10.2917C1.58333 9.66178 1.83356 9.05769 2.27895 8.61229C2.72435 8.16689 3.32844 7.91667 3.95833 7.91667H11.875C12.5049 7.91667 13.109 8.16689 13.5544 8.61229C13.9998 9.05769 14.25 9.66178 14.25 10.2917V15.0417Z" fill="#758A73"/> <path d="M7.91667 11.0833C7.7067 11.0833 7.50534 11.1667 7.35687 11.3151C7.20841 11.4636 7.125 11.665 7.125 11.8749V13.4583C7.125 13.6682 7.20841 13.8696 7.35687 14.018C7.50534 14.1665 7.7067 14.2499 7.91667 14.2499C8.12663 14.2499 8.32799 14.1665 8.47646 14.018C8.62493 13.8696 8.70833 13.6682 8.70833 13.4583V11.8749C8.70833 11.665 8.62493 11.4636 8.47646 11.3151C8.32799 11.1667 8.12663 11.0833 7.91667 11.0833Z" fill="#758A73"/> </svg>
              <input type="password" placeholder="************" required />
            </div>
          </div>



          <button type="submit" className="login-button">
            Siguiente
          </button>

          <p className="register-text">
            Ya tienes cuenta? <a href="#">Inicia Sesion</a>
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
        .blob-left,
        .blob-right {
          position: fixed;
          top: 0px;
            
        }
        .blob-left svg,
        .blob-right svg {
          width: 151px;
          height: auto;
        }

        .blob-left {
          left: -40px;
          top: 60px;    /* ajusta */
        }

        .blob-right {
          right: -40px;
          top: 160px   /* ajusta */
        }
        .raccoon-container {
          height: 220px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .raccoon-login {
          position: absolute;
          width: 300px;
          height: auto;
          display: block;
          transform: translateX(3%)rotate(4deg);
          top: 35px;
        }

        .raccoon-login-patitas {
          position: absolute;
          width: 200px;      /* ajusta */
          bottom: -25px;     /* esto las pega debajo del mapache */
          left: 50%;
          transform: translateX(-50%)rotate(6deg);
          z-index: 3;
        }

        .login-container {
          background: #fff;
          border-radius: 20px 20px 0 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          flex: 1;
          z-index: 2;
          
        
          
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
