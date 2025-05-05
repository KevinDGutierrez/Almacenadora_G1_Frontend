import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SupplierList from './SupplierList';
import SupplierForm from './SupplierForm';

export default function SupplierPage() {
  return (
    <Routes>
      <Route index element={<SupplierList />} />
      <Route path="new" element={<SupplierForm />} />
      <Route path="edit/:id" element={<SupplierForm />} />
    </Routes>
  );
}
