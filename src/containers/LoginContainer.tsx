import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm, type LoginFormData } from '../components/forms';
import { useAuthStore } from '../store';

export const LoginContainer: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated, clearError } = useAuthStore();

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/movies', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Limpar erro quando o componente for desmontado
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      // O redirecionamento será feito pelo useEffect acima
    } catch (error) {
      // O erro já é tratado no store
      console.error('Erro no login:', error);
    }
  };

  return <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />;
};
