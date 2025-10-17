import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='flex justify-center items-center gap-8 mb-8'>
          <a
            href='https://vite.dev'
            target='_blank'
            className='hover:opacity-80 transition-opacity'
          >
            <img src={viteLogo} className='h-16 w-16' alt='Vite logo' />
          </a>
          <a
            href='https://react.dev'
            target='_blank'
            className='hover:opacity-80 transition-opacity'
          >
            <img src={reactLogo} className='h-16 w-16 animate-spin' alt='React logo' />
          </a>
        </div>

        {/* Title */}
        <h1 className='text-4xl font-bold text-center mb-8 text-purple-accent'>Vite + React</h1>

        {/* Card with Purple Dark Theme */}
        <div className='max-w-md mx-auto bg-card border border-border rounded-lg p-6 shadow-lg'>
          <button
            onClick={() => setCount(count => count + 1)}
            className='w-full bg-primary hover:bg-purple-700 text-primary-foreground font-medium py-3 px-6 rounded-md transition-colors duration-200 mb-4'
          >
            count is {count}
          </button>
          <p className='text-muted-foreground text-center'>
            Edit{' '}
            <code className='bg-muted text-muted-foreground px-2 py-1 rounded text-sm'>
              src/App.tsx
            </code>{' '}
            and save to test HMR
          </p>
        </div>

        <p className='text-center text-muted-foreground mt-8'>
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
