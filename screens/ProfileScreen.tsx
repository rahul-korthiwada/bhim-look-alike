import React from 'react';
import { UserProfile, BankAccount } from '../types';
import { THEME_COLORS, IconChevronRight } from '../constants';

interface ProfileScreenProps {
  userProfile: UserProfile;
  onCheckBalance: (account: BankAccount) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userProfile, onCheckBalance }) => {
  return (
    <div className="flex-grow" style={{backgroundColor: THEME_COLORS.background, color: THEME_COLORS.textPrimary}}>
      {/* Profile Header */}
      <div className="p-6 text-center rounded-b-xl shadow-lg" style={{backgroundColor: THEME_COLORS.surface}}>
        <div 
            className="w-24 h-24 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden font-bold text-4xl"
            style={{backgroundColor: THEME_COLORS.pkAvatarBg, color: THEME_COLORS.textPrimary}}
        >
          {userProfile.initials}
        </div>
        <h2 className="text-2xl font-semibold">{userProfile.name}</h2>
        <p className="text-sm opacity-90" style={{color: THEME_COLORS.textSecondary}}>{userProfile.upiId}</p>
        <p className="text-xs opacity-80" style={{color: THEME_COLORS.textSecondary}}>{userProfile.phoneNumber}</p>
      </div>

      {/* Linked Accounts */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3 px-2" style={{color: THEME_COLORS.textSecondary}}>Linked Bank Accounts</h3>
        {userProfile.linkedAccounts.map(account => (
          <div key={account.id} className="p-4 rounded-lg shadow mb-3" style={{backgroundColor: THEME_COLORS.surfaceLight}}>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                 {account.bankLogoUrl ? (
                    <img src={account.bankLogoUrl} alt={`${account.bankName} logo`} className="w-8 h-8 mr-3 rounded-full bg-white p-0.5" />
                  ) : (
                    <div className="w-8 h-8 mr-3 rounded-full bg-gray-700 flex items-center justify-center text-sm">?</div>
                 )}
                <div>
                  <p className="font-medium">{account.bankName}</p>
                  <p className="text-sm" style={{color: THEME_COLORS.textSecondary}}>Ac/No: XXXX XXXX XXXX {account.accountNumberLast4}</p>
                </div>
              </div>
              <button
                onClick={() => onCheckBalance(account)}
                className={`text-xs px-3 py-1.5 rounded-md hover:opacity-90 focus:outline-none font-semibold`}
                style={{backgroundColor: THEME_COLORS.primaryAction, color: 'black'}}
              >
                Check Balance
              </button>
            </div>
            {account.isPrimary && (
              <span className="mt-2 inline-block bg-green-700 bg-opacity-30 text-green-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                Primary Account
              </span>
            )}
          </div>
        ))}
         <button 
            className={`mt-2 w-full text-sm py-2.5 rounded-md hover:opacity-80 font-medium border`}
            style={{
                backgroundColor: 'transparent', //THEME_COLORS.surfaceLight, 
                color: THEME_COLORS.primaryAction, 
                borderColor: THEME_COLORS.primaryAction
            }}
        >
          + Add New Account
        </button>
      </div>
      
      {/* Settings Options */}
      <div className="p-4">
         <h3 className="text-lg font-semibold mb-3 px-2" style={{color: THEME_COLORS.textSecondary}}>Settings & Preferences</h3>
         <div className="rounded-lg shadow overflow-hidden" style={{backgroundColor: THEME_COLORS.surfaceLight}}>
            {['Manage UPI IDs', 'Change Language', 'App Lock', 'Notifications', 'Help & Support'].map(item => (
                 <button 
                    key={item} 
                    className="w-full text-left px-4 py-3 border-b last:border-b-0 hover:opacity-80 flex justify-between items-center transition-opacity"
                    style={{borderColor: THEME_COLORS.background, color: THEME_COLORS.textPrimary}}
                  >
                    <span>{item}</span>
                    {React.cloneElement(IconChevronRight, { className: "w-4 h-4", style:{color: THEME_COLORS.textSecondary}})}
                 </button>
            ))}
         </div>
      </div>

      <div className="p-4 text-center">
        <button 
            className="bg-red-600 text-white px-6 py-2.5 rounded-md hover:bg-red-700 focus:outline-none w-full sm:w-auto font-medium"
        >
            Logout
        </button>
        <p className="text-xs mt-4" style={{color: THEME_COLORS.textPlaceholder}}>App Version 2.5.1</p>
      </div>
    </div>
  );
};

export default ProfileScreen;
