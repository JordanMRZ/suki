

import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../index.js'; // Asegúrate de que la ruta a tu archivo firebase.js sea correcta
import { signOut } from "firebase/auth"; // Función de Firebase para cerrar sesión
import { useAuthStatus } from '../hooks/useAuthStatus'; // Hook para verificar sesión (Paso anterior)
import { useChildData } from '../hooks/useChildData';

export default function PanelControl() {
  const navigate = useNavigate();

  // 1. Obtener estado de autenticación
  const { loggedIn, checkingStatus } = useAuthStatus(); 
  
  // 2. Obtener datos dinámicos del niño
  // Nota: El hook useChildData necesita ser actualizado para retornar también la edad (childAge)
  const { childName, childAge, childLevel, loading } = useChildData(); 

  // --- LÓGICA DE CIERRE DE SESIÓN ---
  const handleLogout = async () => {
    try {
      await signOut(auth); // Llama a la función de Firebase para cerrar la sesión
      navigate("/login"); // Redirige al usuario a la página de login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("No se pudo cerrar la sesión. Intenta de nuevo.");
    }
  };

  // --- LÓGICA DE CARGA Y PROTECCIÓN DE RUTA ---
  if (checkingStatus || loading) {
    // Muestra un estado de carga mientras verifica si el usuario está logueado y carga sus datos.
    return <div className="loading-screen">Cargando Panel...</div>; 
  }

  if (!loggedIn) {
    // Si la verificación de Auth falla o el usuario no está logueado, lo redirige.
    navigate("/login"); 
    return null;
  }
  
  return (
    <div className="panel-page">
      {/* Header con flecha de regreso */}
      <div className="header">
        <button className="back-button" onClick={() => navigate.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1>Panel de control</h1>
      </div>

      {/* Progreso del usuario */}
      <div className="progress-section">
        <h2>Progreso de {childName} • {childAge}</h2>
        
        <div className="user-card">
          <div className="user-info">
            <div className="avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#758A73"/>
              </svg>
            </div>
            <span className="username">{childName}</span>
          </div>
          <div className="level">{childLevel}</div>
        </div>
      </div>

      {/* Editar Perfil */}
      <div className="edit-profile-section">
        <h3>Editar Perfil</h3>
        
        <div className="profile-avatar-container">
          <img 
            src="/cute-raccoon-with-glasses-illustration.jpg" 
            alt="Perfil de Mariana" 
            className="profile-avatar"
          />
        </div>
        
        <button className="edit-button">
          Editar Perfil
        </button>
      </div>

      {/* Cuenta */}
      <div className="account-section">
        <h3>Cuenta</h3>
        
        <div className="account-buttons">
          <button className="account-button green">
            Cambiar contraseña
          </button>
          
          <button className="account-button green">
            Cambiar correo
          </button>
          
          <button className="account-button red" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button className="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
        </button>
        
        <button className="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="18"/>
            <rect x="14" y="9" width="7" height="12"/>
          </svg>
        </button>
        
        <button className="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </button>
        
        <button className="nav-item active">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6M5.6 5.6l4.2 4.2m4.2 4.2l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.2-4.2l4.2-4.2"/>
          </svg>
        </button>
      </div>

      <style jsx>{`
        .panel-page {
          background-color: #F5FFF2;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Mulish', sans-serif;
          padding-bottom: 80px;
        }

        .header {
          display: flex;
          align-items: center;
          padding: 20px;
          gap: 12px;
        }

        .back-button {
          background: none;
          border: none;
          color: #224420;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .header h1 {
          color: #224420;
          font-family: 'Fredoka', sans-serif;
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }

        .progress-section {
          padding: 0 20px 20px;
        }

        .progress-section h2 {
          color: #1C1C1C;
          font-family: 'Mulish', sans-serif;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .user-card {
          background: linear-gradient(135deg, #E8FFE5 0%, #C8F5C4 100%);
          border-radius: 20px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }

        .username {
          color: #1C1C1C;
          font-family: 'Mulish', sans-serif;
          font-size: 20px;
          font-weight: 700;
        }

        .level {
          color: #224420;
          font-family: 'Mulish', sans-serif;
          font-size: 20px;
          font-weight: 700;
        }

        .edit-profile-section {
          padding: 20px;
          background: white;
          margin: 0 20px;
          border-radius: 16px;
          margin-bottom: 20px;
        }

        .edit-profile-section h3 {
          color: #224420;
          font-family: 'Mulish', sans-serif;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .profile-avatar-container {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .profile-avatar {
          width: 180px;
          height: 180px;
          object-fit: contain;
        }

        .edit-button {
          width: 100%;
          max-width: 250px;
          margin: 0 auto;
          display: block;
          background-color: #56A74F;
          color: white;
          font-family: 'Mulish', sans-serif;
          font-weight: 700;
          font-size: 16px;
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .edit-button:hover {
          background-color: #4E8F4E;
        }

        .account-section {
          padding: 0 20px;
        }

        .account-section h3 {
          color: #224420;
          font-family: 'Mulish', sans-serif;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .account-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .account-button {
          width: 100%;
          font-family: 'Mulish', sans-serif;
          font-weight: 700;
          font-size: 16px;
          border: none;
          border-radius: 12px;
          padding: 16px 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
        }

        .account-button.green {
          background-color: #56A74F;
        }

        .account-button.green:hover {
          background-color: #4E8F4E;
        }

        .account-button.red {
          background-color: #EF5350;
        }

        .account-button.red:hover {
          background-color: #E53935;
        }

        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-radius: 24px 24px 0 0;
          padding: 16px 20px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
        }

        .nav-item {
          background: none;
          border: none;
          color: #758A73;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s ease;
        }

        .nav-item:hover {
          color: #56A74F;
        }

        .nav-item.active {
          color: #56A74F;
        }

        .nav-item svg {
          width: 24px;
          height: 24px;
        }
      `}</style>
    </div>
  );
}
