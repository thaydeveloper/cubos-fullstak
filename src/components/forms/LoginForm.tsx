import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as Form from '@radix-ui/react-form';
import { EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

// Schema de validação
const loginSchema = z.object({
  email: z.string().min(1, 'Nome/E-mail é obrigatório').email('Digite um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
  error?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false, error }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='bg-[var(--color-mauve-dark-700)] rounded-lg p-6 w-full max-w-[412px]'>
        <Form.Root onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
          {/* Erro geral */}
          {error && (
            <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-2 mb-2'>
              <p className='text-red-400 text-xs'>{error}</p>
            </div>
          )}

          {/* Campo Nome/E-mail */}
          <Form.Field name='email'>
            <Input
              {...register('email')}
              type='email'
              label='Nome/E-mail'
              placeholder='Digite seu nome/E-mail'
              error={errors.email?.message}
            />
          </Form.Field>

          {/* Campo Senha */}
          <Form.Field name='password'>
            <Input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              label='Senha'
              placeholder='Digite sua senha'
              error={errors.password?.message}
              rightIcon={
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='text-white/80 hover:text-white transition-colors'
                >
                  {showPassword ? (
                    <EyeNoneIcon className='w-4 h-4' />
                  ) : (
                    <EyeOpenIcon className='w-4 h-4' />
                  )}
                </button>
              }
            />
          </Form.Field>

          {/* Link Esqueci minha senha e Botão Entrar */}
          <div className='flex justify-between items-center mt-2'>
            <button
              type='button'
              className='text-[var(--color-purple-950)] underline text-xs transition-all hover:opacity-80'
            >
              Esqueci minha senha
            </button>

            <div className='flex gap-2'>
              <Button type='button' variant='secondary' onClick={handleNavigateToRegister}>
                Registrar
              </Button>

              <Button type='submit' variant='primary' isLoading={isLoading}>
                Entrar
              </Button>
            </div>
          </div>
        </Form.Root>
      </div>
    </div>
  );
};
