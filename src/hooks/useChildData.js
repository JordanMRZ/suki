// src/hooks/useChildData.js

import { useState, useEffect } from 'react';
// Asegúrate de importar updateDoc para actualizar la base de datos
import { auth, db } from '../index.js'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 

// --- Funciones de Lógica de Nivel (Helpers) ---

// Calcula el XP total necesario para alcanzar el Nivel N+1
const calculateRequiredXP = (levelNumber) => {
    // Ejemplo: Nivel 1 -> 100 XP. Nivel 2 -> 150 XP. Nivel 3 -> 200 XP.
    // Fórmula: 100 + (Nivel - 1) * 50
    return 100 + (levelNumber - 1) * 50; 
};

// ---------------------------------------------

const DAILY_MISSION_TEMPLATES = [
    { id: 1, text: "Completa 1 lección", points: 30, goal: 1, type: 'lessons_completed' },
    { id: 2, text: "Completa 3 lecciones", points: 50, goal: 3, type: 'lessons_completed' },
    { id: 3, text: "Acierta 10 preguntas", points: 40, goal: 10, type: 'questions_correct' },
];

export const useChildData = () => {
    const [childName, setChildName] = useState("Cargando...");
    const [childAge, setChildAge] = useState("...");
    const [childLevel, setChildLevel] = useState(1); // Usaremos un número para la lógica
    const [loading, setLoading] = useState(true);
    // 🎯 NUEVO ESTADO: XP acumulado en el nivel actual
    const [currentXP, setCurrentXP] = useState(0); 
    // 🎯 XP requerido para subir al siguiente nivel
    const [xpRequired, setXpRequired] = useState(calculateRequiredXP(1)); 

    const [activeMissions, setActiveMissions] = useState([]);

    // Calcula el porcentaje de la barra de XP para el renderizado
    const xpPercentage = Math.round((currentXP / xpRequired) * 100);

    // --- 1. LÓGICA DE CARGA INICIAL (useEffect) ---
    useEffect(() => {
        const fetchChildData = async () => {
            const user = auth.currentUser;
            if (!user) {
                setChildName("Invitado");
                setLoading(false);
                return;
            }

            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const initialLevel = parseInt(data.level || 1);
                    const initialXP = data.xp || 0;

                    setChildName(data.childName || "Niño");
                    setChildAge(data.childAge || "?");
                    
                    // 🎯 CARGAR XP Y NIVEL REAL
                    setChildLevel(initialLevel);
                    setCurrentXP(initialXP);
                    setXpRequired(calculateRequiredXP(initialLevel));

                    const loadedMissions = data.missions || DAILY_MISSION_TEMPLATES;
                    setActiveMissions(loadedMissions);

                } else {
                    setChildName("Datos no encontrados");
                }
            } catch (error) {
                console.error("Error al obtener datos del niño:", error);
                setChildName("Error de carga");
            }
            setLoading(false);
        };

        // Escucha el cambio de estado de autenticación (opcional, pero buena práctica)
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchChildData();
            } else {
                setChildName("Invitado");
                setLoading(false);
            }
        });
        
        return () => unsubscribe(); // Limpiar el listener
    }, []);

    const updateMissionProgress = async (lessonsCompleted, questionsCorrect) => {
        const user = auth.currentUser;
        if (!user) return;

        let missionsUpdated = false;
        
        // Creamos una copia para modificar
        const newActiveMissions = activeMissions.map(mission => {
            if (mission.completed) return mission; // Saltar misiones ya completadas
            
            let currentProgress = mission.progress || 0;
            let goalReached = false;

            // Actualizar progreso según el tipo de misión
            if (mission.type === 'lessons_completed') {
                currentProgress += lessonsCompleted;
            } else if (mission.type === 'questions_correct') {
                currentProgress += questionsCorrect;
            }

            // Verificar si la meta se alcanzó
            if (currentProgress >= mission.goal) {
                currentProgress = mission.goal; // Bloquear progreso al máximo
                goalReached = true;
                missionsUpdated = true;
                
                // 🎯 SUMAR PUNTOS DE LA MISIÓN AL XP GLOBAL (usando updatePlayerXP)
                // Usamos await si updatePlayerXP no está expuesto para un llamado externo.
                // Si updatePlayerXP es el que llama a updateDoc, mejor exponer updateXPAndMissions.
            }
            
            return {
                ...mission,
                progress: currentProgress,
                completed: goalReached
            };
        });
        
        if (missionsUpdated) {
            // Llama a la lógica de XP (la función updatePlayerXP que ya definimos)
            const totalPointsGained = newActiveMissions
                .filter(m => m.completed && !activeMissions.find(oldM => oldM.id === m.id)?.completed)
                .reduce((sum, m) => sum + m.points, 0);

            if (totalPointsGained > 0) {
                 await updatePlayerXP(totalPointsGained); // Sumar puntos de la misión como XP
            }

            // Guardar el estado de las misiones actualizadas en Firebase
            try {
                const userRef = doc(db, 'users', user.uid);
                await updateDoc(userRef, {
                    missions: newActiveMissions,
                });
                setActiveMissions(newActiveMissions); // Actualizar estado local
            } catch (error) {
                console.error("Error al actualizar misiones en Firebase:", error);
            }
        }
    };

    // --- 2. FUNCIÓN DE ACTUALIZACIÓN Y SUBIDA DE NIVEL ---
    const updatePlayerXP = async (xpGained) => {
        const user = auth.currentUser;
        if (!user) return;

        let newXP = currentXP + xpGained;
        let newLevel = childLevel;
        let requiredXP = xpRequired;
        let levelUpOccurred = false;

        // Bucle para manejar subidas de nivel si newXP es suficiente
        while (newXP >= requiredXP) {
            newLevel++;
            newXP -= requiredXP; // XP restante se lleva al nuevo nivel
            requiredXP = calculateRequiredXP(newLevel);
            levelUpOccurred = true;
        }
        
        // 🛑 Guardar en Firebase
        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                level: newLevel, // Guardamos el número de nivel
                xp: newXP,        // Guardamos el XP actual del nuevo nivel
            });

            // 🛑 Actualizar estados locales (solo después de guardar exitosamente)
            if (levelUpOccurred) {
                console.log(`¡FELICIDADES! Subiste al Nivel ${newLevel}`);
            }
            setCurrentXP(newXP);
            setChildLevel(newLevel);
            setXpRequired(requiredXP); // Actualizar el requisito para el nuevo nivel

        } catch (error) {
            console.error("Error al actualizar XP en Firebase:", error);
            // Si falla, podrías revertir los estados locales o notificar al usuario.
        }
    };
    
    // Devolvemos el nivel formateado como string (ej. "lv 1")
    const formattedChildLevel = `lv ${childLevel}`;

    return { 
        childName, 
        childLevel: formattedChildLevel, // Devolvemos el formato que SubjectPage espera
        loading, 
        childAge, 
        xpPercentage,
        updatePlayerXP, // 🎯 Exportamos la función para que la use SubjectPage
        activeMissions, // 🎯 Devolver las misiones activas
        updatePlayerXP, // Función para XP general
        updateMissionProgress
    };
};