import React from 'react';
import type { PercentageCircleProps } from './PercentageCircle.types';

export const PercentageCircle: React.FC<PercentageCircleProps> = ({
  percentage,
  size = 'medium',
  showLabel = true,
}) => {
  const sizeConfig = {
    small: {
      width: 98,
      height: 98,
      strokeWidth: 5,
      fontSize: '24px',
      radius: 42,
    },
    medium: {
      width: 98,
      height: 98,
      strokeWidth: 5,
      fontSize: '24px',
      radius: 42,
    },
    large: {
      width: 98,
      height: 98,
      strokeWidth: 5,
      fontSize: '24px',
      radius: 42,
    },
  };

  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * config.radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className='relative inline-flex items-center justify-center'
      style={{ width: '98px', height: '98px' }}
    >
      {/* Fundo com blur - apenas interno */}
      <div
        className='absolute'
        style={{
          width: `${config.radius * 2}px`,
          height: `${config.radius * 2}px`,
          borderRadius: '50%',
          backgroundColor: 'rgba(18, 17, 19, 0.5)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* SVG do círculo de progresso */}
      <svg
        width={config.width}
        height={config.height}
        className='transform -rotate-90 relative z-10'
      >
        {/* Background circle */}
        <circle
          cx={config.width / 2}
          cy={config.height / 2}
          r={config.radius}
          stroke='rgba(255, 255, 255, 0.1)'
          strokeWidth={config.strokeWidth}
          fill='none'
        />
        {/* Progress circle */}
        <circle
          cx={config.width / 2}
          cy={config.height / 2}
          r={config.radius}
          stroke='#FFE000'
          strokeWidth={config.strokeWidth}
          fill='none'
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
          style={{
            transition: 'stroke-dashoffset 0.5s ease',
          }}
        />
      </svg>

      {/* Label com porcentagem */}
      {showLabel && (
        <div
          className='absolute inset-0 flex items-center justify-center font-montserrat font-semibold z-20'
          style={{ fontSize: config.fontSize }}
        >
          <span style={{ color: '#FFE000' }}>{percentage}</span>
          <span style={{ color: '#FFFFFF' }}>%</span>
        </div>
      )}
    </div>
  );
};
