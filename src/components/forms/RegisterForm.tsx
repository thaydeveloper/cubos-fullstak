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
      <div className='bg-[var(--color-mauve-dark-700)] rounded-lg p-6 w-full max-w-[412px]'>
        <Form.Root onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
          {/* Erro geral */}
          {error && (
            <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-2'>
              <p className='text-red-400 text-xs'>{error}</p>
            </div>
          )}

          {/* Campo Nome */}
          <Form.Field name='name'>
            <Input
              {...register('name')}
              type='text'
              label='Nome'
              placeholder='Digite seu nome'
              error={errors.name?.message}
            />
          </Form.Field>

          {/* Campo E-mail */}
          <Form.Field name='email'>
            <Input
              {...register('email')}
              type='email'
              label='E-mail'
              placeholder='Digite seu e-mail'
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

          {/* Campo Confirmação de senha */}
          <Form.Field name='confirmPassword'>
            <Input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              label='Confirmação de senha'
              placeholder='Digite sua senha novamente'
              error={errors.confirmPassword?.message}
              rightIcon={
                <button
                  type='button'
                  onClick={toggleConfirmPasswordVisibility}
                  className='text-white/80 hover:text-white transition-colors'
                >
                  {showConfirmPassword ? (
                    <EyeNoneIcon className='w-4 h-4' />
                  ) : (
                    <EyeOpenIcon className='w-4 h-4' />
                  )}
                </button>
              }
            />
          </Form.Field>

          {/* Botões Login e Cadastrar */}
          <div className='flex justify-end gap-2 mt-2'>
            <Button
              className='w-[80px] h-[44px]'
              type='button'
              variant='secondary'
              onClick={handleNavigateToLogin}
            >
              Login
            </Button>

            <Button
              className='w-[80px] h-[44px]'
              type='submit'
              variant='primary'
              isLoading={isLoading}
            >
              Cadastrar
            </Button>
          </div>
        </Form.Root>
      </div>
    </div>
  );
};
