import React, { useState, useEffect } from 'react';
import { PaymentFlowData } from '../types';
import { THEME_COLORS, IconDropdownTriangle, IconExclamationCircle, IconUpiLogo } from '../constants';
import PinKeypad from '../components/PinKeypad';

interface EnterPinScreenProps {
  paymentDetails: PaymentFlowData;
  onSubmit: (pin: string) => void;
  onCancel: () => void;
}

const EnterPinScreen: React.FC<EnterPinScreenProps> = ({ paymentDetails, onSubmit, onCancel }) => {
  const [pin, setPin] = useState('');
  const PIN_LENGTH = 6;

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setPin(prev => prev.slice(0, -1));
    } else if (pin.length < PIN_LENGTH && /^\d$/.test(key)) {
      setPin(prev => prev + key);
    }
  };

  const handleSubmit = () => {
    if (pin.length === PIN_LENGTH) {
      onSubmit(pin);
    } else {
        // This case should ideally not be reachable if SUBMIT is only enabled for full PIN
        alert("Please enter a 6-digit PIN.");
    }
  };
  
  useEffect(() => {
    if (pin.length === PIN_LENGTH) {
      // Optional: Auto-submit when PIN length is reached
      // handleSubmit(); 
    }
  }, [pin]);


  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: THEME_COLORS.pinInputBackground, color: THEME_COLORS.pinInputText }}>
      {/* Header */}
      <div className="p-4 flex items-center justify-start sticky top-0 z-10" style={{ backgroundColor: THEME_COLORS.pinInputBackground }}>
        <button onClick={onCancel} className="text-sm font-medium hover:opacity-75" style={{color: THEME_COLORS.textLink}}>
          CANCEL
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-5 flex flex-col items-center">
        {/* Payment Summary */}
        <div className="w-full mb-8">
            <div className="flex justify-between items-start mb-1">
                <div>
                    <p className="text-xs text-gray-600">State Bank Of India</p>
                    <p className="text-sm font-medium">XXXX{paymentDetails.selectedAccount?.accountNumberLast4}</p>
                </div>
                {IconUpiLogo}
            </div>
            <div className="border-t border-gray-200 my-3"></div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xs text-gray-600">To:</p>
                    <p className="text-sm font-medium">{paymentDetails.recipientName}</p>
                </div>
                 <div className="flex items-center">
                    <p className="text-sm font-semibold">₹{parseFloat(paymentDetails.amount || "0").toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    {React.cloneElement(IconDropdownTriangle, {className: "w-3 h-3 ml-1 text-gray-500"})}
                </div>
            </div>
             {paymentDetails.remarks && <p className="text-xs text-gray-500 mt-0.5">Note: {paymentDetails.remarks}</p>}
        </div>
        

        <p className="text-sm font-semibold mb-3">ENTER 6-DIGIT UPI PIN</p>
        <div className="flex space-x-2 mb-8">
          {[...Array(PIN_LENGTH)].map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 border-2 rounded-full flex items-center justify-center"
              style={{ borderColor: pin.length > i ? THEME_COLORS.primaryAction : THEME_COLORS.textPlaceholder }}
            >
              {pin.length > i && <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: THEME_COLORS.primaryAction}}></div>}
            </div>
          ))}
        </div>

        {/* Warning Message */}
        <div 
            className="w-full p-3 mb-auto rounded-md flex items-start"
            style={{backgroundColor: THEME_COLORS.warningBackground, border: `1px solid ${THEME_COLORS.warningBorder}`}}
        >
            {React.cloneElement(IconExclamationCircle, {className: "w-7 h-7 mr-2.5 flex-shrink-0", style: {color: THEME_COLORS.warningIcon}})}
            <p className="text-xs leading-snug" style={{color: THEME_COLORS.warningText}}>
                You are SENDING <span className="font-semibold">₹{parseFloat(paymentDetails.amount || "0").toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span> from your account to <span className="font-semibold">{paymentDetails.recipientName}</span>.
            </p>
        </div>
      </div>

      <PinKeypad onKeyPress={handleKeyPress} onSubmit={handleSubmit} />
    </div>
  );
};

export default EnterPinScreen;
