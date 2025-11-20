// src/hooks/useAuthStatus.js

import { useState, useEffect } from 'react';
import { auth } from '../index.js'; // Asegúrate de que esta ruta sea correcta

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Escucha los cambios de estado de autenticación de Firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUser(user);
      } else {
        setLoggedIn(false);
        setUser(null);
      }
      setCheckingStatus(false);
    });

    return () => unsubscribe();
  }, []);

  return { loggedIn, checkingStatus, user };
};