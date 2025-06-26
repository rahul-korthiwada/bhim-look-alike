import React from 'react';
import { THEME_COLORS } from '../constants';

interface HomeActionButtonProps {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>; // Changed type here
  label: string;
  onClick: () => void;
  badgeText?: string;
}

const HomeActionButton: React.FC<HomeActionButtonProps> = ({ icon, label, onClick, badgeText }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center text-center relative transform active:scale-95 transition-transform"
      style={{ color: THEME_COLORS.textPrimary }}
      aria-label={label}
    >
      {badgeText && (
        <span 
          className="absolute -top-1 -left-1 text-xs px-1.5 py-0.5 rounded-full font-semibold z-10"
          style={{ backgroundColor: THEME_COLORS.pkAvatarBg, color: THEME_COLORS.textPrimary }} // Using PK avatar color for badge
        >
          {badgeText}
        </span>
      )}
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mb-1.5 shadow-md"
        style={{ backgroundColor: THEME_COLORS.surfaceLight }}
      >
        {React.cloneElement(icon, { className: "w-7 h-7", style: { color: '#82c9ff' /* Light blue for icons */ }})}
      </div>
      <span className="text-xs font-medium leading-tight max-w-[70px]">{label}</span>
    </button>
  );
};

export default HomeActionButton;