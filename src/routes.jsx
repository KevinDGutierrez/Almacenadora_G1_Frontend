import Auth from "./pages/auth/Auth";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ClientPage from "./pages/clients/ClientPage";
import EstadisticPage from "./pages/estadistics/EstadisticPage";
import SupplierPage from "./pages/suppliers/SupplierPage";
import MovementPage from './pages/movements/MovementPage';
import InventaryReport from './services/inventoryService';
import ProductPage from "./pages/products/ProductPage";
import CategoriePage from "./pages/categories/CategoriePage";
import Layout from "./components/Layout";

import { Navigate } from "react-router-dom";

const routes = [
  { path: "/auth/*", element: <Auth /> },
  { path: "/dashboard/*", element: <DashboardPage /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <div>Bienvenido a Almacenadora G1</div> },
      { path: "clients/*", element: <ClientPage /> },
      { path: "estadistic/*", element: <EstadisticPage /> },
      { path: "suppliers/*", element: <SupplierPage /> },
      { path: "movements/*", element: <MovementPage /> },
      { path: "inventory/*", element: <InventaryReport /> },
      { path: "products/*", element: <ProductPage /> },
      { path: "categories/*", element: <CategoriePage /> },
    ]
  },
  { path: "*", element: <Navigate to="/" replace /> }
];

export default routes;
