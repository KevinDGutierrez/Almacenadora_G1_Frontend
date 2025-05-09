import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from '../../components/product/ProductList.jsx';
import ProductForm from '../../components/product/ProductForm.jsx';



export default function ProductPage() {
  return (
    <Routes>
      <Route index element={<ProductList />} />  
      <Route path="new" element={<ProductForm />} />  
      <Route path="edit/:id" element={<ProductForm />} />
    </Routes>
  );
}
