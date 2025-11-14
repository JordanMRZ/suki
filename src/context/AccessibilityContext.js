import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

// Crear el contexto
const AccessibilityContext = createContext();

// Proveedor del contexto
export const AccessibilityProvider = ({ children }) => {
  // Estados para las opciones de accesibilidad
  const [fontSize, setFontSize] = useState('medium'); // small, medium, large
  const [highContrast, setHighContrast] = useState(false);
  const [theme, setTheme] = useState('pastel'); // pastel, dark, blue
  const [textToSpeech, setTextToSpeech] = useState(true);

  // Función para leer texto en voz alta
  const speakText = useCallback((text) => {
    if (!textToSpeech || !text) return;
    
    if ('speechSynthesis' in window) {
      // Cancelar cualquier voz en curso
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  }, [textToSpeech]);
  
  // Función para detener la voz
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Valores que se proporcionarán al contexto
  const value = useMemo(() => ({
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    theme,
    setTheme,
    textToSpeech,
    setTextToSpeech,
    speakText,
    stopSpeaking
  }), [fontSize, highContrast, theme, textToSpeech, speakText, stopSpeaking]);

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Hook para usar el contexto
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility debe ser usado dentro de un AccessibilityProvider');
  }
  return context;
};