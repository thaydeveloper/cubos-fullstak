import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import * as Tooltip from '@radix-ui/react-tooltip';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, onThemeToggle, onLogout }) => {
  return (
    <Tooltip.Provider>
      <header
        className='fixed top-0 left-0 w-full border-b-[1px] border-[var(--color-mauve-alpha-16)]  z-50'
        style={{ backgroundColor: 'rgba(18, 17, 19, 0.95)' }}
      >
        <div className='w-full px-4 md:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-14 md:h-16'>
            {/* Logo */}
            <div className='flex items-center'>
              {/* Desktop Logo */}
              <img
                src='/src/assets/icons/Title-header.svg'
                alt='CUBOS Movies'
                className='hidden md:block h-9'
              />
              {/* Mobile Logo */}
              <img
                src='/src/assets/icons/Title-header-mobile.svg'
                alt='CUBOS Movies'
                className='block md:hidden h-9'
              />
            </div>

            {/* Right Side - Theme Toggle + Logout */}
            <div className='flex items-center gap-2 md:gap-4'>
              {/* Theme Toggle */}
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Switch.Root
                    checked={isDarkMode}
                    onCheckedChange={onThemeToggle}
                    className={`w-10 h-5 md:w-11 md:h-6 rounded-full relative transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 ${
                      isDarkMode ? 'bg-purple-600' : 'bg-mauve-alpha-6'
                    }`}
                  >
                    <Switch.Thumb className='block w-4 h-4 md:w-5 md:h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[20px] md:data-[state=checked]:translate-x-[22px] shadow-sm'>
                      <div className='w-full h-full flex items-center justify-center'>
                        {isDarkMode ? (
                          <MoonIcon className='w-2.5 h-2.5 md:w-3 md:h-3 text-purple-600' />
                        ) : (
                          <SunIcon className='w-2.5 h-2.5 md:w-3 md:h-3 text-mauve-alpha-7' />
                        )}
                      </div>
                    </Switch.Thumb>
                  </Switch.Root>
                </Tooltip.Trigger>

                <Tooltip.Portal>
                  <Tooltip.Content
                    className='px-3 py-2 rounded-md text-sm shadow-lg bg-mauve-dark-900 text-[var(--color-mauve-alpha-16)]'
                    sideOffset={5}
                  >
                    {isDarkMode ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
                    <Tooltip.Arrow className='fill-mauve-dark-900' />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className='px-3 w-[90px] h-[44px] py-1.5 md:px-4 md:py-2 rounded-lg transition-colors duration-200 font-medium outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 text-sm md:text-base bg-[var(--color-purple-950)] hover:bg-purple-700 text-[var(--color-mauve-alpha-16)]'
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    </Tooltip.Provider>
  );
};

export default Header;
