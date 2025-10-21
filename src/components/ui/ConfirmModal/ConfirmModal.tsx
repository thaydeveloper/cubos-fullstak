import React from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const modalContent = (
    <>
      {/* Backdrop com blur */}
      <div
        className='fixed inset-0 z-[9998]'
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          pointerEvents: 'auto',
        }}
        onClick={onClose}
      />

      {/* Modal - Centralizado */}
      <div className='fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none'>
        <div
          className='relative w-full max-w-md rounded-lg shadow-2xl pointer-events-auto'
          style={{
            backgroundColor: '#232225',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className='flex items-center justify-between px-6 py-4 border-b border-white/10'>
            <h2 className='text-white text-lg font-semibold font-montserrat'>{title}</h2>
            <button
              onClick={onClose}
              className='text-white/60 hover:text-white transition-colors text-2xl leading-none'
              aria-label='Fechar'
              disabled={isLoading}
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className='px-6 py-6'>
            <p className='text-white/80 font-montserrat text-sm leading-relaxed'>{message}</p>
          </div>

          {/* Footer */}
          <div className='flex justify-end gap-3 px-6 py-4 border-t border-white/10'>
            <Button
              variant='secondary'
              onClick={onClose}
              disabled={isLoading}
              className='font-montserrat font-semibold text-sm'
              style={{
                width: '100px',
                height: '40px',
                minHeight: '40px',
                borderRadius: '2px',
              }}
            >
              {cancelLabel}
            </Button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className='font-montserrat font-semibold text-sm text-white transition-colors duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'
              style={{
                width: '120px',
                height: '40px',
                minHeight: '40px',
                borderRadius: '2px',
                background: '#EF4444',
              }}
            >
              {isLoading ? 'Excluindo...' : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};
