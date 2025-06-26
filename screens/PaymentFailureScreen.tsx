import React from 'react';
import { PaymentFlowData } from '../types';
import { APP_NAME, THEME_COLORS, IconLargeCrossFailed, IconShare, IconDownloadArrow, IconExclamationCircle } from '../constants';

interface PaymentFailureScreenProps {
  paymentDetails: PaymentFlowData;
  onRetry: () => void;
  onGoHome: () => void;
}

const PaymentFailureScreen: React.FC<PaymentFailureScreenProps> = ({ paymentDetails, onRetry, onGoHome }) => {
  const amountAttempted = parseFloat(paymentDetails.amount || '0').toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const transactionDate = new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div className="flex flex-col h-full text-white" style={{ backgroundColor: THEME_COLORS.failureRedScreen }}>
      {/* Custom Header Text */}
      <div className="p-4 text-center text-lg font-semibold" style={{ backgroundColor: '#581111' /* Slightly darker red */ }}>
        {APP_NAME} - Bharat's Own Payments App
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-5 text-center">
        {IconLargeCrossFailed}
        <p className="text-xl font-semibold mt-4 mb-1"><span className="text-red-400">₹</span> Payment Failed</p>
        <p className="text-5xl font-bold mb-4">₹{amountAttempted}</p>
        <div className="px-3 py-1 mb-6 rounded-full text-xs font-medium" style={{ backgroundColor: THEME_COLORS.failureBannerRed }}>
          FAILED
        </div>
      </div>
      
      {/* Transaction Details Section */}
      <div className="bg-black bg-opacity-20 p-5 rounded-t-2xl">
        <div className="p-3 mb-4 rounded-md flex items-start" style={{backgroundColor: THEME_COLORS.surfaceDarker}}>
            {React.cloneElement(IconExclamationCircle, {className: "w-5 h-5 mr-2.5 flex-shrink-0 mt-0.5", style: {color: THEME_COLORS.warningIcon}})}
            <div>
                 <p className="text-sm font-semibold text-red-400">Money was not debited.</p>
                 <p className="text-xs text-gray-300">
                    {paymentDetails.failureReason || "Please enter correct UPI PIN or try again."}
                 </p>
            </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Banking Name</span>
            <span className="text-sm font-medium">{paymentDetails.recipientName}</span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Transaction ID</span>
            <span className="text-sm font-medium">{paymentDetails.transactionAttemptId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Date & Time</span>
            <span className="text-sm font-medium">{transactionDate}</span>
          </div>
        </div>

        <div className="flex space-x-3 mb-4">
          <button className="flex-1 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center transition-opacity">
            {IconDownloadArrow} More details
          </button>
          <button className="flex-1 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center transition-opacity">
            {IconShare} Share
          </button>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button 
            onClick={onRetry}
            className="flex-1 py-3 rounded-lg text-sm font-semibold transition-colors"
            style={{ backgroundColor: THEME_COLORS.surfaceLight, color: THEME_COLORS.textPrimary }}
          >
            Retry
          </button>
          <button 
            onClick={onGoHome}
            className="flex-1 py-3 rounded-lg text-sm font-semibold transition-colors"
            style={{ backgroundColor: THEME_COLORS.primaryAction, color: 'black' }}
          >
            Home
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-3">POWERED BY NPCI</p>
      </div>
    </div>
  );
};

export default PaymentFailureScreen;