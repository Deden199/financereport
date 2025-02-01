import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Halaman-halaman
import Dashboard from './pages/Dashboard';
import MasterToko from './pages/Toko';
import MasterInvestor from './pages/Investor';
import Kepemilikan from './pages/Kepemilikan';
import Dividen from './pages/Dividen';
import Histori from './pages/Histori';
import Transactions from './pages/Transaction';

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected route => wrap Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* index => / => Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Master Toko => /master-toko */}
        <Route path="master-toko" element={<MasterToko />} />

        {/* Master Investor => /master-investor */}
        <Route path="master-investor" element={<MasterInvestor />} />

        {/* Kepemilikan => /kepemilikan */}
        <Route path="kepemilikan" element={<Kepemilikan />} />

        {/* Dividen => /dividen */}
        <Route path="dividen" element={<Dividen />} />

        {/* Histori => /histori */}
        <Route path="histori" element={<Histori />} />

        {/* Transactions => /transactions */}
        <Route path="transactions" element={<Transactions />} />
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
