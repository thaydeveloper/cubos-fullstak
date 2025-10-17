import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as Form from '@radix-ui/react-form';
import * as Label from '@radix-ui/react-label';
import { EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons';

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

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-lg p-8'>
        <Form.Root onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* Título */}
          <div className='text-center mb-8'>
            <h1 className='text-2xl font-semibold text-white mb-2'>Bem-vindo de volta!</h1>
            <p className='text-gray-400'>Faça login para acessar sua conta</p>
          </div>

          {/* Erro geral */}
          {error && (
            <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-3'>
              <p className='text-red-400 text-sm'>{error}</p>
            </div>
          )}

          {/* Campo Nome/E-mail */}
          <Form.Field name='email' className='space-y-2'>
            <Label.Root className='text-sm font-medium text-gray-300'>Nome/E-mail</Label.Root>
            <Form.Control asChild>
              <input
                {...register('email')}
                type='email'
                placeholder='Digite seu nome/E-mail'
                className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all'
              />
            </Form.Control>
            {errors.email && (
              <Form.Message className='text-red-400 text-sm'>{errors.email.message}</Form.Message>
            )}
          </Form.Field>

          {/* Campo Senha */}
          <Form.Field name='password' className='space-y-2'>
            <Label.Root className='text-sm font-medium text-gray-300'>Senha</Label.Root>
            <div className='relative'>
              <Form.Control asChild>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Digite sua senha'
                  className='w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all'
                />
              </Form.Control>
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors'
              >
                {showPassword ? (
                  <EyeNoneIcon className='w-5 h-5' />
                ) : (
                  <EyeOpenIcon className='w-5 h-5' />
                )}
              </button>
            </div>
            {errors.password && (
              <Form.Message className='text-red-400 text-sm'>
                {errors.password.message}
              </Form.Message>
            )}
          </Form.Field>

          {/* Link Esqueci minha senha */}
          <div className='text-right'>
            <button
              type='button'
              className='text-violet-400 hover:underline text-sm transition-all'
            >
              Esqueci minha senha
            </button>
          </div>

          {/* Botão Entrar */}
          <Form.Submit asChild>
            <button
              type='submit'
              disabled={isLoading}
              className='w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 disabled:from-violet-600/50 disabled:to-violet-700/50 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900'
            >
              {isLoading ? (
                <div className='flex items-center justify-center gap-2'>
                  <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                  Entrando...
                </div>
              ) : (
                'Entrar'
              )}
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </div>
  );
};
