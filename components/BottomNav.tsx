import React from 'react';
import { Screen } from '../types';
import { IconOffers, IconScan, IconHistory, THEME_COLORS } from '../constants';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

interface NavItemProps {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>; // Changed type here
  label: string;
  screen: Screen;
  isActive: boolean; // Not directly used for selection color, but can be for other states
  onClick: (screen: Screen) => void;
  isCentralButton?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, screen, onClick, isCentralButton = false }) => {
  const textColor = isCentralButton ? THEME_COLORS.textPrimary : THEME_COLORS.textSecondary;
  
  if (isCentralButton) {
    return (
      <button
        onClick={() => onClick(screen)}
        className="flex flex-col items-center justify-center flex-1 focus:outline-none relative -top-4"
        aria-label={label}
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: THEME_COLORS.primaryAction }}>
          {React.cloneElement(icon, { className: "w-8 h-8", style: { color: textColor }})}
        </div>
        <span className={`text-xs mt-1 font-semibold`} style={{ color: THEME_COLORS.primaryAction }}>{label}</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => onClick(screen)}
      className={`flex flex-col items-center justify-center flex-1 p-2 focus:outline-none hover:opacity-80 transition-opacity`}
      style={{ color: textColor }}
      aria-label={label}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  return (
    <nav className="flex items-center border-t" style={{ backgroundColor: THEME_COLORS.surface, borderColor: '#2A2A2C', height: '60px' }}>
      <NavItem
        icon={IconOffers}
        label="Offers"
        screen={Screen.Offers} // Navigates to Home for now via App.tsx
        isActive={currentScreen === Screen.Offers || currentScreen === Screen.Home}
        onClick={onNavigate}
      />
      <NavItem
        icon={IconScan}
        label="Scan"
        screen={Screen.ScanPay}
        isActive={currentScreen === Screen.ScanPay}
        onClick={onNavigate}
        isCentralButton={true}
      />
      <NavItem
        icon={IconHistory}
        label="History"
        screen={Screen.Transactions}
        isActive={currentScreen === Screen.Transactions}
        onClick={onNavigate}
      />
    </nav>
  );
};

export default BottomNav;