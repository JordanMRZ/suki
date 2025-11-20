import raccoon from "../assets/suki-landing-sombra.png"; // Usaremos la imagen del mapache triste
import { useNavigate } from 'react-router-dom';
import React from 'react';

/**
 * Componente para mostrar una página de error (ej: 404 - No encontrado).
 * Mantiene la estructura del componente de "Completado" pero con enfoque de error.
 */
export default function ErrorPage() {
    // Para redirigir al usuario, por ejemplo, a la página principal.
    const navigate = useNavigate();

    // Puedes pasar un mensaje de error específico si quieres que se muestre,
    // pero para una página de error genérica (404), no es necesario el useLocation.

    const handleGoHome = () => {
        // Redirige al usuario a la página principal.
        navigate("/main"); 
        // Si fuera un error más específico, podrías usar: navigate(-1) para volver a la página anterior.
    };

    // La imagen del mapache triste generada es conceptual; la reemplazarías con el path
    // de la imagen que quieres usar. Si usas la imagen que subiste, está bien.
    const tristeRaccoon = 'TU_URL_DEL_MAPACHE_TRISTE'; // Reemplaza con la ruta correcta o usa 'raccoon' si es la misma.

    return (
        <div className="page-container">
            
            <h1 className="title">¡OH NO!</h1>
            <p className="subtitle">Parece que ha ocurrido un error.</p>

            <img 
                // Usamos el path de la imagen existente o de la que generaste
                src={raccoon} 
                className="raccoon-img"
                alt="Mapache Suki triste con gafas"
            />

            <div className="error-message-box">
                <p>No pudimos encontrar la página que buscas o algo salió mal.</p>
                <p>El mapache Suki está muy triste por esto. 😢</p>
                <p>Por favor, intenta volver al inicio.</p>
            </div>

            <button className="back-btn" onClick={handleGoHome}>
                Volver a la Página Principal
            </button>

            <style jsx>{`
                .page-container {
                    background: #FFF4F4; /* Fondo claro con toque de rojo/error */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    padding: 40px 20px;
                    text-align: center;
                    min-height: 100vh; /* Para ocupar toda la altura de la vista */
                }

                .error-message-box {
                    margin: 30px 0;
                    padding: 20px;
                    border: 2px solid #D32F2F; /* Borde rojo de error */
                    border-radius: 10px;
                    background: #FFEDED; /* Fondo claro de la caja */
                    font-size: 18px;
                    font-weight: 500;
                    color: #A00000; /* Texto oscuro de error */
                }
                
                .title {
                    margin-top: 30px;
                    font-size: 38px;
                    font-weight: 800;
                    color: #A00000; /* Título rojo fuerte */
                    font-family: 'Quicksand', sans-serif;
                }

                .subtitle {
                    margin-top: -10px;
                    font-size: 20px;
                    color: #A00000;
                    font-family: 'Quicksand', sans-serif;
                    font-weight: 600;
                }

                .raccoon-img {
                    width: 350px; /* Un poco más pequeño para centrar la atención en el error */
                    height: auto;
                    margin-top: 20px;
                }

                .back-btn {
                    width: 100%;
                    background: #FF7043; /* Botón naranja que indica acción de "volver/recuperar" */
                    color: white;
                    border: none;
                    margin-top: 50px; /* Un poco menos de margen que el anterior para la estructura de error */
                    padding: 16px 0;
                    border-radius: 14px;
                    font-size: 18px;
                    font-weight: 700;
                    font-family: 'Quicksand', sans-serif;
                    cursor: pointer;
                    transition: background 0.3s;
                }

                .back-btn:hover {
                    background: #E64A19;
                }
            `}</style>

        </div>
    )
}