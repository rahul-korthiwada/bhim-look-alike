import React, { useState } from 'react';
import Modal from './Modal';
import { THEME_COLORS } from '../constants';

interface RequestMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { upiId: string; amount: string; remarks: string }) => void;
}

const RequestMoneyModal: React.FC<RequestMoneyModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiId || !amount) {
        alert("Payer UPI ID and Amount are required."); // Consider a themed notification
        return;
    }
    onSubmit({ upiId, amount, remarks });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Money">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="payerUpiId" className="block text-sm font-medium" style={{color: THEME_COLORS.textSecondary}}>Payer UPI ID</label>
          <input
            type="text"
            id="payerUpiId"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm"
            style={{ 
              backgroundColor: THEME_COLORS.inputBackground, 
              borderColor: '#4A4A4C', // Slightly lighter border for input
              color: THEME_COLORS.textPrimary,
              caretColor: THEME_COLORS.primaryAction,
            }}
            placeholder="name@upi"
            required
          />
        </div>
        <div>
          <label htmlFor="requestAmount" className="block text-sm font-medium" style={{color: THEME_COLORS.textSecondary}}>Amount (₹)</label>
          <input
            type="number"
            id="requestAmount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm"
             style={{ 
              backgroundColor: THEME_COLORS.inputBackground, 
              borderColor: '#4A4A4C',
              color: THEME_COLORS.textPrimary,
              caretColor: THEME_COLORS.primaryAction,
            }}
            placeholder="0.00"
            required
          />
        </div>
        <div>
          <label htmlFor="requestRemarks" className="block text-sm font-medium" style={{color: THEME_COLORS.textSecondary}}>Remarks (Optional)</label>
          <input
            type="text"
            id="requestRemarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm"
            style={{ 
              backgroundColor: THEME_COLORS.inputBackground, 
              borderColor: '#4A4A4C',
              color: THEME_COLORS.textPrimary,
              caretColor: THEME_COLORS.primaryAction,
            }}
            placeholder="e.g., Shared expenses"
          />
        </div>
        <div className="flex justify-end space-x-3 pt-2">
            <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 text-sm font-medium rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                style={{ backgroundColor: THEME_COLORS.surfaceLight, color: THEME_COLORS.textPrimary, borderColor: THEME_COLORS.primaryAction }}
            >
                Cancel
            </button>
            <button
                type="submit"
                className={`text-white px-4 py-2 text-sm font-medium rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                style={{ backgroundColor: THEME_COLORS.primaryAction, color: 'black' }} // Orange button text usually black for contrast
            >
                Request
            </button>
        </div>
      </form>
    </Modal>
  );
};

export default RequestMoneyModal;
