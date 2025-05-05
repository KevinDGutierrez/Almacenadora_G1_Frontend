import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientList from '../../components/client/ClientList.jsx';
import ClientForm from '../../components/client/ClientForm.jsx';

export default function ClientPage() {
  return (
    <Routes>
      <Route index element={<ClientList />} />  
      <Route path="new" element={<ClientForm />} />  
      <Route path="edit/:id" element={<ClientForm />} />  
    </Routes>
  );
}
