import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm, type RegisterFormData } from '../components/forms/RegisterForm';
import { useAuthStore } from '../store';

export const RegisterContainer: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, isAuthenticated, clearError } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  };

  return <RegisterForm onSubmit={handleRegister} isLoading={isLoading} error={error} />;
};
