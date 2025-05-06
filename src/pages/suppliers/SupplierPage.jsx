import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SupplierList from '../../components/supplier/SupplierList';
import SupplierForm from '../../components/supplier/SupplierForm';

export default function SupplierPage() {
  return (
    <Routes>
      <Route index element={<SupplierList />} />
      <Route path="new" element={<SupplierForm />} />
      <Route path="edit/:id" element={<SupplierForm />} />
    </Routes>
  );
}
