import React, { useState } from 'react';
import { UserProfile, BankAccount, PaymentFlowData } from '../types';
import { THEME_COLORS, IconChevronLeft, IconSoundOn, IconCheckCircle, IconRadioButtonUnchecked } from '../constants';

interface SelectAccountScreenProps {
  paymentDetails: PaymentFlowData;
  userProfile: UserProfile;
  onPay: (selectedAccount: BankAccount) => void;
  onBack: () => void;
  onCheckBalance: (account: BankAccount) => void;
}

const SelectAccountScreen: React.FC<SelectAccountScreenProps> = ({
  paymentDetails,
  userProfile,
  onPay,
  onBack,
  onCheckBalance
}) => {
  const primaryAccount = userProfile.linkedAccounts.find(acc => acc.isPrimary) || userProfile.linkedAccounts[0];
  const [selectedAccount, setSelectedAccount] = useState<BankAccount>(primaryAccount);

  const handlePay = () => {
    if (selectedAccount) {
      onPay(selectedAccount);
    }
  };
  
  const avatarBg = paymentDetails.recipientAvatarColor || THEME_COLORS.pkAvatarBg;

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: THEME_COLORS.background, color: THEME_COLORS.textPrimary }}>
      {/* Header */}
      <div className="p-3 flex items-center justify-between sticky top-0 z-10" style={{ backgroundColor: THEME_COLORS.surface }}>
        <button onClick={onBack} className="p-2" aria-label="Go back">
          {IconChevronLeft}
        </button>
         <div className="flex items-center">
            <button className="text-xs hover:underline" style={{color: THEME_COLORS.textLink}}>Previous History</button>
            <button className="p-2 ml-2 text-gray-400 hover:text-white" aria-label="Toggle Sound">
                {IconSoundOn}
            </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-4 flex flex-col overflow-y-auto">
        {/* Recipient and Amount Display */}
        <div className="flex flex-col items-center mb-6 mt-4">
            <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-semibold mb-2"
                style={{ backgroundColor: avatarBg, color: THEME_COLORS.textPrimary }}
            >
                {paymentDetails.recipientInitials || '??'}
            </div>
            <p className="text-sm" style={{color: THEME_COLORS.textSecondary}}>Paying <span className="font-semibold" style={{color: THEME_COLORS.textPrimary}}>{paymentDetails.recipientName}</span></p>
            <p className="text-xs mb-3" style={{ color: THEME_COLORS.textSecondary }}>
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                {paymentDetails.recipientUpiId}
            </p>
            <p className="text-4xl font-light" style={{color: THEME_COLORS.textPrimary}}>₹{paymentDetails.amount}</p>
            {paymentDetails.remarks && <p className="text-xs mt-1 p-1.5 px-2.5 rounded-full" style={{backgroundColor: THEME_COLORS.surfaceLight, color: THEME_COLORS.textSecondary}}>{paymentDetails.remarks}</p>}
        </div>

        {/* Account Selection */}
        <div className="mb-auto"> {/* Pushes content up, and button to bottom if space allows */}
          <h3 className="text-sm font-semibold mb-3 px-1" style={{color: THEME_COLORS.textSecondary}}>Select account to pay with</h3>
          <p className="text-xs mb-1 px-1 font-medium" style={{color: THEME_COLORS.textPrimary}}>Bank Account</p>
          
          {userProfile.linkedAccounts.map(account => (
            <button
              key={account.id}
              onClick={() => setSelectedAccount(account)}
              className={`w-full p-4 rounded-lg shadow mb-3 text-left flex items-center justify-between transition-all duration-150 ease-in-out
                ${selectedAccount?.id === account.id ? `ring-2 ring-offset-2 ring-offset-black ring-[${THEME_COLORS.primaryAction}]` : ''}`}
              style={{ 
                backgroundColor: THEME_COLORS.surfaceDarker,
              }}
              aria-pressed={selectedAccount?.id === account.id}
            >
              <div className="flex items-center">
                {account.bankLogoUrl ? (
                  <img src={account.bankLogoUrl} alt={`${account.bankName} logo`} className="w-8 h-8 mr-3 rounded-full bg-white p-0.5" />
                ) : (
                  <div className="w-8 h-8 mr-3 rounded-full bg-gray-700 flex items-center justify-center text-sm">?</div>
                )}
                <div>
                  <p className="font-medium text-sm">{account.bankName}</p>
                  <p className="text-xs" style={{ color: THEME_COLORS.textSecondary }}>
                    XX{account.accountNumberLast4} {account.isPrimary && <span className="text-green-400 font-medium opacity-80">∙ DEFAULT</span>}
                  </p>
                   <button 
                    onClick={(e) => { e.stopPropagation(); onCheckBalance(account); }} 
                    className="text-xs mt-0.5 hover:underline" style={{color: THEME_COLORS.textLink}}
                  >
                    Check Balance
                  </button>
                </div>
              </div>
              {selectedAccount?.id === account.id ? 
                React.cloneElement(IconCheckCircle, {className: "w-6 h-6", style: {color: THEME_COLORS.primaryAction}}) :
                React.cloneElement(IconRadioButtonUnchecked, {className: "w-6 h-6", style: {color: THEME_COLORS.textSecondary}})
              }
            </button>
          ))}
        </div>
        
        <button
            onClick={handlePay}
            className="w-full py-3.5 mt-4 rounded-lg text-base font-semibold shadow-md active:scale-95 transition-transform"
            style={{ backgroundColor: THEME_COLORS.primaryAction, color: 'black' }}
            disabled={!selectedAccount}
        >
            Pay ₹{paymentDetails.amount}
        </button>
      </div>
    </div>
  );
};

export default SelectAccountScreen;