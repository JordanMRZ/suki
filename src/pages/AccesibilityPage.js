import React from "react";

export default function Accesibilidad() {
  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #E9FFE3, #F6FFF3)",
      padding: "24px",
      fontFamily: "Quicksand, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
header: {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",   // ← CENTRA EL TÍTULO
  position: "relative",       // ← Necesario para la flecha
  marginBottom: "32px"
},

backArrow: {
  fontFamily: "Poppins",
  fontSize: "30px",
  cursor: "pointer",
  color: "#56A74F",
  fontWeight: "900",
  padding: "8px 14px",
  borderRadius: "12px",
  background: "rgba(104, 203, 95, 0.15)",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  lineHeight: "1",
  position: "absolute",
  left: "0"    // ← La flecha queda al lado izquierdo sin mover nada
},


    title: {
      fontFamily: "Quicksand",
      fontWeight: "700",
      color: "#56A74F",
      fontSize: "36px",
      marginBottom: "16px",
      zIndex: 2,
      textShadow: "0px 1px 2px rgba(0,0,0,0.15)"
    },

    subtitle: {
      fontFamily: "Quicksand",
      color: "#333",
      fontSize: "20px",
      lineHeight: 1.6,
      marginBottom: "24px",
      textAlign: "center",
      maxWidth: "350px"
    },

    card: {
      background: "white",
      padding: "24px",
      borderRadius: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "380px",
      textAlign: "center",
      border: "1px solid #E6F5E3",
      marginBottom: "18px"
    },

    cardTitle: {
      fontFamily: "Quicksand",
      fontWeight: "700",
      color: "#56A74F",
      fontSize: "32px",
      marginBottom: "12px"
    },

    cardDesc: {
      fontFamily: "Quicksand",
      color: "#333",
      fontSize: "18px",
      lineHeight: 1.6,
      marginBottom: "16px"
    },

    button: {
      padding: "10px 22px",
      background: "#56A74F",
      color: "white",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
      transition: "0.2s"
    },

    buttonWhite: {
      padding: "10px 22px",
      background: "#56A74F",
      color: "#ffffff",
      borderRadius: "12px",
      border: "2px solid #56A74F",
      cursor: "pointer",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      transition: "0.2s"
    },

    buttonRow: {
      display: "flex",
      gap: "12px",
      justifyContent: "center"
    }
  };

  return (
    <div style={styles.page}>
     <header style={styles.header}>
  <span style={styles.backArrow}>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 18l-6-6 6-6"
        stroke="#56A74F"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>

  <h1 style={styles.title}>Accesibilidad</h1>
</header>


      <p style={styles.subtitle}>
        Configura la aplicación para que sea más fácil de usar
      </p>

      {[
        {
          title: "Tamaño de texto",
          content: (
            <div style={styles.buttonRow}>
              <button style={styles.buttonWhite}>Normal</button>
              <button style={styles.button}>Grande</button>
              <button style={styles.button}>Extra Grande</button>
            </div>
          )
        },
        {
          title: "Lectura en voz alta",
          desc: "Escucha el contenido de la pantalla"
        },
        {
          title: "Alto Contraste",
          desc: "Colores más fáciles de ver"
        },
        {
          title: "Instrucciones de Voz",
          desc: "Explicaciones habladas de cada juego"
        },
        {
          title: "Menos Animaciones",
          desc: "Movimientos más suaves y lentos"
        }
      ].map((item, i) => (
        <section key={i} style={styles.card}>
          <h2 style={styles.cardTitle}>{item.title}</h2>
          {item.desc && <p style={styles.cardDesc}>{item.desc}</p>}
          {item.content ? (
            item.content
          ) : (
            <button style={styles.button}>Activar</button>
          )}
        </section>
      ))}
    </div>
  );
}
