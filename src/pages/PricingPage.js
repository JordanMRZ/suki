import React from "react";
import sukiLogo from "../assets/suki-landing-sombra.png"; // Logo de Suki

export default function PricingPage() {
  return (
    <div style={{ fontFamily: "'Quicksand', sans-serif", background: "#f2ffe9", minHeight: "100vh", padding: "40px 20px" }}>
      <header style={{ textAlign: "center", marginBottom: "50px" }}>
        <img src={sukiLogo} alt="Suki Logo" style={{ width: "120px", marginBottom: "20px" }} />
        <h1 style={{ fontSize: "3rem", color: "#2e7d32", marginBottom: "10px" }}>Planes de Suki</h1>
        <p style={{ fontSize: "1.2rem", color: "#4e8f4e" }}>Elige el plan perfecto para potenciar el aprendizaje y la diversión</p>
      </header>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "30px" }}>
        {/* Plan Básico */}
        <div style={{
          background: "#fff",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          width: "280px",
          padding: "30px",
          textAlign: "center"
        }}>
          <h2 style={{ fontSize: "1.8rem", color: "#2e7d32", marginBottom: "20px" }}>Básico</h2>
          <p style={{ fontSize: "2rem", color: "#4e8f4e", marginBottom: "20px" }}>$0 / mes</p>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "left", marginBottom: "30px" }}>
            <li>✔ Acceso a lecciones de arte y lenguaje</li>
            <li>✔ Actividades interactivas básicas</li>
            <li>✔ Seguimiento de progreso limitado</li>
            <li>✔ Juegos educativos sencillos</li>
          </ul>
          <button style={{
            background: "#2e7d32",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 20px",
            fontSize: "1rem",
            cursor: "pointer"
          }}>Comenzar Gratis</button>
        </div>

        {/* Plan Premium */}
        <div style={{
          background: "#4e8f4e",
          color: "#fff",
          borderRadius: "15px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          width: "280px",
          padding: "30px",
          textAlign: "center"
        }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>Premium</h2>
          <p style={{ fontSize: "2rem", marginBottom: "20px" }}>$9.99 / mes</p>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "left", marginBottom: "30px" }}>
            <li>✔ Acceso completo a todas las lecciones</li>
            <li>✔ Actividades interactivas avanzadas</li>
            <li>✔ Seguimiento de progreso completo</li>
            <li>✔ Juegos educativos y retos diarios</li>
            <li>✔ Recompensas y XP para motivación</li>
            <li>✔ Atención personalizada y soporte rápido</li>
          </ul>
          <button style={{
            background: "#fff",
            color: "#4e8f4e",
            border: "none",
            borderRadius: "8px",
            padding: "12px 20px",
            fontSize: "1rem",
            cursor: "pointer"
          }}>Suscribirse</button>
        </div>
      </div>

      <section style={{ marginTop: "60px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", color: "#2e7d32", marginBottom: "20px" }}>Ventajas de Suki</h2>
        <p style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.1rem", color: "#4e8f4e" }}>
          Suki combina aprendizaje y diversión para los niños, ofreciendo contenido educativo interactivo, seguimiento de progreso, recompensas motivadoras y retos diarios. Nuestro enfoque gamificado asegura que cada lección sea entretenida y efectiva, adaptándose al ritmo de cada niño y fomentando hábitos de estudio positivos desde temprana edad.
        </p>
      </section>
    </div>
  );
}
