import React from 'react';
import { THEME_COLORS, IconBackspace } from '../constants';

interface NumericKeypadProps {
  onKeyPress: (key: string) => void;
  showDot?: boolean; // Added prop to control visibility of dot key
}

const KeyButton: React.FC<{ value: string; onClick: (value: string) => void; wide?: boolean; children?: React.ReactNode; isIcon?: boolean;}> = ({ value, onClick, wide, children, isIcon }) => {
  return (
    <button
      onClick={() => onClick(value)}
      className={`py-3 sm:py-4 rounded-md text-xl sm:text-2xl font-medium focus:outline-none active:opacity-70 transition-opacity ${wide ? 'col-span-1' : ''}`}
      style={{ backgroundColor: THEME_COLORS.keypadButtonBackground, color: THEME_COLORS.textPrimary }}
      aria-label={isIcon ? value : `Number ${value}`}
    >
      {children || value}
    </button>
  );
};


const NumericKeypad: React.FC<NumericKeypadProps> = ({ onKeyPress, showDot = false }) => {
  const baseKeys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
  ];
  
  const bottomRowKeys = showDot ? ['.', '0', 'backspace'] : [' ', '0', 'backspace']; // Placeholder for alignment if no dot

  const allKeys = [...baseKeys, ...bottomRowKeys];

  return (
    <div className="grid grid-cols-3 gap-0.5 p-0.5" style={{ backgroundColor: THEME_COLORS.keypadBackground }}>
      {allKeys.map((key, index) => {
        if (key === 'backspace') {
          return <KeyButton key={index} value={key} onClick={onKeyPress} isIcon>{IconBackspace}</KeyButton>;
        }
        if (key === ' ' && !showDot) { // Render an empty, non-functional button for alignment
            return <div key={index} className="py-3 sm:py-4"></div>;
        }
        return <KeyButton key={index} value={key} onClick={onKeyPress}>{key}</KeyButton>;
      })}
    </div>
  );
};

export default NumericKeypad;
