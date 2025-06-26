import React from 'react';
import { THEME_COLORS, IconBackspace } from '../constants';

interface PinKeypadProps {
  onKeyPress: (key: string) => void;
  onSubmit: () => void;
}

const PinKeyButton: React.FC<{ 
    value: string; 
    onClick: () => void; 
    children?: React.ReactNode; 
    isIcon?: boolean;
    isSubmit?: boolean;
}> = ({ value, onClick, children, isIcon, isSubmit }) => {
  return (
    <button
      onClick={onClick}
      className={`py-4 text-xl font-medium focus:outline-none border border-gray-300 transition-colors
        ${isSubmit ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-white hover:bg-gray-100 text-black'}
        active:bg-gray-200`}
      style={{
        // For non-submit buttons
        color: isSubmit ? THEME_COLORS.textPrimary : THEME_COLORS.pinInputText,
        backgroundColor: isSubmit ? '#4CAF50' : THEME_COLORS.pinInputBackground,
        borderColor: '#D1D5DB', // gray-300
      }}
      aria-label={isIcon ? value : (isSubmit ? 'Submit PIN' : `Number ${value}`)}
    >
      {children || value}
    </button>
  );
};

const PinKeypad: React.FC<PinKeypadProps> = ({ onKeyPress, onSubmit }) => {
  const keys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    'backspace', '0', 'submit'
  ];

  return (
    <div className="grid grid-cols-3 gap-px" style={{ backgroundColor: '#D1D5DB' /* Keypad border color */ }}>
      {keys.map(key => {
        if (key === 'backspace') {
          return <PinKeyButton key={key} value={key} onClick={() => onKeyPress(key)} isIcon>{React.cloneElement(IconBackspace, {className: "w-6 h-6 mx-auto", style: {color: THEME_COLORS.pinInputText}})}</PinKeyButton>;
        }
        if (key === 'submit') {
          return <PinKeyButton key={key} value={key} onClick={onSubmit} isSubmit>SUBMIT</PinKeyButton>;
        }
        return <PinKeyButton key={key} value={key} onClick={() => onKeyPress(key)}>{key}</PinKeyButton>;
      })}
    </div>
  );
};

export default PinKeypad;
