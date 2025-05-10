import { Routes, Route, useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { Auth } from "./pages/auth/Auth";
import ClientPage from "./pages/clients/ClientPage";
import EstadisticPage from "./pages/estadistics/EstadisticPage";
import SupplierPage from "./pages/suppliers/SupplierPage";
import MovementPage from './pages/movements/MovementPage';
import InventaryReport from './services/inventoryService';
import ProductPage from "./pages/products/ProductPage";
import CategoriePage from "./pages/categories/CategoriePage";
import Home from "./pages/home";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/dashboard/*" index element={<DashboardPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="clients/*" element={<ClientPage />} />
          <Route path="estadistic/*" element={<EstadisticPage />} />
          <Route path="suppliers/*" element={<SupplierPage />} />
          <Route path="movements/*" element={<MovementPage />} />
          <Route path="inventory/*" element={<InventaryReport />} />
          <Route path="products/*" element={<ProductPage />} />
          <Route path="categories/*" element={<CategoriePage />} />
        </Route>
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}
