import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ClientPage from "./pages/clients/ClientPage";
import EstadisticPage from "./pages/estadistics/EstadisticPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Bienvenido a Almacenadora G1</div>} />
        <Route path="clients/*" element={<ClientPage />} />
        <Route path="estadistic/*" element={<EstadisticPage />} />
      </Route>
    </Routes>
  );
}
