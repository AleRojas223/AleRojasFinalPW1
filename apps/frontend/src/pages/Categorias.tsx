// src/pages/Categories.tsx
import React, { useEffect, useState, type FormEvent } from "react";
import api from "../libs/api";
import BackToHomeButton from "./BackToHome";

interface Category {
  id: number;
  name: string;
}

const Categories: React.FC = () => {
  const [list, setList] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get<Category[]>("/categories");
      setList(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingId !== null) {
        await api.put(`/categories/${editingId}`, { name });
      } else {
        await api.post("/categories", { name });
      }
      setName("");
      setEditingId(null);
      setError(null);
      fetchCategories();
    } catch (err) {
      setError("Error al guardar la categoría");
      console.error(err);
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setName(cat.name);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar esta categoría?")) return;
    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "No se pudo eliminar. Puede que esta categoría tenga productos asociados.";
      setError(msg);
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div
      className="min-h-screen p-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #000033 0%, #003366 100%)",
        boxShadow: "inset 0 0 10rem rgba(0, 100, 255, 0.3)",
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

      <div className="relative z-10">
        <BackToHomeButton />

        {/* Header */}
        <header className="mb-8 py-4" style={{
          borderBottom: "4px solid #00a2ff",
          boxShadow: "0 0 20px rgba(0, 150, 255, 0.5)"
        }}>
          <h1
            className="text-4xl font-bold text-center font-press-start"
            style={{
              color: "#00ffff",
              textShadow: "0 0 10px #00a2ff, 0 0 20px #0066ff",
              letterSpacing: "2px"
            }}
          >
            GESTIÓN DE GÉNEROS
          </h1>
        </header>

        {/* Contenedor principal */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Columna izquierda - Formulario Fijo */}
          <div className="lg:w-1/3 lg:sticky lg:top-4 lg:h-fit">
            {error && (
              <div
                className="p-3 rounded mb-4 text-center font-press-start"
                style={{
                  background: "rgba(255, 0, 102, 0.3)",
                  color: "#ff3366",
                  border: "2px solid #ff0066",
                  boxShadow: "0 0 10px rgba(255, 0, 102, 0.3)",
                  textShadow: "0 0 3px #ff0066",
                }}
              >
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="p-6 rounded-lg relative"
              style={{
                background: "rgba(0, 20, 60, 0.7)",
                border: "4px solid #00a2ff",
                boxShadow: "0 0 30px rgba(0, 150, 255, 0.6), inset 0 0 20px rgba(0, 200, 255, 0.4)",
                backdropFilter: "blur(5px)",
              }}
            >
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm mb-1 font-press-start"
                    style={{
                      color: "#00ccff",
                      textShadow: "0 0 5px #0066ff"
                    }}
                  >
                    NOMBRE DE GÉNERO:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none font-press-start"
                    style={{
                      background: "rgba(0, 30, 80, 0.8)",
                      border: "2px solid #00a2ff",
                      color: "#ffffff",
                      boxShadow: "inset 0 0 10px rgba(0, 150, 255, 0.3)",
                      letterSpacing: "1px"
                    }}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    className={`flex-1 py-3 rounded-lg transition-all font-press-start ${editingId !== null ? "hover:scale-105" : ""}`}
                    style={{
                      background: "linear-gradient(135deg, #0066cc 0%, #003366 100%)",
                      color: "#00ffff",
                      border: "2px solid #00a2ff",
                      boxShadow: "0 0 15px rgba(0, 150, 255, 0.5), inset 0 0 10px rgba(0, 200, 255, 0.3)",
                      textShadow: "0 0 5px #00a2ff",
                      letterSpacing: "1px"
                    }}
                  >
                    {editingId !== null ? "ACTUALIZAR" : "AGREGAR"}
                  </button>
                  {editingId !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setName("");
                        setError(null);
                      }}
                      className="py-3 px-6 rounded-lg font-press-start hover:scale-105 transition-all"
                      style={{
                        background: "rgba(255, 0, 0, 0.3)",
                        color: "#ff3366",
                        border: "2px solid #ff0066",
                        boxShadow: "0 0 15px rgba(255, 0, 102, 0.3)",
                        textShadow: "0 0 5px #ff0066",
                        letterSpacing: "1px"
                      }}
                    >
                      CANCELAR
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Columna derecha - Lista de Géneros con Scroll */}
          <div className="lg:w-2/3">
            {list.length === 0 ? (
              <p
                className="text-center text-lg font-press-start"
                style={{
                  color: "#00ccff",
                  textShadow: "0 0 5px #0066ff"
                }}
              >
                NO HAY GÉNEROS DISPONIBLES
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pb-8">
                {list.map(cat => (
                  <div
                    key={cat.id}
                    className="relative p-6 rounded-lg"
                    style={{
                      background: "rgba(0, 20, 60, 0.7)",
                      border: "3px solid #00a2ff",
                      boxShadow: "0 0 20px rgba(0, 150, 255, 0.5), inset 0 0 10px rgba(0, 200, 255, 0.3)",
                      backdropFilter: "blur(3px)",
                    }}
                  >
                    <span
                      className="text-xl font-bold font-press-start block"
                      style={{
                        color: "#00ffff",
                        textShadow: "0 0 5px #00a2ff",
                        letterSpacing: "1px"
                      }}
                    >
                      {cat.name.toUpperCase()}
                    </span>
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="flex-1 py-2 rounded font-press-start hover:scale-105 transition-all"
                        style={{
                          background: "rgba(0, 150, 255, 0.3)",
                          color: "#00ffff",
                          border: "1px solid #00a2ff",
                          boxShadow: "0 0 10px rgba(0, 150, 255, 0.3)",
                          textShadow: "0 0 3px #00a2ff",
                        }}
                      >
                        ✎ EDITAR
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="flex-1 py-2 rounded font-press-start hover:scale-105 transition-all"
                        style={{
                          background: "rgba(255, 0, 102, 0.3)",
                          color: "#ff3366",
                          border: "1px solid #ff0066",
                          boxShadow: "0 0 10px rgba(255, 0, 102, 0.3)",
                          textShadow: "0 0 3px #ff0066",
                        }}
                      >
                        🗑 ELIMINAR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Categories;