import React from 'react';
import suki from "../src/assets/suki-landing-sombra.png";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { UserProvider } from './context/UserContext';
import { useAuthStatus } from './hooks/useAuthStatus';
import EntrarPage from './pages/EntrarPage';
import RegisterPage from './pages/RegisterPage';
import Register2Page from './pages/Register2Page';
import InteractiveMap from './pages/InteractiveMap';
import SettingsPage from './pages/SettingsPage';
import SubjectPage from './pages/SubjectPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import AccesibilityPage from './pages/AccesibilityPage';
import PccuentaPage from './pages/PanelControlCuenta';
import './App.css';

function App() {

  const { checkingStatus } = useAuthStatus();

  
  if (checkingStatus) {
    // Esto se muestra SOLAMENTE en el primer renderizado de la página
    return (
      <div
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
      </div>
    );
  }

  

  return (
    <AccessibilityProvider>
      <UserProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/entrar" element={<EntrarPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/map" element={<InteractiveMap />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/subject/:subjectId/:level" element={<SubjectPage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register-two" element={<Register2Page />} />
              <Route path="/main" element={<MainPage />} />
                <Route path="/Accessibility" element={<AccesibilityPage />} />
                <Route path="/paneldecontrolcuenta" element={<PccuentaPage />} />
              {/* Rutas adicionales se agregarán más adelante */}
            </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
    </AccessibilityProvider>
  );
}

export default App;
