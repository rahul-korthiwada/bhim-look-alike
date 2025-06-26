import React, {useState} from 'react';
import { Screen, ModalType, UserProfile, BankAccount } from '../types';
import HomeActionButton from '../components/HomeActionButton';
import { 
  IconLink, IconCopy, 
  IconSendToMobile, IconSendToBank, IconUpiCircle, IconBillsRecharges, IconIpoMandate, IconApproveToPay,
  IconWand,
  THEME_COLORS 
} from '../constants';

interface HomeScreenProps {
  onAction: (type: ModalType, account?: BankAccount) => void;
  onNavigate: (screen: Screen) => void;
  userProfile: UserProfile;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onAction, onNavigate, userProfile }) => {
  const primaryAccount = userProfile.linkedAccounts.find(acc => acc.isPrimary) || userProfile.linkedAccounts[0];
  const [currentCard, setCurrentCard] = useState(0); // For carousel, if implemented

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("UPI ID copied to clipboard!"); // Replace with a less intrusive notification
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="p-4 flex-grow flex flex-col" style={{ color: THEME_COLORS.textPrimary }}>
      {/* Greeting and UPI ID */}
      <div className="mb-4">
        <p className="text-2xl font-semibold">Hello 👋</p>
        <div className="flex items-center text-sm mt-1" style={{ color: THEME_COLORS.textSecondary }}>
          {React.cloneElement(IconLink, { className: "w-4 h-4 mr-1"})}
          <span>{userProfile.upiId.replace(userProfile.upiId.substring(4, userProfile.upiId.indexOf('@')), '******')}</span>
          <button onClick={() => copyToClipboard(userProfile.upiId)} className="ml-2 p-0.5 rounded hover:bg-gray-700" aria-label="Copy UPI ID">
            {React.cloneElement(IconCopy, { className: "w-4 h-4"})}
          </button>
        </div>
      </div>

      {/* Bank Account Card */}
      {primaryAccount && (
        <div className="p-4 rounded-xl shadow-md mb-6 relative" style={{ backgroundColor: THEME_COLORS.surfaceDarker }}>
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              {primaryAccount.bankLogoUrl ? (
                <img src={primaryAccount.bankLogoUrl} alt={`${primaryAccount.bankName} logo`} className="w-8 h-8 mr-3 rounded-full bg-white p-0.5" />
              ) : (
                <div className="w-8 h-8 mr-3 rounded-full bg-gray-500 flex items-center justify-center text-sm">?</div>
              )}
              <div>
                <div className="flex items-center">
                  <p className="font-semibold text-base">{primaryAccount.bankName}</p>
                  {primaryAccount.isPrimary && (
                     <span className="ml-2 text-xs bg-green-600 text-white px-1.5 py-0.5 rounded-sm font-medium">DEFAULT</span>
                  )}
                </div>
                <p className="text-xs" style={{ color: THEME_COLORS.textSecondary }}>XX{primaryAccount.accountNumberLast4.slice(-4)} Bank account</p>
              </div>
            </div>
          </div>
          {/* Check Balance button removed */}
          
          {/* Placeholder for carousel dots if multiple accounts were shown */}
          <div className="flex justify-center mt-3 space-x-1.5">
            {userProfile.linkedAccounts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCard(index)}
                className={`w-1.5 h-1.5 rounded-full ${index === currentCard ? 'bg-white' : 'bg-gray-500'}`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Action Grid */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-5 mb-6">
        <HomeActionButton
          icon={IconSendToMobile}
          label="Send to mobile"
          onClick={() => onNavigate(Screen.SendMoney)}
          badgeText="Upto ₹10"
        />
        <HomeActionButton
          icon={IconSendToBank}
          label="Send to bank/ UPI/Self"
          onClick={() => onNavigate(Screen.SendMoney)}
        />
        <HomeActionButton
          icon={IconUpiCircle}
          label="UPI Circle"
          onClick={() => alert("UPI Circle clicked")}
        />
        <HomeActionButton
          icon={IconBillsRecharges}
          label="Bills & recharges"
          onClick={() => alert("Bills & Recharges clicked")}
        />
        <HomeActionButton
          icon={IconIpoMandate}
          label="IPO/Mandate/ Services"
          onClick={() => alert("IPO/Mandate clicked")}
        />
        <HomeActionButton
          icon={IconApproveToPay}
          label="Approve to Pay"
          onClick={() => onAction(ModalType.RequestMoney)} // Example: re-use request money
        />
      </div>

      {/* Promotion Banner */}
      <div className="p-3 rounded-lg shadow flex items-center mb-6" style={{ backgroundColor: THEME_COLORS.surfaceLight }}>
        {IconWand}
        <span className="text-sm font-medium">Get ₹30 on Prepaid Mobile Recharge</span>
      </div>

      {/* Recent Transactions (Mini view - Kept from original, can be removed/restyled if needed) */}
      {/* 
      <div className="p-4 rounded-lg shadow" style={{ backgroundColor: THEME_COLORS.surfaceLight }}>
        <h3 className="font-semibold mb-2" style={{color: THEME_COLORS.textSecondary}}>Recent Activity</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between items-center">
            <span>Sent to Store XYZ</span>
            <span className="font-medium text-red-400">- ₹250.00</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Received from John D.</span>
            <span className="font-medium text-green-400">+ ₹500.00</span>
          </li>
        </ul>
        <button 
          onClick={() => onNavigate(Screen.Transactions)}
          className={`mt-3 w-full text-sm py-2 rounded-md hover:opacity-90`}
          style={{backgroundColor: THEME_COLORS.primaryAction, color: THEME_COLORS.textPrimary}}
        >
          View All Transactions
        </button>
      </div>
      */}
    </div>
  );
};

export default HomeScreen;