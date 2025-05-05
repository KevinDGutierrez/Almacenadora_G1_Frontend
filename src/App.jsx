import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SupplierPage from "./pages/suppliers/SupplierPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Bienvenido a Almacenadora G1</div>} />
        <Route path="suppliers/*" element={<SupplierPage />} />
      </Route>
    </Routes>
  );
}
