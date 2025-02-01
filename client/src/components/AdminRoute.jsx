import React from 'react';
import { Navigate } from 'react-router-dom';

// misal kita simpan role di localStorage, atau decode JWT
export default function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // set saat login

  if (!token || (role !== 'ADMIN' && role !== 'SUPER_ADMIN')) {
    return <Navigate to="/" replace />;
  }
  return children;
}
