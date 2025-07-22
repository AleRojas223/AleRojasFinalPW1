import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Jonas from "./pages/Jonas";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import PuntoDeVenta from "./pages/PuntoDeVenta";
import Categories from "./pages/Categorias";
import Ale from "./pages/Ale";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />, // Agrupa rutas protegidas
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/jonas",
        element: <Jonas />,
      },
      {
       path: "/ale",
       element: <Ale /> 
      },
      {
       path: "/venta",
       element: <PuntoDeVenta /> 
      },
       {
       path: "/categorias",
       element: <Categories /> 
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
