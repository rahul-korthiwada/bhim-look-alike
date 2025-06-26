import React, { useState, useEffect } from 'react';
import { THEME_COLORS, IconChevronLeft, IconStar as IconStarConstant, IconSoundOn } from '../constants';
import NumericKeypad from '../components/NumericKeypad';

interface AmountEntryScreenProps {
  recipientName: string;
  recipientUpiId: string;
  recipientInitials: string;
  recipientAvatarColor?: string;
  prefilledAmount?: string; // For cases like scan & pay
  onNext: (amount: string, remarks?: string) => void;
  onBack: () => void;
}

const AmountEntryScreen: React.FC<AmountEntryScreenProps> = ({
  recipientName,
  recipientUpiId,
  recipientInitials,
  recipientAvatarColor = THEME_COLORS.pkAvatarBg,
  prefilledAmount,
  onNext,
  onBack,
}) => {
  const [amount, setAmount] = useState(prefilledAmount || '');
  const [remarks, setRemarks] = useState('');
  const [isFavorite, setIsFavorite] = useState(false); // Mock state

  useEffect(() => {
    if (prefilledAmount) {
        setAmount(prefilledAmount);
    }
  }, [prefilledAmount]);

  const handleNumericKeyPress = (key: string) => {
    if (key === 'backspace') {
      setAmount(prev => prev.slice(0, -1));
    } else if (key === '.' && !amount.includes('.')) {
      setAmount(prev => prev + key);
    } else if (/\d/.test(key)) {
      // Allow up to 2 decimal places
      const parts = amount.split('.');
      if (parts.length === 2 && parts[1].length >= 2) {
        return; 
      }
      // Limit total length (e.g., 7 digits before decimal)
      if (parts[0].length >= 7 && !amount.includes('.')) {
          return;
      }
      setAmount(prev => prev + key);
    }
  };

  const handleNext = () => {
    if (parseFloat(amount) > 0) {
      onNext(amount, remarks);
    } else {
      alert("Please enter a valid amount."); // Replace with themed notification
    }
  };

  const displayAmount = amount ? `₹${amount}` : "₹0.0";
  const avatarBg = recipientAvatarColor || THEME_COLORS.pkAvatarBg;

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
      <div className="flex-grow p-4 flex flex-col items-center overflow-y-auto">
        <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-semibold mb-2 mt-4"
            style={{ backgroundColor: avatarBg, color: THEME_COLORS.textPrimary }}
        >
            {recipientInitials}
        </div>
        <p className="text-sm" style={{color: THEME_COLORS.textSecondary}}>Paying <span className="font-semibold" style={{color: THEME_COLORS.textPrimary}}>{recipientName}</span></p>
        <p className="text-xs mb-6" style={{ color: THEME_COLORS.textSecondary }}>
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span> {/* Mock verified icon */}
            {recipientUpiId}
        </p>

        <div className="text-6xl font-light my-4 min-h-[72px]" style={{color: amount ? THEME_COLORS.textPrimary : THEME_COLORS.textPlaceholder}}>
            {displayAmount}
        </div>

        <input
          type="text"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="What is this for?"
          className="w-full max-w-xs p-3 my-4 rounded-lg text-sm text-center"
          style={{ 
            backgroundColor: THEME_COLORS.inputBackground, 
            color: THEME_COLORS.textPrimary, 
            borderColor: THEME_COLORS.inputBorderLight,
            caretColor: THEME_COLORS.primaryAction,
        }}
        />
        
        <button 
            onClick={() => setIsFavorite(!isFavorite)} 
            className="flex items-center text-sm my-4 p-2 rounded-md hover:opacity-80"
            style={{color: isFavorite ? THEME_COLORS.primaryAction : THEME_COLORS.textSecondary}}
        >
            <IconStarConstant className={`w-5 h-5 mr-2 ${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500 fill-none stroke-current'}`} />
            Add to favourites
        </button>

        <button
            onClick={handleNext}
            className="w-full max-w-xs py-3.5 mt-auto mb-2 rounded-lg text-base font-semibold shadow-md active:scale-95 transition-transform"
            style={{ backgroundColor: parseFloat(amount) > 0 ? THEME_COLORS.primaryAction : THEME_COLORS.surfaceLight, color: parseFloat(amount) > 0 ? 'black' : THEME_COLORS.textPlaceholder }}
            disabled={!(parseFloat(amount) > 0)}
        >
            Next
        </button>
      </div>

      <NumericKeypad onKeyPress={handleNumericKeyPress} showDot={true} />
    </div>
  );
};

export default AmountEntryScreen;
