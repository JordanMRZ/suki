import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

const createInitialProgress = () => ({
  points: 0,
  level: 1,
  achievements: [],
  subjects: {
    'Ética y Valores': { level: 1, points: 0, completedLevels: [] },
    'Matemáticas': { level: 1, points: 0, completedLevels: [] },
    'Inglés': { level: 1, points: 0, completedLevels: [] },
    'Biología': { level: 1, points: 0, completedLevels: [] },
    'Historia': { level: 1, points: 0, completedLevels: [] },
    'Español': { level: 1, points: 0, completedLevels: [] }
  },
  totalTime: 0,
  timeBySubject: {
    'Ética y Valores': 0,
    'Matemáticas': 0,
    'Inglés': 0,
    'Biología': 0,
    'Historia': 0,
    'Español': 0,
    Mapa: 0
  }
});

// Crear el contexto
const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  // Estado para el usuario
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Estado para el progreso y puntos del usuario
  const [userProgress, setUserProgress] = useState(createInitialProgress);

  // Función para iniciar sesión
  const login = useCallback((userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    // En una aplicación real, aquí se cargaría el progreso del usuario desde una base de datos
  }, []);

  // Función para cerrar sesión
  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    // Reiniciar el progreso (solo para demostración, en una app real se guardaría)
    setUserProgress(createInitialProgress());
  }, []);

  // Función para registrar un nuevo usuario
  const register = useCallback((userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    // En una aplicación real, aquí se crearía el usuario en una base de datos
  }, []);

  // Función para añadir puntos
  const addPoints = useCallback((points, subject) => {
    setUserProgress(prev => {
      const newPoints = prev.points + points;
      const newLevel = Math.floor(newPoints / 100) + 1; // Cada 100 puntos = un nivel

      const subjectData = prev.subjects[subject]
        ? { ...prev.subjects[subject], points: prev.subjects[subject].points + points }
        : { level: 1, points, completedLevels: [] };

      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        subjects: {
          ...prev.subjects,
          [subject]: subjectData
        }
      };
    });
  }, []);

  // Función para completar un nivel
  const completeLevel = useCallback((subject, level) => {
    setUserProgress(prev => {
      const currentSubject = prev.subjects[subject] || { level: 1, points: 0, completedLevels: [] };
      let completedLevels = currentSubject.completedLevels;

      if (!completedLevels.includes(level)) {
        completedLevels = [...completedLevels, level];
      }

      const updatedSubject = {
        ...currentSubject,
        completedLevels,
        level: completedLevels.includes(level) && currentSubject.level === level
          ? currentSubject.level + 1
          : currentSubject.level
      };

      return {
        ...prev,
        subjects: {
          ...prev.subjects,
          [subject]: updatedSubject
        }
      };
    });
  }, []);

  // Función para añadir un logro
  const addAchievement = useCallback((achievement) => {
    setUserProgress(prev => {
      if (prev.achievements.includes(achievement)) {
        return prev;
      }

      return {
        ...prev,
        achievements: [...prev.achievements, achievement]
      };
    });
  }, []);

  // Función para actualizar tiempo de uso
  const updateTime = useCallback((time, subject) => {
    setUserProgress(prev => ({
      ...prev,
      totalTime: prev.totalTime + time,
      timeBySubject: {
        ...prev.timeBySubject,
        [subject]: (prev.timeBySubject[subject] || 0) + time
      }
    }));
  }, []);

  // Valores que se proporcionarán al contexto
  const value = useMemo(() => ({
    user,
    isLoggedIn,
    userProgress,
    login,
    logout,
    register,
    addPoints,
    completeLevel,
    addAchievement,
    updateTime
  }), [user, isLoggedIn, userProgress, login, logout, register, addPoints, completeLevel, addAchievement, updateTime]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};