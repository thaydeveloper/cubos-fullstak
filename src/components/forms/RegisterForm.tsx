import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as Form from '@radix-ui/react-form';
import * as Label from '@radix-ui/react-label';
import { EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons';

// Schema de validação
const registerSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().min(1, 'E-mail é obrigatório').email('Digite um e-mail válido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isLoading?: boolean;
  error?: string | null;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='bg-[var(--color-mauve-dark-700)] rounded-lg p-6' style={{ width: '412px' }}>
        <Form.Root onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
          {/* Erro geral */}
          {error && (
            <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-2'>
              <p className='text-red-400 text-xs'>{error}</p>
            </div>
          )}

          {/* Campo Nome */}
          <Form.Field name='name'>
            <Label.Root className='text-xs font-medium text-[var(--color-mauve-dark-300)] mb-1 block'>
              Nome
            </Label.Root>
            <Form.Control asChild>
              <input
                {...register('name')}
                type='text'
                placeholder='Digite seu nome'
                className='w-full px-3 py-2 bg-transparent border border-[var(--color-mauve-dark-950)] rounded text-[var(--color-mauve-dark-extra-3)] focus:outline-none focus:border-[var(--color-purple-950)] transition-all text-sm'
              />
            </Form.Control>
            {errors.name && (
              <Form.Message className='text-red-400 text-xs mt-1'>
                {errors.name.message}
              </Form.Message>
            )}
          </Form.Field>

          {/* Campo E-mail */}
          <Form.Field name='email'>
            <Label.Root className='text-xs font-medium text-[var(--color-mauve-dark-300)] mb-1 block'>
              E-mail
            </Label.Root>
            <Form.Control asChild>
              <input
                {...register('email')}
                type='email'
                placeholder='Digite seu e-mail'
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
          <Form.Field name='password'>
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

          {/* Campo Confirmação de senha */}
          <Form.Field name='confirmPassword'>
            <Label.Root className='text-xs font-medium text-[var(--color-mauve-dark-300)] mb-1 block'>
              Confirmação de senha
            </Label.Root>
            <div className='relative'>
              <Form.Control asChild>
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Digite sua senha novamente'
                  className='w-full px-3 py-2 pr-10 bg-transparent border border-[var(--color-mauve-dark-950)] rounded text-[var(--color-mauve-dark-extra-3)] placeholder-[var(--color-mauve-dark-extra-3)]/60 focus:outline-none focus:border-[var(--color-purple-950)] transition-all text-sm'
                />
              </Form.Control>
              <button
                type='button'
                onClick={toggleConfirmPasswordVisibility}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-[var(--color-mauve-dark-extra-3)]/60 hover:text-[var(--color-mauve-dark-extra-3)] transition-colors'
              >
                {showConfirmPassword ? (
                  <EyeNoneIcon className='w-4 h-4' />
                ) : (
                  <EyeOpenIcon className='w-4 h-4' />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <Form.Message className='text-red-400 text-xs mt-1'>
                {errors.confirmPassword.message}
              </Form.Message>
            )}
          </Form.Field>

          {/* Botões Login e Cadastrar */}
          <div className='flex justify-end gap-2 mt-2'>
            <button
              type='button'
              onClick={handleNavigateToLogin}
              className='py-2 px-6 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded transition-all duration-200 focus:outline-none text-sm'
            >
              Login
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
                    Cadastrando...
                  </div>
                ) : (
                  'Cadastrar'
                )}
              </button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
    </div>
  );
};
