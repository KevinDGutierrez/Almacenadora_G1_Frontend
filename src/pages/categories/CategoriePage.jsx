import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoriaList from '../../components/categorie/CategoriaList.jsx';
import CategoriaFrom from '../../components/categorie/CategoriaFrom.jsx';



export default function ProductPage() {
  return (
    <Routes>
      <Route index element={<CategoriaList />} />  
      <Route path="new" element={<CategoriaFrom />} />  
    </Routes>
  );
}
