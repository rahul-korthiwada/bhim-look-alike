import React from 'react';
import { IconClose, THEME_COLORS } from '../constants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div 
        className="rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col"
        style={{ backgroundColor: THEME_COLORS.surface, color: THEME_COLORS.textPrimary }}
      >
        <div className="flex justify-between items-center p-4 border-b" style={{ borderColor: THEME_COLORS.surfaceLight }}>
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="hover:opacity-75" style={{ color: THEME_COLORS.textSecondary }}>
            {IconClose}
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
