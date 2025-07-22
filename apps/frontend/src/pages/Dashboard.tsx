import { Link } from "react-router-dom";
import fondoRetro from "../assets/FondoDashboard.jpg";

const Dashboard = () => {
  return (
    <div
      className="p-10 min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${fondoRetro})`,
        boxShadow: "inset 0 0 10rem rgba(0, 100, 255, 0.3)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Efecto de líneas de escaneo CRT */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
        backgroundSize: "100% 2px, 3px 100%",
        animation: "scan 8s linear infinite",
      }}></div>

      {/* Efecto de borde de monitor */}
      <div className="absolute inset-0 border-8 border-blue-900 pointer-events-none" style={{
        boxShadow: "inset 0 0 20px rgba(0, 200, 255, 0.5), 0 0 40px rgba(0, 150, 255, 0.3)"
      }}></div>

      {/* Título más arriba */}
      <h1 className="text-6xl font-extrabold mb-4 px-8 py-6 rounded-lg relative z-10" style={{
        color: "#00ffff",
        textShadow: "0 0 10px #00a2ff, 0 0 20px #0066ff",
        background: "linear-gradient(135deg, rgba(0, 50, 150, 0.8) 0%, rgba(0, 100, 200, 0.8) 100%)",
        border: "4px solid #00a2ff",
        boxShadow: "0 0 20px rgba(0, 150, 255, 0.7)",
        fontFamily: "'Press Start 2P', cursive",
        letterSpacing: "2px",
        animation: "glow 2s ease-in-out infinite alternate"
      }}>
        Level 99 Game Store
      </h1>

      {/* Botones reorganizados en columna */}
      <div className="flex flex-col space-y-6 relative z-10 mt-8">
        <Link
          to="/venta"
          className="px-10 py-5 font-bold rounded-lg hover:scale-105 transition-all duration-300 text-center"
          style={{
            background: "linear-gradient(135deg, #0099cc 0%, #006699 100%)",
            color: "#ffffff",
            border: "3px solid #00ccff",
            boxShadow: "0 0 15px rgba(0, 200, 255, 0.5), inset 0 0 10px rgba(0, 230, 255, 0.3)",
            textShadow: "0 0 5px #00ccff",
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "1.1rem",
            width: "250px"
          }}
        >
          VENTAS
        </Link>
        <Link
          to="/ale"
          className="px-10 py-5 font-bold rounded-lg hover:scale-105 transition-all duration-300 text-center"
          style={{
            background: "linear-gradient(135deg, #0066cc 0%, #003366 100%)",
            color: "#00ffff",
            border: "3px solid #00a2ff",
            boxShadow: "0 0 15px rgba(0, 150, 255, 0.5), inset 0 0 10px rgba(0, 200, 255, 0.3)",
            textShadow: "0 0 5px #00a2ff",
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "1.1rem",
            width: "250px"
          }}
        >
          JUEGOS
        </Link>
        <Link
          to="/categorias"
          className="px-10 py-5 font-bold rounded-lg hover:scale-105 transition-all duration-300 text-center"
          style={{
            background: "linear-gradient(135deg, #003366 0%, #000033 100%)",
            color: "#00ccff",
            border: "3px solid #0066ff",
            boxShadow: "0 0 15px rgba(0, 100, 255, 0.5), inset 0 0 10px rgba(0, 150, 255, 0.3)",
            textShadow: "0 0 5px #0066ff",
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "1.1rem",
            width: "250px"
          }}
        >
          GÉNEROS
        </Link>
      </div>

      {/* Animaciones CSS para efectos retro */}
      <style jsx>{`
        @keyframes scan {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        @keyframes glow {
          from { text-shadow: 0 0 10px #00a2ff, 0 0 20px #0066ff; }
          to { text-shadow: 0 0 15px #00a2ff, 0 0 30px #0066ff, 0 0 40px #0033ff; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;