// src/hooks/useChildData.js

import { useState, useEffect } from 'react';
import { auth, db } from '../index.js'; // Asegúrate de que db (Firestore) esté exportado
import { doc, getDoc } from 'firebase/firestore';

export const useChildData = () => {
  const [childName, setChildName] = useState("Cargando...");
  const [childAge, setChildAge] = useState("...");
  const [childLevel, setChildLevel] = useState("..."); // Para el nivel
  const [loading, setLoading] = useState(true);
  const [xpPercentage, setXpPercentage] = useState(0);

  useEffect(() => {
    const fetchChildData = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          // Obtener el documento usando el UID del usuario
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setChildName(data.childName || "Niño");
            setChildAge(data.childAge || "?");
            setXpPercentage(data.xpPercentage || 0);
            // Aquí puedes cargar más datos, como el nivel. Asumiendo que guardaste 'childLevel'
            // setChildLevel(data.childLevel || "lv 1"); 
            setChildLevel(data.childLevel || "1"); // Por ahora, lo dejamos en lv 1
          } else {
            setChildName("Datos no encontrados");
          }
        } catch (error) {
          console.error("Error al obtener datos del niño:", error);
          setChildName("Error de carga");
        }
      } else {
        setChildName("Invitado");
      }
      setLoading(false);
    };

    fetchChildData();
  }, []);

  return { childName, childLevel, loading, childAge, xpPercentage };
};