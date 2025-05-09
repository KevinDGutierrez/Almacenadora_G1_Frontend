import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MovementList from '../../components/movement/MovementList';
import MovementForm from '../../components/movement/MovementForm';
import MovementReport from '../../components/movement/MovementReport';

export default function MovementPage() {
  return (
    <Routes>
      <Route index element={<MovementList />} />
      <Route path="new" element={<MovementForm />} />
      <Route path="report" element={<MovementReport />} />
      <Route path="report/:productoId" element={<MovementReport />} />
    </Routes>
  );
}