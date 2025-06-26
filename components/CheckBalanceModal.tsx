import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { BankAccount } from '../types';
import { THEME_COLORS } from '../constants';

interface CheckBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: BankAccount;
}

const CheckBalanceModal: React.FC<CheckBalanceModalProps> = ({ isOpen, onClose, account }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setBalance(null); // Reset balance on open
      // Simulate API call
      setTimeout(() => {
        setBalance(account.balance);
        setIsLoading(false);
      }, 1500);
    }
  }, [isOpen, account]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Balance for ${account.bankName}`}>
      <div className="text-center p-4">
        <p className="text-sm" style={{color: THEME_COLORS.textSecondary}}>Account ending with: XXXX{account.accountNumberLast4}</p>
        {isLoading ? (
          <div className="my-6">
            <div 
              className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
              style={{ borderColor: THEME_COLORS.primaryAction }}
            ></div>
            <p className="mt-3" style={{color: THEME_COLORS.textSecondary}}>Fetching balance...</p>
          </div>
        ) : balance !== null ? (
          <p className="text-3xl font-bold my-6" style={{color: THEME_COLORS.primaryAction}}>₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        ) : (
          <p className="text-red-500 my-6">Could not fetch balance.</p>
        )}
        <button
          onClick={onClose}
          className={`text-black px-6 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2`}
          style={{ backgroundColor: THEME_COLORS.primaryAction, color: 'black' }}
        >
          Done
        </button>
      </div>
    </Modal>
  );
};

export default CheckBalanceModal;
