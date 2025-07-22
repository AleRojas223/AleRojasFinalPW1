import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../libs/api";
import FondoLogin from "../assets/FondoLogin.png"; // Asegúrate de que la ruta es correcta

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const doLogin = async () => {
    if (!form.username || !form.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await api.post("/login", form, { withCredentials: true });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${FondoLogin})`,
        // Efecto de oscurecimiento del fondo para mejor contraste
        boxShadow: "inset 0 0 0 2000px rgba(0, 20, 40, 0.7)",
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

      {/* Panel de login */}
      <div 
        className="relative z-10 rounded-lg w-full max-w-sm p-8 sm:p-10"
        style={{
          background: "rgba(0, 20, 60, 0.7)",
          border: "4px solid #00a2ff",
          boxShadow: "0 0 30px rgba(0, 150, 255, 0.6), inset 0 0 20px rgba(0, 200, 255, 0.4)",
          backdropFilter: "blur(5px)",
        }}
      >
        <h2 
          className="text-3xl font-bold text-center mb-8 font-press-start"
          style={{
            color: "#00ffff",
            textShadow: "0 0 10px #00a2ff, 0 0 20px #0066ff",
            letterSpacing: "2px"
          }}
        >
          INICIAR SESIÓN
        </h2>
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm mb-1 font-press-start"
              style={{
                color: "#00ccff",
                textShadow: "0 0 5px #0066ff"
              }}
            >
              USUARIO:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none font-press-start"
              disabled={loading}
              style={{
                background: "rgba(0, 30, 80, 0.8)",
                border: "2px solid #00a2ff",
                color: "#ffffff",
                boxShadow: "inset 0 0 10px rgba(0, 150, 255, 0.3)",
                letterSpacing: "1px"
              }}
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm mb-1 font-press-start"
              style={{
                color: "#00ccff",
                textShadow: "0 0 5px #0066ff"
              }}
            >
              CONTRASEÑA:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none font-press-start"
              disabled={loading}
              style={{
                background: "rgba(0, 30, 80, 0.8)",
                border: "2px solid #00a2ff",
                color: "#ffffff",
                boxShadow: "inset 0 0 10px rgba(0, 150, 255, 0.3)",
                letterSpacing: "1px"
              }}
            />
          </div>

          {error && (
            <p 
              className="text-center text-sm font-press-start"
              style={{
                color: "#ff3366",
                textShadow: "0 0 5px #ff0066"
              }}
            >
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={doLogin}
            className={`w-full py-3 rounded-lg transition-all font-press-start ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"}`}
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #0066cc 0%, #003366 100%)",
              color: "#00ffff",
              border: "2px solid #00a2ff",
              boxShadow: "0 0 15px rgba(0, 150, 255, 0.5), inset 0 0 10px rgba(0, 200, 255, 0.3)",
              textShadow: "0 0 5px #00a2ff",
              letterSpacing: "1px"
            }}
          >
            {loading ? "CARGANDO..." : "INICIAR SESIÓN"}
          </button>
        </form>
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

export default Login;