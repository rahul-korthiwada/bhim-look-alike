import React from 'react';
import { Screen, UserProfile } from '../types';
import { IconNotificationBell, THEME_COLORS } from '../constants';

interface HeaderProps {
  userProfile: UserProfile;
  onNavigate: (screen: Screen) => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, onNavigate }) => {
  
  return (
    <header style={{ backgroundColor: THEME_COLORS.surface }} className="text-white p-3 flex justify-between items-center shadow-md h-[60px]"> {/* Ensure consistent height */}
      {/* PK Avatar */}
      <button 
        onClick={() => onNavigate(Screen.Home)}
        className="flex items-center justify-center w-10 h-10 rounded-full font-semibold text-lg"
        style={{ backgroundColor: THEME_COLORS.pkAvatarBg, color: THEME_COLORS.textPrimary }}
        aria-label="Go to Home"
      >
        {userProfile.initials}
      </button>

      {/* Placeholder for potential title or empty space */}
      <div className="flex-grow text-center">
        {/* Optional: Add a title here if needed in the future */}
      </div>

      {/* Notification Bell */}
      <button className="p-1 text-gray-300 hover:text-white" aria-label="Notifications">
        {IconNotificationBell}
      </button>
    </header>
  );
};

export default Header;