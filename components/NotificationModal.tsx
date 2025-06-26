import React from 'react';
import Modal from './Modal';
import { THEME_COLORS } from '../constants';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, title, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="p-2">
        <p className="whitespace-pre-wrap" style={{color: THEME_COLORS.textSecondary}}>{message}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 text-sm font-medium rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2`}
            style={{ backgroundColor: THEME_COLORS.primaryAction, color: 'black' }}
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationModal;
