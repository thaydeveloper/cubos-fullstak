import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Verifica se existe token no localStorage (accessToken é a chave usada pelo authStore)
  const token = localStorage.getItem('accessToken');

  if (!token) {
    // Redireciona para login se não houver token
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};
