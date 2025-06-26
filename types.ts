export enum Screen {
  Home = 'HOME',
  Transactions = 'TRANSACTIONS',
  Profile = 'PROFILE',
  ScanPay = 'SCAN_PAY',
  SendMoney = 'SEND_MONEY',
  Offers = 'OFFERS', 
  AmountEntry = 'AMOUNT_ENTRY',
  SelectAccount = 'SELECT_ACCOUNT',
  EnterPin = 'ENTER_PIN',
  PaymentSuccess = 'PAYMENT_SUCCESS',
  PaymentFailure = 'PAYMENT_FAILURE',
}

export interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'requested';
  partyName: string;
  upiId?: string;
  amount: number;
  date: string;
  status: 'success' | 'pending' | 'failed';
  description?: string;
}

export interface UserProfile {
  name: string;
  initials: string; 
  upiId: string;
  phoneNumber: string;
  linkedAccounts: BankAccount[];
  email?: string; // Added for API call
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumberLast4: string;
  fullAccountNumber?: string; // Added for API call
  balance: number; 
  isPrimary?: boolean;
  bankLogoUrl?: string; 
}

export enum ModalType {
  None,
  RequestMoney,
  CheckBalance,
  Notification
}

export interface Contact {
  id: string;
  name: string;
  avatarInitials: string;
  avatarColor: string;
  upiId: string;
  isFavorite?: boolean;
  phoneNumber?: string;
}

// Data structure for the multi-step payment flow
export interface PaymentFlowData {
  recipientContact?: Contact; // Full contact if selected
  recipientName?: string;     // Or just name/upi if entered manually
  recipientUpiId?: string;
  recipientInitials?: string; // For avatar
  recipientAvatarColor?: string;
  amount?: string;
  remarks?: string;
  selectedAccount?: BankAccount; // Account to pay from
  pin?: string; 
  transactionAttemptId?: string; // For display on success/failure screens
  paymentStatus?: 'success' | 'failed'; // To pass to final screens
  failureReason?: string; // To pass to failure screen
}