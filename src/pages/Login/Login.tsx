import React from 'react';
import { LoginContainer } from '../../containers';

export const Login: React.FC = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center p-4 relative overflow-hidden -mt-14 md:-mt-16 -mb-14 md:-mb-16'>
      {/* Background com overlay - preenche toda a tela */}
      <div
        className='fixed inset-0 bg-cover bg-center bg-no-repeat z-0'
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 20%, #000000 100%), url('/src/assets/images/background-hero.png')`,
        }}
      />

      {/* Container do formulário */}
      <div className='relative z-10 w-full'>
        <LoginContainer />
      </div>
    </div>
  );
};
