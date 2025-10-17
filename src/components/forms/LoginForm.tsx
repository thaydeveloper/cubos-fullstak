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
    <div className='flex items-center justify-center min-h-screen'>
      <div
        className='bg-[var(--color-mauve-dark-700)] rounded-lg p-6'
        style={{ width: '412px', height: '242px' }}
      >
        <Form.Root
          onSubmit={handleSubmit(onSubmit)}
          className='h-full flex flex-col justify-between'
        >
          {/* Erro geral */}
          {error && (
            <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-2 mb-2'>
              <p className='text-red-400 text-xs'>{error}</p>
            </div>
          )}

          {/* Campo Nome/E-mail */}
          <Form.Field name='email' className='mb-3'>
            <Label.Root className='text-xs font-medium text-[var(--color-mauve-dark-300)] mb-1 block'>
              Nome/E-mail
            </Label.Root>
            <Form.Control asChild>
              <input
                {...register('email')}
                type='email'
                placeholder='Digite seu nome/E-mail'
                className='w-full px-3 py-2 bg-transparent border border-[var(--color-mauve-dark-950)] rounded text-[var(--color-mauve-dark-extra-3)] focus:outline-none focus:border-[var(--color-purple-950)] transition-all text-sm'
              />
            </Form.Control>
            {errors.email && (
              <Form.Message className='text-red-400 text-xs mt-1'>
                {errors.email.message}
              </Form.Message>
            )}
          </Form.Field>

          {/* Campo Senha */}
          <Form.Field name='password' className='mb-3'>
            <Label.Root className='text-xs font-medium text-[var(--color-mauve-dark-300)] mb-1 block'>
              Senha
            </Label.Root>
            <div className='relative'>
              <Form.Control asChild>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Digite sua senha'
                  className='w-full px-3 py-2 pr-10 bg-transparent border border-[var(--color-mauve-dark-950)] rounded text-[var(--color-mauve-dark-extra-3)] placeholder-[var(--color-mauve-dark-extra-3)]/60 focus:outline-none focus:border-[var(--color-purple-950)] transition-all text-sm'
                />
              </Form.Control>
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-[var(--color-mauve-dark-extra-3)]/60 hover:text-[var(--color-mauve-dark-extra-3)] transition-colors'
              >
                {showPassword ? (
                  <EyeNoneIcon className='w-4 h-4' />
                ) : (
                  <EyeOpenIcon className='w-4 h-4' />
                )}
              </button>
            </div>
            {errors.password && (
              <Form.Message className='text-red-400 text-xs mt-1'>
                {errors.password.message}
              </Form.Message>
            )}
          </Form.Field>

          {/* Link Esqueci minha senha e Botão Entrar */}
          <div className='flex justify-between items-center'>
            <button
              type='button'
              className='text-[var(--color-purple-950)] underline text-xs transition-all'
            >
              Esqueci minha senha
            </button>

            <Form.Submit asChild>
              <button
                type='submit'
                disabled={isLoading}
                className='py-2 px-6 bg-[var(--color-purple-950)] hover:bg-[var(--color-purple-950)]/80 disabled:bg-[var(--color-purple-950)]/50 text-white font-medium rounded transition-all duration-200 focus:outline-none text-sm'
              >
                {isLoading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <div className='w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                    Entrando...
                  </div>
                ) : (
                  'Entrar'
                )}
              </button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
    </div>
  );
};
