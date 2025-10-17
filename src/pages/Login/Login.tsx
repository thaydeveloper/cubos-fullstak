import React from 'react';
import { LoginContainer } from '../../containers';

export const Login: React.FC = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Background com overlay - preenche toda a tela */}
      <div
        className='fixed inset-0 bg-cover bg-center bg-no-repeat z-0'
        style={{
          backgroundImage: `linear-gradient(to bottom, #000000a0, #000000a0), url('/src/assets/images/background-hero.png')`,
        }}
      />

      {/* Container do formulário */}
      <div className='relative z-10 w-full'>
        <LoginContainer />
      </div>
    </div>
  );
};