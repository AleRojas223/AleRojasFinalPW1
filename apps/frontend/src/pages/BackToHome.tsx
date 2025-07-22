import { useNavigate } from "react-router-dom";

const BackToHomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboard")}
      className="fixed top-4 left-4 z-50 px-5 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-press-start"
      style={{
        background: "linear-gradient(135deg, #0066cc 0%, #003366 100%)",
        color: "#00ffff",
        border: "2px solid #00a2ff",
        boxShadow: "0 0 10px rgba(0, 150, 255, 0.5), inset 0 0 5px rgba(0, 200, 255, 0.3)",
        textShadow: "0 0 3px #00a2ff",
        fontSize: "0.8rem",
        letterSpacing: "1px"
      }}
    >
      ← VOLVER AL DASHBOARD
    </button>
  );
};

export default BackToHomeButton;