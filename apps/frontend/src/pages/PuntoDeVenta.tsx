// src/pages/PuntoDeVenta.tsx
import { useEffect, useState } from "react";
import api from "../libs/api";
import { jsPDF } from "jspdf";
import BackToHomeButton from "./BackToHome";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
}

interface CartItem extends Product {
  quantity: number;
}

interface Sale {
  items: CartItem[];
  total: number;
  date: string;
}

const PuntoDeVenta: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastSale, setLastSale] = useState<Sale | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<Product[]>("/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const finalizarVenta = () => {
    if (cart.length === 0) return;
    const now = new Date();
    const ticket: Sale = {
      items: cart,
      total,
      date: now.toLocaleString(),
    };
    setLastSale(ticket);
    setCart([]);
  };

  const descargarPDF = () => {
    if (!lastSale) return;
    const doc = new jsPDF({ unit: "px", format: "a6" });
    let y = 20;
    doc.setFontSize(14);
    doc.text("TICKET", 20, y);
    y += 30;
    doc.setFontSize(10);
    doc.text(`Fecha: ${lastSale.date}`, 20, y);
    y += 20;
    lastSale.items.forEach((it) => {
      doc.text(
        `${it.name} (${it.quantity}) - $. ${
          it.price * it.quantity
        }`,
        20,
        y
      );
      y += 20;
    });
    y += 10;
    doc.setFontSize(12);
    doc.text(`Total: $. ${lastSale.total}`, 20, y);
    doc.save(`ticket_${new Date().getTime()}.pdf`);
    setLastSale(null);
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
          VENTA DE JUEGOS
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Columna izquierda - Carrito y Ticket */}
        <div className="lg:w-1/3 lg:sticky lg:top-4 lg:h-[calc(100vh-200px)] lg:overflow-y-auto">
          <h2 
            className="text-2xl font-semibold mb-4 pb-2 font-press-start"
            style={{
              color: "#00ccff",
              textShadow: "0 0 5px #0066ff",
              borderBottom: "3px solid #00a2ff"
            }}
          >
            CARRITO
          </h2>
          
          {cart.length === 0 ? (
            <p 
              className="font-press-start"
              style={{
                color: "#00ccff",
                textShadow: "0 0 3px #0066ff"
              }}
            >
              EL CARRITO ESTÁ VACÍO
            </p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 rounded relative"
                  style={{
                    background: "rgba(0, 20, 60, 0.7)",
                    border: "2px solid #00a2ff",
                    boxShadow: "0 0 15px rgba(0, 150, 255, 0.3), inset 0 0 5px rgba(0, 200, 255, 0.2)",
                    backdropFilter: "blur(2px)",
                  }}
                >
                  <div>
                    <p 
                      className="font-bold font-press-start"
                      style={{
                        color: "#00ffff",
                        textShadow: "0 0 3px #00a2ff"
                      }}
                    >
                      {item.name.toUpperCase()}
                    </p>
                    <p 
                      className="text-xs font-press-start"
                      style={{
                        color: "#00ccff",
                        textShadow: "0 0 2px #0066ff"
                      }}
                    >
                      {item.quantity} × $ {item.price}
                    </p>
                    <p 
                      className="text-xs font-press-start italic"
                      style={{
                        color: "#00a2ff",
                        textShadow: "0 0 2px #0066ff"
                      }}
                    >
                      Género: {item.category.name.toUpperCase()}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="font-bold hover:scale-110 transition-transform"
                    style={{
                      color: "#ff3366",
                      textShadow: "0 0 3px #ff0066"
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              
              <div 
                className="flex justify-between font-bold text-lg font-press-start"
                style={{
                  color: "#00ffff",
                  textShadow: "0 0 5px #00a2ff"
                }}
              >
                <span>TOTAL:</span>
                <span>$ {total}</span>
              </div>
              
              <button
                onClick={finalizarVenta}
                className="w-full mt-2 py-3 rounded-lg font-press-start hover:scale-95 transition-all"
                style={{
                  background: "linear-gradient(135deg, #00aa00 0%, #006600 100%)",
                  color: "#00ff00",
                  border: "2px solid #00ff00",
                  boxShadow: "0 0 15px rgba(0, 255, 0, 0.5), inset 0 0 10px rgba(0, 255, 100, 0.3)",
                  textShadow: "0 0 5px #00aa00",
                  letterSpacing: "1px"
                }}
              >
                FINALIZAR VENTA
              </button>
            </div>
          )}

          {/* Ticket */}
          {lastSale && (
            <div 
              className="mt-6 p-6 rounded-lg relative"
              style={{
                background: "rgba(0, 20, 60, 0.7)",
                border: "3px solid #00a2ff",
                boxShadow: "0 0 20px rgba(0, 150, 255, 0.5), inset 0 0 10px rgba(0, 200, 255, 0.3)",
                backdropFilter: "blur(3px)",
              }}
            >
              <h3 
                className="text-center font-bold mb-2 text-lg font-press-start"
                style={{
                  color: "#00ffff",
                  textShadow: "0 0 5px #00a2ff"
                }}
              >
                TICKET DE VENTA
              </h3>
              <p 
                className="text-sm text-center mb-4 font-press-start"
                style={{
                  color: "#00ccff",
                  textShadow: "0 0 3px #0066ff"
                }}
              >
                {lastSale.date}
              </p>
              <div className="space-y-2">
                {lastSale.items.map((it) => (
                  <div 
                    key={it.id} 
                    className="flex justify-between text-sm font-press-start"
                    style={{
                      color: "#00ffff",
                      textShadow: "0 0 2px #00a2ff"
                    }}
                  >
                    <div>
                      <span className="font-semibold">
                        {it.name.toUpperCase()} ({it.quantity})
                      </span>
                      <p 
                        className="text-xs italic"
                        style={{
                          color: "#00ccff",
                          textShadow: "0 0 2px #0066ff"
                        }}
                      >
                        {it.category.name.toUpperCase()}
                      </p>
                    </div>
                    <span>$ {it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
              <hr 
                className="my-2"
                style={{
                  borderColor: "#00a2ff"
                }}
              />
              <div 
                className="flex justify-between font-bold text-lg font-press-start"
                style={{
                  color: "#00ffff",
                  textShadow: "0 0 5px #00a2ff"
                }}
              >
                <span>TOTAL:</span>
                <span>$ {lastSale.total}</span>
              </div>
              <button
                onClick={descargarPDF}
                className="mt-4 w-full py-3 rounded-lg font-press-start hover:scale-105 transition-all"
                style={{
                  background: "linear-gradient(135deg, #0066cc 0%, #003366 100%)",
                  color: "#00ffff",
                  border: "2px solid #00a2ff",
                  boxShadow: "0 0 15px rgba(0, 150, 255, 0.5), inset 0 0 10px rgba(0, 200, 255, 0.3)",
                  textShadow: "0 0 5px #00a2ff",
                  letterSpacing: "1px"
                }}
              >
                DESCARGAR TICKET
              </button>
            </div>
          )}
        </div>

        {/* Columna derecha - Juegos disponibles */}
        <div className="lg:w-2/3">
          <h2 
            className="text-2xl font-semibold mb-4 pb-2 font-press-start"
            style={{
              color: "#00ccff",
              textShadow: "0 0 5px #0066ff",
              borderBottom: "3px solid #00a2ff"
            }}
          >
            JUEGOS DISPONIBLES
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="rounded-lg p-4 relative"
                style={{
                  background: "rgba(0, 20, 60, 0.7)",
                  border: "3px solid #00a2ff",
                  boxShadow: "0 0 20px rgba(0, 150, 255, 0.5), inset 0 0 10px rgba(0, 200, 255, 0.3)",
                  backdropFilter: "blur(3px)",
                }}
              >
                <h3 
                  className="text-xl font-bold font-press-start"
                  style={{
                    color: "#00ffff",
                    textShadow: "0 0 5px #00a2ff",
                    letterSpacing: "1px"
                  }}
                >
                  {p.name.toUpperCase()}
                </h3>
                <p 
                  className="text-xs font-press-start"
                  style={{
                    color: "#00ccff",
                    textShadow: "0 0 3px #0066ff"
                  }}
                >
                  CATEGORÍA: {p.category.name.toUpperCase()}
                </p>
                <p 
                  className="font-bold font-press-start"
                  style={{
                    color: "#00ffff",
                    textShadow: "0 0 3px #00a2ff"
                  }}
                >
                  $ {p.price}
                </p>
                <button
                  onClick={() => addToCart(p)}
                  className="mt-3 w-full py-2 rounded font-press-start hover:scale-105 transition-all"
                  style={{
                    background: "rgba(0, 150, 255, 0.3)",
                    color: "#00ffff",
                    border: "1px solid #00a2ff",
                    boxShadow: "0 0 10px rgba(0, 150, 255, 0.3)",
                    textShadow: "0 0 3px #00a2ff",
                  }}
                >
                  AGREGAR
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default PuntoDeVenta;