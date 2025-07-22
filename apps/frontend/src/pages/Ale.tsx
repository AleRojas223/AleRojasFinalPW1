import React, { useEffect, useState, type FormEvent } from "react";
import api from "../libs/api";
import BackToHomeButton from "./BackToHome";

interface Category {
  id: number;
  name: string;
}

interface ItemInterface {
  id: number;
  name: string;
  price: number;
  category?: Category;
  category_id?: number;
}

const Ale: React.FC = () => {
  const [productList, setProductList] = useState<ItemInterface[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get<Category[]>("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get<ItemInterface[]>("/products?include=category");
      setProductList(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategoryId("");
    setEditingId(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      price: Number(price),
      category_id: categoryId || undefined,
    };
    try {
      if (editingId !== null) {
        await api.put(`/products/${editingId}`, payload);
      } else {
        await api.post("/products", payload);
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (item: ItemInterface) => {
    setEditingId(item.id);
    setName(item.name);
    setPrice(item.price);
    setCategoryId(item.category_id ?? "");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este juego?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
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
            LISTA DE JUEGOS
          </h1>
        </header>

        {/* Contenedor principal con dos columnas */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Columna izquierda - Formulario */}
          <div className="lg:w-1/3">
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-lg relative"
              style={{
                background: "rgba(0, 20, 60, 0.7)",
                border: "4px solid #00a2ff",
                boxShadow: "0 0 30px rgba(0, 150, 255, 0.6), inset 0 0 20px rgba(0, 200, 255, 0.4)",
                backdropFilter: "blur(5px)",
              }}
            >
              <div className="space-y-6">
                <div>
                  <label
                    className="block text-sm mb-1 font-press-start"
                    style={{
                      color: "#00ccff",
                      textShadow: "0 0 5px #0066ff"
                    }}
                  >
                    NOMBRE DEL VIDEOJUEGO:
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

                <div>
                  <label
                    className="block text-sm mb-1 font-press-start"
                    style={{
                      color: "#00ccff",
                      textShadow: "0 0 5px #0066ff"
                    }}
                  >
                    PRECIO ($):
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
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

                <div>
                  <label
                    className="block text-sm mb-1 font-press-start"
                    style={{
                      color: "#00ccff",
                      textShadow: "0 0 5px #0066ff"
                    }}
                  >
                    GÉNERO:
                  </label>
                  <select
                    value={categoryId}
                    onChange={e => setCategoryId(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none font-press-start"
                    style={{
                      background: "rgba(0, 30, 80, 0.8)",
                      border: "2px solid #00a2ff",
                      color: "#ffffff",
                      boxShadow: "inset 0 0 10px rgba(0, 150, 255, 0.3)",
                      letterSpacing: "1px"
                    }}
                  >
                    <option value="">Selecciona un género</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name.toUpperCase()}
                      </option>
                    ))}
                  </select>
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
                      onClick={resetForm}
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

          {/* Columna derecha - Lista de Juegos */}
          <div className="lg:w-2/3">
            {productList.length === 0 ? (
              <p
                className="text-center text-lg font-press-start"
                style={{
                  color: "#00ccff",
                  textShadow: "0 0 5px #0066ff"
                }}
              >
                NO HAY JUEGOS DISPONIBLES
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {productList.map(item => (
                  <div
                    key={item.id}
                    className="relative p-6 rounded-lg"
                    style={{
                      background: "rgba(0, 20, 60, 0.7)",
                      border: "3px solid #00a2ff",
                      boxShadow: "0 0 20px rgba(0, 150, 255, 0.5), inset 0 0 10px rgba(0, 200, 255, 0.3)",
                      backdropFilter: "blur(3px)",
                    }}
                  >
                    <div className="mb-4">
                      <h2
                        className="text-xl font-bold font-press-start"
                        style={{
                          color: "#00ffff",
                          textShadow: "0 0 5px #00a2ff",
                          letterSpacing: "1px"
                        }}
                      >
                        {item.name.toUpperCase()}
                      </h2>

                      {item.category && (
                        <div className="my-2">
                          <span
                            className="text-xs font-medium px-3 py-1 rounded-full font-press-start inline-block"
                            style={{
                              background: "rgba(0, 150, 255, 0.3)",
                              color: "#00ffff",
                              border: "1px solid #00a2ff",
                              textShadow: "0 0 3px #00a2ff",
                            }}
                          >
                            {item.category.name.toUpperCase()}
                          </span>
                        </div>
                      )}

                      <p
                        className="text-lg font-press-start mt-2"
                        style={{
                          color: "#00ccff",
                          textShadow: "0 0 3px #0066ff"
                        }}
                      >
                        $ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(item)}
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
                        onClick={() => handleDelete(item.id)}
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

export default Ale;