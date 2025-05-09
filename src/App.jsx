import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProductPage from "./pages/products/ProductPage.jsx";
import CategoriePage from "./pages/categories/CategoriePage.jsx"


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Bienvenido a Almacenadora G1</div>} />
        <Route path="products/*" element={<ProductPage />} />
        <Route path="categories/*" element={<CategoriePage />} />

      </Route>
    </Routes>
  );
}
