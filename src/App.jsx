import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ClientPage from "./pages/clients/ClientPage";
import EstadisticPage from "./pages/estadistics/EstadisticPage";
import SupplierPage from "./pages/suppliers/SupplierPage";
import MovementPage from './pages/movements/MovementPage'
import InventaryReport from './services/inventoryService'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Bienvenido a Almacenadora G1</div>} />
        <Route path="clients/*" element={<ClientPage />} />
        <Route path="estadistic/*" element={<EstadisticPage />} />
        <Route path="suppliers/*" element={<SupplierPage />} />
        <Route path="movement/*" element={<MovementPage />} />
        <Route path="inventary/*" element={<InventaryReport />} />
      </Route>
    </Routes>
  );
}
