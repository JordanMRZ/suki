import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { UserProvider } from './context/UserContext';
import HomePage from './pages/HomePage';
import EntrarPage from './pages/EntrarPage';
import RegisterPage from './pages/RegisterPage';
import InteractiveMap from './pages/InteractiveMap';
import SettingsPage from './pages/SettingsPage';
import SubjectPage from './pages/SubjectPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <AccessibilityProvider>
      <UserProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/entrar" element={<EntrarPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/map" element={<InteractiveMap />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/subject/:subjectId" element={<SubjectPage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              {/* Rutas adicionales se agregarán más adelante */}
            </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
    </AccessibilityProvider>
  );
}

export default App;
